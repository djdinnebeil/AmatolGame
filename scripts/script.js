/*
This JavaScript file is organized by section:
HTML Elements
Audio
Helper Functions
Async Promise
Player
Introduction
Main Menu
Town (Town Menu)
Houses (House Menu)
Work (Work Menu)
Sports (Sports Menu)
Camp Amatol (Camp Amatol Menu)
Newspaper (Newspaper Menu)
Credits
Main ***Program Starts Here***
*/


//********************HTML Elements*************************
//The main menu display elements
let menuDivElement = document.querySelector("#menu-div");
let menuElement = document.querySelector("#menu");
let townElement = document.querySelector("#town");
let housesElement = document.querySelector("#houses");
let workElement = document.querySelector("#work");
let sportsElement = document.querySelector("#sports");
let campAmatolElement = document.querySelector("#camp-amatol");
let newspaperElement = document.querySelector("#newspaper");
let townMenuElement = document.querySelector("#town-menu");
let houseMenuElement = document.querySelector("#house-menu");
let sportsMenuElement = document.querySelector("#sports-menu");
let newspaperMenuElement = document.querySelector("#newspaper-menu");

//The back and forward arrow elements
let prevElement = document.querySelector("#prev");
let nextElement = document.querySelector("#next");

//The story display elements
let storyImageElement = document.querySelector("#story-image")
let storyImageMessageElement = document.querySelector("#story-image-message");
let basketballGifElement = document.querySelector("#basketball-gif");
let storyParagraphElement = document.querySelector("#story-paragraph");
let linksContainerElement = document.querySelector("#links-container");
let link1Element = document.querySelector("#link1");
let link2Element = document.querySelector("#link2");
let welcomeScreenDiv = document.querySelector("#welcome-screen-div");
let text1Element = document.querySelector("#text-1");
let text2Element = document.querySelector("#text-2");
let text3Element = document.querySelector("#text-3");
let text4Element = document.querySelector("#text-4");
let text5Element = document.querySelector("#text-5");

//The wager elements
let wagerDivElement = document.querySelector("#wager-div");
let team1Element = document.querySelector("#team1");
let team2Element = document.querySelector("#team2");
let hpWagerElement = document.querySelector("#hp-wager");
let wpWagerElement = document.querySelector("#wp-wager");
let apWagerElement = document.querySelector("#ap-wager");
let spWagerElement = document.querySelector("#sp-wager");
let wagerElement = document.querySelector("#wager");
let wagerParagraphElement = document.querySelector("#wager-paragraph");


//The player's game points
let rightDisplayElement = document.querySelector("#right-display");
let hpElement = document.querySelector("#hp");
let wpElement = document.querySelector("#wp");
let apElement = document.querySelector("#ap");
let spElement = document.querySelector("#sp");

//Popup image display elements
let popupGridElement = document.querySelector("#popup-grid");
let popupScrollElement = document.querySelector("#popup-scroll");
let popupImageElement = document.querySelector("#popup-image");

//PDF display elements
let pdfGridElement = document.querySelector("#pdf-grid");
let pdfImageElement = document.querySelector("#pdf-image");
let pdfParagraphElement = document.querySelector("#pdf-paragraph");


//*************************************Audio*******************
//Audio elements
let mainAudioElement = new Audio("music/main-theme.mp3");
let startAudioElement = new Audio("music/start-theme.mp3");
let creditsAudioElement = new Audio("music/credits-theme.mp3");
let hoverAudioElement = new Audio("music/hover.mp3");
let hover2AudioElement = new Audio("music/hover-2.mp3");
let winAudioElement = new Audio("music/win.mp3");
let loseAudioElement = new Audio("music/lose.mp3");
let unlockAudioElement = new Audio("music/unlock.mp3");
let pointsAudioElement = new Audio("music/points.mp3");
let buyAudioElement = new Audio("music/buy.mp3");
let victoryAudioElement = new Audio("music/victory-theme.mp3");

let workAudioElement = new Audio();
let mysteryAudioElement = new Audio()
let sportsAudioElement = new Audio();
let newspaperAudioElement = new Audio();
let campAmatolAudioElement = new Audio();
let currentSongElement;



//Initialize the audio elements to be looped
let audioLoopElements =
    [mainAudioElement, startAudioElement, workAudioElement, sportsAudioElement, creditsAudioElement,
        campAmatolAudioElement, newspaperAudioElement];

for (let audioLoopElement of audioLoopElements) {
    audioLoopElement.loop = true;
}

//If the victory theme ends, play the main theme
victoryAudioElement.addEventListener("ended", () => {
    playAudio(mainAudioElement);
})

function playAudio(audioElement) {
    if (audioElement !== mainAudioElement) {
        mainAudioElement.pause();
    }
    workAudioElement.pause();
    victoryAudioElement.pause();
    sportsAudioElement.pause();
    creditsAudioElement.pause();
    newspaperAudioElement.pause();
    campAmatolAudioElement.pause();
    startAudioElement.pause();
    audioElement.play();
    currentSongElement = audioElement;
}

window.onblur = () => {
    currentSongElement.pause();
}

window.onfocus = () => {
    currentSongElement.play();
}
function playHover2() {
    hover2AudioElement.currentTime = 0;
    hover2AudioElement.play();
}

function playHover() {
    hoverAudioElement.currentTime = 0;
    hoverAudioElement.play();
}





























//*******************************Helper Functions**************************

function updateScene(scene) {
    storyImageElement.src = scene.src;
    popupImageElement.src = scene.src;
    storyImageElement.alt = scene.alt;
    popupImageElement.alt = scene.alt;
    storyParagraphElement.innerHTML = scene.paragraph;
}


function displayPopupNone() {
    popupGridElement.style.display = "none";
}

function displayPopupGrid() {
    popupGridElement.style.display = "flex";
    popupScrollElement.scrollTop = popupScrollElement.scrollHeight;
}

function flash(elements) {
    return function () {
        for (let element of elements) {
            if (element.id === `${element.storedID}`) {
                element.id = `${element.storedID}-flash`;
            }
            else {
                element.id = `${element.storedID}`;
            }
        }
    }
}

function createBackOption(menuElement, exitMenuFunction) {
    let backOption = document.createElement("li");
    backOption.innerHTML = "Back";
    backOption.style.padding = ".25em";
    backOption.onmouseenter = playHover;
    backOption.onclick = exitMenuFunction;
    menuElement.appendChild(backOption);
}

function flashImageMessage() {
    storyImageMessageElement.storedID = storyImageMessageElement.id;
    let timer = setInterval(flash([storyImageMessageElement]), 500);
    document.onclick = () => {
        clearInterval(timer);
        document.onclick = null;
        storyImageMessageElement.id = storyImageMessageElement.storedID;
    };
}

let welcome = {
    paragraph: "Welcome to the Amatol Game",
    index: 0,
    class1: "red",
    class2: "blue",
    class3: "green",
    class4: "orange",
    class0: "white",
    normalSize: "1.5em",
    transformSize: "2em",
    enlarge: false,
    colorChange: false,
    transformWhite: false,
};

welcome.amatolIndex = welcome.paragraph.indexOf("Amatol");
welcome.gameIndex = welcome.paragraph.indexOf("Game")
welcome.toIndex = welcome.paragraph.indexOf("to");

function setColors(class1, class2, class3, class4, class5) {
    text1Element.className = class1;
    text2Element.className = class2;
    text3Element.className = class3;
    text4Element.className = class4;
    text5Element.className = class5;
}

setColors(welcome.class1, welcome.class0, welcome.class0, welcome.class0, welcome.class0);

let textElements = [
    text1Element,
    text2Element,
    text3Element,
    text4Element,
    text5Element
];


function setSize(size) {
    for (let textElement of textElements) {
        textElement.style.fontSize = size;
    }
}

setSize(welcome.normalSize);

function setInnerHTML(first, second, third, fourth, empty) {
    first.innerHTML = welcome.paragraph.substring(0, welcome.toIndex);
    second.innerHTML = welcome.paragraph.substring(welcome.toIndex, welcome.amatolIndex);
    third.innerHTML = welcome.paragraph.substring(welcome.amatolIndex, welcome.gameIndex);
    fourth.innerHTML = welcome.paragraph.substring(welcome.gameIndex, welcome.paragraph.length);
    empty.innerHTML = "";
}

function setIndexedHTML(string1, string2, string3, string4, string5) {
    text1Element.innerHTML = string1;
    text2Element.innerHTML = string2;
    text3Element.innerHTML = string3;
    text4Element.innerHTML = string4;
    text5Element.innerHTML = string5;
}


