import os
from datetime import datetime
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from psycopg_pool import ConnectionPool

conninfo = os.environ["DATABASE_URL"]
pool = ConnectionPool(conninfo=conninfo)


router = APIRouter()


class Job(BaseModel):
    id: int
    created: datetime
    city: str
    state: str
    title: str
    company: str
    description: str
    redirect_url: str


class JobList(BaseModel):
    __root__: List[Job]


@router.get("/api/jobs/list/", response_model=JobList)
def jobs_list():
    with pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id,
                    created,
                    city,
                    state,
                    title,
                    company,
                    description,
                    redirect_url
                FROM jobs
                LIMIT 100
                """,
            )

            ds = []
            for row in cur.fetchall():
                d = {
                    "id": row[0],
                    "created": row[1],
                    "city": row[2],
                    "state": row[3],
                    "title": row[4],
                    "company": row[5],
                    "description": row[6],
                    "redirect_url": row[7],
                }
                ds.append(d)
            return ds
