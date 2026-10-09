# System Architecture

## Overview

```
Customer Browser
      │
      ▼
React Frontend (Vite, port 5173)
      │  REST/JSON over HTTP
      ▼
Spring Boot API (port 8080)
      │
      ├── HotelController
      ├── BookingController
      └── PaymentController
            │
            ▼
      Service Layer
      (HotelService, BookingService, PaymentService)
            │
            ▼
      Repository Layer (Spring Data JPA)
            │
            ▼
      MySQL Database (port 3306)
```

## Layers

| Layer | Responsibility |
|-------|---------------|
| Controller | Receive HTTP requests, validate input, delegate to service |
| Service | Business logic, transactions, orchestration |
| Repository | Database queries via JPA/Hibernate |
| Entity | JPA-mapped database tables |
| DTO | Data transfer objects for API request/response |

## Booking Workflow

1. User searches hotels by city
2. Selects hotel → views available rooms for dates
3. Fills booking form → POST /api/bookings → status: PENDING
4. Mock payment page → POST /api/payments/mock
5. Payment SUCCESS → booking status: CONFIRMED
6. Payment FAILED → booking status: PAYMENT_FAILED
7. User can cancel CONFIRMED/PENDING bookings (before check-in)

## Availability Logic

Room availability is checked using a JPQL query that counts
overlapping CONFIRMED/PENDING bookings for the same room and date range.
A room is available if: `totalRooms > overlapping_bookings`

Overlap condition: `checkIn < requestedCheckOut AND checkOut > requestedCheckIn`

## Future Scalability (Optional Add-ons)

### Redis Caching
- Cache hotel search results (TTL: 5 min)
- Cache room availability (TTL: 30 sec)
- Add `spring-boot-starter-data-redis` + `@Cacheable`

### Message Broker (RabbitMQ / Kafka)
- Publish `BookingConfirmed` events
- Notification service consumes events → sends email/SMS
- Decouples payment from notification

### Load Balancing & Horizontal Scaling
- Deploy multiple Spring Boot instances behind Nginx or AWS ALB
- Use stateless JWT authentication (no server-side sessions)
- Shared MySQL (RDS) or read replicas for scale

### Notification Service
- Separate microservice subscribing to booking events
- Sends confirmation emails via AWS SES or SendGrid

### Authentication (Spring Security)
- Add `spring-boot-starter-security`
- JWT-based stateless auth
- Protect booking/payment endpoints
- The layered architecture already supports clean addition
