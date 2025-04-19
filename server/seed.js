const {
  client,
  createTables,
  createProduct,
  createUser,
  createFavorite,
  fetchFavorites,
  destroyFavorite,
  fetchUsers,
  fetchProducts,
} = require("./db");

async function seed() {
  console.log("- Seeeding database");
  await client.connect();

  await createTables();
  console.log("- Tables created");

  // test data
  const [elvis, sophia, mac, hp] = await Promise.all([
    createUser("elvis", "elvis123"),
    createUser("sophia", "password123"),
    createProduct("mac"),
    createProduct("hp"),
  ]);
  console.log("- Created user/product");

  // Test fetch methods
  console.log("- All users:", await fetchUsers());
  console.log("- All products:", await fetchProducts());

  // creating favorites
  const favorites = await Promise.all([
    createFavorite(elvis.id, mac.id),
    createFavorite(sophia.id, hp.id),
  ]);
  console.log("- Favorites", favorites);

  // testing delete
  const beforeDelete = await fetchFavorites(elvis.id);
  console.log(`- Elvis' favorites before delete: ${beforeDelete.length}`);

  const deletingFavorite = favorites[0];
  console.log(`- Deleting favorite ID: ${deletingFavorite.id}`);
  await destroyFavorite(deletingFavorite.id, deletingFavorite.user_id);

  const afterDelete = await fetchFavorites(elvis.id);
  console.log(`- Elvis' favorites after delete: ${afterDelete.length}`);

  // Get all remaining favorites
  const allFavorites = await Promise.all([
    fetchFavorites(elvis.id),
    fetchFavorites(sophia.id),
  ]);
  const totalRemainingFavorites = allFavorites.flat().length;
  console.log(
    `- Total favorites remaining in system: ${totalRemainingFavorites}`
  );

  await client.end();
}

seed();
