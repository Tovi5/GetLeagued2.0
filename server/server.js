const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');


app.use(cors());
app.use(express.json());

//insert a new user
app.post('/insertUser', async (req, res) => {
    try {

        const {email, password, registered_at, last_login, intro, profile, username, role} = req.body;

        await pool.query('INSERT INTO "user" (email, password, registered_at, last_login, intro, profile, username, role) ' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [email, password, registered_at, last_login, intro, profile, username, role]);

        res.json('Unijet novi user');
        
    } catch (error) {
        console.log(error.message);
    }
});


//get user info
app.get('/getUserInfo', async (req, res) => {
    try {

        const allEmails = await pool.query('SELECT username, email FROM "user"');

        res.json(allEmails.rows);
        
    } catch (error) {
        console.log(error.message);
    }
});


app.listen(5000, () => console.log('Server is listening on port 5000'));