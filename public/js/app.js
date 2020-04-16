console.log('Client side JS file is loaded');




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {      //response після json() перетворюється в parsed data
        response.json().then(({error, location, forecast}) => {
            if(error){
                messageOne.textContent = error;
                messageTwo.textContent = '';
            }else {
                messageOne.textContent = location;
                messageTwo.textContent = forecast;
            }
        })
    });
});