
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "firstName" VARCHAR (255) NOT NULL,
    "lastName" VARCHAR (255) NOT NULL,
    "email" VARCHAR (255),
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
	
CREATE TABLE "photos" (
	"id" SERIAL PRIMARY KEY,
	"imageURL" VARCHAR(1024) NOT NULL,
	"description" VARCHAR(5000),
	"userID" INTEGER,
	"photoDate" DATE NOT NULL,
	"uploadDate" DATE,
	CONSTRAINT "fk_photo_user_id"
		FOREIGN KEY ("userID")
		REFERENCES "user" ("id")
		ON DELETE CASCADE
);

CREATE TABLE "tags" (
	"id" SERIAL PRIMARY KEY,
	"tagName" VARCHAR (255) UNIQUE
);
	
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

CREATE TABLE "photoTagJoiner" (
	"id" SERIAL PRIMARY KEY,
	"photoID" INT,
	"tagID" INT
);