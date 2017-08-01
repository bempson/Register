
CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(255),
    role VARCHAR(20),
    created DATETIME DEFAULT NULL,
    modified DATETIME DEFAULT NULL
);

ALTER TABLE `crafts`.`users` 
CHANGE COLUMN `username` `user_name` VARCHAR(50) NULL DEFAULT NULL ,
ADD COLUMN `first_name` VARCHAR(50) NULL AFTER `id`,
ADD COLUMN `last_name` VARCHAR(50) NULL AFTER `first_name`,
ADD COLUMN `email` VARCHAR(50) NULL AFTER `user_name`;

CREATE TABLE `crafts`.`employees` (
  `id` INT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `title` VARCHAR(45) NULL,
  `birth_date` DATE NULL,
  `hire_date` DATE NULL,
  `address` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `postal_code` VARCHAR(45) NULL,
  `home_phone` VARCHAR(45) NULL,
  `cell_phone` VARCHAR(45) NULL,
  `photo` LONGBLOB NULL,
  `notes` MEDIUMTEXT NULL,
  `modified` DATETIME NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `crafts`.`users` 
DROP COLUMN `last_name`,
DROP COLUMN `first_name`,
ADD COLUMN `employee_id` INT NOT NULL AFTER `password`;

CREATE TABLE `crafts`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `catagory_id` INT NULL,
  `supplier_id` INT NULL,
  `quanity_Per_unit` VARCHAR(45) NULL,
  `unit_price` VARCHAR(45) NULL,
  `units_in_stock` VARCHAR(45) NULL,
  `units_on_order` VARCHAR(45) NULL,
  `reorder_level` VARCHAR(45) NULL,
  `discontinued` SMALLINT(1) NULL,
  `barcode` VARCHAR(45) NULL,
  `modified` DATETIME NULL,
  `created` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `crafts`.`categories` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `picture` LONGBLOB NULL,
  `modified` DATETIME NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `crafts`.`discounts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `product_id` INT NULL,
  `product_all` TINYINT NULL,
  `discount` VARCHAR(45) NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `modified` DATETIME NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `crafts`.`customers` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `company` VARCHAR(45) NULL,
  `title` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `postal_code` VARCHAR(45) NULL,
  `tax_number` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `modified` DATETIME NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `crafts`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `customer_id` INT NULL,
  `employee_id` INT NULL,
  `order_date` DATETIME NULL,
  `ship_date` DATETIME NULL,
  `carrier` VARCHAR(45) NULL,
  `freight` DECIMAL(10,4) NULL,
  `ship_name` VARCHAR(45) NULL,
  `ship_address` VARCHAR(45) NULL,
  `ship_city` VARCHAR(45) NULL,
  `ship_state` VARCHAR(45) NULL,
  `ship_zip` VARCHAR(45) NULL,
  `modified` DATETIME NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `crafts`.`carriers` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `modified` DATETIME NULL,
  `created` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `crafts`.`orders` 
CHANGE COLUMN `carrier` `carrier_id` INT NULL DEFAULT NULL ;

CREATE TABLE `crafts`.`sales` (
  `id` INT NOT NULL,
  `employee_id` INT NULL,
  `customer_id` VARCHAR(45) NULL,
  `modified` DATETIME NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `crafts`.`sales` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `crafts`.`carriers` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `created` `created` DATETIME NULL DEFAULT NULL ;

ALTER TABLE `crafts`.`customers` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT ;

ALTER TABLE `crafts`.`categories` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT ;

ALTER TABLE `crafts`.`products` 
CHANGE COLUMN `created` `created` DATETIME NULL DEFAULT NULL;

CREATE TABLE `crafts`.`transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sale_id` INT NULL,
  `order_id` INT NULL,
  `product_id` INT NULL,
  `count` INT NULL,
  `price` DECIMAL(10,2) NULL,
  `modified` DATETIME NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `crafts`.`employees` 
ADD COLUMN `email` VARCHAR(45) NULL AFTER `last_name`;

ALTER TABLE `crafts`.`users` 
DROP COLUMN `email`;

ALTER TABLE `crafts`.`employees` 
ADD COLUMN `name` VARCHAR(50) NULL AFTER `id`;

CREATE TABLE `crafts`.`suppliers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `url` VARCHAR(255) NULL,
  `modified` DATETIME NULL,
  `created` DATETIME NULL,
  PRIMARY KEY (`id`));
  
