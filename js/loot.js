function lootChest(id){
    if (id == 0){
        // Rusty Supply Chest
        switchActivity(0);
        addInventory(2, 1, true);
        addLogs("You've obtained a Bronze Sword.");
        // Switch to inventory tab
        document.getElementById("mainTabButtonInventory").click();
        setTimeout(function() {
            alert("You've obtained a Bronze Sword. Click on the sword to equip it.");
        }, 1000);
    }
    else if (id == 1){
        // Wooden Chest
        if (lootChestStatus[0] == 0) {
            switchActivity(0);
            addInventory(1, 10, true);
            addLogs("You've obtained 10 Mushrooms.");
            changeLootChestStatus(0, 1, true);
        }
        else {
            alert("The chest has already been looted.");
        }
    }
    else if (id == 2){
        // Wooden Chest 2
        if (lootChestStatus[1] == 0) {
            switchActivity(0);
            addInventory(1, 10, true);
            addLogs("You've obtained 20 Mushrooms.");
            changeLootChestStatus(1, 1, true);
        }
        else {
            alert("The chest has already been looted.");
        }
    }
}

function updateLootChest(){
    if (localStorage.getItem("lootChestStatus") === null){
        checkNewPlayer();
    }
    else{
        lootChestStatus = JSON.parse(localStorage.getItem("lootChestStatus"));
        
        if (lootChestStatus[0] == 1){
            document.getElementById('wooden_chest').style.display = "none";
        }
        if (lootChestStatus[1] == 1){
            document.getElementById('wooden_chest2').style.display = "none";
        }
    }
}

function changeLootChestStatus(id, status, update){
    lootChestStatus = JSON.parse(localStorage.getItem("lootChestStatus"));
    lootChestStatus[id] = status;
    localStorage.setItem("lootChestStatus", JSON.stringify(lootChestStatus));
    if (update == true){
        updateLootChest();
    }
}

function lootNode(id){
    if (id == 0){ // Abandoned Camp
        if (lootNodeStatus[0] == 0) {
            switchActivity(0);
            addInventory(1, 3, true);
            addLogs("You've obtained 3 Mushrooms.");
            changeLootNodeStatus(0, 1, true);
        }
        else{
            alert("This area has already been looted.");
        }
    }
    if (id == 1){ // Abandoned Camp
        if (lootNodeStatus[1] == 0) {
            switchActivity(0);
            addInventory(1, 3, true);
            addLogs("You've obtained 3 Mushrooms.");
            addInventory(12, 1, true);
            addLogs("You've obtained a Silver Sword.");
            changeLootNodeStatus(1, 1, true);
        }
        else{
            alert("This area has already been looted.");
        }
    }
}

function updateLootNode(){
    if (localStorage.getItem("lootNodeStatus") === null){
        checkNewPlayer();
    }
    else{
        //alert(JSON.parse(localStorage.getItem("floorStatus")));
        lootNodeStatus = JSON.parse(localStorage.getItem("lootNodeStatus"));
        
        if (lootNodeStatus[0] == 1){
            document.getElementById('abandoned_camp').style.display = "none";
        }
        if (lootNodeStatus[1] == 1){
            document.getElementById('abandoned_camp2').style.display = "none";
        }
    }
}

function changeLootNodeStatus(id, status, update){
    lootNodeStatus = JSON.parse(localStorage.getItem("lootNodeStatus"));
    //alert(lootNodeStatus);
    lootNodeStatus[id] = status;
    localStorage.setItem("lootNodeStatus", JSON.stringify(lootNodeStatus));
    if (update == true){
        updateLootNode();
    }
}