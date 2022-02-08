
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "firstName" VARCHAR (255) NOT NULL,
    "lastName" VARCHAR (255) NOT NULL,
    "email" VARCHAR (255),
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

INSERT INTO "user"
	("firstName", "lastName", "email", "username", "password")
VALUES
	('John', 'Smith', 'johnsmith@test.com', 'jsmith123', 'temporary'),
	('Sally', 'Mae', 'sallymae@test.com', 'smae123', 'temporary'),
	('Luke', 'Skywalker', 'lskywalker@test.com', 'lskywalker', 'temporary');
	
CREATE TABLE "photos" (
	"id" SERIAL PRIMARY KEY,
	"imageURL" VARCHAR(1024) NOT NULL,
	"userID" INTEGER,
	"photoDate" DATE NOT NULL,
	"uploadDate" DATE,
	CONSTRAINT "fk_photo_user_id"
		FOREIGN KEY ("userID")
		REFERENCES "user" ("id")
		ON DELETE CASCADE
);

INSERT INTO "photos"
	("imageURL", "userID", "photoDate", "uploadDate")
VALUES
	('www.google.com', 10, '2022-02-07', '2022-02-07'),
	('www.yahoo.com', 10, '2022-02-03', '2022-02-07'),
	('www.facebook.com', 10, '2022-02-04', '2022-02-04'),
	('www.blah.com', 10, '2022-02-04', '2022-02-04'),
	('www.bleh.com', 10, '2022-02-04', '2022-02-04'),
	('www.blehk.com', 10, '2022-02-04', '2022-02-04'),
	('www.blehk.com', 10, '2022-02-04', '2022-02-04');
	
CREATE TABLE "tags" (
	"id" SERIAL PRIMARY KEY,
	"tagName" VARCHAR (255),
	"photoID" INT,
	"userID" INT,
	CONSTRAINT "fk_tag_user_id"
		FOREIGN KEY ("userID")
		REFERENCES "user" ("id")
		ON DELETE CASCADE
);

INSERT INTO "tags"
	("tagName", "photoID", "userID")
VALUES
	('Puppy', 8, 10),
	('Puppy', 9, 10),
	('Creature', 9, 10),
	('Blah', 10, 10),
	('Test', 11, 10);
	
CREATE TABLE "photoTagJoiner" (
	"id" SERIAL PRIMARY KEY,
	"photoID" INT,
	"tagID" INT,
	CONSTRAINT "fk_tag_photo_id"
		FOREIGN KEY ("photoID")
		REFERENCES "photos" ("id")
		ON DELETE CASCADE,
	CONSTRAINT "fk_photo_user_id"
		FOREIGN KEY ("tagID")
		REFERENCES "tags" ("id")
		ON DELETE CASCADE
);


SELECT  
	"user"."id",
	"user"."username",
	"photos"."imageURL",
	"photos"."id",
	ARRAY_AGG("tags"."tagName")
FROM "user"
LEFT JOIN "photos"
	ON "user"."id" = "photos"."userID"
LEFT JOIN "tags"
	ON "tags"."userID" = "user"."id"
LEFT JOIN "photoTagJoiner"
	ON "tags"."id" = "photoTagJoiner"."tagID"
GROUP BY "user"."id", "photos"."id";

DELETE FROM "user"
WHERE "id" = 6;

SELECT
	"photos"."id" AS "photoID",
	"photos"."imageURL",
	"user"."id" AS "userID",
	"photos"."photoDate",
	ARRAY_AGG("tags"."tagName")
FROM "photos"
JOIN "user"
	ON "user"."id" = "photos"."userID"
JOIN "tags"
	ON "tags"."photoID" = "photos"."id"
WHERE "user"."id" = 10
GROUP BY "photos"."id", "user"."id";

SELECT 
	"tags"."tagName"
FROM "tags"
JOIN "photoTagJoiner"
	ON "photoTagJoiner"."tagID" = "tags"."id"
WHERE "tags"."userID" = 10
GROUP BY "tagName";