class Recipe {
    constructor(collectionData) {
        this._recipe = collectionData;
    }
    // constructor(collection, recipeList = []) {
    //     this._recipe = { [collection]: recipeList };
    // }

    get recipe() {
        return this._recipe;
    }

    // Create a new recipe and add to the recipe array
    addRecipe(collection) {
        console.log('make changes to', this._recipe)
        const recipeNameInput = document.querySelector("#recipeNameInput");
        const recipeName = recipeNameInput.value;
        const recipeImageInput = document.querySelector("#recipeImageInput");
        const recipeImage = recipeImageInput.value;;
        const Ingredients = document.querySelector("#Ingredients");
        const IngredientsValue = Ingredients.value;
        let newRecipe;
        if (recipeName && recipeImage && IngredientsValue) {
            newRecipe = {
                recipeName: recipeName,
                recipeImageUrl: recipeImage,
                recipeDescription: IngredientsValue
            }
        }
        if (Object.keys(this._recipe).includes(collection)) {
            // check if the collection input exists in the recipe object
            // if it is, push the new recipe to the array by pushing the new recipe to the array using collection as a key
            console.log('object', this._recipe)
            console.log('Before adding', this._recipe[collection])
            this._recipe[collection].push(newRecipe);
            console.log('After adding', this._recipe)
            localStorage.setItem('recipeData', JSON.stringify(this._recipe));
        } else {
            this._recipe[collection] = [newRecipe];
            localStorage.setItem('recipeData', JSON.stringify(this._recipe));
        }
    }


    // Edit recipe and display to updated information
    editRecipe(collection, recipeIndex) {
        const editRecipeNameInput = document.querySelector("#recipeNameInput");
        const editRecipeName = editRecipeNameInput.value;
        const editRecipeImageInput = document.querySelector("#recipeImageInput");
        const editRecipeImage = editRecipeImageInput.value;;
        const editIngredients = document.querySelector("#Ingredients");
        const editIngredientsValue = editIngredients.value;
        // find the collection using passed in collection name
        const collectionToEdit = this._recipe[collection];
        console.log('collection to edit', collectionToEdit);
        // find the recipe using passed in recipe index
        const recipeToEdit = collectionToEdit[recipeIndex];
        console.log('recipe to edit', recipeToEdit);
        if (editRecipeName && editRecipeImage && editIngredientsValue) {
            let updatedRecipe = {
                recipeName: editRecipeName,
                recipeImageUrl: editRecipeImage,
                recipeDescription: editIngredientsValue
            }
            this._recipe[collection][recipeIndex] = updatedRecipe;
            localStorage.setItem('recipeData', JSON.stringify(this._recipe));
        }
    }

    // Delete recipe from the array and save to localStorage
    deleteRecipe(collection, index) {
        // use collection Name as the key to access the array and delete the recipe
        let arrayToDelete = this._recipe[collection];
        console.log('Array to delete:', arrayToDelete)
        arrayToDelete.splice(index, 1);
        this._recipe[collection] = arrayToDelete;
        localStorage.setItem('recipeData', JSON.stringify(this._recipe));
    }

    deleteCollection(collectionName) {
        delete this._recipe[collectionName];
        localStorage.setItem('recipeData', JSON.stringify(this._recipe));
    }

}