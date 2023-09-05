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

        const allEmails = await pool.query('SELECT username, email, password FROM "user"');

        res.json(allEmails.rows);
        
    } catch (error) {
        console.log(error.message);
    }
});


// change password by email
app.put('/updatePassword/:email', async (req, res) => {
    try {

        const { email } = req.params;
        const { password } = req.body;

        await pool.query('UPDATE "user" SET password = $1 WHERE email = $2', [password, email]);

        res.json('password updated');
        
    } catch (error) {
        console.log(error.message);
    }
});


//get username, password, role
app.post('/login', async (req, res) => {
    try {

        const { username, password } = req.body;

        const info = await pool.query('SELECT * FROM "user" WHERE username = $1 AND password = $2', [username, password]);

        res.json(info.rows);
        
    } catch (error) {
        console.log(error.message);
    }
});


// get all news (videoURL je null)
app.get('/getAllPosts', async (req, res) => {
    try {

        const news = await pool.query('SELECT * FROM post');

        res.json(news.rows);
        
    } catch (error) {
        console.error(error.message);
    }
})


app.listen(5000, () => console.log('Server is listening on port 5000'));