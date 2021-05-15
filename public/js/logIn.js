document.getElementById('signup_form_div').style.display = 'none';
document.getElementById('login_form_div').style.display = 'block';

const loginBtnFn = async (event) => {
    event.preventDefault();

    const email2 = document.querySelector('#email').value;
    const email = email2.trim().toLowerCase();
    const password = document.querySelector('#password').value;

    if(email && password){
        console.log(email, password);
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json'}
        });

        if(response.ok){
            document.location.replace('/bucket');
        } else {
            alert(response.statusText);
        }
    }
};

const signupBtnFn = async (event) => {
    event.preventDefault();

    const email2 = document.querySelector('#email').value;
    const email = email2.trim().toLowerCase();
    const password = document.querySelector('#password').value;
    const name = document.querySelector('#name').value;

    if(email && password && name){
        console.log(email, password);
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password, name }),
            headers: { 'Content-Type': 'application/json'}
        });

        if(response.ok){
            document.location.replace('/bucket');
        } else {
            alert(response.status);
        }
    }
};

const toggleFn = (f) => {
    if (f === 'signup') {
        document.getElementById('form_title').innerHTML = 'New User Sign Up';
        document.getElementById('login_form_div').style.display = 'none';
        document.getElementById('signup_form_div').style.display = 'block';
    } else {
        document.getElementById('form_title').innerHTML = 'Login';
        document.getElementById('login_form_div').style.display = 'block';
        document.getElementById('signup_form_div').style.display = 'none';
    }
};

document.querySelector('#login').addEventListener('click', loginBtnFn);
document.querySelector('#signup').addEventListener('click', signupBtnFn);
document.querySelector('.signupLink').addEventListener('click', () => toggleFn('login'));
document.querySelector('.loginLink').addEventListener('click', () => toggleFn('signup'));



