const express = require("express");
const morgan = require("morgan");
const {
  client,
  fetchUsers,
  fetchProducts,
  fetchFavorites,
  createFavorite,
  destroyFavorite,
} = require("./db");

const server = express();
client.connect();

server.use(express.json());
server.use(morgan("dev"));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server listening on port ${port}`));

// routes
server.get("/api/users", async (req, res, next) => {
  try {
    const users = await fetchUsers();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

server.get("/api/products", async (req, res, next) => {
  try {
    const products = await fetchProducts();
    res.json(products);
  } catch (e) {
    next(e);
  }
});

server.get("/api/users/:id/favorites", async (req, res, next) => {
  try {
    const favorites = await fetchFavorites(req.params.id);
    res.json(favorites);
  } catch (e) {
    next(e);
  }
});

server.post("/api/users/:id/favorites", async (req, res, next) => {
  try {
    const favorite = await createFavorite(req.params.id, req.body.product_id);
    res.status(201).json(favorite);
  } catch (e) {
    next(e);
  }
});

server.delete("/api/users/:userId/favorites/:id", async (req, res, next) => {
  try {
    await destroyFavorite(req.params.id, req.params.userId);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});
