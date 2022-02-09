const { response } = require('express');
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin  = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
})


// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Success!');
})

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res, db) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage (req, res, db) });

app.post('/imageurl', (req, res) => { image.handleApiCall (req, res) });

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}.`);
})
