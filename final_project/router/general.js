const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
 });

// Task 11: Get book details based on ISBN using async-await
public_users.get('/isbn/:isbn/async', async function (req, res) {
  const isbn = req.params.isbn;
  
  try {
    const getBookByISBNAsync = async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (books[isbn]) {
            resolve(books[isbn]);
          } else {
            reject(new Error("Book not found"));
          }
        }, 100);
      });
    };

    const bookData = await getBookByISBNAsync();
    res.status(200).json(bookData);
  } catch (error) {
    res.status(404).json({message: "Book not found", error: error.message});
  }
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Task 12: Get book details based on Author using async-await
public_users.get('/author/:author/async', async function (req, res) {
  const author = req.params.author;
  
  try {
    const getBooksByAuthorAsync = async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const booksByAuthor = [];
          for (let isbn in books) {
            if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
              booksByAuthor.push({isbn: isbn, ...books[isbn]});
            }
          }
          
          if (booksByAuthor.length > 0) {
            resolve(booksByAuthor);
          } else {
            reject(new Error("No books found by this author"));
          }
        }, 100);
      });
    };

    const booksData = await getBooksByAuthorAsync();
    res.status(200).json(booksData);
  } catch (error) {
    res.status(404).json({message: "No books found by this author", error: error.message});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Task 13: Get book details based on Title using async-await
public_users.get('/title/:title/async', async function (req, res) {
  const title = req.params.title;
  
  try {
    const getBooksByTitleAsync = async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const booksByTitle = [];
          for (let isbn in books) {
            if (books[isbn].title.toLowerCase().includes(title.toLowerCase())) {
              booksByTitle.push({isbn: isbn, ...books[isbn]});
            }
          }
          
          if (booksByTitle.length > 0) {
            resolve(booksByTitle);
          } else {
            reject(new Error("No books found with this title"));
          }
        }, 100);
      });
    };

    const booksData = await getBooksByTitleAsync();
    res.status(200).json(booksData);
  } catch (error) {
    res.status(404).json({message: "No books found with this title", error: error.message});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Task 10: Get all books using async-await
public_users.get('/books/async', async function (req, res) {
  try {
    // Using async-await
    const getBooksAsync = async () => {
      return new Promise((resolve) => {
        // Simulate async operation
        setTimeout(() => {
          resolve(books);
        }, 100);
      });
    };

    const booksData = await getBooksAsync();
    res.status(200).json(booksData);
  } catch (error) {
    res.status(500).json({message: "Error fetching books", error: error.message});
  }
});


module.exports.general = public_users;
