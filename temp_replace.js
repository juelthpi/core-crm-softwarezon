const fs = require('fs');

const cssPath = 'src/assets/css/layout.css';
let css = fs.readFileSync(cssPath, 'utf8');

const miniSidebarCSS = `
/* --- Mini Sidebar Start --- */
@media (min-width: 1280px) {
  /* Transition for width */
  #sidebar {
    transition: width 0.3s ease, translate 0.3s ease !important;
    overflow-x: hidden;
    white-space: nowrap;
  }

  body.mini-sidebar #sidebar {
    width: 5.5rem; /* ~88px */
  }

  body.mini-sidebar .main-content {
    margin-inline-start: 5.5rem; /* ~88px */
  }

  body.mini-sidebar #sidebar:hover {
    width: 16.5rem; /* w-66 is 16.5rem */
  }

  /* Hide texts smoothly */
  body.mini-sidebar #sidebar:not(:hover) span.font-base,
  body.mini-sidebar #sidebar:not(:hover) .sidebar-dropdown .dropdown-arrow,
  body.mini-sidebar #sidebar:not(:hover) .user-profile-details,
  body.mini-sidebar #sidebar:not(:hover) .px-3.py-1, 
  body.mini-sidebar #sidebar:not(:hover) a[title="Logout"] {
    opacity: 0;
    visibility: hidden;
    display: none;
  }

  /* Specific transition handling */
  #sidebar span.font-base,
  #sidebar .sidebar-dropdown .dropdown-arrow,
  #sidebar .px-3.py-1 {
    transition: opacity 0.2s ease;
  }

  /* Adjust alignment in mini state */
  body.mini-sidebar #sidebar:not(:hover) .sidebar-link {
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
  }

  body.mini-sidebar #sidebar:not(:hover) .icon-box {
    margin: 0 auto;
  }

  /* Logo adjustment */
  body.mini-sidebar #sidebar:not(:hover) .logo-dark,
  body.mini-sidebar #sidebar:not(:hover) .logo-light {
    content: url("../images/favicon.ico");
    max-height: 28px;
    margin: 0 auto;
    object-fit: contain;
  }
  
  body.mini-sidebar #sidebar:not(:hover) .flex.items-center.justify-between.gap-3.border-b {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    justify-content: center;
  }
  
  /* User profile box adjustment in mini mode */
  body.mini-sidebar #sidebar:not(:hover) .p-4.mt-auto > div {
    padding: 0.5rem;
    justify-content: center;
  }
  
  body.mini-sidebar #sidebar:not(:hover) .p-4.mt-auto > div > div > div {
     display: none;
  }
  
  body.mini-sidebar #sidebar:not(:hover) .p-4.mt-auto > div > div {
     gap: 0;
  }
}
/* --- Mini Sidebar End --- */
`;

if(!css.includes('Mini Sidebar Start')) {
  css += '\n' + miniSidebarCSS;
  fs.writeFileSync(cssPath, css);
  console.log('Added CSS to layout.css');
}

// Update JS for mini-sidebar toggle
const jsPath = 'src/assets/js/layout.js';
let jsContent = fs.readFileSync(jsPath, 'utf8');

if (!jsContent.includes('toggleMiniSidebar = () => {')) {
  // modify toggleSidebar function
  let newJs = jsContent.replace(
    /window\.toggleSidebar = \(\) => {([\s\S]*?)};\s+window\.addEventListener/g,
    `window.toggleSidebar = () => {
    if (window.innerWidth >= 1280) {
        document.body.classList.toggle('mini-sidebar');
    } else {
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
    }
};

window.addEventListener`
  );

  fs.writeFileSync(jsPath, newJs);
  console.log('Updated layout.js');
}

// Update all HTML files
const htmlFiles = require('child_process').execSync('dir /b /s src\\\\*.html').toString().split('\r\n').map(l=>l.trim()).filter(Boolean);
let htmlUpdated = 0;
htmlFiles.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;
  
  // Replace the exact class string for the sidebar toggle button
  content = content.replace(/class="xl:hidden\s+text-black\/70/g, 'class="text-black/70');
  
  if(content !== original) {
    fs.writeFileSync(f, content);
    htmlUpdated++;
  }
});
console.log('Updated', htmlUpdated, 'HTML files');
