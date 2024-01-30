document.addEventListener('DOMContentLoaded', function () {
    // get collection data from localstorage
    let collectionData = JSON.parse(localStorage.getItem('collectionData'));
    console.log('Collection data from localstorage:', collectionData)
    let collectionDataClass = new RecipeCollection(collectionData);
    console.log('convert collection data to Class:', collectionDataClass)
    // let dataToUse = collectionDataClass.recipeCollection
    // console.log(dataToUse)

    let collectionName = window.location.search;
    console.log('collection search index:', collectionName)
    let urlParams = new URLSearchParams(collectionName);
    var key = 'id';
    // get the index for dynamic display
    var idValue = urlParams.get(key);
    console.log('collection index to display:', idValue)

    function displayCollection(data = collectionDataClass.recipeCollection) {
        // Display Collection Name
        const collectionInfo = document.querySelector('.collectionInfo');
        collectionInfo.innerHTML = `
    <div style="display:flex; justify-content: space-between; margin-left:2rem; margin-right:2rem;">
    <a href="./index.html" id='backBtn'><button>Back</button></a>
    <button id="addRecipeBtn" style="width:100px; height: 30px; background-color: #70B9BE; color: white; border-radius: 10px;
            background: var($color-white);
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
            border: 1px solid #70B9BE; margin-top:1rem;">Add Recipe</button>
    </div>
    <h1 style="margin-top:2rem;">${data[idValue]}</h1>
`
    }

    displayCollection();

    // Display Recipe
    // Get recipe data from localStorage using collection CollectionDataClass.recipeCollection[idValue] as a key
    let recipeRawData = JSON.parse(localStorage.getItem('recipeData'));
    console.log('recipeRawData = recipe data from localStorage:', recipeRawData)
    // object key = collection name
    let objkey = collectionDataClass.recipeCollection[idValue].toString();
    console.log('collection name:', objkey)
    if (recipeRawData) {
        console.log('keys in the recipeData Object:', Object.keys(recipeRawData))
    }
    let recipeAllContent = ``;
    function displayRecipe() {
        // get recipe array 
        if (recipeRawData && Object.keys(recipeRawData).includes(objkey) && recipeRawData[objkey].length > 0) {
            let recipeArray = recipeRawData[objkey];
            console.log('what to display:', recipeArray)
            // create new Recipe class using collection name as a key and array as a value
            let recipeDataClass = new Recipe(objkey, recipeArray);
            console.log(recipeDataClass.recipe)

            // loop through the array to display recipe
            recipeArray.forEach((data) => {
                recipeAllContent += `
        <div>
            <a href="./recipe.html?collection=${objkey}&recipe=${data['recipeName']}">
            <h4>${data['recipeName']}</h4>
            <div id='recipeImg'>
            <img src="${data['recipeImageUrl']}" alt="${data['recipeName']}" ">
            </div>            
            </a>
        </div>`;
            })

        } else {
            recipeAllContent = ` <h4>Currently you don’t have any recipes in this collection </h4>`
        }
        const recipeContent = document.querySelector('#recipeInfo');
        recipeContent.innerHTML = recipeAllContent;
    }

    displayRecipe();

    // Create an edit form content
    const EditForm = document.getElementById('editForm');
    const editInput = document.querySelector('.editInput')
    editInput.setAttribute('id', idValue)
    const editCollectionBtn = document.getElementById('editCollectionBtn')
    const collectionNameInput = document.querySelector('.editInput');
    editCollectionBtn.addEventListener('click', () => {
        EditForm.style.display = 'block';
        collectionNameInput.value = collectionDataClass.recipeCollection[idValue];
        console.log('clicked')
    })

    // submit edit form, save to localstorage, and make the form disappear
    const saveChangeBtn = document.getElementById('saveChangeBtn');
    EditForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(collectionDataClass.recipeCollection[idValue])
        collectionDataClass.editCollection();
        this.location.reload();
    })

    // Delete the collection and redirect to index.html
    const deleteCollectionBtn = document.getElementById('deleteCollectionBtn');
    deleteCollectionBtn.addEventListener('click', () => {
        collectionDataClass.deleteCollection(idValue);
        recipeClassData.deleteCollection(collectionKey);
        window.location.href = './index.html';
    })

    // Click add recipe button to show the adding recipe div
    const addRecipeBtn = document.getElementById('addRecipeBtn');
    const addRecipeDiv = document.querySelector('#addRecipeDiv');
    addRecipeBtn.addEventListener('click', () => {
        addRecipeDiv.style.display = 'block';
    })

    // click cancel btn to make the form disappear
    const cancelBtn = document.getElementById('cancelBtn');
    cancelBtn.addEventListener('click', () => {
        addRecipeDiv.style.display = 'none';
    })

    // let useCollectionData;
    // console.log('recipeRawData is', recipeRawData)
    // if (recipeRawData) {
    //     console.log('recipeRawData[objkey] is', Object.keys(recipeRawData)[0])
    // }
    // if (!recipeRawData || Object.keys(recipeRawData)[0] !== objkey) {
    //     // useCollectionData = new Recipe(objkey)
    //     console.log('collectionData to add to', recipeRawData)
    //     console.log('array of useCollectionData is', recipeRawData.recipe)
    // } else if (Object.keys(recipeRawData)[0] === objkey) {
    //     console.log('recipeRawData[objkey] is', recipeRawData[objkey])
    //     console.log('objkey is', objkey)
    //     useCollectionData = new Recipe(objkey, recipeRawData[objkey])
    //     console.log('collectionData to add to', useCollectionData)
    // }

    // get collection key to add recipe
    let collectionKey = collectionDataClass.recipeCollection[idValue];
    console.log(`Collection Key: ${collectionKey}`)

    // convert rawData to class instance
    let recipeClassData;
    if (!recipeRawData) {
        let startingData = { [collectionKey]: [] }
        recipeClassData = new Recipe(startingData)
    } else {
        recipeClassData = new Recipe(recipeRawData)
    }
    console.log('recipeData:', recipeClassData)

    // Submit form to add recipe to the collection
    const recipeForm = document.getElementById('addRecipeForm');
    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // get value to add recipe to the collection
        recipeClassData.addRecipe(collectionKey)
        addRecipeDiv.style.display = 'none';
        // displayCollection();
        location.reload();
    })

})