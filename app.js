document.addEventListener("DOMContentLoaded", function () {
    var overlay = document.getElementById("overlay");

    // Show overlay
    overlay.style.display = "block";

    // Hide overlay after 5 seconds
    setTimeout(function () {
        overlay.style.opacity = "0";
        setTimeout(function () {
            overlay.style.display = "none";
        }, 600);
    }, 3000);
});

// click add collection to show the form
const addCollectionForm = document.querySelector('.addCollectionForm');

const handleClick = () => {
    addCollectionForm.style.display = 'block';
}

// get data from localstorage
const collectionFromLocalStorage = JSON.parse(localStorage.getItem('collectionData'));
console.log(collectionFromLocalStorage)
let firstData;
let collection;
if (collectionFromLocalStorage) {
    collection = new RecipeCollection(collectionFromLocalStorage);
    firstData = collection.recipeCollection;
} else {
    collection = new RecipeCollection();
    firstData = collection.recipeCollection;
}

const collectionFn = (content = firstData) => {
    const collectionContent = document.querySelector('.collectionContent');
    console.log(content)
    if (content.length === 0) {
        collectionContent.innerHTML = `
    <h1>Currently you don’t have any recipe collections </h1>
    <button id="addCollectionBtn" onclick="handleClick()">Add Collection</button>
    `
    } else {
        let collections = ""
        content.forEach((data, index) => {
            collections += ` <li><a href="./collection.html?id=${index}"><p id="${index}"><i class="fa-solid fa-utensils" style="color: #70b9be;"></i> ${data}</p></a></li>`
        })
        collectionContent.innerHTML = `
        <h1>Your Collections</h1>
        <div>
<ul>${collections}</ul></div>
       <button id="addCollectionBtn" onclick="handleClick()">Add Collection</button>
        `
    }
}

let collectionData = JSON.parse(localStorage.getItem('collectionData')); // fetch location from localstorage
if (collectionData) {
    collectionFn(collectionData);
} else {
    collectionFn();
}

// submit the form and add new collection then display
const collectionForm = document.querySelector('#collectionForm');
collectionForm.addEventListener('submit', (e) => {
    e.preventDefault()
    collection.addRecipe()
    addCollectionForm.style.display = 'none';
    collectionFn();
})

