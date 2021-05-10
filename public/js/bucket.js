document.getElementById('newSplash_form').style.display = 'none';
document.getElementById('newDrop_form').style.display = 'flex';

const toggleFn = (title, user_id) => {
    // console.log('HEY YOU GUYS!');
    // console.log(user_id);

    document.getElementById('title').innerHTML = 'Tell us about your ' + title + ' SPLASH adventure:';

    document.querySelector('.newSplash').setAttribute('onclick', 'newSplashBtnFn("' + title + '", "' + user_id + '")');

    document.getElementById('newSplash_form').style.display = 'flex';

    document.getElementById('newDrop_form').style.display = 'none';
};

// const removeDropBtnFn = async (id) => {
//     const response = await fetch(`/api/drops/${id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//         response.statusText;
//     } else {
//         alert(response.statusText);
//     }
// };

const newSplashBtnFn = async (title, user_id) => {
    // console.log('New splash in the works!');
    // console.log(user_id);

    const content = document.getElementById('content').value;
    // console.log(content);
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

if (document.querySelector('.makeSplash')) {
    document.querySelector('.makeSplash').addEventListener('click', toggleFn);
    // document.querySelector('.makeSplash').addEventListener('click', removeDropBtnFn);
}

if (document.querySelector('.splash')) {
    document.querySelector('.splash').addEventListener('click', newSplashBtnFn);
}



// document.querySelector('.makeSplash').addEventListener('click', getNewSplashBtnFn);