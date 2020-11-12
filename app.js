require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const mongoose = require('mongoose');
const Users = require("./models/Users");
const Comments = require("./models/Comments");
const bcrypt = require("bcrypt");

const app = express();

app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css/images'));
app.use(express.static(__dirname + '/legend'));
app.use(express.static(__dirname + '/webfonts'));
app.use(express.static(__dirname + '/data'));
app.use(express.static(__dirname + '/css'));



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

//  ------------------------------- definition of database ------------------------------- //

// const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@cluster1.ym9hd.mongodb.net/UsersDB?retryWrites=true&w=majority";
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => {
//         console.log("MongoDB Connected…")
//     })
//     .catch(err => console.log(err));


const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@cluster0.hllzc.mongodb.net/UsersDB?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("MongoDB Connected…")
    })
    .catch(err => console.log(err));
const salt = 10;



// ------------------------------- home page --> login page ------------------------------- //
app.get("/", function (req, res) {
    res.redirect("/login");
    // res.redirect("/map");



});



// ------------------------------- login page ------------------------------- //
app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/html/login.html");
    // res.redirect("/map");
});


app.post("/login", function (req, res) {

    Users.findOne({ email: req.body.email }, function (err, user) {
        if (!user) {
            res.redirect("/loginFailure");
        } else if (user) {

            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result === true) {
                    res.redirect("/map");
                }
                else {
                    res.redirect("/loginFailure");
                }
            });
        }
        else {
            res.redirect("/loginFailure");
        }
    });

});


// ------------------------------- login Failure page ------------------------------- //
app.get("/loginFailure", function (req, res) {
    res.sendFile(__dirname + "/html/loginFailure.html");
});




// ------------------------------- Register page ------------------------------- //
app.get("/register", function (req, res) {
    res.sendFile(__dirname + "/html/register.html");
});


app.post("/register", function (req, res) {

    bcrypt.hash(req.body.password, salt, function (err, hash) {
        // Store hash in your password DB.

        const user1 = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });

        Users.findOne({ email: req.body.email }, function (err, result) {
            if (!result) {
                user1.save();
                res.redirect("/map");
            } else {
                res.redirect("/registerFailure");
            }
        });
    });

});

// ------------------------------- Register Failure page ------------------------------- //
app.get("/registerFailure", function (req, res) {
    res.sendFile(__dirname + "/html/registerFailure.html");
});



// ------------------------------- map page ------------------------------- //
app.get("/map", function (req, res) {


    Comments.find({}, function (err, result) {
        res.render("index", { CommentsList: result });
    });

});


app.post("/map", function (req, res) {

    var d = new Date();

    var datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " +
        d.getHours() + ":" + d.getMinutes();

    const comnt1 = new Comments({
        username: req.body.fullName,
        email: req.body.email,
        date: datestring,
        text: req.body.text
    })

    comnt1.save();

    res.redirect("/map");
});
///////////////////////////////////////////////////////////////////////////////


// ------------------------------- MORE COMMENTS LIST PAGE ------------------------------- //
app.get("/commentsList", function (req, res) {

    Comments.find({}, function (err, result) {
        res.render("comments", { CommentsList: result });
    });

});


app.post("/commentsList", function (req, res) {

    var d = new Date();

    var datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " +
        d.getHours() + ":" + d.getMinutes();

    const comnt1 = new Comments({
        username: req.body.fullName,
        email: req.body.email,
        date: datestring,
        text: req.body.text
    })

    comnt1.save();

    res.redirect("/commentsList");
});
///////////////////////////////////////////////////////////////////////////////


// // listen port 3000 //
// app.listen(3000, function () {
//     console.log("connect to listen 3000");
// });

// listen port 3000 //
app.listen(process.env.PORT || 3000, function () {
    console.log("connect to listen 3000");
});



// mongoose.connection.close();






/////////////////////////////////////////////////////////////////////////////////////////////////////




































