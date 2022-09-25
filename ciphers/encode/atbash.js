// create an atbash cipher with a custom shift value and save it to ../../data/atbashShift.json

function atBash() {
    //generate a random shift value
    function randShift() {
        return Math.floor(Math.random() * 25) + 1;
    }

    //generate a random string of length 15
    function randString(len) {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    }

    //create the random shift value and string
    var shift = randShift();
    var string = randString(15);

    //atbash the string with the shift value and save it to encodedText
    var encodedText = "";
    for (var i = 0; i < string.length; i++) {
        var char = string.charCodeAt(i);
        if (char >= 97 && char <= 122) {
            char += shift;
            if (char > 122) {
                char -= 26;
            }
        }
        encodedText += String.fromCharCode(char);
    }

    //save the encoded string, shift value, and string to ../../data/atbashShift.json
    var shiftObject = {
        "shift": shift,
        "string": string,
        "encodedString": encodedText
    };

    // run a try statement to see if ../../atbashShift.json exists and if it does, delete it
    try {
        fs.unlinkSync('../../data/atbashShift.json');
    } catch (err) {
        console.log(err);
    }
    try {
        fs.writeFileSync('../../data/atbashShift.json', JSON.stringify(shiftObject));
    } catch (err) {
        console.log(err);
    }
};
