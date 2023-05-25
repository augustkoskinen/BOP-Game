//graham was here

//art
const minerpic1 ="____\n |\n |";
const minerpic2 ="   |\n---|\n   |";
const pressminerpic1 ="____\n  |\n  |";
const pressminerpic2 ="|   \n|---\n|   ";
const bop = document.querySelector("#bop");
const statement = document.querySelector("#statement");
const bigbopbutton = " _____________________  \n|     __   __   __    |\n|    |_/  /  \\ |__)   |\n|    |__) \\__/ |      |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|     __   __   __    |\n|    |_/  /  \\ |__)   |\n|    |__) \\__/ |      |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|     __   __   __    |\n|    |_/  /  \\ |__)   |\n|    |__) \\__/ |      |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|     __   __   __    |\n|    |_/  /  \\ |__)   |\n|    |__) \\__/ |      |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|     __   __   __    |\n|    |_/  /  \\ |__)   |\n|    |__) \\__/ |      |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|     __   __   __    |\n|    |_/  /  \\ |__)   |\n|    |__) \\__/ |      |\n|                     |\n|_____________________|\n|_____________________|\n"
const bigpressbutton = " _____________________  \n|   _   _   _  __  __ |\n|  |_) |_) |_ (_  (_  |\n|  |   | \\ |_ __) __) |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|   _   _   _  __  __ |\n|  |_) |_) |_ (_  (_  |\n|  |   | \\ |_ __) __) |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|   _   _   _  __  __ |\n|  |_) |_) |_ (_  (_  |\n|  |   | \\ |_ __) __) |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|   _   _   _  __  __ |\n|  |_) |_) |_ (_  (_  |\n|  |   | \\ |_ __) __) |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|   _   _   _  __  __ |\n|  |_) |_) |_ (_  (_  |\n|  |   | \\ |_ __) __) |\n|                     |\n|_____________________|\n|_____________________|\n _____________________  \n|   _   _   _  __  __ |\n|  |_) |_) |_ (_  (_  |\n|  |   | \\ |_ __) __) |\n|                     |\n|_____________________|\n|_____________________|\n"

//#region variabababababables
let special = document.querySelector("#special")
let specials = 0;
let totalbops = 0
let curstatement = ""
let press = document.querySelector("#press")
let bops = 0;
let presses = 0;
let reacttext1 = "";
let reacttext2 = "";
var pressedKeys = {};
let advancements = [];
let pastpress = 0
let minercount = 0;
let transferbops = 0;
let transferpresses = 0;
let minerpresscount = 0;
let endgame = false
let timer= 0;
//#endregion

