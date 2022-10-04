// create an atbash cipher with a custom shift value and save it to ../../data/atbashShift.json

// generate an encoded string with atbash cipher with a provided string
function atBashCipher(string) {
    //create a variable to store the new cipher
    var newCipher = '';
    // map the alphanumeric to the reverse alphanumeric
    alphanumeric = 'abcdefghijklmnopqrstuvwxyz0123456789';
    reverseAlphanumeric = 'zyxwvutsrqponmlkjihgfedcba9876543210';
    // create the dictionary to map the characters
    var dictionary = {};
    // loop through the alphanumeric
    for (var i = 0; i < alphanumeric.length; i++) {
        // add the character to the dictionary
        dictionary[alphanumeric[i]] = reverseAlphanumeric[i];
    }
    // loop through the string
    for (var i = 0; i < string.length; i++) {
        // get the character code of the current character
        var charCode = string.charCodeAt(i);
        // grab the character from the dictionary
        var char = dictionary[string[i]];
        // add the new character to the new cipher
        newCipher += char;
    }
    // return the new cipher
    return newCipher;
}

// export the function
module.exports(atBashCipher());