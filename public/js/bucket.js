document.getElementById('newSplash_form').style.display = 'none';
document.getElementById('newDrop_form').style.display = 'flex';

const toggleFn = (title, user_id) => {
    // console.log('HEY YOU GUYS!');
    // console.log(user_id);

    document.getElementById('title').innerHTML = 'Tell us about your ' + title + ' SPLASH adventure:';

    document.querySelector('.newSplash').setAttribute('data-title', title);
    document.querySelector('.newSplash').setAttribute('data-user', user_id);

    document.getElementById('newSplash_form').style.display = 'flex';

    document.getElementById('newDrop_form').style.display = 'none';
};

const removeDropBtnFn = async (id) => {
    console.log(id);
    const response = await fetch(`/api/drops/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(id, 'dropRoutes');
    if (response.ok) {
        response.statusText;
    } else {
        alert(response.statusText);
    }
};

const newSplashBtnFn = async (title, user_id) => {

    const content = document.getElementById('content').value;

    console.log(title, content, user_id);
    const response = await fetch('/api/splashes', {
        method: 'POST',
        body: JSON.stringify({ title, content, user_id }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/bucket');
    } else {
        alert(response.statusText);
    }
};

const addDrop = async () => {
    const title = document.querySelector('.dropItem').value;
    const response = await fetch('/api/drops', {
        method: 'POST',
        body: JSON.stringify({ title }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/bucket');
    } else {
        alert(response.statusText);
    }
};

// const li = document.querySelectorAll('.makeSplash');// if (document.querySelector('.makeSplash')) {
document.querySelector('#dropList').addEventListener('click', (event) => {
    event.preventDefault();

    const title = event.target.dataset.title;
    const id = event.target.dataset.id;
    const user = event.target.dataset.user;

    if(event.target.matches('.makeSplash')){
        // console.log(title, user, id);
        toggleFn(title, user);
        removeDropBtnFn(id);
    }

});

/* start refactored the below code */

// document.querySelector('.newSplash').addEventListener('click', (event) => {
//     event.preventDefault();
//     const title = event.target.dataset.title;
//     const user = event.target.dataset.user;
//     // console.log(title, user);

//     newSplashBtnFn(title, user);
// });


// end document.querySelector('.drop'). addEventListener('click', addDrop);

/* refactored to have once event listener on this element */
document.querySelector('#mainWrap').addEventListener('click', (event) => {
    // event.preventDefault();
    const target = event.target;
    const title = target.dataset.title;
    // const id = target.dataset.id;
    const user = target.dataset.user;
    if(target.matches('.newSplash')){
        newSplashBtnFn(title, user);
    } else if (target.matches('.drop')){
        addDrop();
    } else if(target.matches('#upLoadSubBtn')){
        // upLoadPic();
    }
});
// document.querySelector('.makeSplash').addEventListener('click', (event) => {
// });
// }


// if (document.querySelector('.splash')) {
//     document.querySelector('.splash').addEventListener('click', newSplashBtnFn);
// }

