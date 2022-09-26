document.getElementById('newCipher').addEventListener('click', getNewCipher());

//send a get request to the server on the client side with XMLHttpRequest
function getNewCipher() {
    // send a get request to the server on the client side
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/new-cipher', true);
    xhr.onload = function () {
        // if the request is successful, set the innerHTML of the encodedString element to the response
        if (this.status == 200) {
            document.getElementById('encodedString').innerHTML = this.responseText;
        }
    }
    xhr.send();
}

function post(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://24.144.176.54/check-answer', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
    xhr.send(JSON.stringify(data));
    };
    //wait for the response from the server
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //if the answer is correct, change the cipher
            if (xhr.responseText == 'true') {
                getNewCipher();
            } else {
                //if the answer is incorrect, alert the user
                alert('Incorrect answer');
            }
        }
    }
};

function changeCipher(newCipher) {
    document.getElementById('cipher').innerHTML = newCipher;
};