function flashWelcomeScreen() {

    if (welcome.enlarge) {
        if (welcome.index === 5) {
            setSize(welcome.transformSize);
        }
        if (!welcome.transformWhite) {
            setInnerHTML(text1Element, text2Element, text3Element, text4Element, text5Element);
        }
        else {
            text1Element.innerHTML = welcome.paragraph;
        }
        welcome.index++;
        if (welcome.index === 25) {
            welcome.enlarge = false;
            welcome.index = 0;
            setSize(welcome.normalSize);
            welcome.colorChange = true;
        }
    }
    else if (welcome.colorChange) {
        welcome.colorChange = false;
        welcome.transformWhite = !welcome.transformWhite;

        if (welcome.transformWhite) {
            setColors(welcome.class0,welcome.class1, welcome.class2, welcome.class3, welcome.class4)
        }
        else {
            setColors(welcome.class1, welcome.class0, welcome.class0, welcome.class0, welcome.class0);
        }
        setInnerHTML(text2Element, text3Element, text4Element, text5Element, text1Element);
    }
    else {

        if (!welcome.transformWhite) {
            if (welcome.index >= welcome.gameIndex) {
                text4Element.className = welcome.class4;
                setIndexedHTML (
                    welcome.paragraph.substring(0, welcome.toIndex),
                    welcome.paragraph.substring(welcome.toIndex, welcome.amatolIndex),
                    welcome.paragraph.substring(welcome.amatolIndex, welcome.gameIndex),
                    welcome.paragraph.substring(welcome.gameIndex, welcome.index),
                    welcome.paragraph.substring(welcome.index, welcome.paragraph.length)
                );
            } else if (welcome.index >= welcome.amatolIndex + 1) {
                text3Element.className = welcome.class3;
                setIndexedHTML (
                    welcome.paragraph.substring(0, welcome.toIndex),
                    welcome.paragraph.substring(welcome.toIndex, welcome.amatolIndex),
                    welcome.paragraph.substring(welcome.amatolIndex, welcome.index),
                    welcome.paragraph.substring(welcome.index, welcome.paragraph.length),
                    "");
            } else if (welcome.index >= welcome.toIndex + 1) {
                text2Element.className = welcome.class2;
                setIndexedHTML (
                    welcome.paragraph.substring(0, welcome.toIndex),
                    welcome.paragraph.substring(welcome.toIndex, welcome.index),
                    welcome.paragraph.substring(welcome.index, welcome.paragraph.length),
                    "", "");
            }
            else {
                setIndexedHTML(
                    welcome.paragraph.substring(0, welcome.index),
                    welcome.paragraph.substring(welcome.index, welcome.paragraph.length),
                    "", "", "");
            }
        }
        else {
            if (welcome.index >= welcome.gameIndex + 1) {
                setIndexedHTML(
                    welcome.paragraph.substring(0, welcome.index),
                    "", "", "",
                    welcome.paragraph.substring(welcome.index, welcome.paragraph.length));
            }
            else if (welcome.index >= welcome.amatolIndex + 1) {
                setIndexedHTML(
                    welcome.paragraph.substring(0, welcome.index),
                    "", "",
                    welcome.paragraph.substring(welcome.index, welcome.gameIndex),
                    welcome.paragraph.substring(welcome.gameIndex, welcome.paragraph.length));
            } else if (welcome.index >= welcome.toIndex + 1) {
                setIndexedHTML(
                    welcome.paragraph.substring(0, welcome.index),
                    "",
                    welcome.paragraph.substring(welcome.index, welcome.amatolIndex),
                    welcome.paragraph.substring(welcome.amatolIndex, welcome.gameIndex),
                    welcome.paragraph.substring(welcome.gameIndex, welcome.paragraph.length));
            } else {
                setIndexedHTML(
                    welcome.paragraph.substring(0, welcome.index),
                    welcome.paragraph.substring(welcome.index, welcome.toIndex),
                    welcome.paragraph.substring(welcome.toIndex, welcome.amatolIndex),
                    welcome.paragraph.substring(welcome.amatolIndex, welcome.gameIndex),
                    welcome.paragraph.substring(welcome.gameIndex, welcome.paragraph.length));
            }
        }
        welcome.index++;
        if (welcome.index > welcome.paragraph.length) {
            welcome.enlarge = true;
            welcome.index = 0;
        }
    }
}


//Adjust the screen for the appearance of a scrollbar
let htmlElement = document.querySelector("html");
let balanceMarginsElement = document.querySelector("#balance-margins");
let scrollbarContainerElement = document.querySelector("#scrollbar-container");
let balanceSpaceElement = document.querySelector("#balance-space");
let scrollbarAdjuster = new MutationObserver(checkForScrollbar);

function checkForScrollbar() {
    if (htmlElement.offsetHeight - htmlElement.clientHeight > 0) {
        scrollbarContainerElement.style.display = "none";
    } else {
        scrollbarContainerElement.style.display = "block";
    }
}

//Get the size of the scrollbar and adjust the width accordingly
let scrollbarWidth = getScrollbarWidth();


if (scrollbarWidth > 0) {
    scrollbarContainerElement.style.width = scrollbarWidth + "px";
    balanceSpaceElement.style.width = scrollbarWidth + "px";
    balanceMarginsElement.style.height = scrollbarWidth + "px";
}


function getScrollbarWidth() {

    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}


//********************Async Promise************************
function loadImage(url) {
    return new Promise(resolve => {
        const img = new Image();
        img.addEventListener('load', () => resolve());
        img.addEventListener('error', () => resolve());
        img.src = url;
    })
}















//***************The player*********************
class Player {
    constructor() {
        this.hp = 1;
        this.wp = 1;
        this.ap = 1;
        this.sp = 5;
    }

    increaseHP(n=1, playSound=true) {
        player.hp += n;
        hpElement.innerHTML = `HP: ${player.hp}`;
        if (playSound) {
            playPoints();
        }
        return [`<span class="hp-color">Your HP went up by ${n}!</span>`, `<span class="hp-color">You won ${n} HP!</span>`];
    }

    increaseWP(n=1, playSound=true) {
        player.wp += n;
        wpElement.innerHTML = `WP: ${player.wp}`;
        if (playSound) {
            playPoints();
        }
        return [`<span class="wp-color">Your WP went up by ${n}!</span>`, `<span class="wp-color">You won ${n} WP!</span>`] ;
    }

    increaseAP(n=1, playSound=true) {
        player.ap += n;
        apElement.innerHTML = `AP: ${player.ap}`;
        if (playSound) {
            playPoints();
        }
        return [`<span class="ap-color">Your AP went up by ${n}!</span>`, `<span class="ap-color">You won ${n} AP!</span>`];
    }

    increaseSP(n=1, playSound=true) {
        player.sp += n;
        spElement.innerHTML = `SP: ${player.sp}`;
        if (playSound) {
            playPoints();
        }
        return [`<span class="sp-color">Your SP went up by ${n}!</span>`, `<span class="sp-color">You won ${n} SP!</span>`];

    }

    decreaseHP(n) {
        player.hp -= n;
        hpElement.innerHTML = `HP: ${player.hp}`;
        return [`Your HP went down by ${n}.`, `You lost ${n} HP.`];
    }

    decreaseWP(n) {
        player.wp -= n;
        wpElement.innerHTML = `WP: ${player.wp}`;
        return [`Your WP went down by ${n}.`, `You lost ${n} WP.`];

    }

    decreaseAP(n) {
        player.ap -= n;
        apElement.innerHTML = `AP: ${player.ap}`
        return [`Your AP went down by ${n}`,`You lost ${n} AP.`];
    }

    decreaseSP(n) {
        player.sp -= n;
        spElement.innerHTML = `SP: ${player.sp}`;
        return [`Your SP went down by ${n}`,`You lost ${n} SP.`];

    }

}

function playPoints() {
    pointsAudioElement.cloneNode().play();
}

let player = new Player();





















//****************Introduction********************
//After the start screen, this information is displayed
let introduction = {
    paragraph:
        "Amatol, NJ, was a planned shell-loading munitions plant and workers' village that was built " +
        "as a result of America's entry into World War I. Amatol occupied a tract of 6,000 acres in " +
        "Atlantic County between East Hammonton and Elwood. What is fascinating about Amatol and other " +
        "World War I inspired construction efforts is the rapidity of their construction. In just nine " +
        "months, the new town and manufactory at Amatol were completed and reached a population of 7,000. " +
        "Today, the Pine Barrens have all but reclaimed the former site of Amatol." +
        "<br><br>" +
        "In this game, you will play as Peter James Reilly, who once lived in Amatol and served as a guard " +
        "for the munitions plant. Peter was engaged to the Philadelphia actress Agnes Belcher, and their " +
        "marriage would be the first wedding that would take place in Amatol." +
        "<br><br>" +
        "Peter wants to buy a new house for Agnes and himself to live in. Your goal is to explore the town and " +
        "plant collecting points as you do. With these points, you can buy a new house for Peter and Agnes.",
    src: "images/start-plant.jpg",
    alt: "A 75 M/M Plant",
    link1: "Continue",
}

let allAboard = {
    src: "images/trains.jpg",
    alt: "An early 20th-century train",
    paragraph: "",
    link1: "All Aboard for Amatol",
}

let instructions =
    "<br><br>" +
    "Use the menu on the left to explore the town, plant, and other areas. " +
    "<br><br>" +
    "Your points are displayed on the right. These are <span class='hp-color'>HP for Happiness Points,</span> " +
    "<span class='wp-color'>WP for Work Points,</span> <span class='ap-color'>and AP for Amatol Points.</span> You can increase these by exploring t" +
    "he town and plant. You can use these to buy houses. You've already earned some for " +
    "making it here.";


function startGame() {
    let promises = [mainAudioElement.play(), loadImage(introduction.src)];
    Promise.all(promises).then(() =>
    {
        storyParagraphElement.style.display = "block";
        storyParagraphElement.style.marginTop = "1em";
        welcomeScreenDiv.style.display = "none";
        storyImageElement.style.display = "block";
        updateScene(introduction);
        playAudio(mainAudioElement);
        storyImageMessageElement.style.display = "inline-block";
        storyImageMessageElement.innerHTML = "Click on images to zoom in.<br>(If you do not hear music, your browser window might be muted.)";
        flashImageMessage();
        storyParagraphElement.style.textAlign = "justify";
        storyParagraphElement.style.paddingLeft = "25px";
        link1Element.innerHTML = introduction.link1;
        link1Element.onclick = allAboardScene;
        link2Element.style.display = "none";
        link1Element.onmouseenter = playHover2;
        link2Element.onmouseenter = playHover2;
    });
}

