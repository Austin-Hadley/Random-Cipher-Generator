//impliment a ceaser cipher with a custom shift value

//generate a random shift value and random string and save it to ../../data/ceaserShift.json
//generate a random string of length 10
function ceaserShift() {
    function randString(len) {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    }
    //generate a random shift value
    function randShift() {
        return Math.floor(Math.random() * 25) + 1;
    }
    //create the random shift value and string
    var shift = randShift();
    var string = randString(15);
    //log the shift value and string
    console.log("shift: " + shift);
    console.log("string: " + string);

    //log the shift value and string
    console.log("shift: " + shift);
    console.log("string: " + string);
    //encode the string
    var encodedString = "";
    for (var i = 0; i < string.length; i++) {
        var char = string.charCodeAt(i);
        if (char >= 97 && char <= 122) {
            char += shift;
            if (char > 122) {
                char -= 26;
            }
        }
        encodedString += String.fromCharCode(char);
    }
    //save the encoded string, shift value, and string to ../../data/ceaserShift.json
    var shiftObject = {
        "shift": shift,
        "string": string,
        "encodedString": encodedString
    };
    // run a try statement to see if ../../ceaserShift.json exists and if it does, delete it
    try {
        fs.unlinkSync('../../data/ceaserShift.json');
    } catch (err) {
        console.log(err);
    }
    try {
        fs.writeFileSync('../../data/ceaserShift.json', JSON.stringify(shiftObject));
    } catch (err) {
        console.log(err);
    }
};
//return the encoded tring to ../../index.js
module.exports = ceaserShift;