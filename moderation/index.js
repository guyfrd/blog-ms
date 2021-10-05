const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    
    if (type === 'CommentCreated') {
        console.log(`get comment with data`, data)
        const {id, content, postId} = data;
        const status = content.includes('orange') ? 'rejected' : 'approved'; 
        
        await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentModerated',
        data: {
            id,
            content,
            status, 
            postId}});
    }

    res.send({});
});

app.listen(4003, () => {
    console.log('Listen to 4003');
});