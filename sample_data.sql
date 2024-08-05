-- Populate Products Table
INSERT INTO products (name, description, price, stock)
VALUES 
('Product 1', 'Description 1', 100, 50),
('Product 2', 'Description 2', 150, 40),
('Product 3', 'Description 3', 200, 30),
('Product 4', 'Description 4', 250, 20),
('Product 5', 'Description 5', 300, 10);

-- Populate Customers Table
INSERT INTO customers (name, email, address)
VALUES 
('Customer 1', 'customer1@example.com', 'Address 1'),
('Customer 2', 'customer2@example.com', 'Address 2'),
('Customer 3', 'customer3@example.com', 'Address 3'),
('Customer 4', 'customer4@example.com', 'Address 4'),
('Customer 5', 'customer5@example.com', 'Address 5');

-- Populate Orders Table
INSERT INTO orders (customer_id, product_id, quantity, total_amount, order_date)
VALUES 
(1, 1, 2, 200, '2023-07-01'),
(2, 2, 1, 150, '2023-07-02'),
(3, 3, 3, 600, '2023-07-03'),
(4, 4, 1, 250, '2023-07-04'),
(5, 5, 5, 1500, '2023-07-05');
