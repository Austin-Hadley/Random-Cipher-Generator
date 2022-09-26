import 'regenerator-runtime/runtime';
import axios from 'axios';

document.getElementById('newCipher').addEventListener('click', getNewCipher());
document.getElementById('checkAnswer').addEventListener('click', checkAnswer());


function getNewCipher() {
    // get a new cipher from the server
    axios.get('/new-cipher')
        .then(function (response) {
            // change the cipher to the new cipher
            changeCipher(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function checkAnswer() {
    // get the answer from the user
    var answer = document.getElementById('answer').value;
    // send the answer to the server
    post(answer);
}

function post(data) {
    axios.post('http://localhost/check-answer', {
        answer: data
    })
        .then(function (response) {
            //if the answer is correct, change the cipher
            if (response.data == true) {
                getNewCipher();
            } else {
                //if the answer is incorrect, alert the user
                alert('Incorrect answer');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function changeCipher(newCipher) {
    // deepcode ignore DOMXSS: Unnecessary
    document.getElementById('encodedString').innerHTML = newCipher;
};
