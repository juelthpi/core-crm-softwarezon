function initSmartTables() {
    const tables = document.querySelectorAll('.custom-responsive-table');

    tables.forEach(table => {
        // Step 1: Extract Headers Text (handling icons/tags if any)
        const headerCells = table.querySelectorAll('thead th');
        const labels = Array.from(headerCells).map(th => th.innerText.trim());

        // Step 2: Inject Labels into Rows
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, i) => {
                if (labels[i]) {
                    cell.setAttribute('data-label', labels[i]);
                }
            });
        });

        // Step 3: Resize Logic
        const wrapper = table.parentElement;
        const breakPoint = labels.length * 140;

        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.contentRect.width < breakPoint) {
                    table.classList.add('table-card-mode');
                } else {
                    table.classList.remove('table-card-mode');
                }
            }
        });
        observer.observe(wrapper);
    });
}

document.addEventListener('DOMContentLoaded', initSmartTables);

window.onload = initSmartTables; 