function allAboardScene() {
    let promises = [loadImage(allAboard.src), startAudioElement.play()];
    Promise.all(promises).then(()=>
    {
        playAudio(startAudioElement);
        updateScene(allAboard);
        storyParagraphElement.style.paddingLeft = "0";
        storyImageMessageElement.style.display = "none";
        link1Element.innerHTML = "All Aboard for Amatol!";

        link1Element.onclick = menuUnlock;
    });
}



















//**************************************Main Menu***********************************
function menuUnlock() {
    unlockAudioElement.play().then(() => {
        storyParagraphElement.innerHTML = instructions;
        storyParagraphElement.style.textAlign = "justify";
        storyImageElement.style.display = "none";
        menuDivElement.style.display = "block";
        menuElement.style.display = "block";
        rightDisplayElement.style.display = "block";
        hpElement.innerHTML = `HP: ${player.hp}`;
        wpElement.innerHTML = `WP: ${player.wp}`;
        apElement.innerHTML = `AP: ${player.ap}`;
        let pointsElements = [hpElement, wpElement, apElement];
        for (let pointsElement of pointsElements) {
            pointsElement.storedID = pointsElement.id;
        }
        let timer = setInterval(flash(pointsElements), 500);
        menuElement.storedID = menuElement.id;
        let menuTimer = setInterval(flash([menuElement]), 500);
        document.onclick = menuElement.onmouseenter = rightDisplayElement.onmouseenter = () =>
        {
            document.onclick = menuElement.onmouseenter = rightDisplayElement.onmouseenter = null
            clearInterval(timer);
            clearInterval(menuTimer);
            for (let pointsElement of pointsElements) {
                pointsElement.className = "";
                pointsElement.id = pointsElement.storedID;
            }
            menuElement.id = menuElement.storedID;
        }
        spElement.style.display = "none";
        link1Element.style.display = "none";
        townElement.onclick = createTownMenu;
        housesElement.onclick = createHouseMenu;
        campAmatolElement.onclick = displayCampAmatol;
        workElement.onclick = initializeWork;
        sportsElement.onclick = createSportsMenu;
        newspaperElement.onclick = createNewspaperMenu;
        rightDisplayElement.onclick = displayBefore;
        newspaperElement.onmouseenter = playHover;
        townElement.onmouseenter = playHover;
        campAmatolElement.onmouseenter = playHover;
        housesElement.onmouseenter = playHover;
        workElement.onmouseenter = playHover;
        sportsElement.onmouseenter = playHover;
        //Adjust the width of the screen if a scrollbar appears
        scrollbarAdjuster.observe(htmlElement, {characterData: true, attributes: true, subtree: true});
    });
}

beforeAmatol = {
    src: "images/before-amatol.jpg",
    alt: "Workers are chopping down a tree to build Amatol",
    paragraph: "Nothing is supposed to happen when you click on the points. Since you did, here are some bonus points and a photo of workers chopping down a tree to build Amatol.",
    selected: "Workers are chopping down a tree to build Amatol."

}



function displayBefore() {
    loadImage(beforeAmatol.src).then(() =>
    {
        updateScene(beforeAmatol);

        beforeAmatol.paragraph = beforeAmatol.selected;
        storyParagraphElement.style.textAlign = "center";
        storyImageElement.style.display = "block";
        menuElement.onmouseenter = () => {
            menuElement.onmouseenter = null;
            storyParagraphElement.innerHTML = "";
            checkForScrollbar();
        };
        if (!rightDisplayElement.visited) {
            rightDisplayElement.visited = true;
            storyParagraphElement.innerHTML += `<br><br>${player.increaseHP()[0]}<br>${player.increaseWP()[0]}<br>${player.increaseAP()[0]}`
        }
        hpWagerElement.innerHTML = "";
        wpWagerElement.innerHTML = "";
        apWagerElement.innerHTML = "";
        sportsMenuElement.style.display = "none";
        menuDivElement.style.display = "block";
        playAudio(mainAudioElement);
        link1Element.style.display = "none";
        link2Element.style.display = "none";
        linksContainerElement.style.display = "none";
        wagerDivElement.style.display = "none";
        basketballGifElement.style.display = "none";

    });
}























































//*****************************************Town (Town Menu)***************************************************
let town = {
    src: "images/town-map.jpg",
    alt: "A town map of Amatol",
    paragraph: "Click on the image to zoom in.",
}

class Choice {
    constructor(src, alt, paragraph, increasePoints, selected) {
        this.src = src;
        this.alt = alt;
        this.paragraph = paragraph;
        this.increasePoints = increasePoints;
        this.selected = selected;
    }

}

class TownMenuItem {
    constructor(src, alt, caption, links, choice) {
        this.src = src;
        this.alt = alt;
        this.paragraph = caption;
        this.links = links;
        this.choice = choice;
    }
}


let townMenuItems = {
    "Liberty Court": new TownMenuItem(
        "images/liberty-court-far.jpg",
        "Liberty Court",
        "This is Liberty Court.",
        ["Walk Closer"],
        new Choice(
            "images/liberty-court-close.jpg",
            "A closer view of Liberty Court",
            "You never realized the walk was so scenic.",
            townAwardsPoints(player.increaseHP, 3),
            "You enjoyed the walk."
        ),
    ),
    "Water Tower": new TownMenuItem(
        "images/water-tower.jpg",
        "Water tower",
        "A water tower.",
        ["Look around"],
        new Choice(
            "images/executive-dormitory.jpg",
            "An executive dormitory",
            "This is an executive dormitory.<br><br>You are impressed by the art of city planning.",
            townAwardsPoints(player.increaseAP, 1),
            "This is an executive dormitory."
        )),
    "Main Mess Hall": new TownMenuItem(
        "images/main-mess-hall.jpg",
        "Main mess hall",
        "The main mess hall.",
        ["Eat here"],
        new Choice(
            null,
            null,
            "You saw your neighbor. You had a good laugh.",
            townAwardsPoints(player.increaseHP, 2),
            "You enjoyed the meal."
        )
    ),

    "Staff Mess Hall": new TownMenuItem(
        "images/staff-mess-hall.jpg",
        "Staff mess hall",
        "The staff mess hall.",
        ["Eat here"],
        new Choice(
            null,
            null,
            "You saw another guard. You discussed concerns of a bomb plot at the plant.",
            townAwardsPoints(player.increaseWP, 2),
            "You enjoyed the meal.",
        )
    ),

    "Bank and Post Office": new TownMenuItem(
        "images/bank.jpg",
        "Bank and Post Office",
        "You went to the Bank and Post Office.<br><br>You only have time to do one errand.",
        ["Drop off a letter", "Go to the bank"],
        new Choice(
            null,
            null,
            ["You dropped off a letter.", "You went to the bank."],
            [townAwardsPoints(player.increaseWP, 1), townAwardsPoints(player.increaseHP, 1)],
            "You went to the Bank and Post Office.<br><br>You do not have time for any errands."
        )
    ),

    "Street View": new TownMenuItem(
        "images/south-fiftieth.jpg",
        "A street view in Amatol of South Fiftieth Street",
        "This is South Fiftieth Street from K Street.",
        ["Walk down K Street"],
        new Choice(
            "images/east-k-street.jpg",
            "A street view in Amatol of East K Street",
            "This is East K Street from Fiftieth Street." +
            "<br><br>You are very impressed with the art of city planning.",
            townAwardsPoints(player.increaseAP, 2),
            "This is East K Street from Fiftieth Street."
        ),
    ),
}

function createTownMenu() {
    loadImage(town.src).then(()=> {
        for (let [key, townValue] of Object.entries(townMenuItems)) {
            let townListElement = document.createElement("li");
            townListElement.innerHTML = `${key}`;
            //If there are two links, then display the links
            if (townValue.links.length === 2) {
                townListElement.onclick = () => {
                    loadImage(townValue.src).then(displayChoices(townValue));
                };
            }
            //If the link leads to a new image, then display the link
            else if (townValue.choice.src) {
                townListElement.onclick = () =>
                {
                    loadImage(townValue.src).then(displayLink(townValue));
                };
            }
            //Otherwise display a single link
            else {
                townListElement.onclick = () =>
                {
                    loadImage(townValue.src).then(displayChoice(townValue));
                };
            }
            townListElement.onmouseenter = () =>
            {
                playHover();
            }
            townMenuElement.appendChild(townListElement);
        }
        let backElement = document.createElement("li");
        backElement.onclick = exitTownMenu;
        backElement.onmouseenter = playHover;
        backElement.innerHTML = "Main Menu";
        townMenuElement.appendChild(backElement);
        townElement.onclick = displayTownMenu;
        displayTownMenu();
        town.paragraph = "";
    });

}


function displayTownMenu() {
    updateScene(town);
    storyParagraphElement.style.textAlign = "center";
    storyImageElement.style.display = "block";
    menuElement.style.display = "none";
    townMenuElement.style.display = "block";
    playAudio(mainAudioElement);
    link1Element.style.display = "none";
    link2Element.style.display = "none";
    linksContainerElement.style.display = "block";

}


