let formButton = document.querySelector('.filter-button');
formButton.addEventListener('click', filterText);

async function filterText() {
    let filteredText = await sendText("waa");
    displayFilteredText(filteredText);
}

async function sendText(textToFilter) {
    let filteredText;
    try {
        res  = await fetch('http://localhost/php_profanity_filter_api/api/post.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "text_to_filter": textToFilter
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
