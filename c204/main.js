function show_hide() {
    const code = document.querySelector("#Max-heapify");
    const controller = document.getElementById("Max-heapify-control");

    if (code.classList.contains("hidden")) {
        code.classList.remove("hidden");
        controller.innerHTML = "Hide Pseudocode";
    } else {
        code.classList.add("hidden");
        controller.innerHTML = "Show Pseudocode";
    }
}



document.getElementById("Max-heapify-control").addEventListener("click", show_hide);