function displayChoices(townValue) {
    return function() {
        updateScene(townValue);
        if (townValue.links) {
            link1Element.style.display = "inline-block";
            link2Element.style.display = "inline-block";
            link1Element.innerHTML = townValue.links[0];
            link2Element.innerHTML = townValue.links[1];
            link1Element.onclick = selectedChoice(townValue, 0);
            link2Element.onclick = selectedChoice(townValue, 1);
        } else {
            link1Element.style.display = "none";
            link2Element.style.display = "none";
        }
    }

}

function selectedChoice(townValue, index) {
    let choice = townValue.choice;
    return function()
    {
        storyParagraphElement.innerHTML = choice.paragraph[index];
        link1Element.style.display = "none";
        link2Element.style.display = "none";
        townValue.paragraph = choice.selected;
        choice.increasePoints[index]();
        townValue.links = null;
    }
}

function displayLink(townValue) {
    return function() {
        updateScene(townValue);
        link1Element.style.display = "inline-block";
        link1Element.innerHTML = townValue.links[0];
        link1Element.onclick = nextScene(townValue);
        link2Element.style.display = "none";
    }
}

function displayChoice(townValue) {
    return function() {
        updateScene(townValue);
        link1Element.style.display = "inline-block";
        link1Element.innerHTML = townValue.links[0];
        link1Element.onclick = selectChoice(townValue);
        link2Element.style.display = "none";
    }
}


function nextScene(townValue) {
    let choice = townValue.choice;
    return function()
    {
        loadImage(choice.src).then(() =>
        {
            updateScene(choice);
            link1Element.style.display = "none";
            link2Element.style.display = "none";
            if (!townValue.visited) {
                choice.paragraph = choice.selected;
                choice.increasePoints();
                townValue.visited = true;
            }
        });
    }

}


function selectChoice(townValue) {
    let choice = townValue.choice;
    return function() {
        link1Element.style.display = "none";
        link2Element.style.display = "none";
        storyParagraphElement.innerHTML = choice.paragraph;
        if (!townValue.visited) {
            if (choice.selected) {
                choice.paragraph = choice.selected;
            }
            choice.increasePoints();
            townValue.visited = true;
        }
    }
}

function townAwardsPoints(increasePoints, n) {
    return function() {
        storyParagraphElement.innerHTML += `<br><br>${increasePoints(n)[0]}`;
    }
}

function exitTownMenu() {
    menuElement.style.display = "block";
    townMenuElement.style.display = "none";
    storyParagraphElement.innerHTML = "";
    link1Element.style.display = "none";
    link2Element.style.display = "none";
}










































//***************************************Houses (House Menu)***********************

class House {
    constructor(src, alt, caption, hp, wp, ap, bought, bonus, bonusPoints) {
        this.src = src;
        this.alt = alt;
        this.paragraph = caption;
        this.hp = hp;
        this.wp = wp;
        this.ap = ap;
        this.total = hp + wp + ap;
        this.bought = bought;
        this.bonus = bonus;
        this.bonusPoints = bonusPoints
    }
}

let houses = [
    new House("images/house-1.jpg",
        "A house in Amatol",
        "A bungalow.",
        1, 1, 1,
        "You and Agnes like that the house is only one-story since one-story houses are generally " +
        "easier to maintain than two-story houses."),
    new House("images/house-2.jpg",
        "A house in Amatol",
        "Space conserved with dining room alcoves.",
        2, 1, 1,
        "Agnes just absolutely loves the dining room alcoves!"),
    new House("images/house-3.jpg",
        "A house in Amatol",
        "Nine-room house with outdoor living room.",
        2, 2, 1,
        "A nine-room house -- you wonder what Agnes might have planned with all those rooms."),
    new House("images/house-4.jpg",
        "A house in Amatol",
        "Homes made ideal with enclosed porches and sun parlors.",
        2, 1, 2,
        "The sunlight is very nice.",
        "<br><br>Agnes loves the sunlight in this house. Her excitement wore off on you.",
        player.increaseHP),
    new House("images/house-5.jpg",
        "A house in Amatol",
        "Monotony of design relieved by varying location and stucco treatment.",
        2,2, 2,
        "The color is soothing to you.",
        "<br><br>You appreciate the aesthetics of the houses.</span>",
        player.increaseAP),
    new House("images/house-6.jpg",
        "A house in Amatol",
        "A eight-room stucco house.",
        2, 3, 2,
        "You are quite satisfied with the design of this house."),
    new House("images/house-7.jpg",
        "A house in Amatol",
        "A six-room stucco house.",
        3, 2, 3,
        "The house is very spacious.",
        "<br><br>Agnes loves the many different styles of houses.",
        player.increaseAP),
    new House("images/house-8.jpg",
        "A house in Amatol",
        "An eight-room Colonial house.",
        3, 3, 3,
        "You enjoy the Colonial style of this house."
    ),
];


function createHouseMenu() {
    let i = 1;
    const promises = [];
    for (let house of houses) {
        let houseListElement = document.createElement("li");
        houseListElement.house = house;
        houseListElement.house.number = i;
        i++;
        houseMenuElement.appendChild(houseListElement);
        promises.push(loadImage(house.src));

    }
    let backMenu = document.createElement("li");
    backMenu.innerHTML = "Main Menu";
    backMenu.onclick = exitHouseMenu;
    backMenu.onmouseenter = playHover;
    houseMenuElement.appendChild(backMenu);
    housesElement.onclick = displayHouseMenu;
    Promise.all(promises).then(() => {
        displayHouseMenu();
    });
}

function displayHouseMenu() {
    if (victoryAudioElement.paused) {
        playAudio(mainAudioElement);
    }
    else {
        playAudio(victoryAudioElement);
    }
    storyParagraphElement.style.textAlign = "center";
    storyImageElement.style.display = "block";
    menuElement.style.display = "none";
    houseMenuElement.style.display = "block";
    link1Element.style.display = "none";
    link2Element.style.display = "none";
    linksContainerElement.style.display = "none";
    storyParagraphElement.style.marginBottom = "0";
    let houseNodes = houseMenuElement.childNodes
    storyParagraphElement.innerHTML = "";
    storyImageElement.style.display = "none";
    //Exclude the "back" node
    for (let i = 0; i < houseNodes.length - 1; i++) {
        let houseNode = houseNodes[i];
        if (houseNode.house.own === true) {
            houseNode.style.cursor = "default";
            houseNode.onmouseover = () =>
            {
                playHover();
                displayHouseMenu();
                storyImageElement.style.display = "block";
                updateScene(houseNode.house);
                houseNode.onmouseover = null;
            }
        }
        else if (player.hp >= houseNode.house.hp && player.wp >= houseNode.house.wp
            && player.ap >= houseNode.house.ap) {
            houseNode.innerHTML = `Buy House ${houseNode.house.number}`;
            houseNode.style.cursor = "pointer";
            houseNode.onclick = buyHouse(houseNode);
            houseNode.onmouseover = displayHouse(houseNode);

        }
        else if (sportsMenuElement.visited && checkSportsPoints(houseNode)) {
            houseNode.innerHTML = `Buy House ${houseNode.house.number}`;
            houseNode.style.cursor = "pointer";
            houseNode.onclick = buyHouseWithSP(houseNode);
            houseNode.onmouseover = displayHouse(houseNode);
        }
        else {
            houseNode.style.cursor = "default";
            houseNode.innerHTML = `View House ${houseNode.house.number}`;
            houseNode.onclick = null;
            houseNode.onmouseover = displayHouse(houseNode);
        }
        if (houseNode.house.bonus && !houseNode.viewed) {
            houseNode.onmouseover = houseAwardsPoints(houseNode);
        }

    }
}

function buyHouseWithSP(houseNode) {
    return function() {
        buyAudioElement.cloneNode().play();
        decreaseSportsPoints(houseNode);
        houseBought(houseNode);
    }
}


function decreaseSportsPoints(houseNode) {
    let [total, hpPoints, wpPoints, apPoints] = calculateSportsPoints(houseNode);
    player.decreaseHP(hpPoints);
    player.decreaseWP(wpPoints);
    player.decreaseAP(apPoints);
    player.decreaseSP(total);
}

function checkSportsPoints(houseNode) {
    let buy = false;
    if (player.sp >= houseNode.house.total) {
        buy = true;
    }
    else {
        let total = calculateSportsPoints(houseNode)[0];
        if (player.sp >= total) {
            buy = true;
        }
    }
    return buy;
}

function calculateSportsPoints(houseNode) {
    let hpPoints = houseNode.house.hp;
    let wpPoints = houseNode.house.wp;
    let apPoints = houseNode.house.ap;
    if (player.hp >= hpPoints) {
        //Do nothing
    }
    else if (player.hp > 0) {
        hpPoints = player.hp;
    }
    else {
        hpPoints = 0;
    }

    if (player.wp >= wpPoints) {
        //Do nothing
    }
    else if (player.wp > 0) {
        wpPoints = player.wp;
    }
    else {
        wpPoints = 0;
    }

    if (player.ap >= apPoints) {
        //Do nothing
    }
    else if (player.ap > 0) {
        apPoints = player.ap;
    }
    else {
        apPoints = 0;
    }

    let total = houseNode.house.total;
    total = total - hpPoints - wpPoints - apPoints;
    return [total, hpPoints, wpPoints, apPoints];
}

