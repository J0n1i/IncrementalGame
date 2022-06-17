const woodElement = document.getElementById('wood');
const stoneElement = document.getElementById('stone');
const ironElement = document.getElementById('iron');
const foodElement = document.getElementById('food');
const moneyElement = document.getElementById('money');
const populationElement = document.getElementById('population');
const buildingsElement = document.getElementById("buildings");
const housesElement = document.getElementById("houses")
const resetButton = document.getElementById("resetButton");
const availableWorkersElement = document.getElementById("availableWorkers");

resetButton.addEventListener("click", event => {
    localStorage.removeItem("game")

    game = {
        resources: {
            wood: 0,
            stone: 0,
            iron: 0,
            food: 0,
            money: 0,
            population: 25,
            totalWorkers: 0,
            Houses: 5,
        },
        production: {
            wood: 0,
            stone: 0,
            iron: 0,
            food: 0,
            population: 0.1,
        },
        productionEfficiency: [0, 0, 0, 0, 0],
        ownedBuildings: [5, 0, 0, 0, 0],
        assignedWorkers: [0, 0, 0, 0, 0],
    }
    UpdateBuildings();
    UpdateEfficiency()
})


const NumberAbbreviation = ["", "K", "M", "B", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U", "D", "T",
    "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U",
    "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N",
    "Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp",
    "O", "N", "Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U", "D", "T", "Q", "Qt",
    "Sx", "Sp", "O", "N", "Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U", "D", "T",
    "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U",
    "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N",
    "Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc"]

const DisplayNumber = (number) => {
    if (number < 1000) {
        return number.toFixed(2)
    } else {
        let a = number;
        a = a.toFixed(2);
        a = a.toLocaleString("fullwide", { useGrouping: false });
        let b = a.length;
        let c = ((b - 1) / 3)
        c = Math.floor(c) - 1;

        let d = a.substring(0, (b - 4) % 3 + 1);

        let e = a.substring(d.length, d.length + 2);

        return d + "." + e + NumberAbbreviation[c]
    }
}


const harvestButtons = [
    document.getElementById("harvestWood"),
    document.getElementById("harvestStone"),
    document.getElementById("harvestIron"),
]

let game = {
    resources: {
        wood: 0,
        stone: 0,
        iron: 0,
        food: 0,
        money: 0,
        population: 25,
        totalWorkers: 0,
        Houses: 5,
    },
    production: {
        wood: 0,
        stone: 0,
        iron: 0,
        food: 0,
        population: 0.1,
    },
    productionEfficiency: [0, 0, 0, 0, 0],
    ownedBuildings: [1, 0, 0, 0, 0],
    assignedWorkers: [0, 0, 0, 0, 0],
}


LoadGame()
function LoadGame() {
    let data = localStorage.getItem("game")
    data = JSON.parse(data)
    console.log(data)
    if (data) {
        game = data;
    }
}


//save game every 5 seconds
setInterval(function () {
    console.log("Saving");
    localStorage.setItem("game", JSON.stringify(game));
    console.log("Saved");
}, 1000);




const buildings = [
    { name: "House", price: { wood: 50, stone: 50, iron: 50, food: 0 }, production: { wood: 0, stone: 0, iron: 0, food: 0 }, requiredWorkers: 0 },
    { name: "Wood gathering hut", price: { wood: 50, stone: 0, iron: 10, food: 0 }, production: { wood: 1, stone: 0, iron: 0, food: 0 }, requiredWorkers: 10 },
    { name: "Stone deposit", price: { wood: 0, stone: 50, iron: 0, food: 0 }, production: { wood: 0, stone: 1, iron: 0, food: 0 }, requiredWorkers: 10 },
    { name: "Iron mine", price: { wood: 0, stone: 0, iron: 50, food: 0 }, production: { wood: 0, stone: 0, iron: 1, food: 0 }, requiredWorkers: 10 },
    { name: "Hunting cottage", price: { wood: 25, stone: 25, iron: 25, food: 0 }, production: { wood: 0, stone: 0, iron: 0, food: 0.1 }, requiredWorkers: 10 },
]

harvestButtons.forEach(element => {
    element.addEventListener("click", (event => {
        AddResource(element.value, 5);
    }))
});


