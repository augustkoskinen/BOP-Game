//graham was here

//art
const minerpic1 =" ____\n  |  \n  |   \n     ";
const minerpic2 ="     \n     \n ___|\n    |";
const pressminerpic1 ="____ \n  |  \n  |  \n     ";
const pressminerpic2 ="     \n     \n|___ \n|    ";
const bop = document.querySelector("#bop");
const toggle = document.querySelector("#togglesave")
const reset = document.querySelector("#reset");
const statement = document.querySelector("#statement");
const bigbopbutton = " _____________________  \n|     __   __   __    |\n|    |_/  /  \\ |__)   |\n|    |__) \\__/ |      |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|     __   __   __    |\n|    |_/  /  \\ |__)   |\n|    |__) \\__/ |      |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|     __   __   __    |\n|    |_/  /  \\ |__)   |\n|    |__) \\__/ |      |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|     __   __   __    |\n|    |_/  /  \\ |__)   |\n|    |__) \\__/ |      |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|     __   __   __    |\n|    |_/  /  \\ |__)   |\n|    |__) \\__/ |      |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|     __   __   __    |\n|    |_/  /  \\ |__)   |\n|    |__) \\__/ |      |\n|                     |\n|_____________________|\n|_____________________|\n"
const bigpressbutton = " _____________________  \n|   _   _   _  __  __ |\n|  |_) |_) |_ (_  (_  |\n|  |   | \\ |_ __) __) |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|   _   _   _  __  __ |\n|  |_) |_) |_ (_  (_  |\n|  |   | \\ |_ __) __) |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|   _   _   _  __  __ |\n|  |_) |_) |_ (_  (_  |\n|  |   | \\ |_ __) __) |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|   _   _   _  __  __ |\n|  |_) |_) |_ (_  (_  |\n|  |   | \\ |_ __) __) |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|   _   _   _  __  __ |\n|  |_) |_) |_ (_  (_  |\n|  |   | \\ |_ __) __) |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|   _   _   _  __  __ |\n|  |_) |_) |_ (_  (_  |\n|  |   | \\ |_ __) __) |\n|                     |\n|_____________________|\n|_____________________|\n"

//#region variabababababables
let special = document.querySelector("#special")
let specials = 0;
let curstatement = ""
let press = document.querySelector("#press")
let bops = 0;
let presses = 0;
let advancements = [];
let pastpress = 0
let minercount = 0;
let transferbops = 0;
let transferpresses = 0;
let minerpresscount = 0;
let endgame = false
let timer= 0;
let resetbool = false
let resetminers = false
let hadfirstminer = false
if (localStorage.getItem("savegame") != null) {
    if(JSON.parse(localStorage.savegame)) {
        loadGame();
    }
} else {
    localStorage.savegame = false
}
//#endregion

display("Toggle Save: "+localStorage.savegame,"#togglesave")

