import express from "express";
const app = express();
import pool from "./db.js";
import bodyParser from "body-parser";
import cors from "cors";

// For Cross-origin resource sharing
app.use(cors());

// Server port
const port = 5003;

// For parsing request body
var jsonParser = bodyParser.json();

app.post("/login", jsonParser, async (req, res) => {
  const {} = req.body;

  try {
    await pool.query("SELECT", []);

    res.status(200).json("Logged in successfully");
  } catch (error) {
    console.log(
      `Username or password is incorrect ${error.message} ${req.body}`
    );
    res.status(400).json({ error: `Username or password is incorrect ` });
  }
});

app.post("/add-project", jsonParser, async (req, res) => {
  const { project_id, user_id, name, description, category_id } = req.body;

  try {
    await pool.query(
      "INSERT INTO projects(project_id, user_id, name, description, category_id) VALUES (?,?,?,?,?)",
      [project_id, user_id, name, description, category_id]
    );

    res.status(200).json("Project has been added");
  } catch (error) {
    console.log(`Failed to add project ${error.message} ${req.body}`);
    res.status(400).json({ error: `Failed to add project ${error}` });
  }
});

app.post("/update-project", jsonParser, async (req, res) => {
  const { project_id, user_id, name, description, category_id } = req.body;

  try {
    await pool.query(
      "UPDATE projects(project_id, user_id, name, description, category_id) VALUES (?,?,?,?,?)",
      [project_id, user_id, name, description, category_id]
    );

    res.status(200).json("Project has been added");
  } catch (error) {
    console.log(`Failed to add project ${error.message} ${req.body}`);
    res.status(400).json({ error: `Failed to add project ${error}` });
  }
});

app.get("/projects", async (req, res) => {
  try {
    const [projects] = await pool.query("SELECT * from projects");

    res.status(200).json(projects);
  } catch (error) {
    console.log(`Failed to get projects ${error.message}`);
    res.status(400).json(error.message);
  }
});

app.get("/categories", async (req, res) => {
  try {
    const [projects] = await pool.query("SELECT * from categories");

    res.status(200).json(projects);
  } catch (error) {
    console.log(`Failed to get categories ${error.message}`);
    res.status(400).json(error.message);
  }
});

app.post("/add-category", jsonParser, async (req, res) => {
  const { name } = req.body;

  try {
    await pool.query("INSERT INTO categories (name) VALUES (?)", [name]);

    res.status(200).json("Category has been added");
  } catch (error) {
    console.log(`Failed to add Category ${error.message}`);
    res.status(400).json(error.message);
  }
});

app.post("/update-category", jsonParser, async (req, res) => {
  const { name, category_id } = req.body;

  try {
    await pool.query("UPDATE categories SET name = ? WHERE category_id = ?", [
      name,
      category_id,
    ]);

    res.status(200).json("Project has been updated");
  } catch (error) {
    console.log(`Failed to add project ${error.message} ${req.body}`);
    res.status(400).json({ error: `Failed to add project ${error}` });
  }
});

app.post("/delete-category", jsonParser, async (req, res) => {
  const { categoryId } = req.body;

  try {
    await pool.query("DELETE from categories where category_id = ?", [
      categoryId,
    ]);

    res.status(200).json(`Category with id ${categoryId} has been deleted`);
  } catch (error) {
    console.log(`Failed to delete Category ${error.message}`);
    res.status(400).json(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