function displayHouse(houseNode) {
    return function() {
        playHover();
        displayHouseMenu();
        storyImageElement.style.display = "block";
        updateScene(houseNode.house);
        viewHousePrice(houseNode);
        houseNode.onmouseover = null;
    }
}

function decreasePoints(houseNode) {
    player.decreaseHP(houseNode.house.hp);
    player.decreaseWP(houseNode.house.wp);
    player.decreaseAP(houseNode.house.ap);
}

function buyHouse(houseNode) {
    return function() {
        buyAudioElement.cloneNode().play();
        decreasePoints(houseNode);
        houseBought(houseNode);
    }
}

function houseBought(houseNode) {

    houseNode.house.paragraph = houseNode.house.bought;
    houseNode.house.own = true;
    houseNode.innerHTML = "Your House";
    displayHouseMenu();
    storyImageElement.style.display = "block";
    updateScene(houseNode.house);
    if (victoryAudioElement.paused) {
        victoryAudioElement.currentTime = 0;
        playAudio(victoryAudioElement);
    }
    houseNode.onclick = null;

}

function viewHousePrice(houseNode) {
    let houseParagraph =
        `<br><br><span class="hp-color">You need ${houseNode.house.hp} Happiness Points.</span>` +
        `<br><span class="wp-color">You need ${houseNode.house.wp} Work Points.</span>` +
        `<br><span class="ap-color">You need ${houseNode.house.ap} Amatol Points.</span>`;
    storyParagraphElement.innerHTML += houseParagraph;
}

function houseAwardsPoints(houseNode) {
    if (houseNode.awardPoints) {
        houseNode.removeEventListener("mouseenter", houseNode.awardPoints)
    }
    return houseNode.awardPoints = function functionPoints() {
        houseNode.viewed = true;
        houseNode.removeEventListener("mouseenter", functionPoints);
        let awardPoints = houseNode.house.bonus;
        awardPoints += `<br><br>${houseNode.house.bonusPoints()[0]}`
        displayHouseMenu();
        updateScene(houseNode.house)
        storyParagraphElement.innerHTML += awardPoints;
        viewHousePrice(houseNode);
        storyImageElement.style.display = "block";
    }
}

function exitHouseMenu() {
    menuElement.style.display = "block";
    houseMenuElement.style.display = "none";
    storyParagraphElement.innerHTML = "";
    playAudio(mainAudioElement);
    storyParagraphElement.style.marginBottom = "1em";
}


























//**************************Work (Work Menu)***********************************
let militaryPolice = {
    src: "images/military-police.jpg",
    alt: "Private Straley, a military police officer",
    paragraph: "Good job on guard.",
    begin: 'Private Straley: "You can guard the 155 M/M plant or the 75 M/M plant."',
    end: "Good job on guard.",
}

class ShellPlant {
    constructor(src, alt, caption) {
        this.src = src;
        this.alt = alt;
        this.paragraph = caption;
    }
}

let shell75Plant = [
    new ShellPlant(
        "images/75-shells-1.jpg",
        "Inside the 75 M/M plant",
        "The workers are receiving empty shells."),
    new ShellPlant(
        "images/75-shells-2.jpg",
        "Inside the 75 M/M plant",
        "The workers are removing the shipping plugs."),
    new ShellPlant(
        "images/75-shells-3.jpg",
        "Inside the 75 M/M plant",
        "The workers are cleaning the interiors of shells."),
    new ShellPlant(
        "images/75-shells-4.jpg",
        "Inside the 75 M/M plant",
        "The workers are preheeating the shells."),
    new ShellPlant(
        "images/75-shells-5.jpg",
        "Inside the 75 M/M plant",
        "The workers are pouring T.N.T. into the shells."),
    new ShellPlant(
        "images/75-shells-6.jpg",
        "Inside the 75 M/M plant",
        "The workers are cooling loaded shells."),
    new ShellPlant(
        "images/75-shells-7.jpg",
        "Inside the 75 M/M plant",
        "The workers are drilling booster cavities."),
    new ShellPlant(
        "images/75-shells-8.jpg",
        "Inside the 75 M/M plant",
        "The workers are removing T.N.T. from threads."),
    new ShellPlant(
        "images/75-shells-9.jpg",
        "Inside the 75 M/M plant",
        "The workers are gauging the shells."),
    new ShellPlant(
        "images/75-shells-10.jpg",
        "Inside the 75 M/M plant",
        "The workers are inserting boosters."),
    new ShellPlant(
        "images/75-shells-11.jpg",
        "Inside the 75 M/M plant",
        "The workers are zoning the shells."),
    new ShellPlant(
        "images/75-shells-12.jpg",
        "Inside the 75 M/M plant",
        "The workers are receiving cartridge cases."),
    new ShellPlant(
        "images/75-shells-13.jpg",
        "Inside the 75 M/M plant", "The workers are inserting primers."),
    new ShellPlant(
        "images/75-shells-14.jpg",
        "Inside the 75 M/M plant",
        "The workers are stamping lot numbers."),
    new ShellPlant(
        "images/75-shells-15.jpg",
        "Inside the 75 M/M plant",
        "The workers are filling the cartridge cases with smokeless powder."),
    new ShellPlant(
        "images/75-shells-16.jpg",
        "Inside the 75 M/M plant",
        "The workers are checking the smokeless powder charge."),
    new ShellPlant(
        "images/75-shells-17.jpg",
        "Inside the 75 M/M plant",
        "The workers are assembling the shells in cartridge cases."),
    new ShellPlant(
        "images/75-shells-18.jpg",
        "Inside the 75 M/M plant",
        "The workers are painting completed rounds."),
    new ShellPlant(
        "images/75-shells-19.jpg",
        "Inside the 75 M/M plant",
        "The workers are stenciling the completed rounds."),
    new ShellPlant(
        "images/75-shells-20.jpg",
        "Inside the 75 M/M plant",
        "The workers are completing rounds in fibre containers."),
    new ShellPlant(
        "images/75-shells-21.jpg",
        "Inside the 75 M/M plant",
        "The workers are marking containers."),
    new ShellPlant(
        "images/75-shells-22.jpg",
        "Inside the 75 M/M plant",
        "The workers are packing the shells."),
    new ShellPlant(
        "images/75-shells-23.jpg",
        "Inside the 75 M/M plant",
        "The workers are shipping the shells."),
];

let shell155Plant = [
    new ShellPlant(
        "images/155-shells-1.jpg",
        "Inside the 155 M/M plant",
        "The workers are receiving empty shells from cars."),
    new ShellPlant(
        "images/155-shells-2.jpg",
        "Inside the 155 M/M plant",
        "The workers are removing the shipping plugs."),
    new ShellPlant(
        "images/155-shells-3.jpg",
        "Inside the 155 M/M plant",
        "The workers are cleaning shells."),
    new ShellPlant(
        "images/155-shells-4.jpg",
        "Inside the 155 M/M plant",
        "The workers are inspecting and shellacking the inside of shells."),
    new ShellPlant(
        "images/155-shells-5.jpg",
        "Inside the 155 M/M plant",
        "The workers are pouring molten T.N.T. into the shells."),
    new ShellPlant(
        "images/155-shells-6.jpg",
        "Inside the 155 M/M plant",
        "The workers are cooling and cleaning the shells."),
    new ShellPlant(
        "images/155-shells-7.jpg",
        "Inside the 155 M/M plant",
        "The workers are drilling booster cavities into the shells."),
    new ShellPlant(
        "images/155-shells-8.jpg",
        "Inside the 155 M/M plant",
        "The workers are removing T.N.T. from threads."),
    new ShellPlant(
        "images/155-shells-9.jpg",
        "Inside the 155 M/M plant",
        "The workers are gauging the shells."),
    new ShellPlant(
        "images/155-shells-10.jpg",
        "Inside the 155 M/M plant",
        "The workers are inserting boosters."),
    new ShellPlant(
        "images/155-shells-11.jpg",
        "Inside the 155 M/M plant",
        "The workers are painting the outside of the shells."),
    new ShellPlant(
        "images/155-shells-12.jpg",
        "Inside the 155 M/M plant",
        "The workers are zoning."),
    new ShellPlant(
        "images/155-shells-13.jpg",
        "Inside the 155 M/M plant",
        "The workers are stenciling."),
    new ShellPlant(
        "images/155-shells-14.jpg",
        "Inside the 155 M/M plant",
        "The workers are placing rope grommet."),
    new ShellPlant(
        "images/155-shells-15.jpg",
        "Inside the 155 M/M plant",
        "The workers are inserting shipping plugs."),
    new ShellPlant(
        "images/155-shells-16.jpg",
        "Inside the 155 M/M plant",
        "The workers are shipping the shells."),
];

workElement.displayMessage = true;

function initializeWork() {
    workAudioElement.src = "music/work-theme.mp3";
    let promises = [workAudioElement.play(), loadImage(militaryPolice.src)];
    Promise.all(promises).then(() =>
    {
        displayWork();
        updateScene(militaryPolice);
        workElement.onclick = displayWork;
    });
}

function displayWork() {
    militaryPolice.paragraph = militaryPolice.begin;
    updateScene(militaryPolice);
    storyParagraphElement.style.textAlign = "center";
    playAudio(workAudioElement);
    sportsAudioElement.pause();
    newspaperAudioElement.pause();
    menuDivElement.style.display = "none";
    rightDisplayElement.style.display = "none";
    linksContainerElement.style.display = "block";
    link1Element.style.display = "inline-block";
    link2Element.style.display = "inline-block";
    link1Element.innerHTML = "Guard the 155 M/M plant";
    link2Element.innerHTML = "Guard the 75 M/M plant";
    link1Element.onclick = display155Plant;
    link2Element.onclick = display75Plant;
    storyImageElement.style.display = "block";
}

