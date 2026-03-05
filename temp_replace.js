const fs = require('fs');

function processFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf-8');

    // Process WITH SLASH first
    content = content.replace(/(?<![\w-])text-white\/([0-9]+)\b/g, 'text-black/$1 dark:text-white/$1');
    content = content.replace(/(?<![\w-])hover:text-white\/([0-9]+)\b/g, 'hover:text-black/$1 dark:hover:text-white/$1');
    content = content.replace(/(?<![\w-])placeholder:text-white\/([0-9]+)\b/g, 'placeholder:text-black/$1 dark:placeholder:text-white/$1');
    content = content.replace(/(?<![\w-])bg-white\/([0-9]+)\b/g, 'bg-black/$1 dark:bg-white/$1');
    content = content.replace(/(?<![\w-])hover:bg-white\/([0-9]+)\b/g, 'hover:bg-black/$1 dark:hover:bg-white/$1');
    content = content.replace(/(?<![\w-])border-white\/([0-9]+)\b/g, 'border-black/$1 dark:border-white/$1');
    content = content.replace(/(?<![\w-])bg-side\/([0-9]+)\b/g, 'bg-side-light/$1 dark:bg-side/$1');

    // Then process WITHOUT SLASH by making sure it's not followed by a slash
    content = content.replace(/(?<![\w-])text-white(?!\/)/g, 'text-black dark:text-white');
    content = content.replace(/(?<![\w-])hover:text-white(?!\/)/g, 'hover:text-black dark:hover:text-white');
    content = content.replace(/(?<![\w-])bg-white(?!\/)/g, 'bg-black dark:bg-white');
    content = content.replace(/(?<![\w-])hover:bg-white(?!\/)/g, 'hover:bg-black dark:hover:bg-white');
    content = content.replace(/(?<![\w-])border-white(?!\/)/g, 'border-black dark:border-white');

    // Custom specific colors
    content = content.replace(/(?<![\w-])bg-side(?!\/)/g, 'bg-side-light dark:bg-side');
    content = content.replace(/(?<![\w-])bg-body(?!\/)/g, 'bg-body-light dark:bg-body');
    content = content.replace(/(?<![\w-])bg-dark-green(?!\/)/g, 'bg-dark-green-light dark:bg-dark-green');
    content = content.replace(/(?<![\w-])text-sidebar-text(?!\/)/g, 'text-sidebar-text-light dark:text-sidebar-text');

    fs.writeFileSync(filepath, content, 'utf-8');
}

processFile('i:/core-crm/src/index.html');
processFile('i:/core-crm/src/assets/css/input.css');
console.log('Done replacing correctly!');
