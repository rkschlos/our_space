from fastapi import APIRouter, Response, status, Depends, HTTPException
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer
import os
from jose import jwt
from psycopg.errors import ForeignKeyViolation
from forum_db import pool

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)
router = APIRouter()
SECRET_KEY = os.environ["SECRET_KEY"]
ALGORITHM = "HS256"

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


class UpvoteDelete(BaseModel):
    upvote_count: int
    user_upvoted: int


class PostUpvote(BaseModel):
    post_upvote_id: int
    post_id: int
    upvoter: str
    upvote_count: int
    user_upvoted: int


class CommentUpvote(BaseModel):
    comment_upvote_id: int
    comment_id: int
    upvoter: str
    upvote_count: int


class ErrorMessage(BaseModel):
    message: str


class Message(BaseModel):
    message: str


# POST UPVOTES


@router.post("/api/posts/{post_id}/upvote/", response_model=PostUpvote)
def upvote(post_id: int, bearer_token: str = Depends(oauth2_scheme)):
    if bearer_token is None:
        raise credentials_exception
    payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    with pool.connection() as conn:
        with conn.cursor() as cur:

            cur.execute(
                """
                INSERT INTO post_upvote(post_upvote_id, post_id, upvoter)
                VALUES (DEFAULT, %s, %s)
                RETURNING post_upvote_id, post_id, upvoter
                """,
                [post_id, username],
            )
            conn.commit()

            upvote = cur.fetchone()

            cur.execute(
                """
                Select count(*) from post_upvote where post_id = %s
                """,
                [post_id],
            )

            total = cur.fetchone()

            cur.execute(
                """
                SELECT count(*)
                FROM post_upvote
                WHERE post_upvote.post_id = %s and upvoter = %s
                """,
                [post_id, username],
            )

            count = cur.fetchone()

            return {
                "post_upvote_id": upvote[0],
                "post_id": upvote[1],
                "upvoter": upvote[2],
                "upvote_count": total[0],
                "user_upvoted": count[0],
            }


@router.delete(
    "/api/posts/{post_id}/upvote/",
    response_model=UpvoteDelete,
    responses={404: {"model": ErrorMessage}},
)
def remove_upvote(
    post_id: int,
    response: Response,
    bearer_token: str = Depends(oauth2_scheme),
):
    print("bearer token", bearer_token)
    if bearer_token is None:
        raise credentials_exception
    payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    print("USERNAME", username)
    with pool.connection() as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    """
                    DELETE FROM post_upvote
                    WHERE post_id = %s
                    AND upvoter = %s;
                    """,
                    [post_id, username],
                )
                # conn.commit()

                cur.execute(
                    """
                Select count(*) from post_upvote where post_id = %s
                """,
                    [post_id],
                )

                total = cur.fetchone()

                cur.execute(
                    """
                Select count(*) FROM post_upvote
                WHERE post_upvote.post_id = %s and upvoter = %s
                """,
                    [post_id, username],
                )

                count = cur.fetchone()

                return {"upvote_count": total[0], "user_upvoted": count[0]}

            except ForeignKeyViolation:
                response.status_code = status.HTTP_400_BAD_REQUEST
                return {
                    "message": "Cannot delete category because it has clues",
                }
