import postNewQuerry from './messages.js';
// Hire Me Page Validation 

const form1 = document.getElementById('form1');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

form1.addEventListener('submit', e => {
	e.preventDefault();
	checkInput();
});

function checkInput() {
	// trim to remove the whitespaces
	const nameVal = name.value.trim();
	const emailValue = email.value.trim();
	const messageVal = message.value.trim();
	
	if(nameVal === '') {
		setErrorFor(name, 'Username cannot be blank');
	} else {
		setSuccessFor(name);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(email.value)) {
		setErrorFor(email, 'Please Provide A Valid Email');
	} else {
		setSuccessFor(email);
	}
	
	if(messageVal === '') {
		setErrorFor(message, 'Please Provide A Feedback');
	} else {
		setSuccessFor(message);
		if (nameVal !== '' && emailValue !== ''&& messageVal !== '') return postNewQuerry();
	}
	
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(emailVal) {
	const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailPattern.test(emailVal);
}