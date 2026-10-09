# Hotel Booking Platform

A full-stack hotel booking web application built with React + Vite (frontend) and Spring Boot + MySQL (backend).

---

## Project Structure

```
hotel-booking-platform/
├── backend/          # Spring Boot Maven project
├── frontend/         # React + Vite project
├── database/         # SQL schema and seed data
├── docs/             # Architecture documentation
└── README.md
```

---

## Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| Java JDK | 21+ | https://www.oracle.com/java/technologies/downloads/ |
| Maven | 3.9+ | https://maven.apache.org/download.cgi |
| Node.js | 18+ | https://nodejs.org/ |
| MySQL | 8.0+ | https://dev.mysql.com/downloads/ |

---

## 1. Database Setup

### Create the database and tables

```sql
-- Run in MySQL client or MySQL Workbench
source database/schema.sql
source database/seed.sql
```

Or using the MySQL CLI:

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

---

## 2. Backend Setup

### Configure environment variables (optional)

The backend reads credentials from environment variables with safe defaults:

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_URL` | `jdbc:mysql://localhost:3306/hotel_booking?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true` | JDBC URL |
| `DB_USERNAME` | `root` | MySQL username |
| `DB_PASSWORD` | *(empty)* | MySQL password |
| `CORS_ORIGINS` | `http://localhost:5173` | Allowed frontend origin |

Set them before starting (Windows):

```cmd
set DB_USERNAME=root
set DB_PASSWORD=yourpassword
```

### Build and run

```cmd
cd backend
mvn package -DskipTests
java -jar target/hotel-booking-1.0.0.jar
```

Or run tests first:

```cmd
mvn test
mvn spring-boot:run
```

Backend starts at: **http://localhost:8080**

Swagger UI: **http://localhost:8080/swagger-ui.html**

---

## 3. Frontend Setup

```cmd
cd frontend
npm install
npm run dev
```

Frontend starts at: **http://localhost:5173**

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hotels?location=Chennai` | Search hotels by city |
| GET | `/api/hotels/{id}` | Get hotel details |
| GET | `/api/hotels/{id}/rooms?checkIn=2026-11-01&checkOut=2026-11-03` | Get available rooms |
| POST | `/api/bookings` | Create a booking |
| GET | `/api/bookings/{id}` | Get booking by ID |
| GET | `/api/users/{userId}/bookings` | Get user's bookings |
| DELETE | `/api/bookings/{id}` | Cancel a booking |
| POST | `/api/payments/mock` | Process mock payment |

### Sample: Create Booking

```json
POST /api/bookings
{
  "userId": 1,
  "roomId": 2,
  "checkIn": "2026-11-01",
  "checkOut": "2026-11-03",
  "guestName": "Alice Johnson",
  "guestEmail": "alice@example.com",
  "guestPhone": "9876543210",
  "numGuests": 2,
  "idempotencyKey": "unique-key-001"
}
```

### Sample: Mock Payment

```json
POST /api/payments/mock
{
  "bookingId": 1,
  "mockCardLast4": "1234"
}
```

> **Tip:** Card last 4 digits starting with `0` (e.g. `0123`) simulate a **failed** payment.

---

## Running Tests

```cmd
cd backend
mvn test
```

Tests cover:
- Booking creation (success, room unavailable, past dates, invalid dates)
- Booking cancellation (success, already cancelled, past check-in)
- Idempotency (duplicate request returns same booking)
- Payment success and failure
- Payment on non-PENDING booking

---

## Complete Booking Workflow

1. Open **http://localhost:5173**
2. Search for hotels by city (e.g. "Chennai") with dates
3. Click a hotel → View details
4. Click "Check Available Rooms"
5. Click "Book Now" on a room
6. Fill in guest details → "Proceed to Payment"
7. Enter any 4 digits (avoid starting with 0 for success)
8. View confirmation page
9. Go to "My Bookings" to see all bookings and cancel if needed

---

## Known Limitations

- Authentication is not implemented. A hardcoded `userId=1` (Alice) is used as the demo user.
- No real payment gateway — mock only.
- No email notifications.
- Images are loaded from Unsplash CDN (requires internet).
- Spring Security can be added cleanly due to the layered architecture.
