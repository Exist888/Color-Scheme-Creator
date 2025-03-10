const tooltipModalPlaceholder = document.getElementById("tooltip-modal-placeholder");

function fetchTooltipHTML() {
    fetch("/html/tooltip.html")
    .then(response => response.text())
    .then(content => {
        tooltipModalPlaceholder.innerHTML = content;
        getElements();
    })
    .catch(() => {
        document.getElementById("tooltip-btn").classList.add("hidden");
    });
}

function getElements() {
    const tooltipModal = document.getElementById("tooltip-modal");
    const tooltipBtn = document.getElementById("tooltip-btn");
    const closeModalBtn = document.getElementById("close-modal-btn");

    openAndCloseModal(tooltipModal, tooltipBtn, closeModalBtn);
}

function openAndCloseModal(tooltipModal, tooltipBtn, closeModalBtn) {
    tooltipBtn.addEventListener("click", function() {
        tooltipModal.classList.remove("hidden");
    });

    closeModalBtn.addEventListener("click", function() {
        tooltipModal.classList.add("hidden");
    });
}

fetchTooltipHTML();