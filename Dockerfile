FROM cgr.dev/chainguard/python:latest-dev as builder

ENV LANG=C.UTF-8
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH="/app/venv/bin:$PATH"
WORKDIR /app
RUN python -m venv /app/venv
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2
FROM node:latest AS frontendbuilder
#FROM cgr.dev/chainguard/node:latest AS frontendbuilder
WORKDIR /src/app
COPY --chown=node:node ./frontend /src/app/
RUN npm install; npm install --dev
RUN npm run build
CMD bash

# Stage 3 - Production python fast API
# Run container (minimal, no pip and many other tools)
FROM cgr.dev/chainguard/python:latest
WORKDIR /app
ENV PYTHONUNBUFFERED=1
ENV PATH="/venv/bin:$PATH"
COPY backend/main.py main.py
ENV PYTHONBUFFERED=1
COPY backend .
COPY --from=builder /app/venv /venv
COPY --from=frontendbuilder /src/app/dist /app/static
ENV STATIC_WEB_DIR=/app/static
ENTRYPOINT [ "python", "run.py" ]
