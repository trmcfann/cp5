-- CSE 154
-- Name: Thomas McFann
-- Date: Nov 29, 2018
-- Section: CSE 154 AK
-- This is the setup.sql file for my sports page. It creates a database for the player stats.

DROP DATABASE IF EXISTS sports;
CREATE DATABASE sports;
USE sports;

DROP TABLE IF EXISTS Players;
CREATE TABLE Players (
   id INT NOT NULL,
   name VARCHAR(50),
   games_played INT,
   career_year INT,
   PRIMARY KEY(id)
);

INSERT INTO Players (id, name, games_played, career_year)
VALUES
  (1, "Buster Posey", 1144, 10),
  (2, "Tom Brady", 264, 18),
  (3, "Andy Murray", 842, 12),
  (4, "Stephen Curry", 637,10);
