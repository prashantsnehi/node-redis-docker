const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});
const createdBy = 'Prashant Kumar Snehi';


client.set('visits', 1);

app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        var responseString = `<h1>Welcome! you are ${visits} visitor to this site</h1>` +
            `<hr /><h2>Node and redis running in docker container</h2><hr />` + 
            `<h4>Created by: ${createdBy}</h4>`;
        client.set('visits', parseInt(visits) + 1);
        res.send(responseString);
    });
    
});

app.listen(8080, () => {
    console.log('Listening on 8080 port');
});