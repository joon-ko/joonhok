/* variables */
var sf = {
	air_rune: 0.0,
	water_rune: 0.0,
	earth_rune: 0.0,
	fire_rune: 0.0,
	air_wizard: 0,
	water_wizard: 0,
	earth_wizard: 0,
	fire_wizard: 0,
	elemental_wizard: 0,
	manual_power: 1,
	level: 1,
	exp: 0,
	exp_next: 15,
	air_supply: 300,
	water_supply: 300,
	earth_supply: 300,
	fire_supply: 300,
	ach_one_click: false,
	ach_level_five: false,
	ach_level_ten: false,
	ach_max_supply: false,
	ach_world: false,
	end_button_clicked: false
};

var max_supply = 1000;
var wizard_cap = 100;
var trivia = ['did you know? the maximum level you can reach is currently 22.',
				'did you know? the maximum capacity for runes is 1000.',
				'did you know? this is joonhok\'s first javascript program.',
				'did you know? higher-level runes give you more damage per rune.',
				'did you know? there are currently five achievements in the game.',
				'did you know? a single wizard can craft one rune in five seconds.']

/* spell costs */
var gust_cost = 10;
var gale_cost = 20;
var splash_cost = 19;
var wave_cost = 36;
var boulder_cost = 18;
var upearth_cost = 34;
var ignite_cost = 7;
var flamethrower_cost = 70;

/* wizard costs */
var air_wizard_cost = 20;
var water_wizard_cost = 30;
var earth_wizard_cost = 40;
var fire_wizard_cost = 50;

/* experience/level requirements */
var level_requirements = [15, 32, 50, 70, 92, 116, 143, 173, 205, 240, 279, 326, 377, 434, 497,
							566, 642, 725, 817, 918, 1029];

/* functions */
function save_game() {
	localStorage.setItem("sf",JSON.stringify(sf));
	document.getElementById("game-saved").innerHTML = 'game saved!';
	$('#game-saved').fadeOut(2000);
}

function load_game() {
	var savegame = JSON.parse(localStorage.getItem("sf"));
	$(document).ready(function() {
		sf.air_rune = savegame.air_rune;
		sf.water_rune = savegame.water_rune;
		sf.earth_rune = savegame.earth_rune;
		sf.fire_rune = savegame.fire_rune;
		sf.manual_power = savegame.manual_power;
		sf.level = savegame.level;
		sf.exp = savegame.exp;
		sf.air_wizard = savegame.air_wizard;
		sf.water_wizard = savegame.water_wizard;
		sf.earth_wizard = savegame.earth_wizard;
		sf.fire_wizard = savegame.fire_wizard;
		sf.air_supply = savegame.air_supply;
		sf.water_supply = savegame.water_supply;
		sf.earth_supply = savegame.earth_supply;
		sf.fire_supply = savegame.fire_supply;
		sf.ach_one_click = savegame.ach_one_click;
		sf.ach_level_five = savegame.ach_level_five;
		sf.ach_level_ten = savegame.ach_level_ten;
		sf.ach_max_supply = savegame.ach_max_supply;
		sf.ach_world = savegame.ach_world;
		sf.end_button_clicked = savegame.end_button_clicked;

		$('#air-rune-qty').text(savegame.air_rune);
		$('#water-rune-qty').text(savegame.water_rune);
		$('#earth-rune-qty').text(savegame.earth_rune);
		$('#fire-rune-qty').text(savegame.fire_rune);
		$('#air-wizard-qty').text(savegame.air_wizard);
		$('#water-wizard-qty').text(savegame.water_wizard);
		$('#earth-wizard-qty').text(savegame.earth_wizard);
		$('#fire-wizard-qty').text(savegame.fire_wizard);
		$('#air-supply').text(savegame.air_supply);
		$('#water-supply').text(savegame.water_supply);
		$('#earth-supply').text(savegame.earth_supply);
		$('#fire-supply').text(savegame.fire_supply);
		$('#level').text(savegame.level);
		$('#exp').text(savegame.exp);
		$('#manual-power').text(savegame.manual_power);

	});
}

function reset() {
	localStorage.removeItem("sf");
	document.getElementById("save-removed").innerHTML = 'save removed.';
	$('#save-removed').fadeOut(2000);
}

function load_trivia() {
	var r = Math.floor(Math.random()*6);
	if (r === 0) {
		$('#did-you-know').text(trivia[0]);
	} else if (r === 1) {
		$('#did-you-know').text(trivia[1]);
	} else if (r === 2) {
		$('#did-you-know').text(trivia[2]);
	} else if (r === 3) {
		$('#did-you-know').text(trivia[3]);
	} else if (r === 4) {
		$('#did-you-know').text(trivia[4]);
	} else {
		$('#did-you-know').text(trivia[5]);
	}
}

