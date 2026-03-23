// Javascript not strictly necessary for this layout as the items are just links instead of infinite scroll tiles.
document.addEventListener('DOMContentLoaded', () => {
    // Basic interaction for the theme toggle can go here if needed
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }
});
