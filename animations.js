const filterButton = document.querySelector('.filter-button');
const filterButtonText = filterButton.querySelector('p');

filterButton.addEventListener('click', () => {
    filterButtonText.classList.add('shake-animation');
    filterButton.classList.add('click-color-animation');
})
filterButtonText.addEventListener('animationend', () => {
    filterButtonText.classList.remove('shake-animation');
    filterButton.classList.remove('click-color-animation');
});