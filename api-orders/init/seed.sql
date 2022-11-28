CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    customerId INT NOT NULL,
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO orders (customerId, description) VALUES (111, 'lorem ipsum dolor sit amet');
INSERT INTO orders (customerId, description) VALUES (222, 'some high quality painting brush');
INSERT INTO orders (customerId, description) VALUES (333, 'lorem ipsum dolor sit amet erat, sed diam nonum nonummy ut labore et dolore magna aliquet'); 
INSERT INTO orders (customerId, description) VALUES (444, 'a popular notebook among art students');