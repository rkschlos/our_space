FROM python:3.10-bullseye
LABEL render.service.name="our-space-backend"
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files
COPY jobs/api/__init__.py __init__.py
COPY jobs/api/jobs_db.py jobs_db.py
COPY jobs/api/main.py main.py
COPY jobs/api/requirements.txt requirements.txt

# Copy all of the directories that contain your application
# code
COPY jobs/api/routers routers

RUN pip install -r requirements.txt
CMD uvicorn main:app --host 0.0.0.0 & python jobs/api/jobs_db.py

