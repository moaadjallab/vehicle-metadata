# Architecture Overview

## API Design
The backend exposes a RESTful API following resource-based URL patterns (`/signals`, `/legal-purposes`, `/data-requests`). DTOs are used to decouple internal entities from external contracts, with Java Records providing immutable data transfer objects. Jakarta validation annotations ensure data integrity at the API boundary. CORS is enabled for cross-origin requests from the frontend development server.

## Data Model
The domain uses three core entities: **Signal** (vehicle telemetry metadata), **LegalPurpose** (regulatory compliance justification), and **DataRequest** (linking signals to purposes with audit timestamps). Foreign key relationships between DataRequest and the other entities are enforced at the database level via Liquibase migrations. UUIDs are used as primary keys for globally unique identifiers. The `@PrePersist` and `@PreUpdate` JPA lifecycle callbacks automatically manage timestamps for audit trail compliance.

## RTK Query Caching Strategy
The frontend uses RTK Query with tag-based cache invalidation. Each entity type has corresponding tags (`Signal`, `LegalPurpose`, `DataRequest`). Mutations automatically invalidate relevant tags, triggering refetches to keep the UI synchronized with the backend state. This eliminates manual cache management and ensures data consistency without additional state management code. The cache is held in Redux store and persists across component re-renders but resets on page refresh.

## Scalability Considerations
To scale this system for production use:

1. **Database**: Replace H2 with PostgreSQL or a distributed database (e.g., CockroachDB) for production persistence and high availability
2. **Pagination**: Add pagination and filtering to list endpoints to handle large datasets efficiently (currently loads all records)
3. **API Versioning**: Implement versioning strategy (e.g., `/api/v1/signals`) for backward compatibility during API evolution
4. **Authentication**: Add authentication/authorization using OAuth2/JWT for multi-tenant security and user-based access control
5. **Async Processing**: Introduce message queues (Kafka/RabbitMQ) for asynchronous data request processing and event-driven workflows
6. **Deployment**: Deploy backend as stateless containers (Docker/Kubernetes) behind a load balancer for horizontal scaling
7. **Search**: Add search indexing (Elasticsearch) for advanced signal discovery and full-text search capabilities
8. **Monitoring**: Implement observability with metrics (Prometheus), logging (ELK stack), and distributed tracing (Jaeger)
9. **Frontend Optimization**: Use code splitting, lazy loading, and CDN for static assets to reduce bundle size and improve performance
10. **Rate Limiting**: Add API rate limiting to prevent abuse and ensure fair resource allocation

## Technology Choices

### Backend
- **Java 21**: Latest LTS version with modern language features (Records, Pattern Matching)
- **Spring Boot 3.x**: Jakarta EE namespace for future compatibility
- **Liquibase**: Database version control and reproducible schema migrations
- **H2 PostgreSQL Mode**: Development simplicity while maintaining production SQL compatibility

### Frontend
- **Vite**: Fast development server and optimized production builds
- **TypeScript**: Type safety and better IDE support
- **RTK Query**: Eliminates boilerplate for data fetching, caching, and synchronization
- **Material UI**: Professional component library with accessibility built-in
- **Tailwind CSS**: Utility-first CSS for rapid UI development without conflicting with MUI
```