function display155Plant() {
    displayPlant(shell155Plant);
    link1Element.onclick = finishWork(shell155Plant, 2);
}

function display75Plant() {
    displayPlant(shell75Plant);
    link1Element.onclick = finishWork(shell75Plant, 3);
}

function displayPlant(shellPlant) {
    let promises = [loadImage(shellPlant[0].src), loadImage(shellPlant[1].src)];
    Promise.all(promises).then(() => {
        updateScene(shellPlant[0]);
        shellPlant.frame = 0;
        if (!shellPlant.displayedMessage) {
            storyImageMessageElement.style.display = "inline-block";
            storyImageMessageElement.innerHTML = "Click on the arrow to view more photos";
            shellPlant.displayedMessage = true;
            link1Element.style.display = "none";
            flashImageMessage();
        }
        nextElement.style.display = "block";
        prevElement.style.display = "block";
        prevElement.style.color = "black";
        prevElement.style.cursor = "none";
        nextElement.style.color = "white";
        nextElement.style.cursor = "pointer";
        nextElement.onclick = displayScene(shellPlant, 1);
        prevElement.onclick = displayScene(shellPlant, -1);
        link2Element.style.display = "none";
        link1Element.innerHTML = "Skip";
    });

}


function displayScene(shellPlant, n) {
    return function () {
        shellPlant.frame += n;
        if (shellPlant.frame < 0) {
            shellPlant.frame = 0;
        }
        else if (shellPlant.frame >= shellPlant.length) {
            shellPlant.frame = shellPlant.length - 1;
        }
        loadImage(shellPlant[shellPlant.frame].src).then(()=>
        {
            link1Element.style.display = "inline-block";
            storyImageMessageElement.style.display = "none";
            updateScene(shellPlant[shellPlant.frame]);
            prevElement.style.color = "white";
            prevElement.style.cursor = "pointer";
            if (shellPlant.frame === 0) {
                prevElement.style.color = "black";
                prevElement.style.cursor = "default";
            }
            else {
                prevElement.style.color = "white";
                prevElement.style.cursor = "pointer";
            }
            if (shellPlant.frame === shellPlant.length - 1) {
                link1Element.innerHTML = "Finished";
                nextElement.style.color = "black";
                nextElement.style.cursor = "default";
            }
            else {
                nextElement.style.color = "white";
                nextElement.style.cursor = "pointer";
            }

        });
    }
}



function finishWork(shellPlant, n) {
    return function () {
        storyImageMessageElement.style.display = "none";
        militaryPolice.paragraph = militaryPolice.end;
        updateScene(militaryPolice);
        nextElement.style.display = "none";
        prevElement.style.display = "none";
        if (!shellPlant.visited) {
            storyParagraphElement.innerHTML += ` <span class="wp-color">Here are ${n} Work Points.</span>`;
            player.increaseWP(n);
            shellPlant.visited = true;
        }
        menuDivElement.style.display = "block";
        rightDisplayElement.style.display = "block";
        link1Element.style.display = "none";
        menuElement.onmouseenter = () => {
            playAudio(mainAudioElement);
            menuElement.onmouseenter = null;
            storyParagraphElement.innerHTML = "";
        };
    }
}






















//***********************************Sports (Sports Menu)**********************************
//The winning team is listed first
class Games {
    constructor(date,teams, score) {
        this.date = date;
        this.teams = teams;
        this.score = score;
    }
}

let games = [
    new Games(
        "12/5/1918",
        ["Hammonton", "U.S. Ordnance Officers"],
        [19, 10]
    ),

    new Games(
        "12/5/1918",
        ["Pennsylvania Business College", "Lucky Five"],
        [27, 25]
    ),

    new Games(
        "12/5/1918",
        ["Woodstown High", "Gloucester High"],
        [39, 19]
    ),

    new Games(
        "12/5/1918",
        ["Dover Club of Camden", "Naval Aircraft"],
        [38, 32]
    ),

    new Games(
        "12/5/1918",
        ["Oriental", "Pusey and Jones"],
        [49, 37]
    ),

    new Games(
        "12/12/1918",
        ["U.S. Ordnance Officers", "Amatol"],
        [23, 10]),

    new Games(
        "12/12/1918",
        ["Hammonton", "Millville"],
        [37, 26]
    ),

    new Games(
        "12/19/1918",
        ["Hammonton", "Amatol Plant Site Engineers"],
        [37, 17]),

    new Games(
        "12/19/1918",
        ["Camp Pershing", "U.S. Ordnance Officers"],
        [21, 19]),

    new Games(
        "1/9/1919",
        ["Hammonton", "U.S. Ordnance Officers"],
        [26, 19]),

    new Games(
        "3/7/1919",
        ["Amatol", "Hammonton"],
        [59, 34])
];


let sportsGame = {
    paragraph:
        "Basketball games were played between different teams from Atlantic County. " +
        "There were several different teams from Amatol alone: " +
        "the Amatol five, " +
        "the U.S. Ordnance Officers quintet from Camp Amatol, " +
        "the Plant Site Engineer team from the Amatol Munition plant, " +
        "and the Camp Pershing quintet of Amatol.",
    sportsPoints:
        "You unlocked <span class='sp-color'>SP for Sports Points.</span> " +
        "You can substitute these points in place of other points when buying houses. " +
        "You can only earn SP in the Sports section. You start off with 5 SP.",
    instructions:
        "In this part of the game, you will guess which team won in a basketball game by clicking 'play.' " +
        "If you pick a winning team, your SP will go up by 3. " +
        "You can also place a wager on the winning team by selecting 'wager.' " +
        "You can wager up to 10 points for each category. " +
        "If you win, your points will go up by your wager plus 3 SP. " +
        "If you lose, your points will go down by your wager. " +
        "(You do not have to make a wager to play.)",
    wager: "Which team will you wager with?",
    play: "Which team will win?"
};

function createSportsMenu() {
    sportsAudioElement.src = "music/sports-theme.mp3";
    sportsAudioElement.play().then( () => {
        for (let game of games) {
            let sportsGameElement = document.createElement("li");
            let randomNumber = Math.floor(Math.random() * 2);
            sportsGameElement.randomNumber = randomNumber;
            sportsGameElement.game = game;
            sportsGameElement.innerHTML = `${game.date}: <span class="sports-game">${game.teams[randomNumber % 2]} vs. ${game.teams[(randomNumber + 1) % 2]}</span>`;
            sportsMenuElement.appendChild(sportsGameElement);
            sportsGameElement.onmouseenter = playHover;
        }
        createBackOption(sportsMenuElement, exitSportsMenu);
        spElement.style.display = "block";
        spElement.innerHTML = `SP: ${player.sp}`;
        spElement.storedID = spElement.id;
        let timer = setInterval(flash([spElement]), 500);
        document.onclick = () => {
            clearInterval(timer);
            document.onclick = null;
            spElement.className = "";
            spElement.id = spElement.storedID;
        }
        sportsElement.onclick = displaySportsMenu;
        displaySportsMenu();
        unlockAudioElement.currentTime = 0;
        unlockAudioElement.play();
    });
}

function displaySportsMenu() {
    storyParagraphElement.style.textAlign = "justify";
    storyImageElement.style.display = "none";
    let display = "<br>";
    if (!sportsMenuElement.visited) {
        sportsMenuElement.visited = true;
        display += sportsGame.sportsPoints;
    }
    if (sportsMenuElement.childNodes.length >= 2) {
        sportsMenuElement.visited = true;
        display += "<br><br>" + sportsGame.instructions;
        linksContainerElement.style.display = "block";
        link1Element.innerHTML = "&nbsp;Play&nbsp;";
        link1Element.style.display = "inline-block";
        link2Element.style.display = "inline-block";
        link2Element.innerHTML = "Wager";
        playAudio(sportsAudioElement);
        newspaperAudioElement.pause();
        mainAudioElement.pause();
        link1Element.onclick = createSportsBettingMenu(false);
        link2Element.onclick = createSportsBettingMenu(true);
        display += "<br><br>" + sportsGame.paragraph;
    }
    else {
        link1Element.style.display = "none";
        link2Element.style.display = "none";
        playAudio(mainAudioElement);
        display = "<br><br><br>" + sportsGame.paragraph;
    }
    storyParagraphElement.innerHTML = display;
}

function createSportsBettingMenu(betAll) {
    return function() {
        let sportsGameElements = sportsMenuElement.childNodes;
        for (let i = 0; i < sportsGameElements.length - 1; i++) {
            let sportsGameElement = sportsGameElements[i];
            sportsGameElement.onclick = () => {
                placeWagerScreen(sportsGameElement.game, sportsGameElement.randomNumber, sportsGameElement, betAll);
            };
        }
        playSports();
    }
}


