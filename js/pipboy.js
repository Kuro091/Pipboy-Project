// JavaScript Document

let isValid = false;
let weightTotal = 0;

//'DomContentLoaded = on page load'
document.addEventListener('DOMContentLoaded', function() {
	
	var weapons = [
		{"name": "44_pistol",
		 "damage": 48,
		 "fire_rate": 6,
		 "range": 119,
		 "accuracy": 66,
		 "weight": 4.2,
		 "value": 99,
		 "src": "images/44_pistol.png"
		},
		{"name": "double_barrel_shotgun",
		 "damage": 45,
		 "fire_rate": 162,
		 "range": 36,
		 "accuracy": 16,
		 "weight": 9,
		 "value": 359,
		 "src": "images/shotgun.png"
		},
		{"name": "assault_rifle",
		 "damage": 30,
		 "fire_rate": 40,
		 "range": 119,
		 "accuracy": 72,
		 "weight": 13.1,
		 "value": 144,
		 "src": "images/assault_rifle.png"
		},
		{"name": "institute_laser",
		 "damage": 15,
		 "fire_rate": 66,
		 "range": 71,
		 "accuracy": 70,
		 "weight": 3.9,
		 "value": 50,
		 "src": "images/institute_pistol.png"
		},
		{"name": "alien_blaster",
		 "damage": 50,
		 "fire_rate": 100,
		 "range": 119,
		 "accuracy": 76,
		 "weight":  2.5,
		 "value": 1551,
		 "src": "images/Alien_blaster_pistol.png"
		},
		{"name": "plasma_thrower",
		 "damage": 48,
		 "fire_rate": 33,
		 "range": 119,
		 "accuracy": 148,
		 "weight": 4.8,
		 "value": 602,
		 "src": "images/plasma_thrower.png"
		}
	];
	
	
	
	for(var i = 0; i<weapons.length; i++){
				weightTotal = weightTotal + weapons[i].weight;
			}
				var weight_container = $('#footer');
				weight_container.find('.weight').html(Math.round(weightTotal) +"/300");
	
	
	/*HIEN STATS*/
	$('#weapon').on('mouseover', 'a', function(e){
		var numOfClass = $(e.currentTarget).attr('class').length; 
		
		if (numOfClass >1)//Nhỡ có thêm class active
			var current_item = $(e.currentTarget).attr('class').split(' ')[0];
		else current_item =  $(e.currentTarget).attr('class');
		
		
		//item tra ve gia tri index
		for (var item in weapons){
			if(weapons[item].name === current_item){
				var container = $('.item-stats');
				var img_container = $('.img_holder');
				
				container.find('.damage').html(weapons[item].damage);
				container.find('.fire_rate').html(weapons[item].fire_rate);
				
				container.find('.range').html(weapons[item].range);
				
				container.find('.accuracy').html(weapons[item].accuracy);
				
				container.find('.weight').html(weapons[item].weight);
				
				container.find('.value').html(weapons[item].value);
				
				container.find('.src').html(weapons[item].value);
				
				img_container.find('#wp_img').attr("src", weapons[item].src);
			}
		}
	});
	
	
	/*DMG UPDATE*/
	$('#weapon').click(function(){
		$('a').click(function(e){
			var current_wp_dmg = $(e.currentTarget).attr('class');
		
		console.log(current_wp_dmg);
		for (var i in weapons){
			if(weapons[i].name === current_wp_dmg){
				var footer_container = $('#footer');
				
				footer_container.find('.damage').html(weapons[i].damage);
			}
		}
		});
		
	});
	
	
	
	/*ADD WEAPON*/
	$("#add").click(function(e){
		var existed = true;
		var wp_name_container = document.querySelectorAll('#list a');
		var wp_name = $("#wp_name").val();/*current*/
		var wp_id = wp_name.split(' ').join('_').toLowerCase();
		
		for (var item in wp_name_container){
			if (wp_name === wp_name_container[item].innerHTML){
				alert("Weapon already existed!");
				existed = true;
				break;
			}else{
				existed = false;
			} 
		}
		
		/*check input*/
		$("form").submit(function(e){
			e.preventDefault();  
		});
		var nameCheck = $('#wp_name').val();
		var dmgCheck = $('#damage').val();
		var frCheck = $('#fire_rate').val();
		var rangeCheck = $('#range').val();
		var accCheck  = $('#accuracy').val();
		var weightCheck  = $('#weight').val();
		var valCheck  = $('#value').val();
		var imgsrcCheck  = $('#imgsrc').val();
		
		if (nameCheck == "" || dmgCheck == "" || frCheck == "" || rangeCheck == ""|| accCheck == ""|| weightCheck == ""|| valCheck == ""|| imgsrcCheck == "" || !validateURL(imgsrcCheck)){
			alert("Please fill out all field");
			existed = true;
		}else existed = false;
		/*End check input*/
		
		if (!existed){
			var li = "<li><a" +" href='#'"+ "class = " + wp_id + ">" + wp_name + "</a></li>";
			$("#list").append(li);/*CHO VAO ELEMENT LI -- CHI CO CHU + ID CHU KO CO STAT*/
			
			/*ADD STATS CUA CUSTOM WEAPON*/
			var add_to_list = {};
			add_to_list['name'] = $('#wp_name').val();
			add_to_list['damage'] = $('#damage').val();
			add_to_list['fire_rate'] = $('#fire_rate').val();
			add_to_list['range'] = $('#range').val();
			add_to_list['accuracy'] = $('#accuracy').val();
			add_to_list['weight'] = $('#weight').val();
			add_to_list['value'] = $('#value').val();
			add_to_list['src'] = $('#imgsrc').val();
			weapons.push(add_to_list);
			
			
			/*UPDATE WEIGHT LUON*/
			var wp_weight = $('#weight').val();
				weightTotal = parseInt(wp_weight) + weightTotal;
			weight_container.find('.weight').html(Math.round(weightTotal) +"/300");
		}
	});
	
	
	
		/*PICK WEAPON*/
	$('#weapon').on('click', 'a', function(e){
		$('.item-list a').removeClass('active');
		$(e.currentTarget).addClass('active');
		
	});
	
	$('.nav-tabs').on('click', function(e){
		$('.nav-item a').removeClass('active');
		$(e.currentTarget).addClass('active');
	});
	
	
	/*SELECT MAP*/
	$('.map-container .cls-1').on('click', function(e){
		$('.map-container path').removeClass('selected');
		$(e.currentTarget).addClass('selected');
	});
	
	var pathContainer = $('.map-container path');
	for (var i= 0; i<pathContainer.length; i++){
		pathContainer.attr('data-toggle', 'modal');
		pathContainer.attr('data-target', 'area' + i);
	}
	
	
}, false);

