const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

const laundryRoutes = require('./routes/laundryRoutes');


// EJS
app.set('view engine','ejs');


// Body Parser
app.use(express.urlencoded({
    extended:true
}));


// Session
app.use(session({

    secret:'laundry-secret',

    resave:false,

    saveUninitialized:false

}));


// Static File
app.use(
express.static(
path.join(__dirname,'public')
)
);


// Global Session untuk EJS

app.use((req,res,next)=>{

    res.locals.user = req.session.user || null;

    next();

});


// Routes

app.use('/',laundryRoutes);



// Server

app.listen(3000,()=>{

console.log(
'Server berjalan di http://localhost:3000'
);

});