function btnGatherWhisperingHollow(){
    if (activity == 2){
        if (gatherNode == 1){
            gatherNode = 0;
            switchActivity(0);
        }
        else{
            gatherNode = 1;
            switchActivity(2);
        }
    }
    else{
        gatherNode = 1;
        switchActivity(2);
    }
}

function btnGatherGlowingButterflies(){
    if (activity == 2){
        if (gatherNode == 2){
            gatherNode = 0;
            switchActivity(0);
        }
        else{
            gatherNode = 2;
            switchActivity(2);
        }
    }
    else{
        gatherNode = 2;
        switchActivity(2);
    }
}

function btnGatherShadowedCrevice(){
    if (activity == 2){
        if (gatherNode == 3){
            gatherNode = 0;
            switchActivity(0);
        }
        else{
            gatherNode = 3;
            switchActivity(2);
        }
    }
    else{
        gatherNode = 3;
        switchActivity(2);
    }
}

function btnGatherMushroomPatch(){
    if (activity == 2){
        if (gatherNode == 4){
            gatherNode = 0;
            switchActivity(0);
        }
        else{
            gatherNode = 4;
            switchActivity(2);
        }
    }
    else{
        gatherNode = 4;
        switchActivity(2);
    }
}

function checkGather(){
    if (activity == 2) {
        // Check for web storage support
        if (typeof(Storage) !== "undefined") {
            if (lastdt != null){
                // Count seconds between last update time and current time
                nowdt = new Date();
                let seconds = Math.trunc((nowdt.getTime() - lastdt.getTime()) / 1000);
                if (seconds >= 1 && seconds <= 1800){ // If more than 1 seconds and less than 30 minutes
                    gather(seconds);
                }
                else if (seconds > 1800){ // limit idle progress to 30 minutes
                    gather(1800);
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

function gather(seconds){
    for (let i = 0; i < seconds; i++) {
        if (gatherNode == 1){
            if (whisperingHollowProg >= 100){
                whisperingHollowProg = 0;

                // Add Gathering XP
                addSkillXP(2, 2);

                // Roll for loot
                let l = getRandomNumber(1, 100);
                if (l > 80){
                    addInventory(3, 2, true);
                    addLogs("You've obtained 2 Air Essence.");
                }
                else{
                    addInventory(3, 1, true);
                    addLogs("You've obtained 1 Air Essence.");
                }
            }
            else{
                whisperingHollowProg += 20;
                if (whisperingHollowProg > 100) {
                    whisperingHollowProg = 0;
                }
            }

            // Set Progressbar
            progressGather(1, whisperingHollowProg, true);
        }
        else if (gatherNode == 2){
            if (glowingButterfliesProg >= 100){
                glowingButterfliesProg = 0;

                // Add Gathering XP
                addSkillXP(2, 5);

                // Roll for loot
                let l = getRandomNumber(1, 100);
                if (l > 80){
                    addInventory(5, 2, true);
                    addLogs("You've obtained 2 Vibrant Wing.");
                }
                else{
                    addInventory(5, 1, true);
                    addLogs("You've obtained 1 Vibrant Wing.");
                }
            }
            else{
                glowingButterfliesProg += 20;
                if (glowingButterfliesProg > 100) {
                    glowingButterfliesProg = 0;
                }
            }

            // Set Progressbar
            progressGather(2, glowingButterfliesProg, true);
        }
        else if (gatherNode == 3){
            if (shadowedCreviceProg >= 100){
                shadowedCreviceProg = 0;

                // Add Gathering XP
                addSkillXP(2, 10);

                // Roll for loot
                let l = getRandomNumber(1, 100);
                if (l > 80){
                    addInventory(9, 2, true);
                    addLogs("You've obtained 2 Earth Essence.");
                }
                else{
                    addInventory(9, 1, true);
                    addLogs("You've obtained 1 Earth Essence.");
                }
            }
            else{
                shadowedCreviceProg += 20;
                if (shadowedCreviceProg > 100) {
                    shadowedCreviceProg = 0;
                }
            }
            
            // Set Progressbar
            progressGather(3, shadowedCreviceProg, true);
        }
        else if (gatherNode == 4){
            if (mushroomPatchProg >= 100){
                mushroomPatchProg = 0;

                // Add Gathering XP
                addSkillXP(2, 2);

                // Roll for loot
                let l = getRandomNumber(1, 100);
                if (l > 80){
                    addInventory(1, 2, true);
                    addLogs("You've obtained 2 Mushroom.");
                }
                else{
                    addInventory(1, 1, true);
                    addLogs("You've obtained 1 Mushroom.");
                }
            }
            else{
                mushroomPatchProg += 20;
                if (mushroomPatchProg > 100) {
                    mushroomPatchProg = 0;
                }
            }
            
            // Set Progressbar
            progressGather(4, mushroomPatchProg, true);
        }
    }
    lastdt = new Date();
}