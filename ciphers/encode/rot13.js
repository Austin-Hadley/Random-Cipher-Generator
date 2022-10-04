// create a custom function ot generate the rot13 cipher
function rot13Cipher(string) {
    // create a variable to store the new cipher
    var newCipher = '';
    // loop through the string
    for (var i = 0; i < string.length; i++) {
        // get the character code of the current character
        var charCode = string.charCodeAt(i);
        // if the character code is between 65 and 90 (A-Z)
        if (charCode >= 65 && charCode <= 90) {
            // if the character code is greater than 77 (M)
            if (charCode > 77) {
                // subtract 13 from the character code
                charCode -= 13;
            } else {
                // add 13 to the character code
                charCode += 13;
            }
        // if the character code is between 97 and 122 (a-z)
        } else if (charCode >= 97 && charCode <= 122) {
            // if the character code is greater than 109 (m)
            if (charCode > 109) {
                // subtract 13 from the character code
                charCode -= 13;
            } else {
                // add 13 to the character code
                charCode += 13;
            }
        }
        // add the new character to the new cipher
        newCipher += String.fromCharCode(charCode);
    }
    // return the new cipher
    return newCipher;
}

module.exports = rot13Cipher();