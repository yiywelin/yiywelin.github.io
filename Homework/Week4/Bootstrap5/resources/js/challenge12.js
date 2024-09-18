// [IMPORTANT]
// DO NOT MODIFY challenge12.html content
// YOU MUST WORK WITH WHAT IS GIVEN TO YOU



// [TODO] IMPLEMENT THIS FUNCTION
// You may assume that all words in each paragraph are separated by one single whitespace.
function highlight_words() {

    // YOUR CODE GOES HERE
    const button = document.getElementsByTagName("button")[0];
    const paras = document.querySelectorAll('#book_chapter p');

    if (button.dataset.pressed) {
        // Clear highlights if button has been pressed before
        paras.forEach(para => {
            para.innerHTML = para.innerHTML.replaceAll(`<span style="background-color: yellow">`, "").replace("</span>", "");
        });
        button.innerHTML = "Highlight Words";
        delete button.dataset.pressed; // Remove the pressed marker
    } else {
        // Highlight words if button hasn't been pressed before
        const word_length = prompt("Enter word length (words longer than this length will be highlighted)");

        paras.forEach(para => {
            para.innerHTML = para.innerText
                .split(' ')
                .map(word => word.length > word_length ? `<span style="background-color: yellow">${word}</span>` : word)
                .join(' ');
        });
        button.innerHTML = "Remove Highlight";
        button.dataset.pressed = true; // Mark the button as pressed
    }
}


// [TODO] IMPLEMENT THIS FUNCTION
// You may assume that all words in each paragraph are separated by one single whitespace.
function show_num_words() {

    // YOUR CODE GOES HERE
    let paragraphs = document.querySelectorAll('#book_chapter p');

    paragraphs.forEach(para => {
        if(para.parentElement.children[0].innerText == "") {
            let num_words = para.innerText.split(" ").length;

            para.parentElement.children[0].innerHTML = `<strong>(${num_words} words)</strong>`;
        } else {
            para.parentElement.children[0].innerHTML = " ";
        }
    });
}


// [TODO] IMPLEMENT THIS FUNCTION
// You may assume that all words in each paragraph are separated by one single whitespace.
function show_emoticons() {

    // YOUR CODE GOES HERE
    let paragraphs = document.querySelectorAll('#book_chapter p');

    paragraphs.forEach(para => {
        if(para.innerHTML.includes("⭐") || para.innerHTML.includes("❓") || para.innerHTML.includes("❗")) {
            para.innerHTML = para.innerHTML
            .replaceAll("⭐", ",")
            .replaceAll("❓", "?")
            .replaceAll("❗", "!");
        } else {
            para.innerHTML = para.innerHTML
            .replaceAll(",", "⭐")
            .replaceAll("?", "❓")
            .replaceAll("!", "❗");
        }
    });
}