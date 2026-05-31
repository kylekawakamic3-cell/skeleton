document.addEventListener('DOMContentLoaded', () => {
    // Scroll indicator shadow on header
    const topNav = document.querySelector('.top-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            topNav.classList.add('scrolled');
        } else {
            topNav.classList.remove('scrolled');
        }
    });

    // Basic interaction for the theme toggle can go here if needed
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

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
            images: ["assets/c3-code-1-transparent.png"],
            video: "assets/c3-code-recording.mov#t=2"
        },
        {
            title: "AI Agent Workbench",
            desc: "Led the responsive redesign of the primary dashboard interface to accelerate AI agent workflow deployments.",
            specs: { "Client": "C3.AI", "Solution": "AI Agent Workbench & Monitoring", "Contribution": "Workbench, Monitoring, Gallery", "Year": "2025", "Scope": "3 months" },
            images: ["assets/ai-agent-workbench-1.png"]
        },
        {
            title: "MCP Server & Client",
            desc: "Designed intuitive consumer-facing application interfaces focusing on data clarity and performance.",
            specs: { "Client": "C3.AI", "Solution": "MCP Server & Client UI", "Contribution": "Lead Product Designer", "Year": "2025", "Scope": "2 months" },
            images: ["assets/mcp-server-1.png"]
        },
        {
            title: "Demand Forecasting",
            desc: "Designed holistic overview components mapping internal logistical hardware consumption patterns and workflows.",
            specs: { "Client": "AMD", "Solution": "Demand Forecasting Base App", "Contribution": "Edit Forecast", "Year": "2025", "Scope": "2 months" },
            images: ["assets/demand-forecasting-1.png"]
        },
        {
            title: "Automating Parachute Packing",
            desc: "Established a cohesive design system uniting mobile and web platforms to track scalable logistics.",
            specs: { "Client": "U.S. Army", "Solution": "Dashboard & Equipment Redesign", "Contribution": "Lead Product Designer", "Year": "2024", "Scope": "8 months" },
            images: []
        }
    ];

    // Preload all project images so they display instantly on hover
    projectsData.forEach(project => {
        if (project.images && project.images.length > 0) {
            project.images.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        }
    });

    const projectsList = document.getElementById('projects-list');

    const openDetails = (index) => {
        detailTitle.textContent = projectsData[index].title;
        detailDesc.textContent = projectsData[index].desc;

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

        if (scrollContainer) {
            const images = projectsData[index].images;
            const placeholders = Array(3).fill('<div class="detail-image-card"></div>').join('');
            if (images && images.length > 0) {
                scrollContainer.innerHTML = images.map(src => `
                    <div class="detail-image-card">
                        <div class="preview-image-container" style="width:100%; height:100%; overflow:hidden; border-radius:20px;">
                            <img src="${src}" alt="${projectsData[index].title}" class="preview-image">
                        </div>
                    </div>
                `).join('') + placeholders;
            } else {
                scrollContainer.innerHTML = placeholders;
            }
        }

        introSection.classList.add('hidden');
        detailSection.classList.add('visible');
        overviewMode.classList.add('hidden');
        detailsMode.classList.add('visible');
    };

    const closeDetails = () => {
        introSection.classList.remove('hidden');
        detailSection.classList.remove('visible');
        overviewMode.classList.remove('hidden');
        detailsMode.classList.remove('visible');
    };

    if (backBtn) backBtn.addEventListener('click', closeDetails);

    if (projectsList) {
        projectsList.innerHTML = projectsData.map((p, i) => {
            let mediaHTML;
            if (p.video) {
                mediaHTML = `<video src="${p.video}" class="card-media" autoplay loop muted playsinline></video>`;
            } else if (p.images && p.images.length > 0) {
                mediaHTML = `<img src="${p.images[0]}" alt="${p.title}" class="card-media">`;
            } else {
                mediaHTML = `<div class="card-media card-placeholder"></div>`;
            }
            return `
                <div class="project-card" data-index="${i}">
                    <div class="card-media-wrap">${mediaHTML}</div>
                    <div class="card-meta"><span class="card-title">${p.title}</span> · ${p.specs.Client} · ${p.specs.Contribution}</div>
                </div>
            `;
        }).join('');

        projectsList.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => openDetails(parseInt(card.dataset.index)));
        });
    }
});
