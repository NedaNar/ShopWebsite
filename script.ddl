DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS rating;
DROP TABLE IF EXISTS [order];
DROP TABLE IF EXISTS [user];
DROP TABLE IF EXISTS item;

CREATE TABLE item
(
	[name] varchar (255),
	img varchar (255),
	price double precision,
	itemCount int,
	descr varchar (1000),
	category char (7),
	id int IDENTITY(1,1),
	CHECK(category in ('Sticker', 'Tshirt', 'Jumper', 'Print')),
	PRIMARY KEY(id)
);

CREATE TABLE [user]
(
	[name] varchar (255),
	email varchar (255),
	[password] varchar (255),
	[role] int,
	id int IDENTITY(1,1),
	PRIMARY KEY(id)
);

CREATE TABLE [order]
(
	total_price double precision,
	[address] varchar (255),
	phoneNumber varchar (255),
	orderDate varchar (255),
	[status] char (9),
	id int IDENTITY(1,1),
	fk_userid int NOT NULL,
	CHECK(status in ('Received', 'Preparing', 'Shipped', 'Completed')),
	PRIMARY KEY(id),
	FOREIGN KEY(fk_userid) REFERENCES [user] (id)
);

CREATE TABLE rating
(
	comment varchar (255),
	rating int,
	id int IDENTITY(1,1),
	fk_userid int NOT NULL,
	fk_itemid int NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(fk_userid) REFERENCES [user] (id),
	FOREIGN KEY(fk_itemid) REFERENCES item (id)
);

CREATE TABLE order_item
(
	quantity int,
	price double precision,
	id int IDENTITY(1,1),
	fk_orderid int NOT NULL,
	fk_itemid int NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(fk_orderid) REFERENCES [order] (id),
	FOREIGN KEY(fk_itemid) REFERENCES item (id)
);

INSERT INTO dbo.item ([name], img, price, itemCount, descr, category) VALUES
('Porto & Sicily Stickers', 'houses.png', 2.99, 21, 'Lorem Ipsum has been the industry''s standard dummy text...', 'Sticker'),
('"Perfect Enough" t-shirt', 'tshirt.png', 2.99, 21, 'Lorem Ipsum has been the industry''s standard dummy text...', 'Tshirt'),
('Fantasy Worlds Stickers', 'fantasy.png', 3.99, 21, 'Lorem Ipsum has been the industry''s standard dummy text...', 'Sticker'),
('Cute Bear Stickers', 'bears.png', 6.99, 21, 'Lorem Ipsum has been the industry''s standard dummy text...', 'Sticker'),
('Hogwarts Print', 'img1.png', 7.99, 21, 'Lorem Ipsum has been the industry''s standard dummy text...', 'Print'),
('Mushroom Girl Print', 'img2.png', 7.99, 21, 'Lorem Ipsum has been the industry''s standard dummy text...', 'Print'),
('Wolf Girl Print', 'img3.png', 7.99, 21, 'Lorem Ipsum has been the industry''s standard dummy text...', 'Print'),
('Taurus Print', 'img4.png', 7.99, 21, 'Lorem Ipsum has been the industry''s standard dummy text...', 'Print'),
('Flower Girl Print', 'img5.png', 7.99, 21, 'Lorem Ipsum has been the industry''s standard dummy text...', 'Print'),
('Underwater World Print', 'img6.png', 7.99, 21, 'Lorem Ipsum has been the industry''s standard dummy text...', 'Print');

INSERT INTO [user] ([name], email, [password], [role]) VALUES
('Alice Johnson', 'alice@example.com', 'password123', 1),
('Bob Smith', 'bob@example.com', 'password123', 0),
('Charlie Davis', 'charlie@example.com', 'password123', 0),
('Diana Garcia', 'diana@example.com', 'password123', 0),
('Ethan Brown', 'ethan@example.com', 'password123', 0);

INSERT INTO rating (comment, rating, fk_userid, fk_itemid) VALUES
('Loved these stickers, the quality is amazing!', 5, 1, 2),
('The design is cute but the size is smaller than expected.', 4, 2, 2),
('Great quality t-shirt, very comfortable.', 5, 3, 3),
('T-shirt is nice, but the color faded a bit after washing.', 3, 4, 3),
('Perfect for my scrapbook! Fantasy world vibes are incredible.', 5, 1, 4),
('Not what I expected, the stickers were slightly pixelated.', 2, 2, 4),
('Adorable bear stickers, my niece loved them.', 5, 3, 5),
('Super cute! Would buy again.', 4, 5, 5),
('The print quality is superb! Looks fantastic on my wall.', 5, 1, 6),
('Nice print, but the colors seem a bit dull in person.', 3, 4, 6),
('Love the artistic design of the Mushroom Girl Print!', 5, 2, 7),
('Print quality was good, but shipping took too long.', 4, 5, 7),
('The Wolf Girl print is stunning. Exactly what I was looking for!', 5, 1, 8),
('The print looks great but there was a small tear on the edge.', 3, 3, 8),
('This Taurus print is perfect for my zodiac collection!', 5, 4, 9),
('I was expecting brighter colors for this Taurus print.', 3, 5, 9),
('Flower Girl print has a dreamy vibe. Really nice!', 5, 1, 10),
('Good quality print but a bit pricey for the size.', 4, 2, 10),
('The Underwater World print is so calming and beautiful.', 5, 3, 11),
('Very vibrant colors, a bit smaller than expected but still love it.', 4, 4, 11);

INSERT INTO [order] (total_price, [address], phoneNumber, orderDate, [status], fk_userid) VALUES
(15.98, '123 Elm Street', '555-1234', '2024-10-01', 'Received', 1),
(7.99, '456 Oak Avenue', '555-5678', '2024-10-02', 'Preparing', 2),
(22.97, '789 Maple Drive', '555-9012', '2024-10-03', 'Shipped', 3),
(31.96, '321 Birch Lane', '555-3456', '2024-10-04', 'Completed', 4),
(15.98, '654 Pine Road', '555-7890', '2024-10-05', 'Completed', 5);

INSERT INTO order_item (quantity, price, fk_orderid, fk_itemid) VALUES
-- Order 1 (User 1)
(1, 7.99, 1, 6),  -- Hogwarts Print
(1, 7.99, 1, 7),  -- Mushroom Girl Print

-- Order 2 (User 2)
(1, 7.99, 2, 6),  -- Hogwarts Print

-- Order 3 (User 3)
(1, 7.99, 3, 7),  -- Mushroom Girl Print
(2, 7.99, 3, 8),  -- Taurus Print

-- Order 4 (User 4)
(1, 7.99, 4, 9),  -- Flower Girl Print
(3, 7.99, 4, 10), -- Underwater World Print

-- Order 5 (User 5)
(2, 7.99, 5, 5),  -- Cute Bear Stickers
(1, 7.99, 5, 6);  -- Hogwarts Print
