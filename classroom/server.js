const express = require('express');
const app = express();
const users = require('./routes/users.js');
const posts = require('./routes/posts.js');

const cookieParser = require('cookie-parser');


app.use(cookieParser("secretcode"));


app.get('/getsignedcookie', (req, res) => {
    res.cookie('country', 'India', {signed: true});
    res.send('sent you signed cookie !!');
})

app.get('/verify', (req, res) => {
    console.log(req.cookies);
    console.log(req.signedCookies); //checks the that is the value of the cookie is tampered or not 
    res.send('verified');
})

app.get('/getcookies', (req, res) => {
    res.cookie('greet', 'hello');
    res.send('sent you some cookies !!');
})

app.get('/', (req, res) => {
    res.send('hi !!');
    // console.dir(req.cookies);
})

app.get('/greet', (req, res) => {
   let {name = "jack"} = req.cookies;
   res.send(` Hi ${name}, Welcome in our website !! `);
})


app.use('/users', users);
app.use('/posts', posts);


app.listen(3000 , () => {
    console.log("server is listenning on port 3000.");
})