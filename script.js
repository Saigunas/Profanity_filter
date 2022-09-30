let formButton = document.querySelector('.filter-button');
formButton.addEventListener('click', filterText);

async function filterText() {
    let textToFilter = document.getElementById('text-to-filter').value;
    let replaceWith = document.getElementById('replace-with').value;
    let filteredText = await sendText(textToFilter, replaceWith);
    displayFilteredText(filteredText);
}

async function sendText(textToFilter, replaceWith) {
    let filteredText;
    try {
        res  = await fetch('https://profanity-filter-php.herokuapp.com/api/index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "text_to_filter": textToFilter,
                "replace_with": replaceWith
            })
        })
        filteredText = (await res.json()).message;
    }
    catch(err) {
        console.log(err.message);
    }
    console.log(filteredText);
    return filteredText;
}

function displayFilteredText(filteredText) {
    let outputText = document.querySelector('.output-text');
    outputText.textContent = filteredText;
}
