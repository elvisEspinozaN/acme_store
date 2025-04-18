const { client } = require("./db");

async function seed() {
  await client.connect();
}
