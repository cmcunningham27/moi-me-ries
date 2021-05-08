console.log('helllo');
console.log(document.querySelector('#login'));

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
            document.location.replace('/buckets');
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
            document.location.replace('/buckets');
        } else {
            alert(response.status);
        }
    }
};

document.querySelector('#login').addEventListener('click', loginBtnFn);
document.querySelector('#signup').addEventListener('click', signupBtnFn);




