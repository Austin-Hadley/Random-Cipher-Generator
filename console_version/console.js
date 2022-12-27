// import the required modules
const atbash = require('../ciphers/encode/atbash');
const ceaser = require('../ciphers/encode/ceaser');
const rot13 = require('../ciphers/encode/rot13');
const vigenere = require('../ciphers/encode/vigenere');
const caesar = require('../ciphers/encode/caesar');
const baconian = require('../ciphers/encode/baconian');
const morse = require('../ciphers/encode/morse');
const binary = require('../ciphers/encode/binary');
const hex = require('../ciphers/encode/hex');
const base64 = require('../ciphers/encode/base64');
const base32 = require('../ciphers/encode/base32');
const base16 = require('../ciphers/encode/base16');
const base85 = require('../ciphers/encode/base85');
const base91 = require('../ciphers/encode/base91');
const base92 = require('../ciphers/encode/base92');

// create a function to randomly choose a cipher
function chooseCipher() {
    // randomly choose a cipher
    var cipher = Math.floor(Math.random() * 13);
    // if cipher is 0, run atbash
    if (cipher == 0) {
        atbash();
    } else if (cipher == 1) {
        ceaser();
    } else if (cipher == 2) {
        rot13();
    } else if (cipher == 3) {
        vigenere();
    } else if (cipher == 4) {
        caesar();
    } else if (cipher == 5) {
        baconian();
    } else if (cipher == 6) {
        morse();
    } else if (cipher == 7) {
        binary();
    } else if (cipher == 8) {
        hex();
    } else if (cipher == 9) {
        base64();
    } else if (cipher == 10) {
        base32();
    } else if (cipher == 11) {
        base16();
    } else if (cipher == 12) {
        base85();
    } else if (cipher == 13) {
        base91();
    } else if (cipher == 14) {
        base92();
    }
}

// take the chosen cipher and generate a random string to encode
function generateString() {
    // create an array of all the characters
    var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    // create an empty string
    var string = '';
    // create a for loop to randomly choose 10 characters from the characters array
    for (var i = 0; i < 10; i++) {
        string += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    // return the string
    return string;
}

// create a function to run the cipher
function runCipher() {
    // choose a cipher
    var cipher = chooseCipher();
    // generate a random string
    var string = generateString();
    // encode the string
    cipher(string);
}

//check the input vs the encoded string
function checkInput(input, encoded) {
    // hwile the input is not equal to the encoded string
    while (input != encoded) {
        return false;
    } else {
        return true;
    }
}
//run the cipher and check the input
function run() {
    // run the cipher
    runCipher();
    // check the input
    var input = prompt('Enter the encoded string:');
    var encoded = runCipher();
    var check = checkInput(input, encoded);
    // if the input is correct, return true
    if (check == true) {
        return true;
    } else {
        // if the input is not correct, return false
        return false;
    }
}