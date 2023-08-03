-- DEVELOPER MODE --
please run this:
1. docker compose --env-file .\server\.env  -f .\docker-compose.dev.yml build
2. docker compose --env-file .\server\.env  -f .\docker-compose.dev.yml up -d

url: localhost:3001

-- PRODUCTION MODE --
1. docker compose --env-file .\server\.env  -f .\docker-compose.prod.yml build
2. docker compose --env-file .\server\.env  -f .\docker-compose.prod.yml up -d

-- DEPLOYMENT COMMAND --
git checkout production && git pull origin master && git push origin production && git checkout master