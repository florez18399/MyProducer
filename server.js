const express = require('express');
const app = express();
const path = require('path');
const amqpclient = require('./clientConnect');
const bodyParser = require('body-parser');
const multer = require('multer');

//------MULTER CONFIG
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//app.use('/public/images',express.static(path.join(__dirname, 'public/images')));
const storage = multer.memoryStorage();
var upload = multer({storage}).single('file'); 

const port = 3010;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/upload', upload, function (request, response) {
    console.log(request.file);
    let jsonMessage = {
        email: request.body.email,
        filename: new Date().getTime() + path.extname(request.file.originalname),
        buffer: request.file.buffer,
        size: request.file.size
    }
    //console.log(jsonMessage);
    amqpclient.sendMessage('amqp://localhost', JSON.stringify(jsonMessage));
    response.send('El mensaje fue enviado');
});

app.listen(port, () => {
    console.log(`Running in ${port}`);
})