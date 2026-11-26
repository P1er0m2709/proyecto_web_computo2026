// ================================
// MODO OSCURO
// ================================

const themeButton = document.getElementById("themeButton");

function updateThemeButton() {
    if (!themeButton) return;

    themeButton.textContent = document.body.classList.contains("dark-mode")
        ? "☀️"
        : "🌙";
}

const savedTheme = localStorage.getItem("electrobotTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

updateThemeButton();

if (themeButton) {
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const currentTheme = document.body.classList.contains("dark-mode")
            ? "dark"
            : "light";

        localStorage.setItem("electrobotTheme", currentTheme);
        updateThemeButton();
    });
}

// ================================
// BUSCADOR Y FILTRO
// ================================

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const componentCards = document.querySelectorAll(".component-card");
const noResults = document.getElementById("noResults");

function filterComponents() {
    if (!searchInput || !categoryFilter) return;

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    let visibleComponents = 0;

    componentCards.forEach(card => {
        const componentName = card.dataset.name.toLowerCase();
        const componentCategory = card.dataset.category;

        const matchesSearch = componentName.includes(searchText);
        const matchesCategory =
            selectedCategory === "todos" ||
            componentCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
            visibleComponents++;
        } else {
            card.style.display = "none";
        }
    });

    if (noResults) {
        noResults.style.display = visibleComponents === 0
            ? "block"
            : "none";
    }
}

if (searchInput) {
    searchInput.addEventListener("input", filterComponents);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", filterComponents);
}

// ================================
// EDITAR CREADORES
// ================================

const creatorModal = document.getElementById("creatorModal");
const editCreatorsButton = document.getElementById("editCreatorsButton");
const closeModalButton = document.getElementById("closeModalButton");
const cancelModalButton = document.getElementById("cancelModalButton");
const saveCreatorsButton = document.getElementById("saveCreatorsButton");

const creatorNames = [
    document.getElementById("creatorName1"),
    document.getElementById("creatorName2"),
    document.getElementById("creatorName3")
];

const creatorRoles = [
    document.getElementById("creatorRole1"),
    document.getElementById("creatorRole2"),
    document.getElementById("creatorRole3")
];

const creatorAvatars = [
    document.getElementById("avatar1"),
    document.getElementById("avatar2"),
    document.getElementById("avatar3")
];

const nameInputs = [
    document.getElementById("nameInput1"),
    document.getElementById("nameInput2"),
    document.getElementById("nameInput3")
];

const roleInputs = [
    document.getElementById("roleInput1"),
    document.getElementById("roleInput2"),
    document.getElementById("roleInput3")
];

function openCreatorsModal() {
    if (!creatorModal) return;

    for (let i = 0; i < 3; i++) {
        if (nameInputs[i] && creatorNames[i]) {
            nameInputs[i].value = creatorNames[i].textContent;
        }

        if (roleInputs[i] && creatorRoles[i]) {
            roleInputs[i].value = creatorRoles[i].textContent;
        }
    }

    creatorModal.classList.add("show");
    creatorModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeCreatorsModal() {
    if (!creatorModal) return;

    creatorModal.classList.remove("show");
    creatorModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function saveCreators() {
    for (let i = 0; i < 3; i++) {
        if (!creatorNames[i] || !creatorRoles[i]) continue;

        const newName = nameInputs[i].value.trim();
        const newRole = roleInputs[i].value.trim();

        if (newName !== "") {
            creatorNames[i].textContent = newName;
        }

        if (newRole !== "") {
            creatorRoles[i].textContent = newRole;
        }

        if (creatorAvatars[i]) {
            creatorAvatars[i].textContent =
                creatorNames[i].textContent.charAt(0).toUpperCase();
        }

        localStorage.setItem(
            "creatorName" + (i + 1),
            creatorNames[i].textContent
        );

        localStorage.setItem(
            "creatorRole" + (i + 1),
            creatorRoles[i].textContent
        );
    }

    closeCreatorsModal();
}

function loadCreators() {
    for (let i = 0; i < 3; i++) {
        if (!creatorNames[i] || !creatorRoles[i]) continue;

        const savedName = localStorage.getItem(
            "creatorName" + (i + 1)
        );

        const savedRole = localStorage.getItem(
            "creatorRole" + (i + 1)
        );

        if (savedName) {
            creatorNames[i].textContent = savedName;
        }

        if (savedRole) {
            creatorRoles[i].textContent = savedRole;
        }

        if (creatorAvatars[i]) {
            creatorAvatars[i].textContent =
                creatorNames[i].textContent.charAt(0).toUpperCase();
        }
    }
}

if (editCreatorsButton) {
    editCreatorsButton.addEventListener("click", openCreatorsModal);
}

if (closeModalButton) {
    closeModalButton.addEventListener("click", closeCreatorsModal);
}

if (cancelModalButton) {
    cancelModalButton.addEventListener("click", closeCreatorsModal);
}

if (saveCreatorsButton) {
    saveCreatorsButton.addEventListener("click", saveCreators);
}

if (creatorModal) {
    creatorModal.addEventListener("click", event => {
        if (event.target === creatorModal) {
            closeCreatorsModal();
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCreatorsModal();
    }
});

loadCreators();
