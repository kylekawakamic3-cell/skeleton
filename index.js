document.addEventListener('DOMContentLoaded', () => {
    // Basic interaction for the theme toggle can go here if needed
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    const pills = document.querySelectorAll('.project-pill');
    const previewBox = document.getElementById('project-preview');

    if (previewBox && pills.length > 0) {
        let currentIndex = 0;
        let timer = null;
        let isHovered = false;

        previewBox.classList.add('visible');

        const showProject = (index, manual = false) => {
            pills.forEach(p => {
                p.classList.remove('active');
                p.classList.remove('timer-active');
                p.classList.remove('manual-active');
            });
            
            pills[index].classList.add('active');
            
            if (manual) {
                pills[index].classList.add('manual-active');
            } else {
                // Force a reflow so the CSS animation restarts from 0 continuously
                void pills[index].offsetWidth;
                pills[index].classList.add('timer-active');
            }
            
            // Just displaying the text for the demo to show it's updating!
            previewBox.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:center; height:100%; color:#888; font-size: 24px; font-weight: 500;">
                    Previewing: ${pills[index].textContent.trim()}
                </div>
            `;
        };

        const startTimer = () => {
            if (timer) clearInterval(timer);
            // Re-trigger the timer animation on the current one since mouse left
            showProject(currentIndex, false);
            
            timer = setInterval(() => {
                if (!isHovered) {
                    currentIndex = (currentIndex + 1) % pills.length;
                    showProject(currentIndex, false);
                }
            }, 5000);
        };

        // start initial sequence
        showProject(currentIndex, false);
        startTimer();

        pills.forEach((pill, index) => {
            pill.addEventListener('mouseenter', () => {
                isHovered = true;
                currentIndex = index;
                if (timer) clearInterval(timer);
                showProject(currentIndex, true);
            });
            pill.addEventListener('mouseleave', () => {
                isHovered = false;
                startTimer(); 
            });
        });
    }
});
