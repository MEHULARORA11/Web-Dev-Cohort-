# Schema For this ER diagram

### TABLE visitor{
-   id serial pk
-   name string
 -  entry_time timestamp
-   age string
-   is_special string [not null]
 -  city string
### }

### TABLE payments{
 -  id serial pk
-   status ENUM('pending','success','failure')
-  mode ENUM('cash','online') [not null]
 -  online_mode ENUM('UPI','credit_card','debit_card')
 -  amount string [not null]
 -  ticket_id int
 -  visitor_id int
### }
### TABLE sessions{
-   id serial pk
-   entry_time string [not null]
-   exit_time string [not null]
-   ticket_id int
### }
### TABLE tickets{
-   id serial pk
-   visitor_name string
-   session_id int
-   payment_id int
-   parking_type_id int
-   vehicle_type_id int
-   visitor_id int

### }

### TABLE vehicles{
 -  id serial pk
-   type ENUM( 'bikes','cars','SUVs','cabs','EV') [not null]
-   visitor_id int
-   ticket_id int

### }
### TABLE parking_type{
 -  id serial pk
 -  type ENUM('normal','reserved') [not null]
-  is_available boolean [not null]
 -  ticket_id int
 -  visitor_id int
### }

### Ref: visitor.id < vehicles.visitor_id
### Ref: tickets.id < vehicles.ticket_id
### Ref: tickets.id  -  payments.ticket_id
### Ref: tickets.id  <  parking_type.ticket_id
### Ref: tickets.id < sessions.ticket_id
### Ref: visitor.id  -  payments.visitor_id
### Ref: visitor.id < parking_type.visitor_id
### Ref: visitor.id - tickets.visitor_id
