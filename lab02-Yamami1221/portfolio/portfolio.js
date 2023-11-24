const secretButton = document.querySelector('.jsEx');

secretButton.addEventListener('click', async () => {
    secretButton.classList.add('secret');
    window.alert('Yay!');
});