const MongoDB = require("mongodb");
const { MongoClient, ObjectId } = MongoDB;

const MONGO_DB_URL =
  "mongodb+srv://daikiri:Dragonname8555@cluster0-mnn7x.gcp.mongodb.net/db-contacts?retryWrites=true&w=majority";
const DB_NAME = "db-contacts";

async function main() {
  const client = await MongoClient.connect(MONGO_DB_URL);
  const db = client.db(DB_NAME);

  const contacts = await db.createCollection("contacts");

  //   await contacts.insertOne({
  //     name: "hello",
  //     email: "test@test.net",
  //     phone: "233-23-23",
  //   });

  console.log(
    await contacts.findOne({ _id: new ObjectId("5eaec1290f6293239ccaefd4") })
  );
}

main();
