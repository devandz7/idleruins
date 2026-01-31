function btnFightGiantRatNest(){
    if (activity == 3){
        if (fightNode == 1){
            fightNode = 0;
            switchActivity(0);
        }
        else{
            fightNode = 1;
            switchActivity(3);
        }
    }
    else{
        fightNode = 1;
        switchActivity(3);
    }
}

function btnFightGreatKingRat(){
    if (activity == 3){
        if (fightNode == 2){
            fightNode = 0;
            switchActivity(0);
        }
        else{
            fightNode = 2;
            switchActivity(3);
        }
    }
    else{
        fightNode = 2;
        switchActivity(3);
    }
}

function btnFightNightworm(){
    if (activity == 3){
        if (fightNode == 3){
            fightNode = 0;
            switchActivity(0);
        }
        else{
            fightNode = 3;
            switchActivity(3);
        }
    }
    else{
        fightNode = 3;
        switchActivity(3);
    }
}

function btnFightHellhound(){
    if (activity == 3){
        if (fightNode == 4){
            fightNode = 0;
            switchActivity(0);
        }
        else{
            fightNode = 4;
            switchActivity(3);
        }
    }
    else{
        fightNode = 4;
        switchActivity(3);
    }
}

function btnFightFireHellhound(){
    if (activity == 3){
        if (fightNode == 5){
            fightNode = 0;
            switchActivity(0);
        }
        else{
            fightNode = 5;
            switchActivity(3);
        }
    }
    else{
        fightNode = 5;
        switchActivity(3);
    }
}

