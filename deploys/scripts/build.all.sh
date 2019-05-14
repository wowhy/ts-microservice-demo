docker build -f apis/api-auth/Dockerfile -t ts-microservice-demo/api-auth:latest .
docker build -f apis/api-app/Dockerfile -t ts-microservice-demo/api-app:latest .
docker build -f apis/api-admin/Dockerfile -t ts-microservice-demo/api-admin:latest .

docker build -f scheduler/Dockerfile -t ts-microservice-demo/scheduler:latest .

docker build -f services/service-user/Dockerfile -t ts-microservice-demo/service-user:latest .
docker build -f listeners/listener-user/Dockerfile -t ts-microservice-demo/listener-user:latest .
docker build -f workers/worker-user/Dockerfile -t ts-microservice-demo/worker-user:latest .