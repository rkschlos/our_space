FROM python:3.10-bullseye
LABEL render.service.name="our-space-backend"
ENV PYTHONUNBUFFERED 1
WORKDIR /app
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
COPY jobs/api/requirements.txt requirements.txt


CMD uvicorn main:app --reload --host 0.0.0.0 & python jobs_db.py