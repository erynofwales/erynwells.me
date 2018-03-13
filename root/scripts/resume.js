const sideProjects = {
    allButton: null,
    categoryButtons: [],
    projects: [],

    categoryStatus() {
        const stat = {};
        let showAll = this.allButton.classList.contains('selected');
        this.categoryButtons.forEach((btn) => {
            let c = btn.dataset.category;
            stat[c] = showAll ? showAll : btn.classList.contains('selected');
        });
        return stat;
    },

    populate(projectsElement) {
        const btn = projectsElement.querySelector('button[data-category="all"]');
        this._setupAllButton(btn);

        projectsElement.querySelectorAll('button[data-category]').forEach(function(btn) {
            let category = btn.dataset.category;
            if (category != null && category != 'all') {
                sideProjects.categoryButtons.push(btn);
                sideProjects._setupCategoryButton(btn);
            }
        });

        this.projects = projectsElement.querySelectorAll('.project');
    },

    updateProjectVisibility() {
        const stat = this.categoryStatus();
        this.projects.forEach((proj) => {
            let category = proj.dataset.category;
            if (!stat[category]) {
                proj.setAttribute('hidden', '');
            } else {
                proj.removeAttribute('hidden');
            }
        });
    },

    _setupAllButton(btn) {
        this.allButton = btn;

        btn.addEventListener('click', function() {
            let toggledOn = this.classList.contains('selected');
            if (!toggledOn) {
                return;
            }

            sideProjects.categoryButtons.forEach((cBtn) => {
                cBtn.classList.remove('selected');
            });

            sideProjects.updateProjectVisibility();
        });
    },

    _setupCategoryButton(btn) {
        btn.addEventListener('click', function() {
            const stat = sideProjects.categoryStatus();
            let noCategoriesSelected = Object.values(stat).every((v) => !v);
            let allCategoriesSelected = Object.values(stat).every((v) => v);
            if (noCategoriesSelected || allCategoriesSelected) {
                sideProjects.allButton.click();
            } else {
                sideProjects.allButton.classList.remove('selected');
            }
            sideProjects.updateProjectVisibility();
        });
    },
};

window.addEventListener('load', function() {
    // Set up toggle buttons.
    document.querySelectorAll('button.toggle').forEach((btn) => {
        btn.addEventListener('click', function(event) {
            event.currentTarget.classList.toggle('selected');
        });
    });

    const projectsElement = document.querySelector('#side-projects');
    sideProjects.populate(projectsElement);
    sideProjects.allButton.click();
});

