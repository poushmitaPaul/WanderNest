const express = require('express');
const app = express();
const users = require('./routes/users.js');
const posts = require('./routes/posts.js');

// const cookieParser = require('cookie-parser');


// app.use(cookieParser("secretcode"));


// app.get('/getsignedcookie', (req, res) => {
//     res.cookie('country', 'India', {signed: true});
//     res.send('sent you signed cookie !!');
// })

// app.get('/verify', (req, res) => {
//     console.log(req.cookies);
//     console.log(req.signedCookies); //checks the that is the value of the cookie is tampered or not 
//     res.send('verified');
// })

// app.get('/getcookies', (req, res) => {
//     res.cookie('greet', 'hello');
//     res.send('sent you some cookies !!');
// })

// app.get('/', (req, res) => {
//     res.send('hi !!');
//     // console.dir(req.cookies);
// })

// app.get('/greet', (req, res) => {
//    let {name = "jack"} = req.cookies;
//    res.send(` Hi ${name}, Welcome in our website !! `);
// })


// app.use('/users', users);
// app.use('/posts', posts);







const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');


const sessionOptions = { 
    secret: 'my supersecretstring', 
    resave: false,
    saveUninitialized: true
};

app.use(session(sessionOptions));
app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.get('/test', (req, res) => {
    // res.send('test successfull !!');
// });

// app.get('/reqcount', (req, res) => {   
//     if(req.session.count){
//         req.session.count++;
//     } else{
//         req.session.count = 1;
//     }

//     res.send(`sent req for ${req.session.count} times`);
// });

app.use( (req, res, next) => {
    res.locals.name = req.session.name;
    res.locals.sMsg = req.flash('success');
    res.locals.eMsg = req.flash('error');
    next();
});

app.get('/register', (req, res) => {   

   let {name = "anonymous"} = req.query;
//  console.log(req.session);  
    req.session.name = name;

    if( name === 'anonymous'){
        req.flash('error', 'user not registered');   // req.flash('key', 'value/message' )
    } else {
        req.flash('success', 'user registered successfully!');    // req.flash('key', 'value/message' )
    }
    
    res.redirect('/hello');
});

app.get('/hello', (req, res) => {    
    res.render('page.ejs');
 });
 


app.listen(3000 , () => {
    console.log("server is listenning on port 3000.");
});