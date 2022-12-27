const express = require('express');
//create a new express app with cors protection
// deepcode ignore UseCsurfForExpress: <please specify a reason of ignoring this>
const app = express();
const port = 9898;
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fs = require('fs');
const atBash = require('./ciphers/encode/atbash.js');
const ceaserCipher = require('./ciphers/encode/ceaser.js');

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.enable('Content-Security-Policy');
// implement a rate limiter
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 50 // limit each IP to 50 requests per windowMs
});
app.use(limiter);
// log every request to the console
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});


//generate a random string to pass to the functions
function randomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

app.get('/', (req, res) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://unpkg.com/axios/dist/axios.min.js");
    res.setHeader("Cross-Origin-Embedder-Policy", "coss-origin")
    res.sendFile(__dirname + '/site/index.html');
});
app.get('/main.js', (req, res) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://unpkg.com/axios/dist/axios.min.js");
    res.sendFile(__dirname + '/site/main.js');
});
app.get('/new-cipher', async (req, res) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://unpkg.com/axios/dist/axios.min.js");
    res.setHeader("access-control-allow-origin", "*");
    //randomly choose a cipher
    var cipher = Math.floor(Math.random() * 2);
    //if cipher is 0, run atbash
    if (cipher == 0) {
        await atBash.encode(randomString());
        //grab the encoded string from data/atbash.json
        var encodedString = require('data/atbash.json').encodedString;
        //send the encoded string to the client
        res.send(json.stringify(encodedString));
        // save the cipher to data/cipher.json
        var cipherObject = {
            "cipher": "atbash",
            "encodedString": encodedString
        };
        // run a try statement to see if data/cipher.json exists and if it does, delete it
        try {
            fs.unlinkSync('data/cipher.json');
        } catch (err) {
            console.log(err);
        }
        try {
            fs.writeFileSync('data/cipher.json', JSON.stringify(cipherObject));
        } catch (err) {
            console.log(err);
        }
    } else {
        //if cipher is 1, run ceaserCiper with the const ceaser
        await ceaserCipher.encode(randomString());
        // ceaser.js => ceaserShift.json => string => JSON.parse()
        fs.readFile('data/ceaserShift.json', (err, data) => {
            if (err) throw err;
            var ceaserShift = JSON.parse(data);
            //grab the encoded string from the ceaserShift variable
            var encodedString = ceaserShift.cipher;
            //send the encoded string to the client
            console.log(encodedString);
            console.log(JSON.stringify(encodedString));
            res.send(JSON.stringify(encodedString));
            // save the cipher to data/cipher.json
            var cipherObject = {
                "cipher": "ceaser",
                "encodedString": encodedString
            };
            // delete data/cipher.json if it exists
            try {
                fs.unlinkSync('data/cipher.json');
            } catch (err) {
                console.log(err);
            }
            try {
                fs.writeFileSync('data/cipher.json', JSON.stringify(cipherObject));
            } catch (err) {
                console.log(err);
            }
        });
    }
});
            


app.post('/check-answer', (req, res) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://unpkg.com/axios/dist/axios.min.js");
    //grab the answer from the client
    var answer = req.body.answer;
    //grab the string and cipher from data/cipher.json
    var string = require('data/cipher.json').encodedString;
    var cipher = require('data/cipher.json').cipher;
    //if the answer is correct, send true to the client
    if (answer == "answer") {
        res.send(true);
    } else {
        //if the answer is incorrect, send false to the client
        res.send(false);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
