document.addEventListener('DOMContentLoaded', function () {
    // get recipe data from localstorage
    let recipeFromLocal = JSON.parse(localStorage.getItem('recipeData'));
    console.log('recipe Data from local:', recipeFromLocal)

    // get recipe and collection name from url
    let recipeNameData = window.location.search;
    console.log(recipeNameData)
    let urlParams = new URLSearchParams(recipeNameData);
    var keyRecipe = 'recipe';
    const keyCollection = 'collection';

    // get the collectionName and receipeName from url using URLParams
    const collectionName = urlParams.get(keyCollection);
    console.log('data from collection:', collectionName)
    const recipeName = urlParams.get(keyRecipe);
    console.log('current recipe name:', recipeName)

    // use collectionName to find index of the collection
    const collectionData = JSON.parse(localStorage.getItem('collectionData'));
    const collectionIndex = collectionData.indexOf(collectionName);
    console.log(collectionIndex)

    // Click back button to go back to collection page using index
    const backBtn = document.getElementById('backBtn');
    backBtn.setAttribute('href', './collection.html?id=' + collectionIndex);

    // Access recipe data to display on what match with collection name and recipe name
    let recipeData = recipeFromLocal[collectionName];
    console.log('All recipes in the collection:', recipeData)

    // Make the data class instance from Recipe from local
    const RecipeClassToUse = new Recipe(recipeFromLocal)
    console.log('Recipe Class to use:', RecipeClassToUse)

    // display the recipe with the same name as the url params
    const recipeInfoDiv = document.getElementById('recipeInfoDiv');

    // Find the matching recipe
    // If matching recipe found, update the HTML; otherwise, display "no recipe" message
    let matchingRecipe;
    if (recipeData) {
        matchingRecipe = recipeData.find(data => data.recipeName === recipeName);
        console.log(matchingRecipe)
        let displayData = ``
        if (matchingRecipe) {
            console.log(matchingRecipe)
            displayData = `<h1>${matchingRecipe.recipeName}</h1>
        <img src="${matchingRecipe.recipeImageUrl}" alt="${matchingRecipe.recipeName}" style="width:100px; height:100px;">
        <h5>Ingredients</h5>        
        <p>${matchingRecipe.recipeDescription}</p>
        <button id="editRecipeBtn">Edit Recipe</button>
        <button id="deleteRecipeBtn">Delete Recipe</button>
        `
            recipeInfoDiv.innerHTML = displayData
        }
    } else {
        recipeInfoDiv.innerHTML = `
        <h3>There is no recipe with this name</h3>
    `;
    }


    // Click edit recipe button to show the edit recipe form and show existing data
    const editRecipeBtn = document.getElementById('editRecipeBtn');
    const editRecipeFormDiv = document.getElementById('editRecipeFormDiv');
    const recipeNameInput = document.getElementById('recipeNameInput');
    const recipeImageInput = document.getElementById('recipeImageInput');
    const Ingredients = document.getElementById('Ingredients');
    editRecipeBtn.addEventListener('click', () => {
        editRecipeFormDiv.style.display = 'block';
        recipeNameInput.value = matchingRecipe.recipeName;
        recipeImageInput.value = matchingRecipe.recipeImageUrl;
        Ingredients.value = matchingRecipe.recipeDescription;
    })

    // Submit the edit form and save to localstorage
    let previousIndex = recipeData.indexOf(matchingRecipe);
    const editRecipeForm = document.getElementById('editRecipeForm');
    editRecipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        RecipeClassToUse.editRecipe(collectionName, recipeData.indexOf(matchingRecipe));
        let newRecipeData = JSON.parse(localStorage.getItem('recipeData'));
        // use previous index to find the updated recipe
        let updatedRecipe = newRecipeData[collectionName][previousIndex];
        // update page url to display the updated recipe
        window.location.href = `./recipe.html?collection=${collectionName}&recipe=${updatedRecipe.recipeName}`;
        // window.location.href = './recipe.html?collection=' + collectionName + '&recipe=' + matchingRecipe.recipeName;
    })

    // Click cancel to make the form disappear
    const cancelEditRecipeBtn = document.getElementById('cancelEdit');
    cancelEditRecipeBtn.addEventListener('click', () => {
        editRecipeFormDiv.style.display = 'none';
    })

    // click delete button to delete the recipe 
    const deleteRecipeBtn = document.getElementById('deleteRecipeBtn');
    console.log('index in an array to delete:', recipeData.indexOf(matchingRecipe))
    deleteRecipeBtn.addEventListener('click', () => {
        RecipeClassToUse.deleteRecipe(collectionName, recipeData.indexOf(matchingRecipe));
        window.location.href = './collection.html?id=' + collectionIndex;
    })

})