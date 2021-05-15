document.getElementById('newSplash_form').style.display = 'none';
document.getElementById('newDrop_form').style.display = 'flex';
const shortSplash= document.querySelectorAll('.shortSplash');
document.getElementById('bigSplash').style.display = 'none';

shortSplash.forEach((splash)=>{
    splash.style.display='flex';
});

const toggleFn = (title, user_id) => {
    // console.log('HEY YOU GUYS!');
    // console.log(user_id);

    document.getElementById('title').innerHTML = 'Tell us about your ' + title + ' SPLASH adventure:';

    // document.querySelector('.upLoadSubBtn').setAttribute('data-title', title);
    // document.querySelector('.upLoadSubBtn').setAttribute('data-user_id', user_id);
    document.querySelector('.newSplash').setAttribute('data-title', title);
    document.querySelector('.newSplash').setAttribute('data-user_id', user_id);

    document.getElementById('newSplash_form').style.display = 'flex';

    document.getElementById('newDrop_form').style.display = 'none';
};

const splashToggleFn = () =>{
    shortSplash.forEach((splash)=>{
        splash.style.display='none';
    });
    document.getElementById('bigSplash').style.display = 'flex';
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

const extractImageName = (image) => {
    // console.log(image);
    let image_name = '';
    for (let i=12; i < image.length; i++) {
        image_name += image[i];
    }
    return image_name;
};
// C:\fakepath\quill.png
const newSplashBtnFn = async (title, user_id) => {

    const content = document.getElementById('content').value;
    const imageFile = await document.getElementById('upLoadInput').value;
    const image = extractImageName(imageFile);
    console.log('!!!! new splash fn!!!!', title, content, image, user_id);
    const response = await fetch('/api/splashes', {
        method: 'POST',
        body: JSON.stringify({ title, content, image, user_id }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/bucket');
    } else {
        console.log(response);
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
    const user_id = event.target.dataset.user_id;

    if(event.target.matches('.makeSplash')){
        // console.log(title, user, id);
        toggleFn(title, user_id);
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

/* refactored to have one event listener on this element */
document.querySelector('#mainWrap').addEventListener('click', (event) => {
    // event.preventDefault();

    const target = event.target;
    console.log(target);
    const title = target.dataset.title;
    // const id = target.dataset.id;
    const user_id = target.dataset.user_id;
    if(target.matches('.newSplash')){
        newSplashBtnFn(title, user_id);
    } else if (target.matches('.drop')){
        addDrop();
    }
});

const bigSplash= async (event)=>{
    console.log (event.target);
    const response=await fetch(`/api/splashes/${event.target.dataset.id}`, {
        headers:{'Content-Type':'application/json'}
    });
    console.log(response,'response');
    if (response.ok){
        // document.location.replace('/bucket');
    } else{
        alert(response.statusText);
    }

};

document.querySelector('#splashTitleList').addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.matches('.splashTitle')){
        const shortSplashes=document.querySelectorAll('.shortSplash');
        shortSplashes.forEach((splash)=>{
            splash.setAttribute('style','display:none');
        });
        bigSplash(event);
    }

});
// }


// if (document.querySelector('.splash')) {
//     document.querySelector('.splash').addEventListener('click', newSplashBtnFn);
// }