function AddResource(resource, amount) {
    switch (resource) {
        case "wood":
            game.resources.wood += amount || 1;
            break;
        case "stone":
            game.resources.stone += amount || 1;
            break;
        case "iron":
            game.resources.iron += amount || 1;
            break;
        case "food":
            game.resources.food += amount || 1;
            break;
        case "population":
            game.resources.population += amount || 1;
            break;
        default:
            break;
    }
    UpdateResource(resource);
}

function UpdateResource(resource) {
    switch (resource) {
        case "wood":
            woodElement.innerHTML = "Wood: " + DisplayNumber(game.resources.wood);
            break;
        case "stone":
            stoneElement.innerHTML = "Stone: " + DisplayNumber(game.resources.stone);
            break;
        case "iron":
            ironElement.innerHTML = "Iron: " + DisplayNumber(game.resources.iron);
            break;
        case "food":
            foodElement.innerHTML = "Food: " + DisplayNumber(game.resources.food);
            break;
        case "money":
            break;
        case "population":
            populationElement.innerHTML = "Population: " + game.resources.population.toFixed(0);
            break;
        case "house":
            housesElement.innerHTML = "Houses: " + game.resources.Houses;
            break;
    }
}

UpdateBuildings()
function UpdateBuildings() {
    buildingsElement.innerHTML = "";
    buildings.forEach((building, index) => {
        let buildingElement = document.createElement("div");
        buildingElement.classList.add("building");

        let requiredWorkers = building.requiredWorkers * game.ownedBuildings[index];

        buildingElement.innerHTML = `
        <li class="list-group-item">
                            <h1>${building.name}</h1>
                            <div class="row">
                                <div class="col">
                                    <button id="buyBuilding" class="col btn btn-primary" value="${index}">Buy</button>
                                    <p class="col">Amount: ${game.ownedBuildings[index]}</p>
                                </div>
                            </div>
                            <div class="row">

                            ${building.requiredWorkers !== 0 ? `<div class="col">

                <h3>Assign workers</h3>
                <button id="addWorker" class="col-2 btn btn-primary">+</button>
                <button id="removeWorker" class="col-2 btn btn-primary">-</button>
                <button id="maxWorker" class="col-2 btn btn-primary">MAX</button>
                <p class="col">Required workers: ${requiredWorkers}</p>
                <p class="col">Assigned workers: ${game.assignedWorkers[index]}</p>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${(game.assignedWorkers[index] / requiredWorkers) * 100}%;">${game.assignedWorkers == 0 ? ((game.assignedWorkers[index] / requiredWorkers) * 100) + "%" : ""}</div>
                </div>
            </div>
            ` : ""}
                            </div>
                            <div class="row">
                                <div class="col">
                                    <h3>Price</h1>
                                        <ul class="list-group">
                                            ${building.price.wood !== 0 ? `<li class="list-group-item">Wood: ${building.price.wood}</li>` : ""} 
                                            ${building.price.stone !== 0 ? `<li class="list-group-item">Stone: ${building.price.stone}</li>` : ""} 
                                            ${building.price.iron !== 0 ? `<li class="list-group-item">Iron: ${building.price.iron}</li>` : ""} 
                                            ${building.price.food !== 0 ? `<li class="list-group-item">Food: ${building.price.food}</li>` : ""} 
                                        </ul>
                                </div>
                                <div class="col">
                                ${building.production.wood === 0 &&
                building.production.stone === 0 &&
                building.production.iron === 0 &&
                building.production.food === 0
                ? "" : `<h3>Production</h3>`}
                                        <ul class="list-group">
                                            ${building.production.wood !== 0 ? `<li class="list-group-item">Wood: ${building.production.wood}</li>` : ""}
                                            ${building.production.stone !== 0 ? `<li class="list-group-item">Stone: ${building.production.stone}</li>` : ""}
                                            ${building.production.iron !== 0 ? `<li class="list-group-item">Iron: ${building.production.iron}</li>` : ""}
                                            ${building.production.food !== 0 ? `<li class="list-group-item">Food: ${building.production.food}</li>` : ""}
                                        </ul>
                                </div >
                            
                            </div >
                        
                        </li>`


        buildingsElement.appendChild(buildingElement);

        let buyBuildingButton = buildingElement.querySelector("#buyBuilding");


        buyBuildingButton.addEventListener("click", (event => BuyBuilding(index)));

        if (building.requiredWorkers != 0) {
            let addWorkerButton = buildingElement.querySelector("#addWorker");
            let removeWorkerButton = buildingElement.querySelector("#removeWorker");
            let maxWorkerButton = buildingElement.querySelector("#maxWorker");

            addWorkerButton.addEventListener("click", (event => AddWorker(index)))
            removeWorkerButton.addEventListener("click", (event => RemoveWorker(index)))
            maxWorkerButton.addEventListener("click", (event => MaxWorker(index)))
        }


    }
    )
}

