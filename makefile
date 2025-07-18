.PHONY: deploy shutdown restart logs backend frontend bash-backend bash-frontend rebuild

# Deploy and run the app
deploy:
	docker-compose up -d --build

# Stop everything
shutdown:
	docker-compose down

# Restart everything
restart:
	docker-compose down && docker-compose up -d --build

# View logs
logs:
	docker-compose logs -f

# Rebuild containers from scratch
rebuild:
	docker-compose down -v
	docker-compose build --no-cache
	docker-compose up -d

# Just run the backend
backend:
	docker-compose up -d backend

# Just run the frontend
frontend:
	docker-compose up -d frontend

