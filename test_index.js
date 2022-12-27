//import the important parts for an express web server
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
//import the ciphers
const atBash = require('./ciphers/encode/atbash.js');
const ceaserCipher = require('./ciphers/encode/ceaser.js');
//import the random string generator
const randomString = require('./randomString.js');

//set the port to 3000
const port = 9898;

//set the app to use helmet
app.use(helmet());
//set the app to use cors
app.use(cors());
//set the app to use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//disable the x-powered-by header
app.disable('x-powered-by');
//enable the Content-Security-Policy header
app.enable('Content-Security-Policy');

//implement a rate limiter
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 50 // limit each IP to 50 requests per windowMs
});
app.use(limiter);

//log every request to the console
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
}
);

//serve the index.html file
app.get('/', (req, res) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://unpkg.com/axios/dist/axios.min.js");
    res.setHeader("Cross-Origin-Embedder-Policy", "cross-origin")
    res.sendFile(__dirname + '/site/index.html');
}
);

//serve the main.js file
app.get('/main.js', (req, res) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://unpkg.com/axios/dist/axios.min.js");
    res.sendFile(__dirname + '/site/main.js');
}
);

//serve the new cipher
app.get('/new-cipher', async (req, res) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://unpkg.com/axios/dist/axios.min.js");
    res.setHeader("access-control-allow-origin", "*");
    //randomly choose a cipher
    var cipher = Math.floor(Math.random() * 2);
    //if cipher is 0, run atbash
    if (cipher == 0) {
        // if the cipher is atbash, run the atbash cipher and capture the cipher and original when it is returned from the function
        var { encodedString, original } = await atBash.encode(randomString.randomString());
        //format the cipher to be sent to the client
        var clientString = {
            cipher: encodedString
        }
        console.error(encodedString);
        //send the cipher to the client
        res.send(JSON.stringify(clientString));
        // save the cipher to data/cipher.json
        var cipher = {
            cipher: "atbash",
            encodedString: cipher,
            originalString: original
        };
        fs.writeFileSync('data/cipher.json', JSON.stringify(cipher));
    }
    //if cipher is 1, run ceaser
    else if (cipher == 1) {
        // if the cipher is ceaser, run the ceaser cipher and capture the cipher and original when it is returned from the function
        var { encodedString, original } = await ceaserCipher.encode(randomString.randomString());
        // format the cipher to be sent to the client
        var clientString = {
            cipher: encodedString
        }
        console.error(encodedString);
        //send the cipher to the client
        res.send(JSON.stringify(clientString));
        // save the cipher to data/cipher.json
        var cipher = {
            cipher: "ceaser",
            encodedString: cipher,
            originalString: original
        };
        fs.writeFileSync('data/cipher.json', JSON.stringify(cipher));
    }
});

//check the cipher
app.post('/check-cipher', (req, res) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://unpkg.com/axios/dist/axios.min.js");
    res.setHeader("access-control-allow-origin", "*");
    //get the cipher from the client
    var cipher = req.body.cipher;
    //get the cipher from data/cipher.json
    var cipherData = JSON.parse(fs.readFileSync('data/cipher.json'));
    //if the cipher is correct, send true to the client
    if (cipher == cipherData.originalString) {
        res.send(true);
    }
    //if the cipher is not correct, send false to the client
    else {
        res.send(false);
    }
});

//start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);

