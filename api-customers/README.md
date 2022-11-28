# api-customers

### requirements
JDK 1.8 or later
Maven 3.2+

run postgressql on docker:
`docker run --name api-customers-postgres --network=postgres-network -e POSTGRES_DB=customers POSTGRES_USER=customers POSTGRES_PASSWORD=customers -p 5432:5432 -d postgres` 

run application on http://localhost:3001 `./mvnw spring-boot:run`