function rune_click(element) {
	switch (element) {
		case 'air':
			if (sf.air_rune >= sf.air_supply) {
				$('#log-text').text('you are at air rune capacity.');
			} else {
				sf.air_rune += sf.manual_power;
				$('#air-rune-qty').text(pretty(sf.air_rune));
			}
			break;

		case 'water':
			if (sf.water_rune >= sf.water_supply) {
				$('#log-text').text('you are at water rune capacity.');
			} else {
				sf.water_rune += sf.manual_power;
				$('#water-rune-qty').text(pretty(sf.water_rune));
			}			
			break;

		case 'earth':
			if (sf.earth_rune >= sf.earth_supply) {
				$('#log-text').text('you are at earth rune capacity.');
			} else {
				sf.earth_rune += sf.manual_power;
				$('#earth-rune-qty').text(pretty(sf.earth_rune));
			}	
			break;

		case 'fire':
			if (sf.fire_rune >= sf.fire_supply) {
				$('#log-text').text('you are at fire rune capacity.');
			} else {
				sf.fire_rune += sf.manual_power;
				$('#fire-rune-qty').text(pretty(sf.fire_rune));
			}
			break;
	}
}

function gust() {
	if (sf.air_rune - gust_cost >= 0) {
		sf.air_rune -= gust_cost;
		document.getElementById("air-rune-qty").innerHTML = pretty(sf.air_rune);
		sf.exp += 1;
		document.getElementById("exp").innerHTML = sf.exp;
	} else {
		document.getElementById("log-text").innerHTML = 'you don\'t have enough air runes.';
	}
}

function gale() {
	if (sf.air_rune - gale_cost >= 0) {
		sf.air_rune -= gale_cost;
		document.getElementById("air-rune-qty").innerHTML = pretty(sf.air_rune);
		sf.exp += 2;
		document.getElementById("exp").innerHTML = sf.exp;
	} else {
		document.getElementById("log-text").innerHTML = 'you don\'t have enough air runes.';
	}
}

function splash() {
	if (sf.water_rune - splash_cost >= 0) {
		sf.water_rune -= splash_cost;
		document.getElementById("water-rune-qty").innerHTML = pretty(sf.water_rune);
		sf.exp += 2;
		document.getElementById("exp").innerHTML = sf.exp;
	} else {
		document.getElementById("log-text").innerHTML = 'you don\'t have enough water runes.';
	}	
}

function wave() {
	if (sf.water_rune - wave_cost >= 0) {
		sf.water_rune -= wave_cost;
		document.getElementById("water-rune-qty").innerHTML = pretty(sf.water_rune);
		sf.exp += 4;
		document.getElementById("exp").innerHTML = sf.exp;
	} else {
		document.getElementById("log-text").innerHTML = 'you don\'t have enough water runes.';
	}	
}

function boulder() {
	if (sf.earth_rune - boulder_cost >= 0) {
		sf.earth_rune -= boulder_cost;
		document.getElementById("earth-rune-qty").innerHTML = pretty(sf.earth_rune);
		sf.exp += 2;
		document.getElementById("exp").innerHTML = sf.exp;
	} else {
		document.getElementById("log-text").innerHTML = 'you don\'t have enough earth runes.';
	}	
}

function upearth() {
	if (sf.earth_rune - upearth_cost >= 0) {
		sf.earth_rune -= upearth_cost;
		document.getElementById("earth-rune-qty").innerHTML = pretty(sf.earth_rune);
		sf.exp += 4;
		document.getElementById("exp").innerHTML = sf.exp;
	} else {
		document.getElementById("log-text").innerHTML = 'you don\'t have enough earth runes.';
	}	
}

function ignite() {
	if (sf.fire_rune - ignite_cost >= 0) {
		sf.fire_rune -= ignite_cost;
		document.getElementById("fire-rune-qty").innerHTML = pretty(sf.fire_rune);
		sf.exp += 1;
		document.getElementById("exp").innerHTML = sf.exp;
	} else {
		document.getElementById("log-text").innerHTML = 'you don\'t have enough fire runes.';
	}	
}

function flamethrower() {
	if (sf.fire_rune - flamethrower_cost >= 0) {
		sf.fire_rune -= flamethrower_cost;
		document.getElementById("fire-rune-qty").innerHTML = pretty(sf.fire_rune);
		sf.exp += 12;
		document.getElementById("exp").innerHTML = sf.exp;
	} else {
		document.getElementById("log-text").innerHTML = 'you don\'t have enough fire runes.';
	}	
}

