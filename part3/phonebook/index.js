const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).send("Not Found");
  }
});

app.get("/info", (request, response) => {
  let people = persons.length;
  const time = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  response.send(`
      <p>Phonebook has info for ${people} people</p>
      <p>${time.toLocaleString("en-GB")} ${timeZone}</p>
    `);
});

app.post("/api/persons/", (request, response) => {
  const person = {
    name: request.body.name,
    number: request.body.number,
    id: Math.floor(Math.random() * 10000).toString(),
  };

  persons = persons.concat(person);
  response.json(persons);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});