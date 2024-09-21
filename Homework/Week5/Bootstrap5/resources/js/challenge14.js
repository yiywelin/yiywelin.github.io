// KrazyMLBB API v1.0 - Documentation
// http://krazywoman.com/krazymlbb/

let heroes_data = [];
function renderHero(heroes, hero_class) {
    console.log('---------Calling renderHero function---------');
    let hero_html = '';
    for (const hero_object of heroes) {
        console.log(`Filtering for hero_class: ${hero_class}`);
        console.log(`Hero's class: ${hero_object.class}`);
        if (hero_object.class.toLowerCase() === hero_class.toLowerCase() || hero_class === 'all') {
            hero_html += `
                    <div class="card mb-3 mx-auto">
                        <div class="row no-gutters">
                            <div class="col-md-3">
                                <img src="${hero_object.img_profile_url}" class="card-img" width="100%" alt="${hero_object.name}">
                            </div>
                            <div class="col-md-9">
                                <!-- Hero -->
                                <div class="card-body">
                                    <h5 class="card-title">${hero_object.name}</h5>
    
                                    <p class="card-text">${hero_object.description}</p>
                                    
                                    <p class="text-center">
                                        <button type="button" class="btn mb-1" style="background-color:#ff7002; color: white; width: 220px">
                                            Battlepoint Cost <span class="badge bg-light text-dark">${hero_object.purchase.battlepoint_cost}</span>
                                        </button>
    
                                        <button type="button" class="btn mb-1" style="background-color:#1326ff; color: white; width: 220px">
                                            Diamond Cost <span class="badge bg-light text-dark">${hero_object.purchase.diamond_cost}</span>
                                        </button>
    
                                        <button type="button" class="btn mb-1" style="background-color:#03f433; width: 220px">
                                            Movement Speed <span class="badge bg-light text-dark">${hero_object.stats.movement_speed}</span>
                                        </button>
    
                                        <button type="button" class="btn mb-1" style="background-color:#03f433; width: 220px">
                                            Physical Attack <span class="badge bg-light text-dark">${hero_object.stats.physical_attack}</span>
                                        </button>
    
                                        <button type="button" class="btn mb-1" style="background-color:#03f433; width: 220px">
                                            Physical Defense <span class="badge bg-light text-dark">${hero_object.stats.physical_defense}</span>
                                        </button>
    
                                        <button type="button" class="btn mb-1" style="background-color:#03f433; width: 220px">
                                            Magic Power <span class="badge bg-light text-dark">${hero_object.stats.magic_power}</span>
                                        </button>
    
                                        <button type="button" class="btn mb-1" style="background-color:#03f433; width: 220px">
                                            Armor <span class="badge bg-light text-dark">${hero_object.stats.armor}</span>
                                        </button>
    
                                        <button type="button" class="btn mb-1" style="background-color:#03f433; width: 220px">
                                            Magic Resistance <span class="badge bg-light text-dark">${hero_object.stats.magic_resistance}</span>
                                        </button>
    
                                        <button type="button" class="btn mb-1" style="background-color:#03f433; width: 220px">
                                            HP <span class="badge bg-light text-dark">${hero_object.stats.hp}</span>
                                        </button>
    
                                        <button type="button" class="btn mb-1" style="background-color:#03f433; width: 220px">
                                            Mana <span class="badge bg-light text-dark">${hero_object.stats.mana}</span>
                                        </button>
    
                                        <button type="button" class="btn mb-1" style="background-color:#03f433; width: 220px">
                                            Attack Speed <span class="badge bg-light text-dark">${hero_object.stats.attack_speed}</span>
                                        </button>
    
                                        <button type="button" class="btn mb-1" style="background-color:#03f433; width: 220px">
                                            HP Regen Rate <span class="badge bg-light text-dark">${hero_object.stats.hp_regen_rate}</span>
                                        </button>
    
                                        <button type="button" class="btn mb-1" style="background-color:#03f433; width: 220px">
                                            Mana Regen Rate <span class="badge bg-light text-dark">${hero_object.stats.mana_regen_rate}</span>
                                        </button>
    
                                        <button type="button" class="btn mb-1" style="background-color:#3e3b3a; color: white; width: 220px">
                                            Class <span class="badge bg-light text-dark">${hero_object.class}</span>
                                        </button>
    
                                    </p>
                                </div> <!-- end of card-body -->
                            </div> <!-- end of col -->
                        </div> <!-- end of row -->
                    </div> <!-- end of card (one hero) -->
                `;   
        }
    }

    return hero_html;
}

// When the webpage loads
// Display all heroes
function display_default() {

    // Display all heroes
    api_endpoint = 'http://krazywoman.com/krazymlbb/api/hero/read.php';

    axios.get(api_endpoint).
    then((response) => {
        //console.log(response.data);
        
        heroes_data = response.data.records;
        console.log(heroes_data);

        show_heroes('all'); 
        
    }).catch((err) => {
        console.log(err.message);
    });
    
}


// Given a hero_class (tank, fighter, mage, asassin, marksman, support, all)
function show_heroes(hero_class) {

    // if 'tank'
    // only display 'tank' heroes

    // if 'all'
    // display ALL heroes
    console.log('---------Calling show_heroes function---------');
    let heroes_html = renderHero(heroes_data, hero_class);
    document.getElementById('hero_cards').innerHTML = heroes_html;
    
}