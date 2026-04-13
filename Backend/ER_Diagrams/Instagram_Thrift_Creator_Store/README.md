# Schema For this ER diagram

### TABLE customers{
 - id serial pk
 - order_id int
 - name varchar(50)
 - state varchar(50)
 - city varchar(50)
 - phone varchar(10)
### }


### TABLE orders{
 - id serial pk
 - item_id int
 - shipping_id int
 - payment_id int
 - ordered_by int
### }

### TABLE shipping{
 - id serial pk
 - order_id int
 - shipping_time date
 - address text
### }
### TABLE payment{
-  id serial pk
- order_id int
- amount string
- status ENUM('pending','success','rejected')
- payment_date date
### }

### TABLE order_items{
 - id serial pk
 - order_id int
 - product_id int
 - quantity string
 - price decimal
### }

### TABLE products{
 - id serial pk
 - threft_item_id int
 - crafted_item_id int
 - net_quantity string
### }
### TABLE threft_items{
 - id serial pk
 - product_id int
 - colour varchar(50)
 - brand varchar(50)
 - size string [null]
### }
### TABLE hand_crafted_items{
 - id serial pk
 - product_id int
 -  colour varchar(50)
 - brand varchar(50)
 - size string [null]
### }

### Ref: order_items.product_id < products.id
### Ref: orders.id < order_items.order_id
### Ref: shipping.order_id< orders.id
### Ref: payment.order_id - orders.id
### Ref: customers.id < orders.ordered_by
### Ref: products.id < threft_items.product_id
### Ref: products.id < hand_crafted_items.product_id