function validateURL(textval) {
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}

document.addEventListener('DOMContentLoaded', function() {
	var specials =[
		{'id' : "strength",
		 'imgsrc' : "images/Fo4_Strength.png",
		 'value' : 5,
		 'textsrc' : "Strength is primarily relevant to two in-game mechanics: Carry Weight and satisfying the minimum Strength requirements on weapons. Each point of it grants 25 lbs. of Carry Weight (with the Small Frame trait, it is 15 instead). ",
		},
		{'id' : "perception",
		'imgsrc' : "images/Fo4_Perception.png",
		 'value' : 9,
		 'textsrc' : "Perception determines how far away enemies can be detected on the compass (enemies show as red bars). When playing with a high Perception, it is possible to sense the enemies even before they come into view.",
		},
		{'id' : "endurance",
		'imgsrc' : "images/Fo4_Endurance.png",
		 'value' : 2,
		 'textsrc' : "Endurance determines a character's environmental resistances (poison, radiation), Hit Points, and Healing Rate, as well as the starting levels of the Unarmed and Survival skills. It also determines the number of implants allowed",
		},
		{'id' : "charisma",
		'imgsrc' : "images/Fo4_Charisma.png",
		 'value' : 34,
		 'textsrc' : "Charisma also determines the number of base companion slots the player character is given. This number is equal to their Charisma score divided by two, rounded down. As an example, with a Charisma at five, two can be recruited. Please note that one companion can still be recruited (in a few cases) even with the lowest Charisma score. ",
		},
		{'id' : "intelligence",
		'imgsrc' : "images/Fo4_Intelligence.png",
		 'value' : 1,
		 'textsrc' : "Intelligence determines the number of skill points earned per level up. The base number of skill points gained per level is 10 + INT. Skill points gained for raised Intelligence are not retroactive for past levels, so increasing this primary stat early, if at all, is the best. ",
		},
		{'id' : "agility",
		'imgsrc' : "images/Fo4_Agility.png",
		 'value' : 9,
		 'textsrc' : "Agility determines the number of action points available for use in V.A.T.S. (base AP determined by 65 + (Agility x3), and can be raised by perks and some items).",
		},
		{'id' : "luck",
		'imgsrc' : "images/Fo4_Luck.png",
		 'value' : 12,
		 'textsrc' : "Luck primarily affects the chances with the virtual dice of the game: a high Luck increases the likelihood to succeed a roll, while the opposite is also true. Luck also affects the chance to score a critical hit on a target, with the standard being that the Critical Chance is equal to the subject's Luck (keep in mind, standard means without perks, traits, or aimed shots). It also determines the initial level of the Gambling skill. ",
		},
	];
	
	for (var item in specials){
		var li = "<li><a href='#' id='" + specials[item].id.toLowerCase() + "'>" +"<div class='col-12'> <span class='float-right'>"+specials[item].value+"</span> <span>"+ specials[item].id.toUpperCase() + "</span> </div></a></li>";
		$('#special-list ul').append(li);
	}
	
	$('#special-list').on('mouseover', 'a', function(e){
		var current_special = $(e.currentTarget).attr('id');
		
		for (var i in specials){
			if (specials[i].id.toLowerCase() === current_special){
				var container = $('.desc');
				var img_container = $('#special_img');
				console.log(img_container);
				
				container.html(specials[i].textsrc);
				
				
				img_container.attr("src", specials[i].imgsrc);
			}
		}
	});
}, false);

