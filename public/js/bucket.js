document.getElementById('newSplash_form').style.display = 'none';
document.getElementById('newDrop_form').style.display = 'flex';

// const createNewSplashBtnFn = async (title, user_id) => {

//     const response = await fetch('/api/splashes', {
//         method: 'POST',
//         body: JSON.stringify({ title, user_id }),
//         headers: { 'Content-Type': 'application/json'},
//     });

//     if (response.ok) {
//         console.log('New Splash Created!');
//     } else {
//         alert(response.statusText);
//     }
// };
const toggleFn = (title) => {
    console.log('HEY YOU GUYS!');
    document.getElementById('newSplash_form').style.display = 'flex';

    document.getElementById('newDrop_form').style.display = 'none';

    document.getElementById('title').innerHTML = 'Tell us about your ' + title + ' SPLASH adventure:';
};

// const removeDropBtnFn = async (id) => {

//     const response = await fetch(`/api/drops/${id}`, {
//         method: 'DELETE',
//         body: JSON.stringify({ id }),
//         headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//         response.end('Drop Deleted!');
//     } else {
//         alert(response.statusText);
//     }
// };

// // const getNewSplashBtnFn = async (title) => {

// //     const response = await fetch('/splash', {
// //         method: 'GET',
// //         body: JSON.stringify({ title }),
// //         headers: { 'Content-Type': 'appplication/json' },
// //     });

//     if (response.ok) {
//         document.location.replace('/splash');
//     } else {
//         alert(response.statusText);
//     }
// };
if (document.querySelector('.makeSplash')) {

    document.querySelector('.makeSplash').addEventListener('click', toggleFn);

    // document.querySelector('.makeSplash').addEventListener('click', removeDropBtnFn);
}



// document.querySelector('.makeSplash').addEventListener('click', getNewSplashBtnFn);