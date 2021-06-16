/**
 * Generates alphabet buttons for the main game screen
 */

function generateAbcBtns () {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let html = '';
    for (const letter of alphabet) {
        html += `<button class="btn btn-primary m-2">${letter}</button>`;
    }
    document.getElementById('abc-btns').innerHTML = html;
}

generateAbcBtns();