//#region functions
//save game
function saveGame() {
    let savegame = JSON.parse(localStorage.savegame)
    localStorage.clear()
    localStorage.savegame = savegame;
    localStorage.hadfirstminer = JSON.stringify(hadfirstminer)
    localStorage.bops = JSON.stringify(bops)
    localStorage.presses = JSON.stringify(presses)
    localStorage.specials = JSON.stringify(specials)
    localStorage.advancements = JSON.stringify(advancements)
    localStorage.advancementslength = JSON.stringify(advancements.length)
    localStorage.curstatement = curstatement
    localStorage.timer = JSON.stringify(timer)
    localStorage.resetbool = JSON.stringify(resetbool)
    localStorage.resetminers = JSON.stringify(resetminers)
    localStorage.minerpresscount = JSON.stringify(minerpresscount)
    localStorage.minercount = JSON.stringify(minercount)
    localStorage.pastpress = JSON.stringify(pastpress)
    localStorage.endgame = JSON.stringify(endgame)
    localStorage.transferbops = JSON.stringify(transferbops)
    localStorage.transferpresses = JSON.stringify(transferpresses)
}
//load game
function loadGame() {
    bops = parseInt(localStorage.bops)
    presses = parseInt(localStorage.presses)
    specials = parseInt(localStorage.specials)
    let advancelength = parseInt(localStorage.advancementslength)
    resetminers = JSON.parse(localStorage.resetminers)
    if (advancelength!=0) {
        advancements = JSON.parse(localStorage.advancements)
    }
    curstatement = localStorage.curstatement
    timer = parseInt(localStorage.timer)
    resetbool = JSON.parse(localStorage.resetbool)
    minerpresscount = parseInt(localStorage.minerpresscount)
    minercount = parseInt(localStorage.minercount)
    if(!resetminers) {
        for(var i = 0; i < minercount;i++) { createBopMiner(); }
        for(var i = 0; i < minerpresscount;i++) { createPressMiner();}
    } else {
        minercount = 0
        minerpresscount = 0
        resetminers = false
    }
    pastpress = parseInt(localStorage.pastpress)
    endgame = JSON.parse(localStorage.endgame)
    transferbops = parseInt(localStorage.transferbops)
    transferpresses = parseInt(localStorage.transferpresses)
    hadfirstminer = JSON.parse(localStorage.hadfirstminer);
    for(var i = 0; i < advancements.length;i++) {
        advancement(advancements[i])
    }
    if(bops>0||checkArray(advancements,0)) { update(); }
    if (hadfirstminer) {
        let stone = document.querySelector("#bopstone");
        stone.innerHTML = bigbopbutton
    }
}
//update game
function update() {
    saveGame()
    if(!endgame) {
        checkAdvance();
        if (bops>0||checkArray(advancements,0)) {
            display("Bops: "+bops,"#displaybops");
            if(checkArray(advancements,0)) {
                display("Presses: "+presses,"#displaypresses")
            }
            if(checkArray(advancements,9)) {
                display("Specials: "+specials,"#displayspecials")
            }
            display(curstatement,"#statement");
        } else {
            display("","#displaybops")
            if(checkArray(advancements,0)) {
                display("","#displaypresses")
            }
            if(checkArray(advancements,9)) {
                display("","#displayspecials")
            }
            display("","#statement");
        }
    }
}
//check array for a value
function checkArray(array,value) {
    for(let i = 0; i < array.length;i++) {
        if(array[i]==value) {
            return true
        }
    }
    return false
}
//add a button
function addButton(text, buttonid,where, handler) {
    let container = document.querySelector(where);
    let button = document.createElement('button');
    button.innerText = text;
    button.id = buttonid
    button.addEventListener("keydown", function onEvent(event) { if (event.key == "Enter") { event.preventDefault(); }});
    button.addEventListener("click", handler);
    container.append(button)
    return button
}
function clearElement(element) {
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}
//create miner
function createBopMiner() {
    let container = document.querySelector("#storebopminers");
    let makeminer = document.createElement('pre');
    makeminer.innerText = minerpic2;
    container.append(makeminer)
    let minertime = 0
    let mineimg = setInterval(()=>{
        if(!endgame&&!resetminers) {
            minertime++;
            if(minertime == 1) {
                makeminer.innerHTML=minerpic1
            } else if(minertime==2) {
                makeminer.innerHTML=minerpic2
                minertime = 0
            }
        } else {
            clearInterval(mineimg);
        }
    }, 2000)
    let mine = setInterval(()=>{
        if(resetminers||endgame){
            minercount--;
            if(minercount<=0&&minerpresscount<=0) {
                resetminers = false
            }
            makeminer.remove();
            clearInterval(mine);
        } else {
            bops++;
            update();
        }
    }, 4000)
    return makeminer
}
//create press miner
function createPressMiner() {
    let container = document.querySelector("#minercenterpress");
    let makeminer = document.createElement('pre');
    makeminer.innerText = pressminerpic2;
    container.append(makeminer)
    let minertime = 0
    let mineimg = setInterval(()=>{
        if(!endgame&&!resetminers) {
            minertime++;
            if(minertime == 1) {
                makeminer.innerHTML=pressminerpic1
            } else if(minertime==2) {
                makeminer.innerHTML=pressminerpic2
                minertime = 0
            }
        } else {
            clearInterval(mineimg);
        }
    }, 2000)
    let mine = setInterval(()=>{
        if(resetminers||endgame){
            minerpresscount--;
            if(minercount<=0&&minerpresscount<=0) {
                resetminers = false
            }
            makeminer.remove();
            clearInterval(mine);
        } else {
            presses++;
            update();
        }
    }, 4000)
    return makeminer
}
//display norma text
function display(text,displayer) {
    let displayhtml = document.querySelector(displayer);
    displayhtml.innerHTML = text;
}
//check for advances
function checkAdvance() {
    if (bops>=10&& !checkArray(advancements,0)) {
        advancement(0);
        advancements.push(0);
    }
    if (bops-presses>=20&& !checkArray(advancements,1)) {
        advancement(1);
        advancements.push(1);
    }
    if (bops-presses>=40&& checkArray(advancements,1)&& !checkArray(advancements,2)) {
        advancement(2);
        advancements.push(2);
    }
    if (bops-presses>=70&& checkArray(advancements,2)&& !checkArray(advancements,3)) {
        advancement(3);
        advancements.push(3);
    }
    if (bops>=100&& !checkArray(advancements,4)) {
        advancement(4);
        advancements.push(4);
    }
    if (bops>=200&& !checkArray(advancements,5)) {
        advancement(5);
        advancements.push(5);
    }
    if (pastpress+1 <= presses && checkArray(advancements,1)&& !checkArray(advancements,6)) {
        advancement(6);
        advancements.push(6);
    }
    if (pastpress+20 <= presses && checkArray(advancements,6)&& checkArray(advancements,1)&& !checkArray(advancements,7)) {
        advancement(7);
        advancements.push(7);
    }
    if (pastpress+30 <= presses && checkArray(advancements,7)&& checkArray(advancements,1)&& !checkArray(advancements,8)) {
        advancement(8);
        advancements.push(8);
    }
    if (pastpress+40 <= presses&& checkArray(advancements,8) && checkArray(advancements,1)&& !checkArray(advancements,9)) {
        advancement(9);
        advancements.push(9);
    }
    if (specials>=5 && !checkArray(advancements,10)) {
        advancement(10);
        advancements.push(10);
    }
    if (specials>=10 && !checkArray(advancements,11)) {
        advancement(11);
        advancements.push(11);
    }
    if (minercount>=3&&!resetminers&&!checkArray(advancements,12)) {
        advancement(12);
        advancements.push(12);
    }
    if (minercount>=5&&!resetminers&& !checkArray(advancements,13)) {
        advancement(13);
        advancements.push(13);
    }
    if (bops>=500 && !checkArray(advancements,14)) {
        advancement(14);
        advancements.push(14);
    }
    if (transferbops>=10 && !checkArray(advancements,15)) {
        advancement(15);
        advancements.push(15);
    }
    if(bops>=1000 &&presses>=1000) {
        advancement(16);
        advancements.push(16);
    }
}
//action of advancement
function advancement(advancer){
    switch (advancer) {
        //react to bops
        case 0: {
            press = addButton("Press Me!","press","#presscenter",()=>{presses++;update();});
            let container = document.querySelector("#presscenter")
            let buttondisplay = document.createElement('pre');
            buttondisplay.id = "displaypresses";
            container.append(buttondisplay)
        } break;
        //plz press me
        case 1: {
            press.innerHTML = "Please press me"
            pastpress = presses;
        } break;
        //be like that
        case 2: {
            press.innerHTML = "Fine! Be like that."
            pastpress = presses;
        } break;
        //...
        case 3: {
            press.innerHTML = "...";
            pastpress = presses;
        }break;
        //add miner
        case 4: {
            if(!hadfirstminer) {
                minercount++
                createBopMiner("miner")
                if(!checkArray(advancements,4)) {
                    curstatement="A miner arrived! This person will mine BOPs for you."
                }
                hadfirstminer = true;
                let interval = setInterval(()=>{curstatement="\n"; clearInterval(interval);}, 2000);
            }
            let stone = document.querySelector("#bopstone");
            stone.innerHTML = bigbopbutton
        } break;
        case 5: {
            if (!resetminers&&minercount<9) {
                let makebopminer = addButton("Miner: 100 BOPS","buyminer","#other",()=>{if(bops>=100){bops-=100; createBopMiner(); minercount++; update(); if(minercount>=9){makebopminer.remove()}}});
            }
            let stone = document.querySelector("#bopstone");
            stone.innerHTML = bigbopbutton
        }break;
        case 6: {
            press.innerHTML = "Yay. You pressed me ONCE."
        }break;
        case 7: {
            press.innerHTML = "Oh. You actually care."
        }break;
        case 8: {
            press.innerHTML = "Thanks."
        }break;
        case 9: {
            press.innerHTML = "Here's a special button"
            special = addButton("Specials for 100 presses","special","#specialcenter",()=>{if(presses>=100){presses-=100; specials++; if(specials>=15) {special.remove()}update();}});
            let container = document.querySelector("#specialcenter")
            let buttondisplay = document.createElement('pre');
            buttondisplay.id = "displayspecials";
            container.append(buttondisplay)
        } break;
        case 10: {
            special.innerHTML = "I have a secret!"
        }break;
        case 11: {
            special.innerHTML = "Get 1,000 of bops and presses to win!"
        }break;
        case 12: {
            if(!resetminers) {
                press.innerHTML = "Hey! I want press miners."
            }
        }break;
        case 13: {
            if (!resetminers&&minerpresscount<9) {
                press.innerHTML = "Here. Buy some press miners."
                let makepressminer = addButton("Press Miner: 200 presses","buyperssminer","#other",()=>{if(presses>=200){presses-=200; createPressMiner(); minerpresscount++; update(); if(minerpresscount>=9){makepressminer.remove();}}});
            }
            let stone = document.querySelector("#pressstone");
            stone.innerHTML = bigpressbutton
        }break;
        case 14: {
            press.innerHTML = "There are too many bops! Get some of mine!"
            addButton("2 BOPs : 1 press","transferbop","#other",()=>{if(bops>=2){presses+=Math.floor(bops/2);bops=0; transferbops++; update();}});
        }break;
        case 15: {
            bop.innerHTML = "Hey! I want my bops back!"
            addButton("2 presses : 1 BOP","transferpress","#other",()=>{if(presses>=2){bops+=Math.floor(presses/2);presses=0; transferpresses++; update();}});
        }break;
        case 16: {
            const endcontainer = document.querySelector("#endcenter");
            let end = document.createElement('pre');
            let endtext = "The game is over!";
            let favor=(minercount+ transferbops)-(minerpresscount+transferpresses)
            let percent = false
            if(minercount+minerpresscount>=20&&specials>=10&&advancements.length >=17){
                percent = true
            }
            end.id = "end";
            
            if(favor<=20) {
                endtext+="\nYou favored presses.";
            } else if (favor>=20){
                endtext+="\nYou favored bops.";
            } else {
                endtext+="\nYou were neutral.";
            }
            if(minercount+minerpresscount<10) {
                endtext+="\nYou weren't very industrial.";
            } else if(minercount+minerpresscount<20) {
                endtext+="\nYou were a bit industrial.";
            }else{
                endtext+="\nYou were very industrial!";
            }
            if(specials<5) {
                endtext+="\nYou weren't very special.";
            } else if(specials<10) {
                endtext+="\nYou were a bit special.";
            }else{
                endtext+="\nYou were very special!";
            }
            if (percent) {
                endtext+="\nYou 100%ed the game!";
            }
            endtext+="\nYour total time was: "+timer;
            end.innerHTML = endtext;
            endcontainer.append(end);
            let miners = document.querySelector("#minercenter");
            let pressminers = document.querySelector("#minercenterpress");
            let buttons = document.querySelector("#buttoncenter");
            let bopstone = document.querySelector("#bopstone");
            let pressstone = document.querySelector("#pressstone");
            miners.style.visibility = "hidden";
            pressminers.style.visibility = "hidden";
            buttons.style.visibility = "hidden";
            bopstone.style.visibility = "hidden"
            pressstone.style.visibility = "hidden"
            endgame = true
            hadfirstminer = false
        }
    }
}
//#endregion

