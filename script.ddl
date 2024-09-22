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
	credit_card_number varchar (255),
	order_date varchar (255),
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
