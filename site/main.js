//create a DOM listener to listen for the Generate button to be clicked
document.getElementById('GenerateCipher').addEventListener('click', function() {
    // submit a POST request to the server to generate a new cipher
    fetch('/new-cipher', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        // if the response is good, grab the encoded string from the server
        if (response.ok) {
            response.json().then(function(data) {
                //grab the encoded string from the server
                var encodedString = data.encodedString;
                //display the encoded string on the page
                document.getElementById('cipher').innerHTML = domprify.sanitize(encodedString);
            }).catch(function(err) {
                console.log(err);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    }).catch(function(error) {
        alert('Unable to connect to the server');
    }).catch(function(error) {
        alert('Unable to connect to the server');
    });
});
//create a DOM listener to listen for the Check Answer button to be clicked
document.getElementById('checkAnswer').addEventListener('click', function() {
    // grab the answer from the client
    var answer = document.getElementById('answer').value;
    // submit a POST request to the server to check the answer
    fetch('/check-answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            answer: answer
        })
    }).then(function(response) {
        // return the response as json
        return response.json();
    }).then(function(data) {
        // if the answer is correct, display the correct message
        if (data == true) {
            // send an alert to the client
            alert('Correct!');
        } else {
            // if the answer is incorrect, display the incorrect message
            alert('Incorrect!');
        }
    }).catch(function(err) {
        // log any errors
        console.log(err);
    });
});