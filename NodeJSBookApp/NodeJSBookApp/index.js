//import express module 
var express = require('express');
//create an express app
var app = express();
//require express middleware body-parser
var bodyParser = require('body-parser');
var alert = require('alert');
// var popup = require('popups');
//require express session
var session = require('express-session');
var cookieParser = require('cookie-parser');
// const popupS = require('popups');
let error_message = '';
//set the view engine to ejs
app.set('view engine', 'ejs');
//set the directory of views
app.set('views', './views');
//specify the path of static directory
app.use(express.static(__dirname + '/public'));

//use body parser to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//use cookie parser to parse request headers
app.use(cookieParser());
//use session to store user data between HTTP requests
app.use(session({
    secret: 'cmpe_273_secure_string',
    resave: false,
    saveUninitialized: true
}));

//Only user allowed is admin
var Users = [{
    "username": "admin",
    "password": "admin"
}];
//By Default we have 3 books
var books = [
    { "BookID": "1", "Title": "Book 1", "Author": "Author 1" },
    { "BookID": "2", "Title": "Book 2", "Author": "Author 2" },
    { "BookID": "3", "Title": "Book 3", "Author": "Author 3" }
]
//route to root
app.get('/', function (req, res) {
    //check if user session exits
        if (req.session.user) {
        res.render('/home');
    } else
        res.render('login');
});

app.post('/login', function (req, res) {
    if (req.session.user) {
        res.render('/home');
    } else {
        console.log("Req Body : ", req.body);
        Users.filter(user => {
            if (user.username === req.body.username && user.password === req.body.password) {
                req.session.user = user;
                console.log("registered user");
                res.redirect('/home');
            } 
            else {
            error_message = "Incorrect Username or Password";
            return res.render('login', { error_message: error_message } );
        }
        });
    }

});

app.get('/home', function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        console.log("Session data : ", req.session);
        res.render('home', {
            books: books
        });
    }
});

app.get('/create', function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        error_message = "";
        res.render('create', { error_message: error_message} );
    }
});

app.post('/create', function (req, res) {
    if (req.session.user) {
        console.log("User Registed, need to extract info");
        var new_book = { "BookID": req.body.book_id, "Title": req.body.title, "Author": req.body.author }
        var isDuplicate = false;
        for (var i=0; i<books.length; i++) {
            if (books[i]["BookID"] == new_book["BookID"]) {
                isDuplicate = true;
                break;
            }
        }

        if (!isDuplicate) {
            books.push(new_book)
            res.render('home', {books: books
            });
        }

        else {
            error_message = "BookId is already present,Please entera Unique Id";
            res.render('create', { error_message: error_message} );
        }
    // }
    } else {
        res.render('login');
    }
});

app.get('/delete', function (req, res) {
    console.log("Session Data : ", req.session.user);
    if (!req.session.user) {
        res.redirect('/');
    } else {
        error_message = "";
        res.render( './delete', {error_message: error_message} );
    }
});

app.get('/logout', function (req, res) {
    console.log ("logged out");
    req.session.user = false;
    res.redirect('/');
});

app.post('/delete', function (req, res) {
    if (req.session.user) {
        var book_id = req.body.book_id;
        // verify if the book exists
        var deleted = false;
        for (var i=0; i<books.length; i++) {
            if (books[i]["BookID"] == book_id) {
                books.splice(i, 1);
                deleted = true;
                break;
            }
        }

        if (deleted) {
            res.render('home', {
                books: books
            });
        }

        else {
            // alert("Book id is not present");
            error_message = "Book Id is not present";
            res.render( 'delete', {error_message: error_message} );
            //res.render('home', {books: books} );
            //res.render('home',{books: books})
        }
    } 
})

var server = app.listen(3000, function () {
    console.log("Server listening on port 3000");
});