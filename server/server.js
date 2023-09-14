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

        const allEmails = await pool.query('SELECT * FROM "user"');

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


// get all posts
app.get('/getAllPosts', async (req, res) => {
    try {

        const news = await pool.query('SELECT * FROM post');

        res.json(news.rows);
        
    } catch (error) {
        console.error(error.message);
    }
});


// save after changes by id
app.put('/updateUser/:id', async (req, res) => {

    try {

        const { id } = req.params;
        const { username, email, password } = req.body;

        const updated = await pool.query('UPDATE "user" SET username = $1, email = $2, password = $3 '+
                         'WHERE "ID" = $4', [username, email, password, id]);

        res.json(updated.rowCount);
        
    } catch (error) {
        console.error(error.message);
    }

});


// get post author
app.get('/getPostInfo/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const data = await pool.query('SELECT * FROM post p JOIN "user" u ON p.author_id = u."ID" '+
                                        'WHERE p."ID" = $1', [id]);

        res.json(data.rows[0]);
        
    } catch (error) {
        console.error(error.message);
    }

});


// get comments by post id
app.get('/getComments/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const comments = await pool.query('SELECT c.content, u.username, c.published_at '+
                                            'FROM Comment c JOIN Post p ON c.post_id = p."ID" JOIN "user" u ON c.user_id = u."ID" '+
                                            'WHERE c.post_id = $1', [id]);

        res.json(comments.rows);
        
    } catch (error) {
        console.error(error.message);
    }
});


// upload comment to db
app.post('/postComment', async (req, res) => {
    try {

        const {published_at, content, post_id, parent_id, user_id} = req.body;

        await pool.query('INSERT INTO comment (published_at, content, post_id, parent_id, user_id) '+
                        'VALUES ($1, $2, $3, $4, $5)', [published_at, content, post_id, parent_id, user_id]);

        res.json('Unijet novi komentar');
        
    } catch (error) {
        console.error(error.message);
    }
});


// insert post
app.post('/insertPost', async (req, res) => {
    try {
        
        const {video_url, title, meta_title, slug, summary, updated_date, published_date, content, author_id, image_url} = req.body;

        await pool.query('INSERT INTO post (video_url, title, meta_title, slug, summary, updated_date, published_date, content, author_id, image_url) '+
                        'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
                        [video_url, title, meta_title, slug, summary, updated_date, published_date, content, author_id, image_url]);
        
        res.json('Post dodat');

    } catch (error) {
        console.error(error.message);
    }
})


app.listen(5000, () => console.log('Server is listening on port 5000'));