/*
 * lineup.js
 */

let lineup_title = document.getElementById("lineup-title");
let lineup_switch = document.getElementById("lineup-switch");
let lineup_body = document.getElementById("lineup-text-wrapper");

const lineup_2018 = [
    "ANIMVLZ", "Blue Apples", "Dio Lewis", "My Friend Ryan", "Munir Griffin", "The Dreads",
    "Triangle Fire", "Ascanio", "Cerulean", "Drew Karperos", "Nightswimmers", "Officer Gavin",
    "BEL", "Cole Heramb & The Flame Train", "Miles Gibson", "Temme Scott", "Tree Down Kelton"
];

const lineup_2017_maj = [
    "Alec Be", "Austin Gatus", "Cassie Thompson", "Colin Tandy", "Girl Friday",
    "Global Soul Collective", "Griff Klawson", "GUP TRUP", "Miles Gibson", "Shawn Dawg",
    "Semichrome", "Temme Scott", "Triangle Fire", "97 Caravan"
];

const lineup_2017_min = [
    "AVTR", "Ear Ringers", "Good Luck Club", "Griff Klawson", "Kendirck", "Laura Savage",
    "Lost City Ratio", "Nightswimmers", "Putrifiers", "Rey Matthews", "Reyma", "The Rosewaters",
    "Ryan Chen", "Santiago’s Trip", "Stefan Dismond and the Love Supreme", "Tharp’s Logg",
    "Torso Twin", "Uncharted Territory", "Voodoo", "Willow and the Rain", "4kei"
];

const join_artist_strings = (lineup) => lineup.join(" <span class=\"dot\">•</span> ");

let lineup_p_2019 = document.createElement("p");
lineup_p_2019.id = "lineup2018";
lineup_p_2019.innerHTML = "coming soon!";

let lineup_p_2018 = document.createElement("p");
lineup_p_2018.id = "lineup2018";
lineup_p_2018.innerHTML = join_artist_strings(lineup_2018);

let lineup_p_2017_maj = document.createElement("p");
lineup_p_2017_maj.id = "lineup2017-maj";
lineup_p_2017_maj.innerHTML = join_artist_strings(lineup_2017_maj);

let lineup_p_2017_min = document.createElement("p");
lineup_p_2017_min.id = "lineup2017-min";
lineup_p_2017_min.innerHTML = join_artist_strings(lineup_2017_min);

let apply_button_wrapper = document.createElement("div");
apply_button_wrapper.className = "royce-row";

let apply_button = document.createElement("div");
apply_button.className = "button";
apply_button.innerHTML = "apply";

const unset_lineup = () => {
    while (lineup_body.firstChild)
        lineup_body.removeChild(lineup_body.firstChild);
};

let lineups = [2019, 2018, 2017];
let current_index = 0;

const set_lineup = (lineup_index) => {
    let year = lineups[lineup_index];
    lineup_title.innerHTML = `${year} Lineup`;

    if (year === 2017)
        lineup_switch.innerHTML = "click to see this year's lineup";
    else
        lineup_switch.innerHTML = "click to see past lineups";

    if (year === 2019) {
        lineup_body.appendChild(lineup_p_2019);
        apply_button_wrapper.appendChild(apply_button);
        lineup_body.appendChild(apply_button_wrapper);
    } else if (year === 2018) {
        lineup_body.appendChild(lineup_p_2018);
    } else {
        lineup_body.appendChild(lineup_p_2017_maj);
        lineup_body.appendChild(lineup_p_2017_min);
    }

    current_index = lineup_index;
};

const swap_lineups = () => {
    unset_lineup();
    set_lineup((current_index + 1) % 3);
};

lineup_title.onclick = swap_lineups;
document.getElementById("lineup-switch").onclick = swap_lineups;

set_lineup(0);
