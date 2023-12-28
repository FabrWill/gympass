CREATE TABLE `partner` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `google_place_id` VARCHAR(255) NOT NULL,
  `latitude` DECIMAL(10, 8) NOT NULL,
  `longitude` DECIMAL(11, 8) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `type` ENUM('PLACE', 'SERVICE') NOT NULL,
  `rating` DECIMAL(3, 2) NOT NULL
);

CREATE TABLE `user` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL
);

INSERT INTO `user` (`email`, `name`, `password`) 
VALUES ('customer@test.com', 'Customer Test', 'password');

CREATE TABLE `product` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `price` DECIMAL(10, 2) NOT NULL,
  `promotional_price` DECIMAL(10, 2) NOT NULL
);

CREATE TABLE `partner_product` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `partner_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  FOREIGN KEY (`partner_id`) REFERENCES `partner`(`id`),
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`)
);

CREATE TABLE `users_assigned_products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `expiration_date` DATE NOT NULL,
  `contracted_price` DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`)
);
