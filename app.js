
class RecipeCollection {
    constructor() {
        this._recipeCollection = [];
    }

    get recipeCollection() {
        return this._recipeCollection;
    }

    // add recipe
    addRecipe() {
        const nameInput = document.querySelector("#collectionNameInput")
        const name = nameInput.value;
        if (name) {
            this._recipeCollection.push(name);
            // save collection to localstorage
            localStorage.setItem('collectionData', JSON.stringify(this._recipeCollection));
            nameInput.value = '';
        }
    }

}

// click add collection to show the form
const addCollectionForm = document.querySelector('.addCollectionForm');
const handleClick = () => {
    addCollectionForm.style.display = 'block';
}

const collection = new RecipeCollection()
const firstData = collection.recipeCollection

const collectionFn = (content = firstData) => {
    const collectionContent = document.querySelector('.collectionContent');
    console.log(content)
    if (content.length === 0) {
        collectionContent.innerHTML = `
    <h1>Currently you don’t have any recipe collections </h1>
    <button onclick="handleClick()">Add Collection</button>
    `
    } else {
        let collections = ""
        content.forEach((data, index) => {
            collections += ` <a href="./collection.html?id=${index}"><p id="${index}">${data}</p></a>`
        })
        collectionContent.innerHTML = `
        <h1>Your Collections</h1>
        <div>${collections}</div>
       <button onclick="handleClick()">Add Collection</button>
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