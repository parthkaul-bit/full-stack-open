const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const url = `mongodb+srv://parthkaul:${password}@cluster0.bltlz.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

console.log("connecting to", url);

mongoose
  .connect(url)

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

if (!number && !name) {
  Person.find({}).then((persons) => {
    console.log("PhoneBook: ");
    console.log(
      persons.map((person) => {
        return `${person.name}  ${person.number}`;
      })
    );
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name,
    number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

module.exports = Person;
