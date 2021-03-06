//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  var Users = [{
      username : "admin",
      password : "admin"
  }]

  var books = [
    {"BookID" : "1", "Title" : "Book 1", "Author" : "Author 1"},
    {"BookID" : "2", "Title" : "Book 2", "Author" : "Author 2"},
    {"BookID" : "3", "Title" : "Book 3", "Author" : "Author 3"}
]

var loginSucess = false; 
//Route to handle Post Request Call
app.post('/login',function(req,res){
    
    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);
    Users.filter(function(user){
        if(user.username === req.body.username && user.password === req.body.password){
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = user;
            loginSucess = true;
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Login");
        }
    })
    if(!loginSucess) {
        res.status(400).json({error: 'Invalid Username or password'})
    }
});

//Route to get All Books when user visits the Home Page
app.get('/home', function(req,res){
    console.log("Inside Home Login");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Books : ",JSON.stringify(books));
    res.end(JSON.stringify(books));
});

app.post('/delete',function(req,res){
    console.log("Delete Request");
    console.log("Req Body : ",req.body);
    var deleteFailVar = 1
    for (var i=0; i<books.length; i++) {
        if (books[i]["BookID"] == req.body.BookID) {
            books.splice(i, 1);
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Deletion");
            deleteFailVar = 0
            break;
        }
    }
    if(deleteFailVar){
        res.status(400).json({error: 'BookID does not exist'})
        res.end("Not Successful Deletion");
    }
});

app.post('/create',function(req,res){
    
    console.log("Create Request");
    console.log("Req Body : ",req.body);
    var foundVar = 0
    for (var i=0; i<books.length; i++) {
        if (books[i]["BookID"] == req.body.BookID) {
            res.status(400).json({error: 'BookID already exists'})
            res.end("Unsuccessful addition");
            foundVar = 1
            break;
        }
    }
    if(!foundVar){
        var new_book = { "BookID": req.body.BookID , "Title": req.body.Title, "Author": req.body.Author}
        books.push(new_book);
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end("Successful addition");
    }
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");