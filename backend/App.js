// Bryce Jensenius
// Maggie Sullivan
// brycejen@iastate.edu
// 12/11/24

var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";
const dbName = "319finalproject";
// MySql
const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "brycejen2",
    password: "293dj94jva90ejfJ9jf",
    database: dbName,
});

// Server
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

app.post("/user/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ error: "Username and password are required." });
    }

    const query = "SELECT role FROM user WHERE name = ? AND password = ?";

    try{
        db.query(query, [username, password], (err, results) => {
            if (err) {
                console.error("Database error during login:", err);
                return res.status(500).send({ error: "An error occurred in Query. Please try again." });
            }
            if (results.length === 0) {
                return res.status(401).send({ error: "Invalid username or password." });
            }
            // If there is not any error, respond with code and role
            const { role } = results[0];
            res.status(200).send({ role });
        });
    }catch(err){
        // Handle synchronous errors
        console.error("Error in GET /contact/login", err);
        res.status(500).send({ error: "An unexpected error occurred in Login: " + err.message });
    }
});

// Get all the Tree Cards for Fun Page
app.get("/treeCards", (req, res) => {
    try {
        db.query("SELECT * FROM trees", (err, result) => {
            if (err) {
                console.error({error:"Error reading all tree cards:"+err});
                return res.status(500).send({ error: "Error reading all tree cards"+err});
            }
            res.status(200).send(result);
        });
    } catch (err) {
        console.error({ error: "An unexpected error occurred"+err });
        res.status(500).send({ error: "An unexpected error occurred"+err });
    }
});

// Get all reviews for a specific tree_id
app.get("/reviews/:tree_id", (req, res) => {
    const { tree_id } = req.params; // Extract the 'tree_id' parameter from the URL

    try {
        // Query the reviews table where tree_id matches
        db.query("SELECT * FROM reviews WHERE tree_id = ?", [tree_id], (err, result) => {
            if (err) {
                console.error({ error: "Error fetching reviews for tree_id: " + tree_id, details: err });
                return res.status(500).send({ error: "Error fetching reviews for tree_id: " + tree_id });
            }
            if (result.length === 0) {
                return res.status(404).send({ message: "No reviews found for tree_id: " + tree_id });
            }
            res.status(200).send(result);
        });
    } catch (err) {
        console.error({ error: "An unexpected error occurred", details: err });
        res.status(500).send({ error: "An unexpected error occurred" });
    }
});

// Endpoint to submit a new review
app.post("/reviews", (req, res) => {
    const { tree_id, description, rating } = req.body;

    // Validate input
    if (!tree_id || !description || !rating) {
        return res.status(400).send({ error: "Missing required fields: tree_id, description, or rating." });
    }

    // Insert the new review into the database
    const query = "INSERT INTO reviews (tree_id, description, rating) VALUES (?, ?, ?)";
    db.query(query, [tree_id, description, rating], (err, result) => {
        if (err) {
            console.error("Error inserting review:", err);
            return res.status(500).send({ error: "Failed to submit review." });
        }
        // Return success response
        res.status(201).send({ message: "Review submitted successfully.", reviewId: result.insertId });
    });
});

