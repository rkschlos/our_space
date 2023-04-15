from datetime import datetime
from fastapi import APIRouter, Response, status, Depends, HTTPException
from pydantic import BaseModel
from typing import List
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


class Post(BaseModel):
    post_id: int
    title: str
    text: str
    created_on: datetime
    author: str
    upvote_count: int
    user_upvoted: int


class PostIn(BaseModel):
    title: str
    text: str


class PostList(BaseModel):
    __root__: List[Post]


class Message(BaseModel):
    message: str


class PostQueries:
    def get_post(self, username, post_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT post_id, title, text, created_on, author,
                    (select count(*) from post_upvote
                        where post_upvote.post_id = post.post_id) upvote_count,
                    (select count(*) from post_upvote
                        where post_upvote.post_id = post.post_id
                        and upvoter = %s)
                    FROM post
                    WHERE post_id = %s
                    """,
                    [username, post_id],
                )
                row = cur.fetchone()
                print(row, "THIS IS CHECKING COUNT FOR UPVOTES")
                if row is None:
                    return None
                detail = {
                    "post_id": row[0],
                    "title": row[1],
                    "text": row[2],
                    "created_on": row[3],
                    "author": str(row[4]),
                    "upvote_count": row[5],
                    "user_upvoted": row[6],
                }
                return detail


@router.get("/api/posts/", response_model=PostList)
def posts_list(
    bearer_token: str = Depends(oauth2_scheme),
):
    print(bearer_token)
    if bearer_token is None:
        raise credentials_exception
    payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    print(username)
    with pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT post_id, title, text, created_on, author,
                (select count(*) from post_upvote
                 where post_upvote.post_id = post.post_id) upvote_count,
                (select count(*) from post_upvote
                 where post_upvote.post_id = post.post_id
                 and upvoter = %s)

                FROM post
                """,
                [username],
            )

            ds = []
            for row in cur.fetchall():
                d = {
                    "post_id": row[0],
                    "title": row[1],
                    "text": row[2],
                    "created_on": row[3],
                    "author": str(row[4]),
                    "upvote_count": row[5],
                    "user_upvoted": row[6],
                }

                ds.append(d)
            return ds


@router.get(
    "/api/posts/{post_id}",
    response_model=Post | Message,
    responses={404: {"model": Message}},
)
def get_post(
    post_id: int,
    response: Response,
    bearer_token: str = Depends(oauth2_scheme),
    queries: PostQueries = Depends(),
):
    if bearer_token is None:
        raise credentials_exception
    payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    post = queries.get_post(username, post_id)
    if post is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Category not found"}
    else:
        return post


@router.post("/api/posts/", response_model=Post)
def new_post(Post: PostIn, bearer_token: str = Depends(oauth2_scheme)):
    if bearer_token is None:
        raise credentials_exception
    payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")

    with pool.connection() as conn:
        with conn.cursor() as cur:

            cur.execute(
                """
                INSERT INTO post (post_id, title, text, created_on, author)
                VALUES (DEFAULT, %s, %s, CURRENT_TIMESTAMP, %s)
                RETURNING post_id, title, text, created_on, author
                """,
                [Post.title, Post.text, username],
            )

            conn.commit()

            new_post = cur.fetchone()

            return {
                "post_id": new_post[0],
                "title": new_post[1],
                "text": new_post[2],
                "created_on": new_post[3],
                "author": new_post[4],
                "upvote_count": 0,
                "user_upvoted": 0,
            }


@router.delete(
    "/api/posts/{post_id}/",
    response_model=Message,
    responses={404: {"model": Message}},
)
def remove_post(post_id: int, response: Response):
    with pool.connection() as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    """
                    DELETE FROM post
                    WHERE post_id = %s;
                    """,
                    [post_id],
                )
                return {
                    "message": "Success",
                }
            except ForeignKeyViolation:
                response.status_code = status.HTTP_400_BAD_REQUEST
                return {
                    "message": "Cannot delete post",
                }
