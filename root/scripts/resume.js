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
        projectsElement.querySelectorAll('button[data-category]').forEach((btn) => {
            let category = btn.dataset.category;
            if (category == 'all') {
                sideProjects._setupAllButton(btn);
            } else if (category != null) {
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
            this.classList.add('selected');
            sideProjects.categoryButtons.forEach((btn) => {
                btn.classList.remove('selected');
            });
            sideProjects.updateProjectVisibility();
        });
    },

    _setupCategoryButton(btn) {
        btn.addEventListener('click', function() {
            this.classList.toggle('selected');

            if (this.classList.contains('selected')) {
                sideProjects.allButton.classList.remove('selected');
            } else {
                const stat = sideProjects.categoryStatus();
                const noCategoriesSelected = Object.values(stat).every((v) => !v);
                const allCategoriesSelected = Object.values(stat).every((v) => v);
                if (noCategoriesSelected || allCategoriesSelected) {
                    sideProjects.allButton.classList.add('selected');
                }
            }

            sideProjects.updateProjectVisibility();
        });
    },
};

window.addEventListener('load', function() {
    const projectsElement = document.querySelector('#side-projects');
    sideProjects.populate(projectsElement);
    sideProjects.allButton.click();
});

