# Vehicle Metadata Backend

## Description
Spring Boot backend for vehicle signal metadata management with EU Data Act compliance.

## Tech Stack
- Java 21
- Spring Boot 3.5.10
- Spring Data JPA
- H2 Database (PostgreSQL mode)
- Liquibase
- Maven

## Run Instructions

### Prerequisites
- Java 21 installed
- Maven installed (or use included wrapper)

### Start the application
```bash
cd backend
./mvnw spring-boot:run
```

The backend will start on **http://localhost:8080**

### Access H2 Console
- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (empty)

### API Endpoints
- `GET /signals` - List all signals
- `GET /legal-purposes` - List all legal purposes
- `GET /data-requests` - List all data requests
- `POST /data-requests` - Create a data request
- `PATCH /data-requests/{id}/status` - Update request status
- `DELETE /data-requests/{id}` - Delete a request

## Database Schema
Managed by Liquibase. Schema is created automatically on startup from changesets in `src/main/resources/db/changelog/`.