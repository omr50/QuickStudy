insert into todo(id, description, done, target_date, username)
values (10001, 'Learn Spring Boot', false, CURRENT_DATE(), 'john');


insert into todo(id, description, done, target_date, username, reminder, reminder_email)
values (10002, 'Learn Python', false, CURRENT_DATE(), 'john', 'weekly', 'omrab209@gmail.com');


insert into todo(id, description, done, target_date, username, reminder, reminder_email)
values (10003, 'Read Chapter 2 of System Design Book', false, CURRENT_DATE(), 'john', 'daily', 'omrman4@gmail.com');

insert into todo(id, description, done, target_date, username, reminder, reminder_email)
values (10004, 'Learn MultiThreading', false, CURRENT_DATE(), 'john', 'daily', 'omrman4@gmail.com');

insert into todo(id, description, done, target_date, username, reminder, reminder_email)
values (10005, 'Learn SQL', false, CURRENT_DATE(), 'john', 'daily', 'omrman4@gmail.com');

INSERT INTO users (id, username, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES (10001, 'john', '$2a$10$Ig8.5mw0GciRW6OaNVEZ3.KYRV7y82sAgwPAy96jU9d0uEeblZz6W', true, true, true, true);
INSERT INTO users (id, username, password, enabled, account_non_expired, account_non_locked, credentials_non_expired) VALUES (10002, 'jane', '$2a$10$Ig8.5mw0GciRW6OaNVEZ3.KYRV7y82sAgwPAy96jU9d0uEeblZz6W', true, true, true, true);


insert into cardset (id, set_name, set_description, username)
values (10001, 'Biology', 'Chapter 1 Bio Cards', 'john');

insert into cardset (id, set_name, set_description, username)
values (10002, 'Chemistry', 'Chapter 1 Chem Cards', 'john');


insert into cards (id, word, definition, cardset_id)
values (10001, 'Biosphere', 'All of the environments on Earth that support life.', 100001);

insert into cards (id, word, definition, cardset_id)
values (10002, 'Ecosystem', 'An environment consisting of organisms living and the physcial components that they interact with.', 10001);

insert into cards (id, word, definition, cardset_id)
values (10003, 'Organ System', 'Consists of several organs that cooperate in a specific function.', 10001);

insert into cards (id, word, definition, cardset_id)
values (10004, 'Eukaryotic cells', 'cell with membrane-enclosed nucleus, membrane-enclosed organelles. Organisms except bacteria and archaea have eukaryotic cells.', 10001);

insert into cards (id, word, definition, cardset_id)
values (10005, 'Chemistry', 'the study of composition, structure, and properties of matter', 10002);

insert into cards (id, word, definition, cardset_id)
values (10006, 'Metalloid', 'have some characteristics of both non-metals and metals', 10002);

insert into cards (id, word, definition, cardset_id)
values (10007, 'Reactant', 'substances that react in the reaction', 10002);