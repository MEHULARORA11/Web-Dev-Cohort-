# Schema For this ER diagram

### TABLE building{
 -  id serial pk
 -  name string
 -  floors_count int
 -  elevators_count int
 -  is_maintananced boolean [not null]
### }
### TABLE floors{
 -  id serial pk
 -  building_id int
 -  elevator_id int
 -  foor_number string
### }
### TABLE elevators{
 -  id serial pk
 -  building_id int
 -  is_multi_server boolean [not null]
 -  status ENUM('idle','moving','maintenance') [not null]
 -  ride_count int
### }
### TABLE requests{
 -  id serial pk
 -  floors_id int
 -  building_id int
 -  elevator_id int
 -   user_id int
### }
### TABLE ride{
 -  id serail pk
-   elevator_id int
 -  request_id int
### }

### TABLE users{
- id serial pk
### }
### Ref: users.id - requests.user_id
### Ref: requests.id - ride.request_id
### Ref: requests.elevator_id > elevators.id
### Ref: building.id < elevators.building_id
### Ref: elevators.id < floors.elevator_id
