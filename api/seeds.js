const path = require("path");
const { Seeder } = require("mongo-seeding");

const config = {
  database: {
    host: process.env.MY_HOST,
    name: process.env.MONGODB_DB_NAME,
  },
  dropDatabase: true,
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve("./api/db"), {
  extensions: ["json", "js"],
  transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
});

seeder
  .import(collections)
  .then(() => {
    console.log(collections);
    console.log(path.resolve("./api/db"));
    console.log("Success seeding");
  })
  .catch((err) => {
    console.log("Error seeding", err);
  });
