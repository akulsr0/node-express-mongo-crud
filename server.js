const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db')
const User = require('./models/User')

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => res.send('Node/Express/Mongo App'))

// Get all the users and show their names
app.get('/users', (req, res) => {
    let usersArr = [];
    User.find({}, (err, results) => {
        results.map(user => usersArr.push(user.name));
        let listUsers = '';
        for(let i=0; i<usersArr.length; i++) {
            listUsers += '<li>'+usersArr[i]+'</li>';
        }
        res.send(listUsers)
    })
})

// Add a new user to database
app.post('/newUser', (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(res.send('Saved to database.'))
        .catch(res.send('Error Occurred.'))
})

// Search details for a user
app.get('/search', (req, res) => {
    const {email} = req.body;
    User.find({email}, (err, results) => {
        if(!results) {
            res.send('No User Found.')
        } else {
            const {name, age} = results[0]
            res.send(`Name: ${name} and Age: ${age}`);
        }
    })
})

// Update details of a user
app.post('/update', (req, res) => {
    const {email, newname} = req.body
    User.updateOne({email}, {name: newname}, {upsert: true}, () => res.send('Updated...'))
})

// Delete a User
app.post('/delete', (req, res) => {
    const {email} = req.body;
    User.deleteOne({email}, err => err ? res.send('Error') : res.send('User Deleted...'));
})

app.listen(port, console.log(`Server is running at port ${port}...`));