//no enter
bop.addEventListener("keydown", function onEvent(event) {
    if (event.key == "Enter") {
        event.preventDefault();
    }
});
//yes click
bop.addEventListener("click", () =>{bops++; update();});
//toggle saving
toggle.addEventListener("click", () =>{
    if (JSON.parse(localStorage.savegame)) {
        localStorage.savegame = false
        let savegame = JSON.parse(localStorage.savegame)
        localStorage.clear()
        localStorage.savegame = savegame;
    } else
        localStorage.savegame = true
    display("Toggle Save: "+localStorage.savegame,"#togglesave");
});
//reset game
reset.addEventListener("click", () =>{
    clearElement(document.querySelector("#storebopminers"));
    clearElement(document.querySelector("#minercenterpress"));
    clearElement(document.querySelector("#presscenter"));
    clearElement(document.querySelector("#specialcenter"));
    clearElement(document.querySelector("#bopstone"));
    clearElement(document.querySelector("#pressstone"));
    clearElement(document.querySelector("#other"));
    clearElement(document.querySelector("#endcenter"));
    let miners = document.querySelector("#minercenter");
    let pressminers = document.querySelector("#minercenterpress");
    let buttons = document.querySelector("#buttoncenter");
    let bopstone = document.querySelector("#bopstone");
    let pressstone = document.querySelector("#pressstone");
    miners.style.visibility = "visible";
    pressminers.style.visibility = "visible";
    buttons.style.visibility = "visible";
    bopstone.style.visibility = "visible"
    pressstone.style.visibility = "visible"
    pressstone.innerHTML = "";
    bopstone.innerHTML = "";
    let newarray = []
    specials = 0;
    curstatement = ""
    bops = 0;
    presses = 0;
    reacttext1 = "";
    reacttext2 = "";
    pressedKeys = {};
    advancements = newarray;
    pastpress = 0
    transferbops = 0;
    transferpresses = 0;
    minerpresscount = 0;
    endgame = false
    timer= 0;
    resetbool = true
    resetminers = true
    update();
    resetbool = false
    hadfirstminer = false
    saveGame();
});

//timer
setInterval(()=>{
    if(!endgame) {
        timer++
    }
}, 1000)