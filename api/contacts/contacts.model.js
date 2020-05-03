// const { MongoClient, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema, Types } = require("mongoose");
const { ObjectId } = Types;

// class ContactsModel {
//   constructor() {
//     this.contacts = null;
//   }

//   async findAllContacts() {
//     await this.getContactsCollection();

//     return this.contacts.find().toArray();
//   }

//   async findContactById(id) {
//     await this.getContactsCollection();
//     if (!ObjectId.isValid(id)) {
//       return null;
//     }

//     return this.contacts.findOne({ _id: new ObjectId(id) });
//   }

//   async createContact(contactParams) {
//     await this.getContactsCollection();

//     const insertResult = await this.contacts.insertOne(contactParams);
//     return this.contacts.findOne({
//       _id: new ObjectId(insertResult.insertedId),
//     });
//   }

//   async updateContactById(id, contactParams) {
//     await this.getContactsCollection();
//     if (!ObjectId.isValid(id)) {
//       return null;
//     }

//     return this.contacts.findOneAndUpdate(
//       { _id: new ObjectId(id) },
//       { $set: contactParams },
//       { new: true }
//     );
//   }

//   async deleteContactById(id) {
//     await this.getContactsCollection();
//     if (!ObjectId.isValid(id)) {
//       return null;
//     }

//     return this.contacts.deleteOne({ _id: new ObjectId(id) });
//   }

//   async getContactsCollection() {
//     if (this.contacts) {
//       return;
//     }

//     const client = await MongoClient.connect(process.env.MONGODB_DB_URL);
//     const db = client.db(process.env.MONGODB_DB_NAME);

//     this.contacts = await db.createCollection("contacts");
//   }
// }

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
});

contactSchema.statics.findAllContacts = findAllContacts;
contactSchema.statics.findContactById = findContactById;
contactSchema.statics.createContact = createContact;
contactSchema.statics.updateContactById = updateContactById;
contactSchema.statics.deleteContactById = deleteContactById;

async function findAllContacts() {
  return this.find();
}

async function findContactById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return this.findById(id);
}

async function createContact(contactParams) {
  return this.create(contactParams);
}

async function updateContactById(id, contactParams) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return this.findByIdAndUpdate(id, { $set: contactParams }, { new: true });
}

async function deleteContactById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return this.findByIdAndDelete(id);
}

module.exports = {
  ContactModel: mongoose.model("Contact", contactSchema),
};
