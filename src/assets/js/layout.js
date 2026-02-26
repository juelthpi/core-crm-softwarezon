
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSidebar();
});

// Theme Toggle Logic
function initTheme() {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';

    applyTheme(savedTheme);

    window.toggleTheme = () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };
}

function applyTheme(theme) {
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');

    html.setAttribute('data-theme', theme);

    if (themeIcon) {
        if (theme === 'light') {
            themeIcon.classList.remove('sz-moon', 'text-white');
            themeIcon.classList.add('sz-summary', 'text-indigo-600');
        } else {
            themeIcon.classList.remove('sz-summary', 'text-indigo-600');
            themeIcon.classList.add('sz-moon', 'text-white');
        }
    }
}

function initSidebar() {

    const activeItems = document.querySelectorAll('.active-item, .active-child');
    activeItems.forEach(item => {
        let dropdownContent;
        if (item.classList.contains('active-child')) {
            dropdownContent = item.closest('.dropdown-content');
        } else if (item.classList.contains('sidebar-link') && item.nextElementSibling && item.nextElementSibling.classList.contains('dropdown-content')) {
            dropdownContent = item.nextElementSibling;
        }

        if (dropdownContent) {
            dropdownContent.classList.add('show');
            const toggleBtn = dropdownContent.previousElementSibling;
            if (toggleBtn) {
                toggleBtn.setAttribute('aria-expanded', 'true');
                toggleBtn.classList.add('active-item');
                toggleBtn.dataset.activePage = 'true';
                const arrow = toggleBtn.querySelector('.dropdown-arrow');
                if (arrow) arrow.classList.add('dropdown-open');
            }
        }
    });


    window.toggleDropdown = function (btn) {
        const dropdownContent = btn.nextElementSibling;
        const arrow = btn.querySelector('.dropdown-arrow');
        const isOpen = dropdownContent.classList.contains('show');
        const hasActiveChild = dropdownContent.querySelector('.active-child');
        document.querySelectorAll('.dropdown-content.show').forEach(otherContent => {
            if (otherContent !== dropdownContent) {
                otherContent.classList.remove('show');
                const otherBtn = otherContent.previousElementSibling;
                if (otherBtn) {
                    otherBtn.setAttribute('aria-expanded', 'false');
                    const otherArrow = otherBtn.querySelector('.dropdown-arrow');
                    if (otherArrow) otherArrow.classList.remove('dropdown-open');
                }
            }
        });

        // Toggle current
        if (isOpen) {
            dropdownContent.classList.remove('show');
            btn.setAttribute('aria-expanded', 'false');

            if (arrow) arrow.classList.remove('dropdown-open');
        } else {
            dropdownContent.classList.add('show');
            btn.setAttribute('aria-expanded', 'true');

            if (arrow) arrow.classList.add('dropdown-open');
        }
    };
}

// Mobile Sidebar Logic
// Mobile Sidebar Logic
window.toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (sidebar) {
        sidebar.classList.toggle('sidebar-visible');
        const isOpen = sidebar.classList.contains('sidebar-visible');

        if (overlay) {
            if (isOpen) {
                overlay.classList.remove('hidden');
                overlay.offsetHeight;
                overlay.classList.remove('opacity-0');
            } else {
                overlay.classList.add('opacity-0');
                setTimeout(() => {
                    overlay.classList.add('hidden');
                }, 300);
            }
        }
    }
};

window.addEventListener('resize', () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (window.innerWidth >= 1280) {
        if (sidebar) sidebar.classList.remove('sidebar-visible');
        if (overlay) {
            overlay.classList.add('hidden');
            overlay.classList.add('opacity-0');
        }
    }
});

window.toggleProfileDropdown = function (event) {
    event.stopPropagation();
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
};
document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('profile-dropdown');
    const trigger = document.querySelector('.profile-dropdown-trigger');

    if (dropdown && dropdown.classList.contains('show')) {
        if (!dropdown.contains(event.target) && !trigger.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    }
});
