const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json())

const eventStore = []

app.post('/events', (req, res) => {
    const event = req.body; 
    eventStore.push(event);

    axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
        console.log(err);
    });
    axios.post('http://comments-srv:4001/events', event).catch((err) => {
      console.log(err);
    });
    axios.post('http://query-srv:4002/events', event).catch((err) => {
      console.log(err);
    });
    axios.post('http://moderation-srv:4003/events', event).catch((err) => {
      console.log(err);
    });


    res.send({status :'OK'});
});

app.get('/all', (req, res) => {
    res.send(eventStore);
});


app.listen(4005, () => {
    console.log('listen to port 4005');
})