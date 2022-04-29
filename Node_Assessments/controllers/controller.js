const express = require('express');
const fs = require('fs'); 
const csv = require('csv-parser');
const bodyParser = require('body-parser');  
var csvWriter = require('csv-write-stream');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
var magResult = [];
var bookResult = [];
var authResult = [];
function sortByProperty(property){  
    try
    {
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
   
       return 0;  
    } 
    }
    catch(err)
    {
        console.error(err);
    }
 }
exports.home = (req, res) => 
{
    try
    {
        res.render('home');
    }
    catch(err)
    {
        console.error(err);
    }
}
exports.authors = (req, res) =>
{ 
    try
    {
    authResult = [];
    fs.createReadStream('authors.csv')
    .pipe(csv())
    .on('data', function (row) {
     authResult.push(row);
    })
    .on('end', function () {
      console.log(authResult);
      res.render('authors', {body: authResult}); 
      });
    }
    catch(err)
    {
        console.error(err);
    }
}
exports.books = (req, res) => 
{
    try
    {
    bookResult = [];
    fs.createReadStream('books.csv')
    .pipe(csv())
    .on('data', function (row) {
     bookResult.push(row);
    })
    .on('end', function () {
      bookResult.sort(sortByProperty("title"));
      console.log(bookResult);
      res.render('books', {body: bookResult});
        // TODO: SAVE users data to another file
      });
    }
    catch(err)
    {
        console.error(err);
    } 
}
exports.magazine = (req, res) => 
{ 
  try
  {
  magResult = [];
  fs.createReadStream('magazines.csv')
  .pipe(csv())
  .on('data', function (row) {
   magResult.push(row);
  })
  .on('end', function () {
    
    magResult.sort(sortByProperty("title"));
    console.log(magResult);    
    res.render('magazines', {body: magResult});
    });
   }
   catch(err)
   {
        console.error(err);
   }

}
exports.findBookMag = (req, res) => 
{
try 
{
var filter = req.body.data;
var searched_content = [];
var bookResult = [];
var magResult = []; 
fs.createReadStream('books.csv')
    .pipe(csv())
    .on('data', function (row) {
     bookResult.push(row);
    })
    .on('end', function () {
         searched_content = bookResult.filter(function(item) {
            return (item.isbn == filter || (item.authors).includes(filter));
          });     

          fs.createReadStream('magazines.csv')
          .pipe(csv())
          .on('data', function (row) {
           magResult.push(row);
          })
          .on('end', function () {
              var searched_content_mag = magResult.filter(function(item) {
                  return (item.isbn == filter || (item.authors).includes(filter));
                });     
              
              searched_content.sort(sortByProperty("title"));
              searched_content_mag.sort(sortByProperty("title"));
              console.log(searched_content);
              console.log(searched_content_mag);
              res.render('search', {book: searched_content, magazine: searched_content_mag, query: filter});

          });
       
    });
}
catch(err)
    {
        console.error(err);
    }
}

exports.bookDetails = (req, res) => 
{
    try{
    var book_title = req.body.title;
    var book_isbn = req.body.isbn;
    var book_author = req.body.author;
    var book_description = req.body.description;
    writer = csvWriter({sendHeaders: false});
    writer.pipe(fs.createWriteStream('books.csv', {flags: 'a'}));
    writer.write({
      header1: book_title,
      header2: book_isbn,
      header3: book_author,
      header4: book_description
    });
    writer.end(); 
    console.log(book_title);
    console.log(book_isbn);
    console.log(book_author);
    console.log(book_description);
    res.render('bookdetails', {body: [book_title, book_isbn, book_author, book_description]});
    }
    catch(err)
    {
        console.error(err);
    }
}

exports.addBook = (req, res) => {
    try 
    {
        res.render('addbook');
    }
    catch(err)
    {
        console.error(err);
    }
}


exports.magazineDetails = (req, res) => 
{
    try {
    var mag_title = req.body.title;
    var mag_isbn = req.body.isbn;
    var mag_author = req.body.author;
    writer = csvWriter({sendHeaders: false});
    writer.pipe(fs.createWriteStream('magazines.csv', {flags: 'a'}));
    var date = new Date();
    var day = date.getDate().toString();
    var month = date.getMonth().toString();
    var year = date.getFullYear().toString();
    var published = day+'.'+month+'.'+year
    writer.write({
      header1: mag_title,
      header2: mag_isbn,
      header3: mag_author,
      header4: published
    });
    writer.end(); 
    console.log(mag_title, mag_title, mag_author, published);
    res.render('magazinedetails', {body: [mag_title, mag_isbn, mag_author, published]});
    }
    catch(err)
    {
        console.error(err);
    }
}

exports.addMagazine = (req, res) => {
    try{
    res.render('addmagazine');
    }
    catch(err)
    {
        console.error(err);
    }
}