let formButton = document.querySelector('.filter-button');
formButton.addEventListener('click', filterText);

async function filterText() {
    let textToFilter = document.getElementById('text-to-filter').value;
    let replaceWith = document.getElementById('replace-with').value;
    let filteredText = await sendText(textToFilter, replaceWith);
    displayData(filteredText);
}

class ProcessedMessage {
    constructor(filteredText, numberOfWords, numberOfSentences, top5Words) {
        this.filteredText = filteredText;
        this.top5Words = top5Words;
        this.numberOfWords = numberOfWords;
        this.numberOfSentences = numberOfSentences;
    }
}

async function sendText(textToFilter, replaceWith) {
    let filteredText;
    let numberOfWords;
    let numberOfSentences;
    let top5Words;
    let returnedMessage;
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
        let returnedDocument = await res.json();

        filteredText = returnedDocument.message;
        numberOfWords = returnedDocument.number_of_words;
        numberOfSentences = returnedDocument.number_of_sentences;
        top5Words = returnedDocument.top_5_words;

        returnedMessage = new ProcessedMessage(filteredText, numberOfWords, numberOfSentences, top5Words);
    }
    catch(err) {
        console.log(err.message);
    }
    return returnedMessage;
}

function displayData(returnedMessage) {
    document.querySelector('.extra-info').classList.remove('disabled');
    
    let outputText = document.querySelector('.output-text');
    let numberOfWords = document.querySelector('.number-of-words');
    let numberOfSentences = document.querySelector('.number-of-sentences');
    let top5Words = document.querySelector('.top-5-words');
    
    top5Words.innerHTML = '';

    outputText.textContent = returnedMessage.filteredText;
    numberOfWords.textContent = returnedMessage.numberOfWords;
    numberOfSentences.textContent = returnedMessage.numberOfSentences;

    let entries = returnedMessage.top5Words;

    for (const key in entries) {
        let word = key;
        let numberOfTimes = entries[key];
        let wordContainer = document.createElement("div");
        wordContainer.classList.add(".top-word");

        wordContainer.textContent = `\"${word}\", Number of appearances: ${numberOfTimes}`;
        top5Words.appendChild(wordContainer);
    }
}