function placeWagerScreen(game, randomNumber, sportsGameElement, betAll) {
    wagerDivElement.style.display = "block";
    basketballGifElement.style.display = "block";
    basketballGifElement.src = "images/basketball.jpg";
    if (betAll) {
        wagerElement.style.display = "block";
        let hpInnerHTML = "";
        for (let i = 0; i <= player.hp && i <= 10; i++) {
            hpInnerHTML += `<option class="hp-color">${i}</option>`;
        }
        let wpInnerHTML = "";
        for (let i = 0; i <= player.wp && i <= 10; i++) {
            wpInnerHTML += `<option class="wp-color">${i}</option>`;
        }
        let apInnerHTML = "";
        for (let i = 0; i <= player.ap && i <= 10; i++) {
            apInnerHTML += `<option class="ap-color">${i}</option>`;
        }
        let spInnerHTML = "";
        for (let i = 0; i <= player.sp && i <= 10; i++) {
            spInnerHTML += `<option class="sp-color">${i}</option>`;
        }
        spWagerElement.style.width = "auto";
        hpWagerElement.style.width = "auto";
        wpWagerElement.style.width = "auto";
        apWagerElement.style.width = "auto";
        spWagerElement.innerHTML = spInnerHTML;
        hpWagerElement.innerHTML = hpInnerHTML;
        wpWagerElement.innerHTML = wpInnerHTML;
        apWagerElement.innerHTML = apInnerHTML;
        let wagerElements = [hpWagerElement, wpWagerElement, apWagerElement, spWagerElement];
        let longest = hpWagerElement;
        for (let i = 1; i < wagerElements.length; i++) {
            if (wagerElements[i].offsetWidth > longest.offsetWidth) {
                longest = wagerElements[i];

            }
        }
        for (let wagerElement of wagerElements) {
            wagerElement.style.width = longest.offsetWidth + 'px';
        }
        storyParagraphElement.innerHTML = `Enter your wager for ${game.teams[randomNumber % 2]} vs. ${game.teams[(randomNumber + 1) % 2]}:`;
        wagerParagraphElement.innerHTML = sportsGame.wager;
        link1Element.innerHTML = "Place wager";
    }
    else {
        wagerElement.style.display = "none";
        storyParagraphElement.innerHTML = `${game.teams[randomNumber % 2]} vs. ${game.teams[(randomNumber + 1) % 2]}`;
        wagerParagraphElement.innerHTML = sportsGame.play;
        link1Element.innerHTML = "Play game";
    }
    sportsMenuElement.style.display = "none";
    storyParagraphElement.style.textAlign = "center";
    link1Element.style.display = "inline-block";
    team1Element.innerHTML = `<label><input id="team1-selected" type="radio" name="team" value="${randomNumber % 2}" checked>${game.teams[randomNumber % 2]}</label>`;
    team2Element.innerHTML = `<label><input id="team2-selected" type="radio" name="team" value="${(randomNumber + 1) % 2}">${game.teams[(randomNumber + 1) % 2]}</label>`;
    link1Element.onclick = placeWager(game, sportsGameElement);
    link2Element.innerHTML = "Main menu";
    link2Element.style.display = "inline-block";
    link2Element.onclick = () =>
    {
        exitSportsMenu();
        hpWagerElement.innerHTML = "";
        wpWagerElement.innerHTML = "";
        apWagerElement.innerHTML = "";
        spWagerElement.innerHTML = "";
        wagerDivElement.style.display = "none";
    };

}

function placeWager(game, sportsGameElement) {
    return function() {
        let userGuess = Number(document.querySelector('input[name="team"]:checked').value);
        let results = `<br>${game.teams[0]} defeated ${game.teams[1]} ${game.score[0]} to ${game.score[1]}.`;
        let hpWager = Number(hpWagerElement.value);
        let wpWager = Number(wpWagerElement.value);
        let apWager = Number(apWagerElement.value);
        let spWager = Number(spWagerElement.value);
        hpWagerElement.innerHTML = "";
        wpWagerElement.innerHTML = "";
        apWagerElement.innerHTML = "";
        spWagerElement.innerHTML = "";
        if (userGuess === 0) {
            results += "<br><br>You guessed right!";
            winAudioElement.play().then(() => {
                if (hpWager || wpWager || apWager || spWager) {
                    results += "<br>";
                }
                if (hpWager) {
                    results += `<br>${player.increaseHP(hpWager, false)[1]}`;
                }
                if (wpWager) {
                    results += `<br>${player.increaseWP(wpWager, false)[1]}`;
                }
                if (apWager) {
                    results += `<br>${player.increaseAP(apWager, false)[1]}`;
                }
                if (spWager) {
                    results += `<br>${player.increaseSP(spWager, false)[1]}`;
                }
                results += `<br><br>${player.increaseSP(3, false)[0]}<br><br>`;
                storyParagraphElement.innerHTML = results;
                winAudioElement.currentTime = 0;
                finishSettingUpSportsResults();
            });

        }
        else {
            results += `<br><br>You guessed ${game.teams[1]}.<br><br>`;
            loseAudioElement.play().then(() => {
                if (hpWager) {
                    results += `${player.decreaseHP(hpWager)[1]}<br>`;
                }
                if (wpWager) {
                    results += `${player.decreaseWP(wpWager)[1]}<br>`;
                }
                if (apWager) {
                    results += `${player.decreaseAP(apWager)[1]}<br>`;
                }
                if (spWager) {
                    results += `${player.decreaseSP(spWager)[1]}<br>`;
                }
                if (hpWager || wpWager || apWager || spWager) {
                    results += "<br>";
                }
                storyParagraphElement.innerHTML = results;
                loseAudioElement.currentTime = 0;
                finishSettingUpSportsResults();
            });
        }
        sportsGameElement.remove();
    }
}

function finishSettingUpSportsResults() {
    link1Element.innerHTML = "Play again";
    link1Element.style.display = "inline-block";
    wagerDivElement.style.display = "none";
    link1Element.onclick = playSports;
    link2Element.innerHTML = "Main menu";
    link2Element.style.display = "inline-block";
    link2Element.onclick = exitSportsMenu;
    if (sportsMenuElement.childNodes.length === 1) {
        link2Element.style.display = "none";
        link1Element.innerHTML = "Main Menu";
        link1Element.onclick = exitSportsMenu;
    }
    basketballGifElement.src = "images/basketball.gif";
}

function playSports() {
    basketballGifElement.style.display = "none";
    link1Element.style.display = "none";
    link2Element.style.display = "none";
    storyParagraphElement.innerHTML = "";
    sportsMenuElement.style.display = "flex";
    menuDivElement.style.display = "none";
}


function exitSportsMenu() {
    basketballGifElement.style.display = "none";
    storyParagraphElement.innerHTML = "";
    link1Element.style.display = "none";
    link2Element.style.display = "none";
    menuDivElement.style.display = "block";
    rightDisplayElement.style.display = "block";
    sportsMenuElement.style.display = "none";
    storyParagraphElement.style.display = "block";
    storyParagraphElement.style.textAlign = "center";
    playAudio(mainAudioElement);
}




































//*************************Camp Amatol (Camp Amatol Menu)*************************************************8
class CampAmatol {
    constructor(src, alt, paragraph) {
        this.src = src;
        this.alt = alt;
        this.paragraph = paragraph;
    }
}

let campAmatol = [
    new CampAmatol(
        "images/camp-amatol-1.jpg",
        "Battalion roll call at Camp Amatol",
        "In October 1918, 2,400 troops arrived at Amatol to assist in operations there."),
    new CampAmatol(
        "images/camp-amatol-2.jpg",
        "Barracks at Camp Amatol",
        "Barracks were built to house the soldiers."),
    new CampAmatol("images/camp-amatol-3.jpg",
        "Barracks at Camp Amatol",
        "The barracks were designed to be later rearranged into workers' houses."),
    new CampAmatol("images/camp-amatol-4.jpg",
        "Battalion roll call at Camp Amatol",
        "By the time of the armistice, there were 3,800 officers and enlisted men at Camp Amatol, " +
        "as it became known.")
];

campAmatol.scene = 0;
campAmatol.displayMessage = false;
campAmatol.pointsMessage = "";
campAmatol.foundFirstPoints = false;
campAmatol.foundSecondPoints = false;
campAmatol.totalPoints = 0;

function displayCampAmatol() {
    if (!campAmatolAudioElement.src) {
        campAmatolAudioElement.src = "music/camp-amatol-theme.mp3";
    }
    let promises = [campAmatolAudioElement.play(), loadImage(campAmatol[campAmatol.scene].src), loadImage(campAmatol[1].src)];
    Promise.all(promises).then(() =>
    {
        linksContainerElement.style.display = "block";

        updateScene(campAmatol[campAmatol.scene]);
        storyImageElement.style.display = "block";
        storyParagraphElement.style.textAlign = "center";
        link1Element.style.display = "inline-block";
        if (!campAmatol.displayMessage) {
            campAmatol.displayMessage = true;
            storyImageMessageElement.style.display = "inline-block";
            storyImageMessageElement.innerHTML = "Click on the arrow to view more photos";
            link1Element.style.display = "none";
            flashImageMessage();
        }
        link1Element.innerHTML = "Main menu";
        playAudio(campAmatolAudioElement);
        menuDivElement.style.display = "none";
        rightDisplayElement.style.display = "none";
        prevElement.style.color = "black";
        prevElement.style.cursor = "default";
        nextElement.style.display = "block";
        prevElement.style.display = "block";
        nextElement.style.color = "white";
        nextElement.style.cursor = "pointer";
        nextElement.onclick = displayAmatolScene(1);
        prevElement.onclick = displayAmatolScene(-1);
        link2Element.style.display = "none";
        displayArrows();
        link1Element.onclick = () => {
            storyImageMessageElement.style.display = "none";
            link1Element.style.display = "none";
            link2Element.style.display = "none";
            menuDivElement.style.display = "block";
            rightDisplayElement.style.display = "block";
            prevElement.style.display = "none";
            nextElement.style.display = "none";
            if (campAmatol.pointsMessage) {
                storyParagraphElement.innerHTML = campAmatol.pointsMessage;
                campAmatol.pointsMessage = "";
                campAmatol.totalPoints = 0;
            }
            menuElement.onmouseenter = () => {
                menuElement.onmouseenter = null;
                storyParagraphElement.innerHTML = "";
                playAudio(mainAudioElement);
            };
        };
    });
}

