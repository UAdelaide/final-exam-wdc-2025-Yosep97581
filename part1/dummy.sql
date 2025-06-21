INSERT INTO Users (user_id, username, email, password_hash, role) VALUES
(10, 'owner1', 'o1@example.com', 'pass1', 'owner'),
(11, 'owner2', 'o2@example.com', 'pass2', 'owner');

INSERT INTO Dogs (dog_id, owner_id, name, size) VALUES
(100, 10, 'Buddy', 'small'),
(101, 11, 'Daisy', 'large');

INSERT INTO WalkRequests (request_id, dog_id, requested_time, duration_minutes, location, status) VALUES
(200, 100, '2025-06-22 09:00:00', 30, 'City Park', 'open'),
(201, 101, '2025-06-23 15:00:00', 45, 'Riverside Trail', 'open');

INSERT INTO Users (user_id, username, email, password_hash, role) VALUES
(12, 'walker1', 'w1@example.com', 'pass3', 'walker'),
(13, 'walker2', 'w2@example.com', 'pass4', 'walker');

INSERT INTO WalkRequests (request_id, dog_id, requested_time, duration_minutes, location, status, walker_id) VALUES
(202, 100, '2025-06-20 11:00:00', 40, 'Dog Hill', 'completed', 12),
(203, 101, '2025-06-21 10:00:00', 25, 'Sunset Loop', 'completed', 12);

INSERT INTO WalkRatings (rating_id, walker_id, rating) VALUES
(1, 12, 4),
(2, 12, 5);