function BuyBuilding(buildingIndex) {
    if (game.resources.wood < buildings[buildingIndex].price.wood) return
    if (game.resources.stone < buildings[buildingIndex].price.stone) return
    if (game.resources.iron < buildings[buildingIndex].price.iron) return
    if (game.resources.food < buildings[buildingIndex].price.food) return

    game.resources.wood -= buildings[buildingIndex].price.wood;
    game.resources.stone -= buildings[buildingIndex].price.stone;
    game.resources.iron -= buildings[buildingIndex].price.iron;
    game.resources.food -= buildings[buildingIndex].price.food;

    UpdateResource("wood");
    UpdateResource("stone");
    UpdateResource("iron");
    UpdateResource("food");

    game.ownedBuildings[buildingIndex] += 1;
    UpdateBuildings();
    UpdateEfficiency()

    game.resources.houses = game.ownedBuildings[0]
}

function AddWorker(i) {
    if (game.resources.totalWorkers < Math.floor(game.resources.population)) {
        if (game.assignedWorkers[i] >= buildings[i].requiredWorkers * game.ownedBuildings[i]) return

        game.assignedWorkers[i] += 1;
        game.resources.totalWorkers += 1;
        UpdateBuildings();
        UpdateEfficiency()
    }
}

function RemoveWorker(i) {
    if (Math.floor(game.resources.totalWorkers) > 0) {
        game.assignedWorkers[i] -= 1;
        game.resources.totalWorkers -= 1;
        UpdateBuildings();
        UpdateEfficiency()
    }
}

function MaxWorker(index) {
    let workersLeft = buildings[index].requiredWorkers * game.ownedBuildings[index] - game.assignedWorkers[index];

    for (let i = 0; i < workersLeft; i++) { 
        if (game.resources.totalWorkers < game.resources.population) {
            game.assignedWorkers[index] += 1;
            game.resources.totalWorkers += 1;
        }
    }


    UpdateBuildings();
    UpdateEfficiency()
}

function UpdateEfficiency() {
    for (let i = 0; i < buildings.length; i++) {
        let requiredWorkers = buildings[i].requiredWorkers * game.ownedBuildings[i];
        let efficiency = (game.assignedWorkers[i] / requiredWorkers);
        if (requiredWorkers === 0) { efficiency = 0 }

        game.productionEfficiency[i] = efficiency;

    }

    console.log(game)

    for (let i = 0; i < buildings.length; i++) {
        game.production.wood = 0;
        game.production.stone = 0;
        game.production.iron = 0;
        game.production.food = 0;
        game.production.population = 0;
    }



    for (let i = 0; i < buildings.length; i++) {
        game.production.wood += buildings[i].production.wood * game.ownedBuildings[i] * game.productionEfficiency[i];
        game.production.stone += buildings[i].production.stone * game.ownedBuildings[i] * game.productionEfficiency[i];
        game.production.iron += buildings[i].production.iron * game.ownedBuildings[i] * game.productionEfficiency[i];
        game.production.food += buildings[i].production.food * game.ownedBuildings[i] * game.productionEfficiency[i];
    }
}

setInterval(() => {


    game.resources.wood += (game.production.wood / 100);
    game.resources.stone += game.production.stone / 100;
    game.resources.iron += game.production.iron / 100;
    game.resources.food += game.production.food / 100;


    UpdateResource("wood");
    UpdateResource("stone");
    UpdateResource("iron");
    UpdateResource("food");
    UpdateResource("population");
    UpdateResource("houses");

    availableWorkersElement.innerHTML = `Available Workers: ${(game.resources.population - game.resources.totalWorkers).toFixed(1)}`;

    if (game.resources.population < game.resources.houses * 5) {
        game.resources.population += game.resources.food / 1000;
        game.resources.food -= game.resources.food / 1000;
    }
}, 10);

