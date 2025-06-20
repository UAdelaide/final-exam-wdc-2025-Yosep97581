INSERT INTO Users (username, email, password_hash, role) VALUES
('alice123', 'alice@example.com', 'hashed123', 'owner'),
('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
('carol123', 'carol@example.com', 'hashed789', 'owner'),
('davewalk', 'dave@example.com', 'hashed000', 'walker'),
('emilyowner', 'emily@example.com', 'hashed321', 'owner');

-- Insert 5 dogs using subquery to get owner_id
INSERT INTO Dogs (owner_id, name, size) VALUES
((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
((SELECT user_id FROM Users WHERE username = 'alice123'), 'Luna', 'large'),
((SELECT user_id FROM Users WHERE username = 'carol123'), 'Rocky', 'medium'),
((SELECT user_id FROM Users WHERE username = 'emilyowner'), 'Milo', 'small');

-- Insert 5 walk requests using subquery to get dog_id
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
((SELECT dog_id FROM Dogs WHERE name = 'Max'), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Bella'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),
((SELECT dog_id FROM Dogs WHERE name = 'Luna'), '2025-06-11 10:00:00', 60, 'Riverside Park', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Rocky'), '2025-06-12 11:00:00', 25, 'Hilltop Trail', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Milo'), '2025-06-13 12:30:00', 40, 'Botanic Gardens', 'open');
