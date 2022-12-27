// create an atbash cipher with a custom shift value and save it to ../../data/atbashShift.json

// generate an encoded string with atbash cipher with a provided string
async function encode(string) {
    //create a variable to store the new cipher
    var newCipher = '';
    // map the alphanumeric to the reverse alphanumeric
    alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    reverseAlphanumeric = '9876543210zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA';
    // create the dictionary to map the characters
    var dictionary = {};
    function alphaLength() {
        return alphanumeric.length();
    }
    // loop through the alphanumeric
    for (var i = 0; i < alphaLength; i++) {
        // add the character to the dictionary
        dictionary[alphanumeric[i]] = reverseAlphanumeric[i];
    }
    var i = 0
    // loop through the string
    function stringLength() {
        return string.length();
    }
    for (var i = 0; i < stringLength; i++) {
        // get the character code of the current character
        var charCode = string.charCodeAt(i);
        // grab the character from the dictionary
        var char = dictionary[string[i]];
        // add the new character to the global variable newCipher
        newCipher += char;
    }
    console.warn(string);
    console.warn(newCipher);
    //save the original string, the shift value, and the new cipher to ../../data/atbashShift.json
    var fs = require('fs');
    var data = {
        original: string,
        cipher: newCipher
    }
    fs.writeFile('data/atbashShift.json', JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    // return the new cipher and original string when the function is called
    return newCipher, string;
}

// export the function as compliant with the CommonJS module system
module.exports = { encode };