//#region functions
//+presses
function update() {
    if(!endgame) {
        checkAdvance();
        display("Bops: "+bops,"#displaybops");
        if(checkArray(advancements,0)) {
            display("Presses: "+presses,"#displaypresses")
        }
        if(checkArray(advancements,9)) {
            display("Specials: "+specials,"#displayspecials")
        }
        display(curstatement,"#statement");
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
//create miner
function createBopMiner() {
    minercount++
    let container = document.querySelector("#minercenter");
    let makeminer = document.createElement('pre');
    makeminer.innerText = minerpic2;
    container.append(makeminer)
    let minertime = 0
    setInterval(()=>{
        minertime++;
        if(minertime == 1) {
            makeminer.innerHTML=minerpic1
        } else if(minertime==2) {
            makeminer.innerHTML=minerpic2
            minertime = 0
        }
    }, 2000)
    setInterval(()=>{
        bops++;
        update();
    }, 4000)
    return makeminer
}
//create press miner
function createPressMiner() {
    minerpresscount++
    let container = document.querySelector("#minercenterpress");
    let makeminer = document.createElement('pre');
    makeminer.innerText = pressminerpic2;
    container.append(makeminer)
    let minertime = 0
    setInterval(()=>{
        minertime++;
        if(minertime == 1) {
            makeminer.innerHTML=pressminerpic1
        } else if(minertime==2) {
            makeminer.innerHTML=pressminerpic2
            minertime = 0
        }
    }, 2000)
    setInterval(()=>{
        presses++;
        update();
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
    }
    if (bops-presses>=20&& !checkArray(advancements,1)) {
        advancement(1);
    }
    if (bops-presses>=40&& !checkArray(advancements,2)) {
        advancement(2);
    }
    if (bops-presses>=70&& !checkArray(advancements,3)) {
        advancement(3);
    }
    if (bops>=100&& !checkArray(advancements,4)) {
        advancement(4);
    }
    if (bops>=200&& !checkArray(advancements,5)) {
        advancement(5);
    }
    if (pastpress+1 <= presses && checkArray(advancements,1)&& !checkArray(advancements,6)) {
        advancement(6);
    }
    if (pastpress+20 <= presses && checkArray(advancements,1)&& !checkArray(advancements,7)) {
        advancement(7);
    }
    if (pastpress+30 <= presses && checkArray(advancements,1)&& !checkArray(advancements,8)) {
        advancement(8);
    }
    if (pastpress+40 <= presses && checkArray(advancements,1)&& !checkArray(advancements,9)) {
        advancement(9);
    }
    if (specials>=5 && !checkArray(advancements,10)) {
        advancement(10);
    }
    if (specials>=10 && !checkArray(advancements,11)) {
        advancement(11);
    }
    if (minercount>=5&&!checkArray(advancements,12)) {
        advancement(12);
    }
    if (minercount>=10&& !checkArray(advancements,13)) {
        advancement(13);
    }
    if (bops>=500 && !checkArray(advancements,14)) {
        advancement(14);
    }
    if (transferbops>=10 && !checkArray(advancements,15)) {
        advancement(15);
    }
    if(bops>=1000 &&presses>=1000) {
        advancement(16);
    }
}
//action of advancement
function advancement(advancer){
    advancements.push(advancer);
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
            let miner1 = createBopMiner("miner")
            curstatement="A miner arrived! This person will mine BOPs for you."
            let interval = setInterval(()=>{curstatement=""; clearInterval(interval);}, 1000);
            let stone = document.querySelector("#bopstone");
            stone.innerHTML = bigbopbutton
        } break;
        case 5: {
            let makebopminer = addButton("Miner: 100 BOPS","buyminer","#buttoncenter",()=>{if(bops>=100){bops-=100; createBopMiner(); update(); if(minercount>=12){makebopminer.remove()}}});
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
            press.innerHTML = "Hey! I want press miners."
        }break;
        case 13: {
            press.innerHTML = "Here. Buy some press miners."
            let makepressminer = addButton("Press Miner: 200 presses","buyperssminer","#buttoncenter",()=>{if(presses>=200){presses-=200; createPressMiner(); update(); if(minerpresscount>=12){makepressminer.remove();}}});
            let stone = document.querySelector("#pressstone");
            stone.innerHTML = bigpressbutton
        }break;
        case 14: {
            press.innerHTML = "There are too many bops! Get some of mine!"
            let transferboptopress = addButton("2 BOPs : 1 press","transferbop","#buttoncenter",()=>{if(bops>=2){presses+=Math.floor(bops/2);bops=0; transferbops++; update();}});
        }break;
        case 15: {
            bop.innerHTML = "Hey! I want my bops back!"
            let transferpresstobop = addButton("2 presses : 1 BOP","transferpress","#buttoncenter",()=>{if(presses>=2){bops+=Math.floor(presses/2);presses=0; transferpresses++; update();}});
        }break;
        case 16: {
            const endcontainer = document.querySelector("#endcenter");
            let end = document.createElement('pre');
            let endtext = "The game is over!";
            let favor=(minercount+ transferbops)-(minerpresscount+transferpresses)
            let percent = false
            if(minercount+minerpresscount>=24&&specials>=10&&advancements.length >=17){
                let percent = true
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
            miners.remove();
            pressminers.remove();
            buttons.remove();
            bopstone.remove();
            pressstone.remove();
            endgame = true
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

//timer
setInterval(()=>{
    if(!endgame) {
        timer++
    }
}, 1000)