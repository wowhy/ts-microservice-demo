# ts-microservice-demo

## Technology stack
* Typescript
* Nest.js
* Restful API
* Swagger
* Agenda
* Kafka
* TypeORM

## Start
```
  cd deploys/development
  docker-compose -f environment.yml up -d
  docker-compose -f services.yml up -d --build

  curl -XGET http://127.0.0.1:8000/health
```

## TODO
- [ ] Unit Tests