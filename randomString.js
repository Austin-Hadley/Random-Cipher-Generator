// generate a random string and return it
async function randomString() {
    // create a variable to store the random string
    var randomString = '';
    // create a variable to store the random string length
    var randomLength = Math.floor(Math.random() * 25) + 1;
    // create a variable to store the alphabet
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // loop through the alphabet and add a random character to the random string
    for (var i = 0; i < randomLength; i++) {
        randomString += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return randomString;
}

// export the function as compliant with the CommonJS module system
module.exports = { randomString };