function pretty(input){
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

function buy_wizard(element) {
	switch (element) {
		case 'air':
			if (sf.air_wizard === wizard_cap) {
				$('#log-text').text('you are at the max wizard cap!');
			} else if (sf.air_rune - air_wizard_cost >= 0) {
				sf.air_rune -= air_wizard_cost;
				sf.air_wizard += 1;
				document.getElementById("air-rune-qty").innerHTML = pretty(sf.air_rune);
				document.getElementById("air-wizard-qty").innerHTML = sf.air_wizard;
			} else {
				document.getElementById("log-text").innerHTML = 'you don\'t have enough air runes.';
			}
			break;

		case 'water':
			if (sf.water_wizard === wizard_cap) {
				$('#log-text').text('you are at the max wizard cap!');				
			} else if (sf.water_rune - water_wizard_cost >= 0) {
				sf.water_rune -= water_wizard_cost;
				sf.water_wizard += 1;
				document.getElementById("water-rune-qty").innerHTML = pretty(sf.water_rune);
				document.getElementById("water-wizard-qty").innerHTML = sf.water_wizard;
			} else {
				document.getElementById("log-text").innerHTML = 'you don\'t have enough water runes.';
			}
			break;

		case 'earth':
			if (sf.earth_wizard === wizard_cap) {
				$('#log-text').text('you are at the max wizard cap!');
			} else if (sf.earth_rune - earth_wizard_cost >= 0) {
				sf.earth_rune -= earth_wizard_cost;
				sf.earth_wizard += 1;
				document.getElementById("earth-rune-qty").innerHTML = pretty(sf.earth_rune);
				document.getElementById("earth-wizard-qty").innerHTML = sf.earth_wizard;
			} else {
				document.getElementById("log-text").innerHTML = 'you don\'t have enough earth runes.';
			}
			break;

		case 'fire':
			if (sf.fire_wizard === wizard_cap) {
				$('#log-text').text('you are at the max wizard cap!');
			} else if (sf.fire_rune - fire_wizard_cost >= 0) {
				sf.fire_rune -= fire_wizard_cost;
				sf.fire_wizard += 1;
				document.getElementById("fire-rune-qty").innerHTML = pretty(sf.fire_rune);
				document.getElementById("fire-wizard-qty").innerHTML = sf.fire_wizard;
			} else {
				document.getElementById("log-text").innerHTML = 'you don\'t have enough fire runes.';
			}
			break;
	}
}

function supply(element) {
	switch (element) {
		case 'air':
			if (sf.air_supply === max_supply) {
				$('#log-text').text('you are at max capacity for air runes!');
			} else if (sf.air_rune - 250 >= 0) {
				sf.air_rune -= 250;
				sf.air_supply += 50;
				$('#air-rune-qty').text(pretty(sf.air_rune));
				$('#air-supply').text(pretty(sf.air_supply));
			} else {
				$('#log-text').text('you don\'t have enough air runes.');
			}
			break;

		case 'water':
			if (sf.water_supply === max_supply) {
				$('#log-text').text('you are at max capacity for water runes!');
			} else if (sf.water_rune - 250 >= 0) {
				sf.water_rune -= 250;
				sf.water_supply += 50;
				$('#water-rune-qty').text(pretty(sf.water_rune));
				$('#water-supply').text(pretty(sf.water_supply));
			} else {
				$('#log-text').text('you don\'t have enough water runes.');
			}
			break;

		case 'earth':
			if (sf.earth_supply === max_supply) {
				$('#log-text').text('you are at max capacity for earth runes!');
			} else if (sf.earth_rune - 250 >= 0) {
				sf.earth_rune -= 250;
				sf.earth_supply += 50;
				$('#earth-rune-qty').text(pretty(sf.earth_rune));
				$('#earth-supply').text(pretty(sf.earth_supply));
			} else {
				$('#log-text').text('you don\'t have enough earth runes.');
			}
			break;

		case 'fire':
			if (sf.fire_supply === max_supply) {
				$('#log-text').text('you are at max capacity for fire runes!');
			} else if (sf.fire_rune - 250 >= 0) {
				sf.fire_rune -= 250;
				sf.fire_supply += 50;
				$('#fire-rune-qty').text(pretty(sf.fire_rune));
				$('#fire-supply').text(pretty(sf.fire_supply));
			} else {
				$('#log-text').text('you don\'t have enough fire runes.');
			}
			break;
	}
}

function power() {
	if (sf.fire_rune - 200 >= 0) {
		sf.manual_power += 1;
		sf.fire_rune -= 200;
		$('#manual-power').text(sf.manual_power);
		$('#fire-rune-qty').text(pretty(sf.fire_rune));
	}
}

function end_game() {
	if ((sf.air_rune - 1000 >= 0) && (sf.water_rune - 1000 >= 0) && (sf.earth_rune - 1000 >= 0) && (sf.fire_rune - 1000 >= 0)) {
		sf.air_rune -= 1000;
		sf.water_rune -= 1000;
		sf.earth_rune -= 1000;
		sf.fire_rune -= 1000;
		sf.end_button_clicked = true;
		$('#air-rune-qty').text(pretty(sf.air_rune));
		$('#water-rune-qty').text(pretty(sf.water_rune));
		$('#earth-rune-qty').text(pretty(sf.earth_rune));
		$('#fire-rune-qty').text(pretty(sf.fire_rune));
	}
}

/* clock */
window.setInterval(function(){

	/* checks for levelup */
	var level_threshold = level_requirements[sf.level-1];
	var difference = level_threshold - sf.exp;
	if (difference <= 0) {
		document.getElementById("log-text").innerHTML = 'you leveled up.';
		sf.level += 1;
		document.getElementById("level").innerHTML = sf.level;
		level_threshold = level_requirements[sf.level-1];
		difference = level_threshold - sf.exp;
		document.getElementById("exp-next").innerHTML = difference;
	} else {
		document.getElementById("exp-next").innerHTML = difference;
	}

	/* checks whether runes can be crafted */
	if (sf.level >= 3) {
		document.getElementById("water-rune-craft").disabled = false;
	} else {
		document.getElementById("water-rune-craft").disabled = true;
	}

	if (sf.level >= 5) {
		document.getElementById("earth-rune-craft").disabled = false;
	} else {
		document.getElementById("earth-rune-craft").disabled = true;
	}

	if (sf.level >= 7) {
		document.getElementById("fire-rune-craft").disabled = false;
	} else {
		document.getElementById("fire-rune-craft").disabled = true;
	}

	/* gives passive runes */
	sf.air_rune = Math.min(sf.air_rune + 0.2*sf.air_wizard, sf.air_supply);
	sf.water_rune = Math.min(sf.water_rune + 0.2*sf.water_wizard, sf.water_supply);
	sf.earth_rune = Math.min(sf.earth_rune + 0.2*sf.earth_wizard, sf.earth_supply);
	sf.fire_rune = Math.min(sf.fire_rune + 0.2*sf.fire_wizard, sf.fire_supply);

	document.getElementById("air-rune-qty").innerHTML = pretty(sf.air_rune);
	document.getElementById("water-rune-qty").innerHTML = pretty(sf.water_rune);
	document.getElementById("earth-rune-qty").innerHTML = pretty(sf.earth_rune);
	document.getElementById("fire-rune-qty").innerHTML = pretty(sf.fire_rune);
	document.getElementById("air-rate").innerHTML = '+'+pretty(0.2*sf.air_wizard)+' runes/s';
	document.getElementById("water-rate").innerHTML = '+'+pretty(0.2*sf.water_wizard)+' runes/s';
	document.getElementById("earth-rate").innerHTML = '+'+pretty(0.2*sf.earth_wizard)+' runes/s';
	document.getElementById("fire-rate").innerHTML = '+'+pretty(0.2*sf.fire_wizard)+' runes/s';

	/* checks achievements */
	if (!sf.ach_one_click && (sf.air_rune > 0)) {
		sf.ach_one_click = true;
		$('#log-text').html("you got an achievement: <b>the first step</b>");
	}
	if (!sf.ach_level_five && (sf.level >= 5)) {
		sf.ach_level_five = true;
		$('#log-text').html("you got an achievement: <b>better than aang</b>");
	}
	if (!sf.ach_level_ten && (sf.level >= 10)) {
		sf.ach_level_ten = true;
		$('#log-text').html("you got an achievement: <b>ascended</b>");
	}

	if (!sf.ach_max_supply && (sf.air_supply === max_supply)
							&& (sf.water_supply === max_supply)
							&& (sf.earth_supply === max_supply)
							&& (sf.fire_supply === max_supply)) {
		sf.ach_max_supply = true;
		$('#log-text').html("you got an achievement: <b>warehouse</b>");
	}

	if (!sf.ach_world && sf.end_button_clicked) {
		sf.ach_world = true;
		$('#log-text').html("you got an achievement: <b>endgame</b>");
	}

	/* renders achievements */
	if (sf.ach_one_click) {
		$('#ach-one-click').html("<b>the first step:</b> craft a rune");
	}
	if (sf.ach_level_five) {
		$('#ach-level-five').html("<b>better than aang:</b> unlock earth runes");
	}
	if (sf.ach_level_ten) {
		$('#ach-level-ten').html("<b>ascended:</b> reach level ten");
	}
	if (sf.ach_max_supply) {
		$('#ach-max-supply').html("<b>warehouse:</b> reach max rune capacity for every element");
	}
	if (sf.ach_world) {
		$('#ach-world').html("<b>endgame:</b> you cast the world spell. please go home now.");
	}

}, 1000);