app.post("/user/register", (req, res) => {
    // Destructure the name, password, and role from the request body
    const { name, password, role } = req.body;
  
    // Validate input
    if (!name || !password || !role) {
      return res.status(400).send({ error: "All fields are required." });
    }
  
    // SQL query to insert new user into the database
    const query = "INSERT INTO user (name, password, role) VALUES (?, ?, ?)";
  
    try {
      db.query(query, [name, password, role], (err, results) => {
        if (err) {
          console.error("Database error during registration:", err);
          return res.status(500).send({ error: "An error occurred. Please try again." });
        }
  
        // Successfully inserted user
        res.status(201).send({ message: "User registered successfully." });
      });
    } catch (err) {
      console.error("Error in POST /user/register:", err);
      res.status(500).send({ error: "Unexpected error occurred. Please try again." });
    }
  });
  

  /* Messages Endpoints */
  app.post('/api/messages', (req, res) => {
    const { email, name, message } = req.body;
  
    if (!email || !name || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    const query = `INSERT INTO messages (email, name, message) VALUES (?, ?, ?)`;
    db.query(query, [email, name, message], (err, result) => {
      if (err) {
        console.error('Error inserting message:', err);
        return res.status(500).json({ error: 'Failed to save message.' });
      }
      res.status(200).json({ message: 'Message submitted successfully.' });
    });
  });

  // Get all messages
app.get('/api/messages', (req, res) => {
    const query = `SELECT * FROM messages`;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching messages:', err);
        return res.status(500).json({ error: 'Failed to fetch messages.' });
      }
      res.status(200).json(results);
    });
  });
  
  // Delete a specific message by ID
  app.delete('/api/messages/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM messages WHERE id = ?`;
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error deleting message:', err);
        return res.status(500).json({ error: 'Failed to delete message.' });
      }
      res.status(200).json({ message: 'Message deleted successfully.' });
    });
  });


  /* Join Requests */
  app.post("/api/joinRequests", async (req, res) => {
    const { email, name, classification } = req.body;
    const query = "INSERT INTO joinrequests (email, name, classification) VALUES (?, ?, ?)";
    try {
      await db.execute(query, [email, name, classification]);
      res.status(200).send("Join request submitted successfully.");
    } catch (error) {
      res.status(500).send("Error submitting join request.");
    }
  });
  
  app.get('/api/joinRequests', (req, res) => {
    const query = `SELECT * FROM joinrequests`;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching join requests:', err);
        return res.status(500).json({ error: 'Failed to fetch requests.' });
      }
      res.status(200).json(results);
    });
  });
  
  app.delete("/api/joinRequests/:id", async (req, res) => {
    const query = "DELETE FROM joinrequests WHERE id = ?";
    try {
      await db.execute(query, [req.params.id]);
      res.status(200).send("Join request deleted.");
    } catch (error) {
      res.status(500).send("Error deleting join request.");
    }
  });
  

  /* Member requests */
  app.post("/api/members", async (req, res) => {
    const { email, name, classification } = req.body;
    const joinDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    const query = "INSERT INTO members (email, name, classification, join_date) VALUES (?, ?, ?, ?)";
    try {
      await db.execute(query, [email, name, classification, joinDate]);
      res.status(200).send("Member added successfully.");
    } catch (error) {
      res.status(500).send("Error adding member.");
    }
  });
  
  app.get('/api/members', async (req, res) => {
    const query = "SELECT * FROM members";
    try {
      // Execute the query to fetch all members
      const [rows] = await db.promise().execute(query);
  
      // Respond with the members data
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching members:", error);
      res.status(500).send("Error fetching members.");
    }
  });

  /* Slide Cards */

  // Endpoint to fetch all slidecards data
app.get('/api/slidecards', async (req, res) => {
    const query = "SELECT * FROM slidecards"; // Assuming 'slidecards' is the table name
    try {
      const [rows] = await db.promise().execute(query);
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching slidecards:", error);
      res.status(500).send("Error fetching slidecards.");
    }
  });

app.put("/treeCards/:id", (req, res) => {
  const { id } = req.params;
  const { heading, description, alt } = req.body;

  if (!id || !heading || !description || !alt) {
      return res.status(400).send({ error: "Missing required fields: id, heading, description, or alt." });
  }

  try {
      const query = "UPDATE trees SET heading = ?, description = ?, alt = ? WHERE id = ?";
      const values = [heading, description, alt, id];

      db.query(query, values, (err, result) => {
          if (err) {
              console.error("Error updating tree card:", err);
              return res.status(500).send({ error: "Error updating tree card: " + err });
          }

          if (result.affectedRows === 0) {
              return res.status(404).send({ error: "Tree card not found." });
          }

          res.status(200).send({ id, heading, description, alt });
      });
  } catch (err) {
      console.error("Unexpected error occurred:", err);
      res.status(500).send({ error: "Unexpected error occurred: " + err });
  }
});
