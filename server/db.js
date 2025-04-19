const pg = require("pg");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_store"
);

async function createTables() {
  const SQL = `
    DROP TABLE IF EXISTS favorites;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );

    CREATE TABLE favorites(
      id UUID PRIMARY KEY,
      product_id UUID REFERENCES products(id) NOT NULL,
      user_id UUID REFERENCES users(id) NOT NULL,
      CONSTRAINT unique_user_product UNIQUE (user_id, product_id)
    );
  `;

  await client.query(SQL);
}

async function createProduct(name) {
  const { rows } = await client.query(
    `INSERT INTO products(id, name)
    VALUES ($1, $2)
    RETURNING *`,
    [uuid.v4(), name]
  );
  return rows[0];
}

async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows } = await client.query(
    `INSERT INTO users(id, username, password)
    VALUES ($1, $2, $3)
    RETURNING id, username`,
    [uuid.v4(), username, hashedPassword]
  );
  return rows[0];
}

async function fetchUsers() {
  const { rows } = await client.query(`SELECT id, username FROM users`);
  return rows;
}

async function fetchProducts() {
  const { rows } = await client.query(`SELECT id, name FROM products`);
  return rows;
}

async function createFavorite(user_id, product_id) {
  const { rows } = await client.query(
    `INSERT INTO favorites(id, user_id, product_id)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [uuid.v4(), user_id, product_id]
  );
  return rows[0];
}

async function fetchFavorites(user_id) {
  const { rows } = await client.query(
    `SELECT * from favorites WHERE user_id = $1;`,
    [user_id]
  );
  return rows;
}

async function destroyFavorite(id, user_id) {
  await client.query(
    `DELETE FROM favorites
    WHERE id=$1 AND user_id=$2`,
    [id, user_id]
  );
}

module.exports = {
  client,
  createTables,
  createProduct,
  createUser,
  fetchUsers,
  fetchProducts,
  createFavorite,
  fetchFavorites,
  destroyFavorite,
};
