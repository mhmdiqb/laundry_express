const session = require('express-session');
const express = require('express');
const path = require('path');

const app = express();

const laundryRoutes = require('./routes/laundryRoutes');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'laundry-secret',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', laundryRoutes);

app.listen(3000, () => {
    console.log('Server berjalan');
});