function btnExplore(){
    if (activity == 1){
        switchActivity(0);
    }
    else{
        switchActivity(1);
    }
}

function explore(){
    if (activity == 1) {
        // Check for web storage support
        if (typeof(Storage) !== "undefined") {
            if (lastdt != null){
                // Count seconds between last update time and current time
                nowdt = new Date();
                let seconds = Math.trunc((nowdt.getTime() - lastdt.getTime()) / 1000);
                if (seconds >= 1 && seconds <= 1800){ // If more than 1 seconds and less than 30 minutes
                    if (currentFloor == 1){
                        exploreFloor1(seconds);
                    }
                    else if (currentFloor == 2){
                        exploreFloor2(seconds);
                    }
                }
                else if (seconds > 1800){ // limit idle progress to 30 minutes
                    if (currentFloor == 1){
                        exploreFloor1(1800);
                    }
                    else if (currentFloor == 2){
                        exploreFloor2(1800);
                    }
                }
            }
            else{
                lastdt = new Date();
            }
        } else {
            activity = 0;
            alert("Sorry, no Web storage support!");
        }
    }
    else if (activity == 0){
        lastdt = null;
    }
}

function exploreFloor1(seconds){
    for (let i = 0; i < seconds; i++) {
        // Get current Floor EXP
        let exp = parseInt(localStorage.getItem("floor1exp"));
        // Add EXP
        exp = exp + 1;
        if (p1xp > 0){
            // Add bonus exp from perks
            exp = exp + p1xp;
            addLogs("You've obtained extra " + p1xp + " Exploration XP while exploring.");
            // Reset bonus exp from perks
            p1xp = 0;
        }
        
        if (exp > floor1maxexp) {
            // If reaches max EXP
            exp = floor1maxexp;
			document.getElementById('btnExploreFloor1').style.display = "none";
            switchActivity(0);
        }

        // Set new Floor EXP
        if (localStorage.getItem("floor1exp") === null){
            localStorage.setItem("floor1exp", 0);
        }
        else{
            localStorage.setItem("floor1exp", exp);
        }

        // Update Progressbar
        const result = exp / (floor1maxexp / 100);
        document.getElementById("floor1exp").innerHTML = localStorage.getItem("floor1exp") + " / " + floor1maxexp + " Exploration XP (" + result.toFixed(2) + "%)";
        progressFloor1(result.toFixed(2), true);

        // Roll for loot
        let l = getRandomNumber(1, 100);
        if (l > 95){
            addInventory(1, 1, true); // Drops Mushroom
            addLogs("You've obtained a Mushroom while exploring.");
        }
        else if (l > 90){
            addInventory(4, 1, true); // Stick
            addLogs("You've obtained a Stick while exploring.");
        }

        // Unlock Nodes
        unlocksFloor1();
    }

    lastdt = new Date();
}

function unlocksFloor1(){
    // Get Floor EXP
    let exp = parseInt(localStorage.getItem("floor1exp"));

    // Prevent EXP from exceeding max EXP
    if (exp > floor1maxexp){
        localStorage.setItem("floor1exp", floor1maxexp);
        exp = floor1maxexp;
    }

    if (exp >= 100){
        document.getElementById('mushroom_patch').style.display = "table";
    }
    else{
        document.getElementById('mushroom_patch').style.display = "none";
    }

    if (exp >= 200){
        document.getElementById('giant_rat_nest').style.display = "table";
    }
    else{
        document.getElementById('giant_rat_nest').style.display = "none";
    }

    if (exp >= 400){
        document.getElementById('whispering_hollow').style.display = "table";
    }
    else{
        document.getElementById('whispering_hollow').style.display = "none";
    }

    if (exp >= 600 && lootNodeStatus[0] == 0){
        document.getElementById('abandoned_camp').style.display = "table";
    }
    else{
        document.getElementById('abandoned_camp').style.display = "none";
    }

    if (exp >= 800){
        document.getElementById('glowing_butterflies').style.display = "table";
    }
    else{
        document.getElementById('glowing_butterflies').style.display = "none";
    }

    if (exp >= 1000){
        document.getElementById('great_king_rat').style.display = "table";
    }
    else{
        document.getElementById('great_king_rat').style.display = "none";
    }
}

