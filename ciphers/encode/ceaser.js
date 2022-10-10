//impliment a ceaser cipher with a custom shift value

//generate a random shift value and random string and save it to ../../data/ceaserShift.json
//generate a random shift value
function randShift() {
    return Math.floor(Math.random() * 25) + 1;
}

// generate an encoded string with ceaser cipher based on a random shift value and a provided string
function ceaserCipher(random) {
    // create a variable to store the new cipher
    var newCipher = '';
    // create a variable to store the shift value
    var shift = randShift();
    function stringLength() {
        return random.length();
    }
    // take each character in the string and shift it by the shift value
    for (var i = 0; i < stringLength; i++) {
        // if the character is a space, add a space to the new cipher
        if (string[i] == ' ') {
            newCipher += ' ';
        } else {
            // if the character is not a space, shift it by the shift value
            var charCode = string.charCodeAt(i);
            // if the character is uppercase, shift it by the shift value
            if (charCode >= 65 && charCode <= 90) {
                newCipher += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
            } else {
                // if the character is lowercase, shift it by the shift value
                newCipher += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
            }
        }
    }
    // return the new cipher
    return newCipher;
}

// export the function
module.exports = ceaserCipher();
