const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgres://adnhrwmttewcey:2217b1af0ddd25f79f4e02fbcefdb08077c34eff2dea1f22e9d595141d2e7528@ec2-34-192-173-173.compute-1.amazonaws.com:5432/d20ifastbhcq8',
    user : 'adnhrwmttewcey',
    password : '2217b1af0ddd25f79f4e02fbcefdb08077c34eff2dea1f22e9d595141d2e7528',
    database : 'd20ifastbhcq8'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send('it is working') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log('app is running on port 3000');
})