function checkFight(){
    if (activity == 3) {
        // Check for web storage support
        if (typeof(Storage) !== "undefined") {
            if (lastdt != null){
                // Count seconds between last update time and current time
                nowdt = new Date();
                let seconds = Math.trunc((nowdt.getTime() - lastdt.getTime()) / 1000);
                if (seconds >= 1 && seconds <= 1800){ // If more than 1 seconds and less than 30 minutes
                    fight(seconds);
                }
                else if (seconds > 1800){ // limit idle progress to 30 minutes
                    fight(1800);
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

function fight(seconds){
    for (let i = 0; i < seconds; i++) {
        if (health <= 0){
            switchActivity(-1);
        }
        else{
            if (fightNode == 1){
                if (giantRatHealth <= 0){
                    giantRatHealth = 1000;

                    // Add Melee XP
                    addSkillXP(1, 2);

                    // Roll for loot
                    let l = getRandomNumber(1, 100);
                    if (l > 80){
                        addInventory(6, 2, true);
                        addLogs("You've obtained 2 Giant Rat's Claw.");
                    }
                    else{
                        addInventory(6, 1, true);
                        addLogs("You've obtained 1 Giant Rat's Claw.");
                    }
                }
                else{
                    // Combat Passives
                    combatPassives();

                    // Calc Damage to Enemy
                    giantRatHealth -= doAttack();
                    if (giantRatHealth < 0) {
                        giantRatHealth = 0;
                    }

                    // Calc Damage Received
                    decreaseHealth(doDefense());
                }

                // Set Progressbar
                progressFight(1, giantRatHealth, true);
                progressHealth(health, true);
            }
            else if (fightNode == 2){
                if (greatKingRatHealth <= 0){
                    greatKingRatHealth = 5000;

                    // Add Melee XP
                    addSkillXP(1, 25);

                    addInventory(7, 1, true);
                    addLogs("You've obtained 1 Crown of the Rat King.");

                    // Unlock Floor 2
                    if (floorStatus[1] == 0){
                        changeFloorStatus(1, 1, true);
                        addLogs("You've unlocked Floor 2.");
                    }
                }
                else{
                    // Combat Passives
                    combatPassives();

                    // Calc Damage to Enemy
                    greatKingRatHealth -= doAttack();
                    if (greatKingRatHealth < 0) {
                        greatKingRatHealth = 0;
                    }

                    // Calc Damage Received
                    decreaseHealth(doDefense());
                }

                // Set Progressbar
                progressFight(2, greatKingRatHealth, true);
                progressHealth(health, true);
            }
            else if (fightNode == 3){
                if (nightwormHealth <= 0){
                    nightwormHealth = 3000;

                    // Add Melee XP
                    addSkillXP(1, 10);

                    addInventory(8, 1, true);
                    addLogs("You've obtained 1 Nightworm Slime.");
                }
                else{
                    // Combat Passives
                    combatPassives();
                    
                    // Calc Damage to Enemy
                    nightwormHealth -= doAttack();
                    if (nightwormHealth < 0) {
                        nightwormHealth = 0;
                    }

                    // Calc Damage Received
                    decreaseHealth(doDefense());
                }

                // Set Progressbar
                progressFight(3, nightwormHealth, true);
                progressHealth(health, true);
            }
            else if (fightNode == 4){
                if (hellhoundHealth <= 0){
                    hellhoundHealth = 6000;

                    // Add Melee XP
                    addSkillXP(1, 20);

                    addInventory(10, 1, true);
                    addLogs("You've obtained 1 Hellhound's Fang.");
                }
                else{
                    // Combat Passives
                    combatPassives();
                    
                    // Calc Damage to Enemy
                    hellhoundHealth -= doAttack();
                    if (hellhoundHealth < 0) {
                        hellhoundHealth = 0;
                    }

                    // Calc Damage Received
                    decreaseHealth(doDefense());
                }

                // Set Progressbar
                progressFight(4, hellhoundHealth, true);
                progressHealth(health, true);
            }
            else if (fightNode == 5){
                if (fireHellhoundHealth <= 0){
                    fireHellhoundHealth = 10000;

                    // Add Melee XP
                    addSkillXP(1, 50);

                    addInventory(11, 1, true);
                    addLogs("You've obtained 1 Molten Claw.");
                }
                else{
                    // Combat Passives
                    combatPassives();
                    
                    // Calc Damage to Enemy
                    fireHellhoundHealth -= doAttack();
                    if (fireHellhoundHealth < 0) {
                        fireHellhoundHealth = 0;
                    }

                    // Calc Damage Received
                    decreaseHealth(doDefense());
                }

                // Set Progressbar
                progressFight(5, fireHellhoundHealth, true);
                progressHealth(health, true);
            }
        }
    }
    lastdt = new Date();
}

function getAttack(){
    // Get Attack from weapon and level

    let att = 0; // No weapon

    // Get Attack Stat from Weapon
    if (localStorage.getItem("weapon") != null){
        weapon = JSON.parse(localStorage.getItem("weapon"));
        if (weapon == 2){ // Bronze Sword
            att = 100;
        }
        else if (weapon == 12){ // Silver Sword
            att = 120;
        }
    }

    // Get Attack Stat from Level
    let mxp = parseInt(localStorage.getItem("meleeXP"));
    let mlevel = getLevelfromXP(mxp);
    att += (mlevel * 10);

    return att;
}

function doAttack(){
    let att = getAttack();

    // Get Bonus Attack from Weapon
    weapon = JSON.parse(localStorage.getItem("weapon"));
    if (weapon == 12){ // Silver Sword
        if (mana >= 20){
            att += 20;
            decreaseMana(20);
        }
    }

    // Get Attack from Artifact
    att += artifactAtt;

    // Get Enemy Defense
    let def = 50; // Giant Rat Def
    if (fightNode == 2){
        def = 100;
    }
    else if (fightNode == 3){
        def = 70;
    }
    else if (fightNode == 4){
        def = 85;
    }
    else if (fightNode == 5){
        def = 125;
    }

    let attack = getRandomNumber(att / 2, att * 2);
    let defense = getRandomNumber(def / 2, def);
    let damage = Math.floor(attack - defense);
    if (damage < 0){ // Attack is blocked
        damage = 0;
    }

    return damage;
}

function doDefense(){
    let def = 10; // No artifact

    // Get Def from Artifact
    def += artifactDef;

    // Get Enemy Attack
    let att = 10; // Giant Rat Att
    if (fightNode == 2){
        att = 25;
    }
    else if (fightNode == 3){
        att = 15;
    }
    else if (fightNode == 4){
        att = 20;
    }
    else if (fightNode == 5){
        att = 40;
    }

    let attack = getRandomNumber(att / 2, att * 2);
    let defense = getRandomNumber(def / 2, def);
    let damage = Math.floor(attack - defense);
    if (damage < 0){ // Attack is blocked
        damage = 0;
    }

    return damage;
}

function combatPassives(){
    // Artifacts
    let isCrown = false;

    // Check if Crown of the Rat King is equipped
    for (let i = 1; i < 6; i++) {
        if (localStorage.getItem("artifact" + i) != null){
            art = JSON.parse(localStorage.getItem("artifact" + i));
            if (art == 7){
                isCrown = true;
            }
        }
    }

    // Activate Crown of the Rat King passive
    if (isCrown == true){
        if (health < 25 && mana >= 10){
            increaseHealth(50);
            decreaseMana(20);
        }
    }
}

function revive(){
    // Return health and mana to max
    health = maxhealth;
    updateHealth();
    mana = maxmana;
    updateMana();

    openMainTab(event, 'mainTabSkills');
    switchActivity(0);
}

function getHealth(){
    if (localStorage.getItem("health") === null){
        updateHealth();
    }
    else{
        health = localStorage.getItem("health");
        // Dead if health <= 0
        if (health <= 0){
            switchActivity(-1);
        }
        progressHealth(health, true);
    }
}

function updateHealth(){
    // Dead if health <= 0
    if (health <= 0){
        switchActivity(-1);
    }
    localStorage.setItem("health", health);
    progressHealth(health, true);
}

function getMana(){
    if (localStorage.getItem("mana") === null){
        updateMana();
    }
    else{
        mana = localStorage.getItem("mana");
        progressMana(mana, true);
    }
}

function updateMana(){
    localStorage.setItem("mana", mana);
    progressMana(mana, true);
}

function decreaseHealth(val){
    if (localStorage.getItem("health") > 0){
        health = localStorage.getItem("health");
        health = parseInt(health) - parseInt(val);
        if (health < 0) {
            health = 0;
        }
        updateHealth();
    }
}

function increaseHealth(val){
    if (localStorage.getItem("health") > 0){
        health = localStorage.getItem("health");
        health = parseInt(health) + parseInt(val);
        if (health > maxhealth) {
            health = maxhealth;
        }
        updateHealth();
    }
}

function decreaseMana(val){
    if (localStorage.getItem("mana") > 0){
        mana = localStorage.getItem("mana");
        mana = parseInt(mana) - parseInt(val);
        if (mana < 0) {
            mana = 0;
        }
        updateMana();
    }
}

function increaseMana(val){
    if (localStorage.getItem("mana") < maxmana){
        mana = localStorage.getItem("mana");
        mana = parseInt(mana) + parseInt(val);
        if (mana > maxmana) {
            mana = maxmana;
        }
        updateMana();
    }
}

function statsRegen(){
    // Limit stat regen only after start exploring, prevent variable clash on game load for new player, causing mana = Nan
    if (activity != -1 && localStorage.getItem("floor1exp") > 0){
        increaseMana(1);
    }
}