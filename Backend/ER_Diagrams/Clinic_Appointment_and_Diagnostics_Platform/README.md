# Schema For this ER diagram

### TABLE doctors{
 - id serial pk
 - patient_id int
 - exp_in_years string [not null]
 - age int
 - name string
 - city string
 - qualifications string  [not null]
 - is_available boolean  [not null]
 - hospital_name string [not null]
### }
### TABLE patients{
 - id serial pk
 - doctor_id int
 - medical_issue string [not null]
 - age int [not null]
 - temperature string [not null]
 - blood_presssure string [not null]
 - allergies string [null]
 - is_critical boolean [not null]

### }
### TABLE appointments{
 - id serial pk
 - patient_id int 
 - doctor_id int
 - createdAt timestamp
 - updatedAt timestamp
 - hospital_name string [not null]
### }
### TABLE consultations{
 - id serial pk
 - patient_id int 
 - doctor_id int
 - payment_id int
- note string
 - prescribed_medicos string
 - tests string
### }
### TABLE diagnostic{
 - id serial pk
 - patient_id int 
 - payment_id int
 - report_id int
### }
### TABLE tests{
 - id serial pk
 - name string
 - amount string
 - patient_id int 
 - payment_id int
 - report_id int
 - consultation_id int
 - medical_issue string
### }
### TABLE reports{
 - id serial pk
 - patient_id int 
 - payment_id int
### }
### TABLE payments{
 - id serial pk
  - patient_id int [not null]
  - status ENUM('pending','completed','rejected')
  - medium ENUM('cash','online')
  - online_medium ENUM('UPI','credit_card','debit_card')

### }

### Ref: patients.id < doctors.patient_id
### Ref: patients.id - payments.patient_id
### Ref: patients.id < reports.patient_id
### Ref: patients.id < tests.patient_id
### Ref: patients.id < diagnostic.patient_id
### Ref: patients.id < consultations.patient_id
### Ref: patients.id < appointments.patient_id
### Ref: doctors.id < patients.doctor_id
### Ref: doctors.id < appointments.doctor_id
### Ref: doctors.id < consultations.doctor_id
### Ref: payments.id < consultations.payment_id
### Ref: payments.id < diagnostic.payment_id
### Ref: payments.id < reports.payment_id
### Ref: payments.id < tests.payment_id
### Ref: reports.id < tests.report_id
### Ref: reports.id < diagnostic.report_id
### Ref: consultations.id < tests.consultation_id

