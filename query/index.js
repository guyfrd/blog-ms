const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const posts = {}

const app = express();
app.use(bodyParser.json());
app.use(cors());

const handleEvents = (type, data) => {
    console.log("get event: ", type)
    console.log("data: ", data)

    if(type === 'PostCreated'){ 
        const {id , title} = data; 
        posts[id] = {
            id,
            title, 
            comments: [],
        };
    } else if (type === 'CommentCreated'){
        const {id, content, postId, status} = data; 
        
        posts[postId].comments.push({
            id, 
            content,
            status,
        }); 
    } else if (type === 'CommentUpdated') {
        const {id, content, postId, status} = data; 
        console.log(`query get update postID ${postId} comment ${id} comment`,posts[postId] );
        let updatedComment = posts[postId].comments.find(comment => comment.id === id); 
        updatedComment.status = data.status;
        updatedComment.content = data.content;

        console.log(`comment after update: `, updatedComment);
    }
};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const {type, data} = req.body;
    console.log('type: ', type);
    handleEvents(type, data);
    
    res.send({});
});

app.listen(4002, async () => {
    console.log('Listen to 4002');
    const res = await axios.get('http://event-bus-srv:4005/all');
    console.log(res.data)
    for (let event of res.data) {
        console.log('proccing event: ', event.type)
        handleEvents(event.type, event.data);
    }

})