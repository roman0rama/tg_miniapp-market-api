create table person (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    passwordHash VARCHAR(255),
    fullName VARCHAR(255)
);

create table cards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    fullDescription VARCHAR(255),
    categoryId INT,
    image VARCHAR(255),
    full_images VARCHAR(255),
    price DECIMAL,
    markup DECIMAL,
    FOREIGN KEY (categoryId) REFERENCES categories (id)
);

create table reviews (
    id SERIAL PRIMARY KEY,
    personId INT,
    cardId INT,
    publishedAt DATE DEFAULT CURRENT_DATE,
    cost DECIMAL,
    FOREIGN KEY (personId) REFERENCES person (id)
);

create table categories (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255),
    title VARCHAR(255)
)

ALTER TABLE reviews
    ADD CONSTRAINT fk_card
    FOREIGN KEY (cardId)
    REFERENCES cards (id),
ADD CONSTRAINT fk_user
    FOREIGN KEY (personId)
    REFERENCES person (id);