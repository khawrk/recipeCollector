class RecipeCollection {
    constructor(collectionArr = []) {
        this._recipeCollection = collectionArr;
    }

    get recipeCollection() {
        return this._recipeCollection;
    }

    // add collection - CREATE
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

    // edit & save collection - UPDATE
    editCollection() {
        const editInput = document.querySelector('.editInput')
        const editInputValue = editInput.value;
        const editInputId = editInput.getAttribute('id');
        // get the collection name before edit. Use it to find the key of the recipe data and update the key
        const collectionNameBeforeEdit = this._recipeCollection[editInputId];
        console.log('collectionNameBeforeEdit', collectionNameBeforeEdit)
        console.log('index of input in an array to update:', editInputId)
        console.log('new collection name:', editInputValue);
        // update the collection name and update to localstorage
        this._recipeCollection[editInputId] = editInputValue;
        const recipeData = JSON.parse(localStorage.getItem('recipeData'));

        // update the key of the recipe data
        console.log('current recipe data', recipeData)
        const newKey = editInputValue;
        if (recipeData.hasOwnProperty(collectionNameBeforeEdit)) {
            // keep the value of the old key
            let valueToKeep = recipeData[collectionNameBeforeEdit];
            //delete the old key
            delete recipeData[collectionNameBeforeEdit];
            // add the new key and value
            recipeData[newKey] = valueToKeep;
            console.log('new recipe data', recipeData)
        }
        localStorage.setItem('recipeData', JSON.stringify(recipeData));
        localStorage.setItem('collectionData', JSON.stringify(this._recipeCollection));
        editInput.value = '';
        editForm.style.display = 'none';
    }

    // delete collection receipe - DELETE 
    deleteCollection(index) {
        this._recipeCollection.splice(index, 1);
        localStorage.setItem('collectionData', JSON.stringify(this._recipeCollection));
    }

}