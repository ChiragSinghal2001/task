const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Chirag@2001",
  database: "signup"
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get('/', function(req, res){
  res.send("Hello World");
});

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO UserData (name, email, password) VALUES (?, ?, ?)";
  const values = [name, email, password];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error while inserting data:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    console.log("User signed up successfully.");
    return res.status(200).json({ success: true, data: data });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM UserData WHERE email = ? AND password = ?";
  const values = [email, password];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error while fetching user:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    if (data.length === 0) {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }
    console.log("User logged in successfully.");
    return res.status(200).json({ success: true, data: data });
  });
});

// API endpoint to insert pricing details
app.post('/pricing', async (req, res) => {
    try {
        const { id,name, price, saving, description } = req.body;

        // Check if required fields are present
        if (!name || !price || !saving || !description || !id) {
            return res.status(400).json({ error: 'id,Name, price, saving, and description are required.' });
        }

        // Insert data into the database
        db.query('INSERT INTO Pricingdetails (id, name, price, saving, description) VALUES (?, ?, ?, ?, ?)', [id, name, price, saving, description], (err, result) => {
            if (err) {
                console.error('Error:', err);
                return res.status(500).json({ error: 'Internal server error.' });
            }
            res.status(201).json({ message: 'Pricing details added successfully.' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// API endpoint to update pricing details
app.put('/pricing', async (req, res) => {
    try {
        const { id,name, price, saving, description } = req.body;

        // Check if required fields are present
        if (!name || !price || !saving || !description) {
            return res.status(400).json({ error: 'Name, price, saving, and description are required.' });
        }

        // Update data in the database
        db.query('UPDATE Pricingdetails SET name = ?, price = ?, saving = ?, description = ? WHERE id = ?', [name, price, saving, description, id], (err, result) => {
            if (err) {
                console.error('Error:', err);
                return res.status(500).json({ error: 'Internal server error.' });
            }
            res.status(200).json({ message: 'Pricing details updated successfully.' });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// API endpoint to fetch pricing details
app.get('/pricing', async (req, res) => {
    try {
        // Fetch all data from the database
        db.query('SELECT * FROM Pricingdetails', (err, data) => {
            if (err) {
                console.error('Error:', err);
                return res.status(500).json({ error: 'Internal server error.' });
            }
            if (data.length === 0) {
                return res.status(404).json({ error: 'No pricing details found.' });
            }
            res.status(200).json({ success: true, data: data });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


  
  // API endpoint to delete pricing details
  app.delete('/pricing', async (req, res) => {
    try {
      const {id} = req.body;
  
      // Delete data from the database
      db.query('DELETE FROM Pricingdetails WHERE id = ?', [id], (err, result) => {
        if (err) {
          console.error('Error:', err);
          return res.status(500).json({ error: 'Internal server error.' });
        }
        res.status(200).json({ message: 'Pricing details deleted successfully.' });
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
