drop schema public cascade;
create schema public;
CREATE TABLE Product (
    product_id SERIAL NOT NULL UNIQUE,
    name varchar(50) NOT NULL,
    description varchar(500) NOT NULL,
    price DECIMAL(6, 2) NOT NULL,
    stock_level INT NOT NULL,
    image_url text NOT NULL,
    PRIMARY KEY (product_id)
);
CREATE TABLE "order" (
    order_id SERIAL NOT NULL UNIQUE,
    order_date TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'processing', 'fulfilled')),
    tracking_number INT NOT NULL UNIQUE,
    PRIMARY KEY (order_id)
);
CREATE TABLE "user" (
    user_id SERIAL NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    address VARCHAR(1000) NOT NULL,
    PRIMARY KEY (user_id)
);
CREATE TABLE Cart (
    cart_id SERIAL NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    PRIMARY KEY (cart_id)
);
CREATE TABLE Cart_Item (
    cart_item_id SERIAL NOT NULL,
    quantity INT NOT NULL,
    added_at TIMESTAMP NOT NULL,
    PRIMARY KEY (cart_item_id)
);
CREATE TABLE Checkout (
    checkout_id SERIAL NOT NULL,
    payment_method VARCHAR(100) NOT NULL,
    shipping_address VARCHAR(1000) NOT NULL,
    total_amount INT NOT NULL,
    PRIMARY KEY (checkout_id)
);
CREATE TABLE Checkout_Order (
    checkout_id INT NOT NULL REFERENCES checkout,
    order_id INT NOT NULL REFERENCES "order"
);
CREATE TABLE Checkout_Cart (
    checkout_id INT NOT NULL REFERENCES checkout,
    cart_id INT NOT NULL REFERENCES cart
);
CREATE TABLE User_Cart (
    user_id INT NOT NULL REFERENCES "user",
    cart_id INT NOT NULL REFERENCES cart
);
CREATE TABLE Cart_CartItem (
    cart_id INT NOT NULL REFERENCES cart,
    cart_item_id INT NOT NULL REFERENCES cart_item
);
CREATE TABLE Product_CartItem (
    product_id INT NOT NULL REFERENCES product,
    cart_item_id INT NOT NULL REFERENCES cart_item
);
\i product.sql
\i order.sql
\i user.sql
\i cart.sql
\i cart_item.sql
\i checkout.sql
\i checkout_cart.sql
\i cart_cart_item.sql
\i product_cart_item.sql
\i checkout_order.sql
\i user_cart.sql