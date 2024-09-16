let firstCard = null; // Keeps track of the first flipped card
let secondCard = null; // Keeps track of the second flipped card
let lockBoard = false; // Prevents additional flips while two cards are being compared
let score = 0; // Keeps track of the user's score

function generate_board() {

    //============================================================================
    // Task 1
    // Retrieve the friend name(s) from the 'friends' multi-select dropdown menu
    //============================================================================

    // Array to contain the names of user-selected friend(s)
    // For example, if the user selected 'Darryl' and 'Yin Kit',
    //   this array's value will be:
    //      [ 'darryl', 'yinkit' ]
    //

    // YOUR CODE GOES HERE
    let friends = []; // Initialize to empty
    let e = document.getElementById('friends');
    let options = e && e.options;
    let opt;

    for(var i = 0; i < options.length; i++) {
        opt = options[i];

        if (opt.selected) {
            friends.push(opt.value);
        }
    }
    // Display user's selection in Developer Tools --> Console.
    console.log(`selected friends list: ${friends}`);



    //============================================================================
    // Task 2
    // Given one or more selected friends and given 4 fruit names,
    //   generate a 'randomized' Array of finalized card names.
    // 
    // Card names are as follows:
    //    apple_brandon.png
    //    banana_brandon.png
    //    kiwi_brandon.png
    //    orange_brandon.png
    //
    // where 'brandon' can be replaced with another friend's name,
    // e.g.
    //    apple_nick.png
    // (and so on)
    //
    // Display all 4 fruit cards of one or more selected friends.
    //
    // NOTE: Each card must be displayed TWO and ONLY TWO times (thus, a "pair")
    //       (such that the user can attempt to 'match').
    //
    // Check out this utility function (declared at the bottom of this file)
    //   for randomizing the order of Array elements.
    //        shuffleArray()
    //============================================================================
    const fruits = [ 'apple', 'banana', 'kiwi', 'orange' ];
    let cards = [];

    // YOUR CODE GOES HERE
    friends.forEach(friend => {
        fruits.forEach(fruit => {
            cards.push(`${fruit}_${friend}.png`);
            cards.push(`${fruit}_${friend}.png`);
        });
    });
    
    cards = shuffleArray(cards);
    console.log(`cards: ${cards}`);

    //============================================================================
    // Task 3
    // Display the cards in <div id="game-board">
    //
    // For this, we will make use of Template Literal (using backticks).
    //
    // NOTE: The game board will always have 4 columns and N rows, where N denotes
    //       (number of selected friends) x 2.
    //
    //       For example, if I chose 'Brandon', 'Darryl', and 'Nick' (3 friends),
    //         then the newly generated game board will be
    //         6 (rows) by 4 (columns).
    //============================================================================
    const num_cols = fruits.length;
    const num_rows = friends.length * 2;

    console.log("# of columns: " + num_cols)
    console.log("# of rows: " + num_rows);


    // YOUR CODE GOES HERE
   // Populate rows and columns with card images
   let result_str = "<table>";

   for (let row = 0; row < num_rows; row++) {
        result_str += "<tr class='row'>";
        for (let col = 0; col < num_cols; col++) {
            let cardIndex = row * num_cols + col;
            if (cardIndex < cards.length) {
                // result_str += `<td class='column'><img src="cards/${cards[cardIndex]}" alt="Card"></td>`;
                result_str += `<td class='column'>
                    <img src="cards/hidden.png" alt="Hidden Card" data-card="${cards[cardIndex]}" data-index="${cardIndex}">
                </td>`;
            }
        }
        result_str += "</tr>";
    }
    result_str += "</table>";

    // You will need to rewrite the value of this result_str (String).
    document.getElementById('game-board').innerHTML = result_str;

    //reveal card using data-card property
    //.target is a property of the Event object that refers to the element on which the event occurred
    
    // document.getElementById('game-board').addEventListener('click', function(event) {
    //     if (event.target.tagName === 'IMG') {
    //         let cardImage = event.target.getAttribute('data-card');
    //         event.target.src = `cards/${cardImage}`;
    //     }
    // });

    document.querySelectorAll('#game-board img').forEach(img => {
        img.addEventListener('click', flipCard);
    });
}

function flipCard(event) {
    if (lockBoard) return;

    let clickedCard = event.target;
    if (clickedCard === firstCard) return;

    clickedCard.src = `cards/${clickedCard.getAttribute('data-card')}`;
    clickedCard.style.opacity = 0.5;

    if (!firstCard) {
        firstCard = clickedCard;
        return;
    }

    secondCard = clickedCard;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.getAttribute('data-card') === secondCard.getAttribute('data-card');

    if (isMatch) {
        score++;
        document.getElementById('total-score').innerText = `Total Score: ${score}`;
        resetCards();
        if (document.querySelectorAll('#game-board img[src^="cards/hidden.png"]').length === 0) {
            document.getElementById('total-score').innerText = "All Matched, Congratulations!";
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.src = 'cards/hidden.png';
            secondCard.src = 'cards/hidden.png';
            firstCard.style.opacity = 1;
            secondCard.style.opacity = 1;
            resetCards();
        }, 2000);
    }
}

function resetCards() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Utility Function
// DO NOT MODIFY
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}