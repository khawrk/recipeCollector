let collectionData = JSON.parse(localStorage.getItem('collectionData'));
let collectionName = window.location.search;
let urlParams = new URLSearchParams(collectionName);
var key = 'id';
// get the index for dynamic display
var idValue = urlParams.get(key);

const collectionInfo = document.querySelector('.collectionInfo');
collectionInfo.innerHTML = `
    <h1>${collectionData[idValue]}</h1>
`
