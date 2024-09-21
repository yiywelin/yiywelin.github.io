// KrazyStars API v1.0 - Documentation
// http://krazywoman.com/krazystars/

function renderStars(stars, gender) {
    let star_html = '';
    let slide_no = 1;

    for (const star_object of stars) {
        //console.log(star_object);

        let name = star_object.fullname;
        let star_gender = star_object.gender;
        let photo_url = star_object.photo_background_url;
        let quote = star_object.quote;
        //console.log(`${gender}`);

        if (star_gender == gender) {
            // Check if it's the first slide and apply "active" only to the first one
            let active_class = slide_no === 1 ? 'active' : '';

            star_html += `
            <div class="carousel-item ${active_class}">
                <img id="image${slide_no}" src="${photo_url}" alt="profile_background">
                <div class="carousel-caption">
                    <h2 class="star_h2" id="slide_heading${slide_no}" style="padding: 5px; background-color: grey; color: white">${name}</h2>
                    <p id="slide_title${slide_no}" style="padding: 5px; background-color: black; color: white">${quote}</p>
                </div>
            </div>
        `;
        }
        slide_no++;
    }
    return star_html;
}

// When the webpage loads
// Randomly determine whether to show "male" stars or "female" stars
let stars_data = [];  // Global variable to store stars
function display_default() {

    // YOUR CODE GOES HERE
    // Call API
    let api_endpoint = 'http://krazywoman.com/krazystars/api/star/read.php';

    axios.get(api_endpoint)
    .then((response) => {
        //console.log(response.data);

        stars_data = response.data.records;  // Store the stars data globally

        let random_num = Math.floor(Math.random() * 2);
        console.log(random_num);
        if (random_num == 0) {
            show_male_stars();
            console.log(response.data.records);
        } else {
            show_female_stars();
        }
        

    }).catch((err) => {
        console.log(err.message);
    });
}



// This function is called when user clicks on "Show Male Stars" button.
function show_male_stars() {
    let male_stars_html = renderStars(stars_data, 'M');  // Use global stars_data
    document.getElementById('slide_show').innerHTML = male_stars_html;
    document.getElementById('male_button').disabled = true;
    document.getElementById('female_button').disabled = false;

    // Activate the first slide in the carousel
    document.querySelector('.carousel-item').classList.add('active');
}

// This function is called when user clicks on "Show Female Stars" button.
function show_female_stars() {
    let female_stars_html = renderStars(stars_data, 'F');  // Use global stars_data
    document.getElementById('slide_show').innerHTML = female_stars_html;
    document.getElementById('male_button').disabled = false;
    document.getElementById('female_button').disabled = true;

    // Activate the first slide in the carousel
    document.querySelector('.carousel-item').classList.add('active');
}