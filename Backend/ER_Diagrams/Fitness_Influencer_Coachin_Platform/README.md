# Schema For this ER diagram

### TABLE trainers{
-  id serial pk
-  is_available boolean [not null]
-  specialization string [not null]
-  experience string [not null]
-  personel_training boolean [not null]
-  name string
-  age int
-  city string
-  createdAt timestamp
-  updatedAt timestamp
### }
### TABLE clients{
-  id serial pk
-  trainer_assigned_id int [not null]
-  program_id int [not null]
-  training_type ENUM('personel','group') [no- t null]
-  name string
-  age int
-  city string
-  createdAt timestamp
-  updatedAt timestamp
-  is_old_client boolean
-  check_ins_id int [not null]
### }

### TABLE programs{
-  id serial pk
-  trainer_id int [not null]
-  client_id int [not null]
-  subscription_id int [not null]
-  duration date
-  starting_date date
-  ending_date date
### }

### TABLE sessions{
-  id serial pk
-  trainer_id int [not null]
-  client_id int [not null]
-  program_id int [not null]
-  duration string
-  createdAt timestamp
-  updatedAt timestamp
-  subscription_id text [not null]
-  status ENUM('missed','completed','pending','sheduled') [not null]
-  notes text
### }

### TABLE trainer_notes{
- id serial pk
- trainer_id int [not null]
- session_id int [not null]
- createdAt timestamp
- note text
### }

### TABLE subscription{
-  id serial pk
-  trainer_id int [not null]
- amount string [not null]
-  client_id string [not null]
### }

### Table check_ins {
-  id serial [pk]
-  client_id int  [not null]
-  period "7d" [not null]
-  current_weight decimal [not null] 
-  target_weight decimal [not null] 
-  created_at timestamp [not null]
-  updated_at timestamp [not null]
-  session_id int
### }

### TABLE payment_details{
-  id serial pk 
-  client_id int  [not null]
-  subscription_id int [not null]
-  createdAt timestamp
-  updatedAt timestamp
### }

### Ref: trainers.id < clients.trainer_assigned_id
### Ref: trainers.id < programs.trainer_id
### Ref: trainers.id < subscription.trainer_id
### Ref: trainers.id < sessions.trainer_id
### Ref: sessions.id < trainer_notes.session_id
### Ref: clients.id < sessions.client_id
### Ref: clients.id - programs.client_id
### Ref:sessions.id < check_ins.session_id
### Ref: check_ins.id < clients.check_ins_id
### Ref: subscription.id - payment_details.subscription_id
### 