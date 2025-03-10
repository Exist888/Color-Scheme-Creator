const colorSchemeForm = document.getElementById("color-scheme-form");
const startingColor = document.getElementById("input-starting-color");
const colorSchemeType = document.getElementById("select-color-scheme-type");
const displayColorsSection = document.getElementById("display-colors-section");

function generateRandomColor() {
    startingColor.value = "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function fetchColorScheme() {
    const colorCodeClean = startingColor.value.slice(1);
    const mode = colorSchemeType.value;

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorCodeClean}&mode=${mode}&count=5`, {
        headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(data => handleColorsHTML(data))

    .catch(() => {
        handleErrorMsg();
    });
}

function handleErrorMsg() {
    displayColorsSection.style.display = "block";
    displayColorsSection.innerHTML = `
        <div class="error-message" id="error-message">
            <p>Sorry, the data source is not sending colors at the moment.</p>
            <p>Please refresh the page, or 
                <a href="https://www.linkedin.com/in/filip-herbst/" target="_blank">
                    contact me
                </a>
                if this issue persists.
            </p>
        </div>
    `
}

function handleRandomizeClick() {
    const randomizeBtn = document.getElementById("randomize-btn");
    randomizeBtn.addEventListener("click", function() {
        generateRandomColor();
    });
}

let previousStartingColor = startingColor.value;
let previousColorSchemeType = colorSchemeType.value;

function handleColorSchemeForm() {
    colorSchemeForm.addEventListener("submit", function(e) {
        e.preventDefault();
        if (startingColor.value === previousStartingColor 
            && colorSchemeType.value === previousColorSchemeType) {
            alert("Modify the form to view a new color scheme 😊");
            return;
        }
        previousStartingColor = startingColor.value;
        previousColorSchemeType = colorSchemeType.value;

        fetchColorScheme();
        scrollToColors();
    });
}

function scrollToColors() {
    let offset = 18;
    let targetElement;
    const targetForMediumLargeScreen = colorSchemeForm.getBoundingClientRect();
    const targetForSmallScreen = displayColorsSection.getBoundingClientRect();

    if (window.innerWidth >= 768) {
        targetElement = targetForMediumLargeScreen;
    } else {
        targetElement = targetForSmallScreen;
        offset = 0;
    }

    const scrollPosition = targetElement.top + window.scrollY + offset;
    window.scrollTo({
        top: scrollPosition,
        behavior: "smooth"
    });
}

function handleColorsHTML(data) {
    const colorsArray = data.colors;
    let colorsHTML = ``;
    for (let i = 0; i < colorsArray.length; i++) {
        colorsHTML += `
            <div class="color-box-container">
                <div class="color-box color-${i + 1}" id="color-${i + 1}"></div>
                <button class="color-code-btn hexadecimal-code-${i + 1}" type="button">
                    <i class="fa-regular fa-copy" aria-label="copy icon"></i>
                    ${colorsArray[i].hex.value}
                </button>
            </div>
        `;
    }
    displayColorsSection.innerHTML = colorsHTML;
    renderColors(colorsArray);
}

function renderColors(colorsArray) {
    const updatedColorBoxes = Array.from(document.querySelectorAll(".color-box"));
    updatedColorBoxes.forEach(function(colorBox, index) {
        colorBox.style.backgroundColor = colorsArray[index].hex.value; 
    })
    enableCopyColorCode();
}

function enableCopyColorCode() {
    const appContainer = document.getElementById("app-container");
    if (!appContainer.hasAttribute("data-listener-added")) {
        appContainer.addEventListener("click", copyColorCode);
        appContainer.setAttribute("data-listener-added", true);
    }
}

function copyColorCode(e) {
    if (e.target.classList.contains("color-code-btn")) {
        const codeToCopy = e.target.textContent;
        e.stopPropagation();
        navigator.clipboard.writeText(codeToCopy)
        .then(function() {
            alert("Color code sucessfully copied 😊")
        })
        .catch(function() {
            alert("Sorry, there was an error copying the color code.")
        });
    }
}

function showScrollToTopBtn() {
    const scrollToTopBtn = document.getElementById("scroll-to-top-btn");
    window.addEventListener("scroll", function() {
        if (document.documentElement.scrollTop > getDistanceFromTop()
            || document.body.scrollTop > getDistanceFromTop()) {
            scrollToTopBtn.classList.remove("hidden");
        } else {
            scrollToTopBtn.classList.add("hidden");
        }
    });
    scrollToTop(scrollToTopBtn);
}

function getDistanceFromTop() {
    let distanceFromTop;
    const distanceForMediumLargeScreen = 400;
    const distanceForSmallScreen = 670;

    if (window.innerWidth >= 768) {
        return distanceFromTop = distanceForMediumLargeScreen;
    } else {
        return distanceFromTop = distanceForSmallScreen;
    }
}

function scrollToTop(scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", function() {
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

function renderCopyrightYear() {
    const currentYear = new Date().getFullYear();
    document.getElementById("copyright-year").textContent = currentYear;
}

function init() {
    generateRandomColor();
    fetchColorScheme();
    handleColorSchemeForm();
    handleRandomizeClick();
    showScrollToTopBtn();
    renderCopyrightYear();
}

init();