document.addEventListener('DOMContentLoaded', function() {
	var regions = [
		{'id' : 'concord',
		'name' : 'Concord',
		 'map_desc' : 'aaaaaaaaaaaaa',
		 'map_desc_content' : 'Concord was a historic town, founded in 1635, famous along with nearby Lexington as the site of several battles that lead to the American Revolutionary War. ',
		 'img_src': 'images/concord.jpg'
		},
		{'id' : 'medford',
			'name' : 'Medford',
		 'map_desc' : 'bbbbbbbbbbb',
		 'map_desc_content' : 'Malden Township is a location in the Commonwealth in 2287. ',
		 'img_src': 'images/medford.jpg'
		},
		{'id' : 'salem',
			'name' : 'Salem',
		 'map_desc' : 'cccccccccc',
		 'map_desc_content' : 'Salem was previously a quaint coastal town and seaport, as well as a tourist destination infamous for the witch trials of 1692.',
		 'img_src': 'images/salem.jpg'
		},
		{'id' : 'weston',
			'name' : 'Weston',
		 'map_desc' : 'dddddddddddddd',
		 'map_desc_content' : 'Built in 2051, the Weston water treatment plant was part of a decade-long plan to modernize the city’s aging sanitation systems[1]. The facility was equipped with advanced Mark IV flood control pumps, which Theodore Marks believes to be the only non-cheap equipment in the facility. ',
		 'img_src': 'images/weston.jpg'
		},
		{'id' : 'cambridge',
			'name' : 'Cambridge',
		 'map_desc' : 'eeeeeeeeeeee',
		 'map_desc_content' : 'Concord was a historic town, founded in 1635, famous along with nearby Lexington as the site of several battles that lead to the American Revolutionary War. ',
		 'img_src': 'images/cambridge.jpg'
		},
		{'id' : 'boston',
			'name' : 'Boston',
		 'map_desc' : 'fffffffffff',
		 'map_desc_content' : 'Before the Great War, Cambridge was a city sprawling with college structures and old homes built before the 21st century.[1] Home to the Commonwealth Institute of Technology, Cambridge was highly bent on academics and research, with buildings such as the Campus law offices, Greenetech Genetics, and Cambridge Polymer Labs.  ',
		 'img_src': 'images/boston.jpg'
		},
		{'id' : 'boston_airport',
			'name' : 'Boston Airport',
		 'map_desc' : 'ggggggggg',
		 'map_desc_content' : 'Before the war, the airport was composed of several runways, hangars, and support buildings.[1] Struck by rising sea levels after the Great War, the runways and other low-lying buildings were submerged by the adjacent ocean.[2] ',
		 'img_src': 'images/boston_airport.jpg'
		},
		{'id' : 'Natick',
			'name' : 'Natick',
		 'map_desc' : 'hhhhhhhhh',
		 'map_desc_content' : 'Natick was a highly industrial town, with factories, shops, and a large power station. The town was home to Marshall Wu and his family, who were Chinese-Americans hiding from being brought to internment camps during the Resource Wars.[1]',
		 'img_src': 'images/natick.jpg'
		},
		{'id' : 'south_boston',
			'name' : 'South Boston',
		 'map_desc' : 'dddddddddqwsdas',
		 'map_desc_content' : 'South boston desc ',
		 'img_src': 'images/south_boston.jpg'
		},
		{'id' : 'Quincy',
			'name' : 'Quincy',
		 'map_desc' : 'rrrrrrrrrrrrr',
		 'map_desc_content' : 'Quincy desc ',
		 'img_src': 'images/quincy.jpg'
		},
	];
	
	$('.map-container path').on('click', function(e){
		$('#map_desc').show();
		
	var current_region = $(e.currentTarget).attr('id');
		
		for (var items in regions){
			if (current_region === regions[items].id.toLowerCase()){
				var desc_container = $('#map_desc');
				desc_container.find('h1').html( regions[items].name);
				
				desc_container.find('.loc').html(regions[items].map_desc);
				
				desc_container.find('article').html("<p>" + regions[items].map_desc_content + "</p>")
				
				desc_container.find('.minimap img').attr("src", regions[items].img_src);
				/*for(var i = 0; i<Math.floor(Object.keys(regions[items]).length)/3; i++){
					var quest_name = "<p class='loc quest" + (i+1) + "'>" + regions[items].quest1 +"</p>";
					
					var quest_content = "<b>0" + (i+1) +"</b>" + "<article><p>" + regions[items].quest_desc +"</p></article>";
					console.log(quest_content);*/
 			}
		}
	});
}, false);