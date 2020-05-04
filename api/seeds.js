const path = require("path");
const { Seeder } = require("mongo-seeding");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const config = {
  database: {
    host: process.env.MY_HOST,
    name: process.env.MONGODB_DB_URL,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
  },
  dropDatabase: true,
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve("./api/db"), {
  extensions: ["json", "js"],
  transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
});

console.log("config", config);
console.log("seeder", seeder);
console.log("collections", collections);

seeder
  .import(collections)
  .then(() => {
    console.log("Success seeding");
  })
  .catch((err) => {
    console.log("Error seeding", err);
  });
