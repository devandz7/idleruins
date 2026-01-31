// Import Saves
const ofd = document.getElementById('openFile');
ofd.onchange = e => { 

    // Get imported saves file
    var file = e.target.files[0]; 

    // Define FileReader
    var reader = new FileReader();
    reader.readAsText(file,'UTF-8');

    // Read imported saves file
    reader.onload = readerEvent => {
        var txt = readerEvent.target.result; // Imported saves file
        
        // Decompress
        var ds = LZString.decompressFromEncodedURIComponent(txt);

        stxt = ds.split(",");

        if (stxt[0] == "0.1"){ // If version 0.1
            localStorage.setItem("health", stxt[1]);
            localStorage.setItem("mana", stxt[2]);
            localStorage.setItem("weapon", stxt[3]);
            localStorage.setItem("artifact1", stxt[4]);
            localStorage.setItem("artifact2", stxt[5]);
            localStorage.setItem("artifact3", stxt[6]);
            localStorage.setItem("artifact4", stxt[7]);
            localStorage.setItem("artifact5", stxt[8]);

            // Inventory
            let inv = stxt[9];
            let inva = inv.split(";");
            localStorage.setItem("inventory", inva);

            localStorage.setItem("meleeXP", stxt[10]);
            localStorage.setItem("gatheringXP", stxt[11]);
            localStorage.setItem("floor1exp", stxt[12]);
            localStorage.setItem("floor2exp", stxt[13]);

            // Floor Status
            let ifs = stxt[14];
            let ifsa = ifs.split(";");
            localStorage.setItem("floorStatus", ifsa);

            // Loot Chest Status
            let ics = stxt[15];
            let icsa = ics.split(";");
            localStorage.setItem("lootChestStatus", icsa);
            
            // Loot Node Status
            let ins = stxt[16];
            let insa = ins.split(";");
            localStorage.setItem("lootNodeStatus", insa);
        }

        // Reload page
        location.reload();
    }

}

function exportSaves(){
    let stxt = [];
    let inv = localStorage.getItem("inventory");
    let efs = localStorage.getItem("floorStatus");
    let ecs = localStorage.getItem("lootChestStatus");
    let ens = localStorage.getItem("lootNodeStatus");
    stxt.push("0.1"); // Game Version
    stxt.push(localStorage.getItem("health"));
    stxt.push(localStorage.getItem("mana"));
    stxt.push(localStorage.getItem("weapon"));
    stxt.push(localStorage.getItem("artifact1"));
    stxt.push(localStorage.getItem("artifact2"));
    stxt.push(localStorage.getItem("artifact3"));
    stxt.push(localStorage.getItem("artifact4"));
    stxt.push(localStorage.getItem("artifact5"));
    stxt.push(inv.replace(/,/g, ";"));
    stxt.push(localStorage.getItem("meleeXP"));
    stxt.push(localStorage.getItem("gatheringXP"));
    stxt.push(localStorage.getItem("floor1exp"));
    stxt.push(localStorage.getItem("floor2exp"));
    stxt.push(efs.replace(/,/g, ";"));
    stxt.push(ecs.replace(/,/g, ";"));
    stxt.push(ens.replace(/,/g, ";"));

    // Compress string
    var cs = LZString.compressToEncodedURIComponent(stxt.toString());

    // Download save file
    const link = document.createElement("a");
    const content = cs;
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "saves.txt";
    link.click();
    URL.revokeObjectURL(link.href);
}

function importSaves(){
    document.getElementById('openFile').click();
}

function resetSaves(){
    if (confirm("Are you sure you want to RESET your progress? This will DELETE your current saves and can't be undone.") == true) {
        switchActivity(0);
        
        localStorage.setItem("health", 1000);
        localStorage.setItem("mana", 1000);
        localStorage.setItem("weapon", 0);
        localStorage.setItem("artifact1", 0);
        localStorage.setItem("artifact2", 0);
        localStorage.setItem("artifact3", 0);
        localStorage.setItem("artifact4", 0);
        localStorage.setItem("artifact5", 0);

        // Inventory
        var inv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        localStorage.setItem("inventory", JSON.stringify(inv));

        localStorage.setItem("meleeXP", 0);
        localStorage.setItem("gatheringXP", 0);
        localStorage.setItem("floor1exp", 0);
        localStorage.setItem("floor2exp", 0);

        var rfs = [1, 0];
        localStorage.setItem("floorStatus", JSON.stringify(rfs));

        var rlc = [0, 0];
        localStorage.setItem("lootChestStatus", JSON.stringify(rlc));

        var rln = [0, 0];
        localStorage.setItem("lootNodeStatus", JSON.stringify(rln));

        // Reload page
        location.reload();
    }
}