
document.addEventListener("DOMContentLoaded", () => {
    const initializeFilter = (instance) => {
        const buttons = instance.querySelectorAll(".filter-btn");
        const items = instance.querySelectorAll(".filter-item");
        const searchInput = instance.querySelector(".filter-search-input");
        const grid = instance.querySelector(".filter-grid");
        const noResults = instance.querySelector(".no-results");

        let currentFilter = "all";
        let searchTerm = "";

        // Function to update counts on buttons
        const updateButtonCounts = () => {
            buttons.forEach((btn) => {
                const filterValue = btn.getAttribute("data-filter");
                let count = 0;

                if (filterValue === "all") {
                    count = items.length;
                } else {
                    count = Array.from(items).filter(item => {
                        const itemCats = (item.getAttribute("data-category") || "").split(" ");
                        return itemCats.includes(filterValue);
                    }).length;
                }
                // Safely get or store the original text to avoid recursive buildup
                if (!btn.dataset.baseText) {
                    btn.dataset.baseText = btn.textContent.split("(")[0].trim();
                }
                const baseText = btn.dataset.baseText;

                btn.innerHTML = `${baseText} <span class="ml-2 text-[12px] font-medium h-8 w-8 rounded-full flex items-center justify-center bg-white text-black shrink-0">${count}</span>`;
            });
        };
        const applyFilters = () => {
            let visibleCount = 0;

            items.forEach((item) => {
                const categoryAttr = item.getAttribute("data-category") || "";
                const categories = categoryAttr.split(" ");
                const titleElement = item.querySelector(".filter-item-title");
                const title = titleElement ? titleElement.textContent.toLowerCase() : "";

                const matchesCategory = currentFilter === "all" || categories.includes(currentFilter);
                const matchesSearch = title.includes(searchTerm);

                if (matchesCategory && matchesSearch) {
                    item.classList.remove("hidden");
                    item.classList.add("filter-show");
                    item.style.animationDelay = `${visibleCount * 0.1}s`;
                    visibleCount++;
                } else {
                    item.classList.add("hidden");
                    item.classList.remove("filter-show");
                    item.style.animationDelay = "0s";
                }
            });

            if (visibleCount === 0) {
                if (grid) grid.classList.add("hidden");
                if (noResults) noResults.classList.remove("hidden");
            } else {
                if (grid) grid.classList.remove("hidden");
                if (noResults) noResults.classList.add("hidden");
            }
        };

        // Initial counts and filter
        updateButtonCounts();

        buttons.forEach((btn) => {
            btn.addEventListener("click", () => {
                buttons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                currentFilter = btn.getAttribute("data-filter");
                applyFilters();
            });
        });

        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                searchTerm = e.target.value.toLowerCase().trim();
                applyFilters();
            });
        }
    };

    // Initialize all filter instances on the page
    document.querySelectorAll("[data-filter-group]").forEach(initializeFilter);
});
