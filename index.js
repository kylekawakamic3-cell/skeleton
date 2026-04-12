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

    // UI Elements for detail swapped
    const introSection = document.getElementById('intro-section');
    const detailSection = document.getElementById('project-detail-section');
    const detailTitle = document.getElementById('detail-title');
    const detailDesc = document.getElementById('detail-desc');
    const backBtn = document.getElementById('back-button');
    const overviewMode = document.getElementById('overview-mode');
    const detailsMode = document.getElementById('details-mode');
    const scrollContainer = document.getElementById('scroll-container');

    const projectsData = [
        {
            title: "C3 Code",
            desc: "Full redesign of the core platform experience centered around an agentic, \"vibe-coding\" framework. This transformation decentralized app deployment, enabling a single business user to achieve in 10 minutes what previously required a dedicated engineering team and a 6 month roadmap.",
            specs: { "Client": "C3.AI", "Solution": "Agentic AI App Builder", "Contribution": "End-to-End Redesign", "Year": "2025", "Scope": "1 year" },
            images: ["assets/c3-code-1.png"]
        },
        {
            title: "AI Agent Workbench",
            desc: "Led the responsive redesign of the primary dashboard interface to accelerate AI agent workflow deployments.",
            specs: { "Client": "C3.AI", "Solution": "AI Agent Workbench & Monitoring", "Contribution": "Workbench, Monitoring, Gallery", "Year": "2025", "Scope": "3 months" },
            images: []
        },
        {
            title: "MCP Server & Client",
            desc: "Designed intuitive consumer-facing application interfaces focusing on data clarity and performance.",
            specs: { "Client": "C3.AI", "Solution": "MCP Server & Client UI", "Contribution": "Lead Product Designer", "Year": "2025", "Scope": "2 months" },
            images: []
        },
        {
            title: "AMD Demand Forecasting",
            desc: "Designed holistic overview components mapping internal logistical hardware consumption patterns and workflows.",
            specs: { "Client": "AMD", "Solution": "Demand Forecasting Base App", "Contribution": "Edit Forecast", "Year": "2025", "Scope": "2 months" },
            images: []
        },
        {
            title: "Automating Parachute Packing",
            desc: "Established a cohesive design system uniting mobile and web platforms to track scalable logistics.",
            specs: { "Client": "U.S. Army", "Solution": "Dashboard & Equipment Redesign", "Contribution": "Lead Product Designer", "Year": "2024", "Scope": "8 months" },
            images: []
        }
    ];

    if (previewBox && pills.length > 0) {
        let currentIndex = 0;
        let timer = null;
        let isHovered = false;
        let isDetailMode = false;

        previewBox.classList.add('visible');

        const showProject = (index, manual = false) => {
            if (isDetailMode) return;
            pills.forEach(p => {
                p.classList.remove('active');
                p.classList.remove('timer-active');
                p.classList.remove('manual-active');
            });

            pills[index].classList.add('active');

            if (manual) {
                pills[index].classList.add('manual-active');
            } else {
                void pills[index].offsetWidth;
                pills[index].classList.add('timer-active');
            }

            const image = projectsData[index].images[0];
            if (image) {
                previewBox.innerHTML = `
                    <div class="preview-image-container" style="width:100%; height:100%; overflow:hidden; border-radius:20px;">
                        <img src="${image}" alt="${projectsData[index].title}" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                `;
            } else {
                previewBox.innerHTML = `
                    <div style="display:flex; align-items:center; justify-content:center; height:100%; color:#888; font-size: 24px; font-weight: 500;">
                        Previewing: ${pills[index].textContent.trim()}
                    </div>
                `;
            }
        };

        const startTimer = () => {
            if (timer) clearInterval(timer);
            if (isDetailMode) return;
            showProject(currentIndex, false);

            timer = setInterval(() => {
                if (!isHovered && !isDetailMode) {
                    currentIndex = (currentIndex + 1) % pills.length;
                    showProject(currentIndex, false);
                }
            }, 5000);
        };

        const openDetails = (index) => {
            isDetailMode = true;
            if (timer) clearInterval(timer);
            detailTitle.textContent = projectsData[index].title;
            detailDesc.textContent = projectsData[index].desc;

            // Reset scrolling tracking
            if (scrollContainer) scrollContainer.scrollTop = 0;

            const specs = projectsData[index].specs;
            let specsHTML = '';
            for (const [key, value] of Object.entries(specs)) {
                specsHTML += `
                    <div class="spec-row">
                        <span class="spec-key">${key}</span>
                        <span class="spec-val">${value}</span>
                    </div>
                `;
            }
            document.getElementById('project-specs').innerHTML = specsHTML;

            // Fill Detail Mode images
            if (scrollContainer) {
                const images = projectsData[index].images;
                if (images && images.length > 0) {
                    scrollContainer.innerHTML = images.map(src => `
                        <div class="detail-image-container" style="width:100%; border-radius:20px; overflow:hidden; margin-bottom:24px;">
                            <img src="${src}" alt="${projectsData[index].title}" style="width:100%; height:auto; display:block;">
                        </div>
                    `).join('');
                } else {
                    scrollContainer.innerHTML = Array(5).fill('<div class="placeholder-img"></div>').join('');
                }
            }

            // Highlight the exact pill clicked statically
            pills.forEach(p => {
                p.classList.remove('active', 'timer-active', 'manual-active');
            });
            pills[index].classList.add('active', 'manual-active');

            const image = projectsData[index].images[0];
            if (image) {
                previewBox.innerHTML = `
                    <div class="preview-image-container" style="width:100%; height:100%; overflow:hidden; border-radius:20px;">
                        <img src="${image}" alt="${pills[index].textContent.trim()}" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                `;
            } else {
                previewBox.innerHTML = `
                    <div style="display:flex; align-items:center; justify-content:center; height:100%; color:#888; font-size: 24px; font-weight: 500;">
                        Previewing: ${pills[index].textContent.trim()}
                    </div>
                `;
            }

            introSection.classList.add('hidden');
            detailSection.classList.add('visible');
            overviewMode.classList.add('hidden');
            detailsMode.classList.add('visible');
        };

        const closeDetails = () => {
            isDetailMode = false;
            introSection.classList.remove('hidden');
            detailSection.classList.remove('visible');
            overviewMode.classList.remove('hidden');
            detailsMode.classList.remove('visible');
            startTimer();
        };

        if (backBtn) backBtn.addEventListener('click', closeDetails);
        previewBox.addEventListener('click', () => openDetails(currentIndex));

        showProject(currentIndex, false);
        startTimer();

        pills.forEach((pill, index) => {
            pill.addEventListener('click', (e) => {
                e.preventDefault();
                currentIndex = index;
                openDetails(currentIndex);
            });
            pill.addEventListener('mouseenter', () => {
                if (isDetailMode) return;
                isHovered = true;
                currentIndex = index;
                if (timer) clearInterval(timer);
                showProject(currentIndex, true);
            });
            pill.addEventListener('mouseleave', () => {
                if (isDetailMode) return;
                isHovered = false;
                startTimer();
            });
        });
    }
});
