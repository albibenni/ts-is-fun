import bodyParser from "body-parser";
import express from "express";
import getPort from "get-port";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod/v4";

export const app = express();
const port = await getPort({ port: 3000 });

app.use(bodyParser.json());

type User = {
  id: string;
  name: string;
  email: string;
};

const UserSchema = z.object({
  id: z.uuidv4({ message: "ID is required" }),
  name: z.string(),
  email: z.string(),
}) satisfies z.ZodType<User>;
const UserId = UserSchema.pick({ id: true });
const PartialUserSchema = UserSchema.partial().omit({ id: true });
const CreateUserSchema = UserSchema.omit({ id: true });

//type UpdateUser = z.infer<typeof UpdateUserSchema>;

const users: User[] = [];

// Create a new user
app.post("/users", (req, res): void => {
  const { name, email } = CreateUserSchema.parse(req.body);

  if (!name || !email) {
    res.status(400).json({ message: "Name and email are required" });
    return;
  }

  const id: string = uuidv4();
  const newUser: User = UserSchema.parse({ id, name, email });

  users.push(newUser);

  res.status(201).json(newUser);
});

// Read all users
app.get("/users", (req, res) => {
  const { name, email } = PartialUserSchema.parse(req.query);

  let filteredUsers = users;

  if (name) {
    filteredUsers = filteredUsers.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (email) {
    filteredUsers = filteredUsers.filter((user) =>
      user.email.toLowerCase().includes(email.toLowerCase()),
    );
  }

  res.json(filteredUsers);
});

// Read a single user by ID
app.get("/users/:id", (req, res): void => {
  const { id } = UserId.parse(req.params);

  const user = users.find((u) => u.id === id);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json(user);
});

// Update a user by ID
app.put("/users/:id", (req, res): void => {
  const { id } = req.params;

  const user = users.find((u) => u.id === id);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const { name, email } = PartialUserSchema.parse(req.body);

  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
});

// Delete a user by ID
app.delete("/users/:id", (req, res): void => {
  const { id } = UserId.parse(req.params);

  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  users.splice(index, 1);

  res.status(204).send();
});

const isMain = process.argv[1] === fileURLToPath(import.meta.url);

if (isMain) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
