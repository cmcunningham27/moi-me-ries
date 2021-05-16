document.getElementById('newSplash_form').style.display = 'none';
document.getElementById('newDrop_form').style.display = 'flex';
document.getElementById('bigSplash').style.display = 'none';

const shortSplash= document.querySelectorAll('.shortSplash');
shortSplash.forEach((splash)=>{
    splash.style.display='flex';
});

//toggles between the add drop input bar and the add a splash (with photo and description) menu
const toggleFn = (title, user_id) => {
    document.getElementById('title').innerHTML = 'Tell us about your ' + title + ' SPLASH adventure:';

    document.querySelector('.newSplash').setAttribute('data-title', title);
    document.querySelector('.newSplash').setAttribute('data-user_id', user_id);

    document.getElementById('newSplash_form').style.display = 'flex';
    document.getElementById('newDrop_form').style.display = 'none';
};

//makes the short form splashes go away
const splashToggleFn = () =>{
    shortSplash.forEach((splash)=>{
        splash.style.display='none';
    });
    document.getElementById('bigSplash').style.display = 'flex';
};

//deletes the drop from database
const removeDropBtnFn = async (id) => {
    const response = await fetch(`/api/drops/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        response.statusText;
    } else {
        alert(response.statusText);
    }
};


const extractImageName = (image) => {
    let image_name = '';

    for (let i=12; i < image.length; i++) {
        image_name += image[i];
    }

    return image_name;
};

//takes data form the create splash menu and the drop that was clicked on and makes new splash
const newSplashBtnFn = async (title, user_id) => {

    const content = document.getElementById('content').value;
    const imageFile = await document.getElementById('upLoadInput').value;
    const image = extractImageName(imageFile);
    const response = await fetch('/api/splashes', {
        method: 'POST',
        body: JSON.stringify({ title, content, image, user_id }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        document.location.replace('/bucket');
    } else {
        alert(response.statusText);
    }
};

//adds a drop to db
const addDrop = async () => {
    const title = document.querySelector('.dropItem').value;
    const response = await fetch('/api/drops', {
        method: 'POST',
        body: JSON.stringify({ title }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        document.location.replace('/bucket');
    } else {
        alert(response.statusText);
    }
};

//delegating event listener on the left hand column
document.querySelector('#dropList').addEventListener('click', (event) => {
    event.preventDefault();

    const title = event.target.dataset.title;
    const id = event.target.dataset.id;
    const user_id = event.target.dataset.user_id;

    if(event.target.matches('.makeSplash')){
        toggleFn(title, user_id);
        removeDropBtnFn(id);
    }

});

//hides short form splashes then sets the info in the large form splash then switches large form splash display on
const bigSplash = async (event) => {
    const target = event.target;
    const dataset = target.dataset;

    const shortSplashes=document.querySelectorAll('.shortSplash');

    shortSplashes.forEach((splash) => {
        splash.setAttribute('style','display:none');
    });

    document.querySelector('#bigSplashTitle').innerHTML = dataset.title;
    document.querySelector('#bigSplashText').innerHTML = dataset.content;
    document.querySelector('#bigSplashImage').setAttribute('src', `/images/pre_db/${dataset.image}`);
    document.querySelector('#bigSplash').style = 'display:flex';
};

//delegates event listener across main section  (right hand column)
document.querySelector('#mainWrap').addEventListener('click', (event) => {

    const target = event.target;
    const title = target.dataset.title;
    const user_id = target.dataset.user_id;
    if(target.matches('.newSplash')){
        newSplashBtnFn(title, user_id);
    } else if (target.matches('.drop')){
        addDrop();
    } else if(target.matches('.shortSplash')){
        bigSplash(event);
    }
});

//delegates event listener across the list of splash titles
document.querySelector('#splashTitleList').addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.matches('.splashTitle')){
        bigSplash(event);
    }
});