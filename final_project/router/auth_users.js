const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  // Check if username exists, is a string, and has content after trimming
  return username && typeof username === 'string' && username.trim().length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
  // Check if both username and password are provided and find matching user
  if (!username || !password) {
    return false;
  }
  return users.some(user => user.username === username && user.password === password);
}

// Register a new user
regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  
  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }
  
  // Check if username is valid
  if (!isValid(username)) {
    return res.status(400).json({message: "Invalid username"});
  }
  
  // Check if user already exists
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(409).json({message: "Username already exists"});
  }
  
  // Register the new user
  users.push({ username, password });
  return res.status(201).json({message: "User registered successfully"});
});

//only registered users can login
regd_users.post("/login", (req,res) => {
  const { username, password } = req.body;
  
  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }
  
  // Validate user credentials
  if (authenticatedUser(username, password)) {
    // Generate JWT token
    let accessToken = jwt.sign(
      { username: username },
      'access',
      { expiresIn: '1h' }
    );
    
    // Store access token and username in session
    req.session.authorization = {
      accessToken,
      username
    };
    
    return res.status(200).json({
      message: "User successfully logged in",
      token: accessToken
    });
  } else {
    return res.status(401).json({message: "Invalid username or password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization?.username;
  
  // Check if user is authenticated
  if (!username) {
    return res.status(401).json({message: "User not authenticated"});
  }
  
  // Check if review is provided
  if (!review) {
    return res.status(400).json({message: "Review is required"});
  }
  
  // Check if book exists
  if (!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }
  
  // Initialize reviews object if it doesn't exist
  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }
  
  // Add or modify the review for this user
  books[isbn].reviews[username] = review;
  
  return res.status(200).json({
    message: "Review added/modified successfully",
    review: review
  });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization?.username;
  
  // Check if user is authenticated
  if (!username) {
    return res.status(401).json({message: "User not authenticated"});
  }
  
  // Check if book exists
  if (!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }
  
  // Check if reviews exist for this book
  if (!books[isbn].reviews || !books[isbn].reviews[username]) {
    return res.status(404).json({message: "Review not found for this user"});
  }
  
  // Delete the user's review
  delete books[isbn].reviews[username];
  
  return res.status(200).json({
    message: "Review deleted successfully"
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
