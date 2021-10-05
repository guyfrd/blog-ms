const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentByPostId = {}; 

app.get('/posts/:id/comments', (req, res) => {
    const {id} = req.params; 
    res.send(commentByPostId[id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const id = randomBytes(4).toString('hex');

    const postId = req.params.id;
    const { content } = req.body;
    const comment = commentByPostId[postId] || [];
    const status = 'pending'; 
    console.log('comment - ', comment);
    commentByPostId[postId] = [...comment, {id: id, content, status}]
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id,
            content,
            status, 
            postId}});

    res.status(201).send(postId);
});

app.post('/events',async (req, res) => {
    const {type, data} = req.body;
    console.log("comment get event ", data);
    if (type === 'CommentModerated') {
        const { id, content, status, postId } = data;
        console.log(`comment got event CommentModerated data `, data);
        let moderatedComment = commentByPostId[postId].find(comment => comment.id === id); 
        moderatedComment.status = status;

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data:{
                id,
                content, 
                status,
                postId}});
    }

    res.send({});
});

app.listen(4001, () => {
    console.log('Listen to 4001');
});