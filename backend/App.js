// Bryce Jensenius
// brycejen@iastate.edu
// 11/15/24

var express = require("express");
var cors = require("cors");
var fs = require("fs");
var multer = require("multer");
var bodyParser = require("body-parser");
var app = express();
const path = require('path');

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

// Mongo DB Setup
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "319finalproject";
const client = new MongoClient(url);

// MySql
const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "brycejen2",
    password: "293dj94jva90ejfJ9jf",
    database: dbName,
});

// Set up multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save images in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Create "uploads" folder if it doesn't exist
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// Server
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads")); // Serve images statically

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

// app.post("/contact", upload.single("image"), (req, res) => {
//     const { contact_name, phone_number, message } = req.body;
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

//     const query = "INSERT INTO contact (contact_name, phone_number, message, image_url) VALUES (?, ?, ?, ?)";
//     const checkQuery = "SELECT * FROM contact WHERE contact_name = ?";
//     try {
//         db.query(checkQuery, [contact_name], (checkErr, checkResult) => {
//             if (checkErr) {
//                 console.error("Database error during validation:", checkErr);
//                 return res.status(500).send({ error: "Error checking contact name: " + checkErr.message });
//             }
//             if (checkResult.length > 0) {
//                 // If contact_name exists, send a conflict response
//                 return res.status(409).send({ error: "Contact name already exists." });
//             }
//         });

//         db.query(query, [contact_name, phone_number, message, imageUrl], (err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send({error:"Error adding contact"+err});
//             } else {
//                 res.status(201).send("Contact added successfully");
//             }
//         });

//     } catch (err) {
//         // Handle synchronous errors
//         console.error("Error in POST /contact:", err);
//         res.status(500).send({ error: "An unexpected error occurred: " + err.message });
//     }
// });


// app.get("/contact/name", (req, res) => {
//     const { contact_name } = req.query;
  
//     if (!contact_name) {
//       return res.status(400).send({ error: "contact_name is required" });
//     }
  
//     try {
//       const query = "SELECT * FROM contact WHERE LOWER(contact_name) LIKE LOWER(?)";
//       const searchValue = `%${contact_name}%`; // Add wildcards for partial match
//       db.query(query, [searchValue], (err, result) => {
//         if (err) {
//           console.error("Error fetching contacts:", err);
//           return res.status(500).send({ error: "Error fetching contacts" });
//         }
//         res.status(200).send(result);
//       });
//     } catch (err) {
//       console.error({ error: "An unexpected error occurred in GET by name"+err });
//       res.status(500).send({ error: "An unexpected error occurred in GET by name"+err });
//     }
//   });

  
// app.delete("/contact/:id", (req, res) => {
//     const id = req.params.id;

//     try {
//         const query = "DELETE FROM contact WHERE id = ?";
//         db.query(query, [id], (err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send({err:"Error deleting contact"});
//             } else if (result.affectedRows === 0) {
//                 res.status(404).send({err:"Contact not found"});
//             } else {
//                 res.status(200).send("Contact deleted successfully");
//             }
//         });
//     } catch (err){
//         // Handle synchronous errors
//         console.error("Error in DELETE /contact:", err);
//         res.status(500).send({ error: "An unexpected error occurred in DELETE: " + err.message });
//     }
// });

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
  