function exploreFloor2(seconds){
    for (let i = 0; i < seconds; i++) {
        // Get current Floor EXP
        let exp = parseInt(localStorage.getItem("floor2exp"));
        // Add EXP
        exp = exp + 1;
        if (p1xp > 0){
            // Add bonus exp from perks
            exp = exp + p1xp;
            addLogs("You've obtained extra " + p1xp + " Exploration XP while exploring.");
            // Reset bonus exp from perks
            p1xp = 0;
        }
        
        if (exp > floor2maxexp) {
            // If reaches max EXP
            exp = floor2maxexp;
			document.getElementById('btnExploreFloor2').style.display = "none";
            switchActivity(0);
        }

        // Set new Floor EXP
        if (localStorage.getItem("floor2exp") === null){
            localStorage.setItem("floor2exp", 0);
        }
        else{
            localStorage.setItem("floor2exp", exp);
        }

        // Update Progressbar
        const result = exp / (floor2maxexp / 100);
        document.getElementById("floor2exp").innerHTML = localStorage.getItem("floor2exp") + " / " + floor2maxexp + " Exploration XP (" + result.toFixed(2) + "%)";
        progressFloor2(result.toFixed(2), true);

        // Roll for loot
        let l = getRandomNumber(1, 100);
        if (l > 95){
            addInventory(1, 1, true); // Drops Mushroom
            addLogs("You've obtained a Mushroom while exploring.");
        }
        else if (l > 90){
            addInventory(4, 1, true); // Stick
            addLogs("You've obtained a Stick while exploring.");
        }

        // Unlock Nodes
        unlocksFloor2();
    }

    lastdt = new Date();
}

function unlocksFloor2(){
    // Get Floor EXP
    let exp = parseInt(localStorage.getItem("floor2exp"));

    // Prevent EXP from exceeding max EXP
    if (exp > floor2maxexp){
        localStorage.setItem("floor2exp", floor2maxexp);
        exp = floor2maxexp;
    }

    if (exp >= 100 && lootChestStatus[0] == 0){
        document.getElementById('wooden_chest').style.display = "table";
    }
    else{
        document.getElementById('wooden_chest').style.display = "none";
    }

    if (exp >= 300){
        document.getElementById('nightworm').style.display = "table";
    }
    else{
        document.getElementById('nightworm').style.display = "none";
    }

    if (exp >= 500 && lootNodeStatus[1] == 0){
        document.getElementById('abandoned_camp2').style.display = "table";
    }
    else{
        document.getElementById('abandoned_camp2').style.display = "none";
    }

    if (exp >= 800 && lootChestStatus[1] == 0){
        document.getElementById('wooden_chest2').style.display = "table";
    }
    else{
        document.getElementById('wooden_chest2').style.display = "none";
    }

    if (exp >= 1200){
        document.getElementById('shadowed_crevice').style.display = "table";
    }
    else{
        document.getElementById('shadowed_crevice').style.display = "none";
    }

    if (exp >= 1600){
        document.getElementById('hellhound').style.display = "table";
    }
    else{
        document.getElementById('hellhound').style.display = "none";
    }

    if (exp >= 2000){
        document.getElementById('fire_hellhound').style.display = "table";
    }
    else{
        document.getElementById('fire_hellhound').style.display = "none";
    }
}

function getPerks(){
    if (activity == 1){
        // Check if perks timer have runs out
        if (p1s <= 0){
            // Roll for Perks
            let p1 = getRandomNumber(1, 1000);
            p1s = 10;
            if (p1 > 950){
                document.getElementById('perks').innerHTML = '<button class="button_perks" onclick="activatePerks(4)">+5 Mushroom</button>';
            }
            else if (p1 > 850){
                document.getElementById('perks').innerHTML = '<button class="button_perks" onclick="activatePerks(3)">+50 EXP</button>';
            }
            else if (p1 > 700){
                document.getElementById('perks').innerHTML = '<button class="button_perks" onclick="activatePerks(2)">+25 EXP</button>';
            }
            else if (p1 > 500){
                document.getElementById('perks').innerHTML = '<button class="button_perks" onclick="activatePerks(1)">+15 EXP</button>';
            }
            else {
                document.getElementById('perks').innerHTML = '';
                p1s = 0;
            }
        }
        else{
            p1s -= 1;
        }
    }
    else{
        document.getElementById('perks').innerHTML = '';
    }
}

function activatePerks(perks){
    if (perks == 1){
        p1xp = 15;
    }
    else if (perks == 2){
        p1xp = 25;
    }
    else if (perks == 3){
        p1xp = 50;
    }
    else if (perks == 4){
        addInventory(1, 5, true);
        addLogs("You've obtained 5 Mushrooms while exploring.");
    }
    document.getElementById('perks').innerHTML = '';
}