function displayAmatolScene(n) {
    return function() {
        campAmatol.scene += n;
        if (campAmatol.scene < 0) {
            campAmatol.scene = 0
        } else if (campAmatol.scene >= campAmatol.length) {
            campAmatol.scene = campAmatol.length - 1
        }
        loadImage(campAmatol[campAmatol.scene].src).then(() =>
        {
            link1Element.style.display = "inline-block";
            storyImageMessageElement.style.display = "none";
            updateScene(campAmatol[campAmatol.scene]);
            displayArrows();
        });
    }
}

function displayArrows() {
    if (campAmatol.scene === 0) {
        prevElement.style.color = "black";
        prevElement.style.cursor = "default";
    }
    else {
        prevElement.style.color = "white";
        prevElement.style.cursor = "pointer";
    }
    if (campAmatol.scene === campAmatol.length - 1) {
        nextElement.style.color = "black";
        nextElement.style.cursor = "default";
        if (!campAmatol.foundSecondPoints) {
            campAmatol.foundSecondPoints = true;
            campAmatol.totalPoints += 1;
            campAmatol.pointsMessage = `<span class="ap-color">Your AP went up by ${campAmatol.totalPoints}!</span>`;
            player.increaseAP();
        }
    }
    else {
        nextElement.style.color = "white";
        nextElement.style.cursor = "pointer";
        if (campAmatol.scene === 1 && !campAmatol.foundFirstPoints) {
            campAmatol.foundFirstPoints = true;
            campAmatol.totalPoints += 1;
            campAmatol.pointsMessage = `<span class="ap-color">Your AP went up by ${campAmatol.totalPoints}!</span>`;
            player.increaseAP();
        }
    }
}

























//*********************Newspapers (Newspaper Menu)************************************
let mystery = {
    src: "pdfs/time-travel.jpg",
    alt: "A space time vertex",
    paragraph: "Whoa, that article is about the future. You and Agnes haven't gotten married yet, " +
        "but you're planning to on Christmas Eve, like the article says.<br>(How eerie.)"
}

class Newspaper {
    constructor(date, executiveSummary, src, alt, newspaper, link) {
        this.date = date;
        this.executiveSummary = executiveSummary;
        this.src = src;
        this.alt = alt;
        this.newspaper = newspaper;
        this.link = link;
    }
}


let newspapers = [

    new Newspaper(
        "February 2, 1918",
        "Amatol cannot be built near Camp Dix",
        "pdfs/camp-dix.jpg",
        "Article not found: An article as to why Amatol could not be built near Camp Dix",
        "Trenton Evening Times",
        newspaperPoints(player.increaseAP, 4),
    ),

    new Newspaper(
        "June 5, 1918",
        "Amatol's new train service and population size",
        "pdfs/new-train-service.jpg",
        "Article not found: An article about a new train service for Amatol",
        "Philadelphia Inquirer"),

    new Newspaper(
        "October 14, 1918",
        "Soldiers at Amatol take French leave",
        "pdfs/french-leave.jpg",
        "Article not found: An article about soldiers at Amatol taking French leave",
        "Philadelphia Inquirer",
        newspaperPoints(player.increaseHP, 3)),

    new Newspaper(
        "November 12, 1918",
        "Amatol celebrates the end of the Great War",
        "pdfs/war-is-over.jpg",
        "Article not found: An article about the Great War ending",
        "Philadelphia Inquirer",
        newspaperPoints(player.increaseWP, 2)),

    new Newspaper(
        "December 25, 1918",
        "The first wedding in Amatol",
        "pdfs/first-wedding.jpg",
        "Article not found: An article about the first marriage that took place in Amatol " +
        "of Peter (that's you) and Agnes (that's your fiance",
        "Philadelphia Inquirer",
        displayMystery),
];


function createNewspaperMenu() {
    newspaperAudioElement.src = "music/newspaper-theme.mp3";
    newspaperAudioElement.play().then(() => {
        for (let newspaper of newspapers) {
            let newspaperListElement = document.createElement("li");
            newspaperListElement.innerHTML =
                `In the <span class="newspaper-title">${newspaper.newspaper}</span> on ${newspaper.date}` +
                `<br>Subject: <span class="article-summary">${newspaper.executiveSummary}</span>`;
            newspaperListElement.onclick = displayNewspaperArticle(newspaper);
            newspaperListElement.onmouseenter = playHover;
            newspaperMenuElement.appendChild(newspaperListElement);
        }
        createBackOption(newspaperMenuElement, exitNewspaperMenu);
        newspaperElement.onclick = displayNewspaperMenu;
        //Prevent the user from accidentally clicking out of the article
        pdfImageElement.addEventListener("click", (event) => {
            event.stopPropagation();
        });
        pdfGridElement.onclick = pdfGridOff;
        displayNewspaperMenu();
    });
}

function displayNewspaperArticle(newspaper) {
    return function() {
        loadImage(newspaper.src).then(() => {
            displayPDFGrid();
            pdfImageElement.src = newspaper.src;
            pdfImageElement.alt = newspaper.alt;
            if (newspaper.link) {
                newspaper.link();
                newspaper.link = null;
            }
        });
    }
}

function displayNewspaperMenu() {
    link1Element.style.display = "none";
    link2Element.style.display = "none";
    playAudio(newspaperAudioElement);
    newspaperMenuElement.style.display = "flex";
    menuDivElement.style.display = "none";
    rightDisplayElement.style.display = "none";
    storyImageElement.style.display = "none";
    storyParagraphElement.style.display = "none";
    storyParagraphElement.innerHTML = "<br><br><br>";
    storyParagraphElement.style.textAlign = "center";
}

function exitNewspaperMenu() {
    menuDivElement.style.display = "block";
    menuElement.style.display = "block";
    rightDisplayElement.style.display = "block";
    newspaperMenuElement.style.display = "none";
    storyParagraphElement.style.display = "block";
    playAudio(mainAudioElement);
}

function newspaperPoints(increasePoints, n) {
    return function() {
        storyParagraphElement.innerHTML += `<br>${increasePoints(n)[0]}`;
    }
}

function displayMystery() {
    pdfGridElement.onclick = () =>
    {
        mysteryAudioElement.src = "music/mystery-theme.mp3";
        let promises = [mysteryAudioElement.play(), loadImage(mystery.src)];
        Promise.all(promises).then(() =>
        {
            playAudio(mysteryAudioElement);
            pdfImageElement.src = mystery.src;
            pdfParagraphElement.innerHTML = mystery.paragraph;
            pdfGridElement.onclick = () => {
                pdfGridOff();
                pdfParagraphElement.innerHTML = "";
                playAudio(newspaperAudioElement);
            };
        });
    };
}

function displayPDFGrid() {
    pdfGridElement.style.display = "flex";
    newspaperMenuElement.style.display = "none";
}

function pdfGridOff() {
    pdfGridElement.style.display = "none";
    newspaperMenuElement.style.display = "flex";
}















//****************************Credits*********************************
credits =
    "<b>Programmer/Designer:</b><br>" +
    "DJ Dinnebeil<br>" +
    "<br><b>Sponsoring Organizations:</b><br>" +
    "South Jersey Culture and History Center<br>" +
    "Stockton University<br>" +
    "<br><b>Photo Contributions:</b><br>" +
    "Paul Schopp (personal collection)<br>" +
    "Victor F. Hammel (the Amatol Book, 1918)<br>" +
    "<br><b>Music:</b><br>" +
    "Nobuo Uematsu<br>" +
    "Yasunori Mitsuda<br>" +
    "(Square-Enix)<br>" +
    "<br><b>Sound:</b><br>" +
    "Koji Kondo<br>" +
    "(Nintendo)<br>" +
    "<br><b>Special Thanks To:</b><br>" +
    "Dr. Thomas Kinsella for finding the topic<br>" +
    "Dr. Lisa Rosner for creating the course project";

function displayCredits() {
    storyParagraphElement.style.display = "block";
    welcomeScreenDiv.style.display = "none";
    storyParagraphElement.style.height = "auto";
    link1Element.onmouseenter = playHover2;
    link2Element.style.display = "none";
    storyParagraphElement.style.textAlign = "center";
    storyParagraphElement.innerHTML = credits;
    storyImageElement.style.display = "none";
    storyParagraphElement.style.marginTop = "0";
    playAudio(creditsAudioElement);
}













//*********************************Main (Program Starts Here)********************
function main() {
    link1Element.onclick = startGame;
    link2Element.onclick = displayCredits;
    //For modal image viewer
    popupGridElement.onclick = displayPopupNone;
    storyImageElement.onclick = displayPopupGrid;
    let timer = setInterval(flashWelcomeScreen, 50);
    linksContainerElement.onclick = () =>
    {
        clearInterval(timer);
        linksContainerElement.onclick = null;
    }
}

window.onload = () =>
{
    storyImageElement.style.minHeight = "auto";
    storyImageElement.style.minWidth = "auto";
}

main();



