const form = document.getElementById('dino-compare');
const grid = document.getElementById('grid');
// Create Dino Constructor
function Dino(species, weight,height,diet,where,when,fact) {
    this.species = species;
    this.weight = weight;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.height = height;
    this.imagePath = `./images/${this.species}.png`;
}
  
// Create Dino Objects
async function getDinoObjects() {
    let res = []
    let dinos = await fetch('./dino.json')
    .then(resp => resp.json())
    .catch(err => {
        throw new Error(err)
    });
     dinos.Dinos.forEach(dino => {
        res.push (new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact) )
     })
     
    return res;
};
    
// Create Human Object
function Human (name,feet,inches,weight,diet)  {
    this.name = name;
    this.height = feet* 12 + inches;
    this.weight = weight;
    this.diet = diet;
    this.imagePath = `./images/human.png`;
};


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
// Compare Dino diet to Human
Dino.prototype.compareHeight = function (h) {
    console.log(h)
    if (this.height > h.height)
        return `${this.species} is taller then ${h.name}`;
    else if (this.height < h.height)
        return `${h.name}  is taller then ${this.species}`;
    else
        return `no one wins 😞`;
};
    
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function (h) {
    console.log(h)
    if (this.weight > h.weight)
        return `${this.species} is heavier   then ${h.name}`;
    else if (this.weight < h.weight)
        return `${h.name}  is heavier  then ${this.species}`;
    else
        return `no one wins 😞`;
};
        
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function (h) {
    console.log(h)
    if (this.diet == h.diet)
        return `${this.species} & ${h.name} uses the same diet`;
    else
        return `${this.species} & ${h.name} do not share the same diet 😞`;
};

function getFact(human, dinosaur) {   
    if (dinosaur.species == 'Pigeon')
        return dinosaur.fact
    else {
        let num = Math.floor(Math.random() * 3) + 1;
        if (num == 1)
            return dinosaur.compareDiet(human);
        else if (num == 2)
            return dinosaur.compareWeight(human);
        else 
           return dinosaur.compareHeight(human);
    }
}

// Generate Tiles for each Dino in Array
// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', async () => { 
    // Use IIFE to get human data from form
    
    const human = (function getHuman() {
        const nameInput = document.getElementById('name');
        const feet = document.getElementById('feet');
        const inches = document.getElementById('inches');
        const diet = document.getElementById('diet');
        const weight = document.getElementById('weight');
        return new Human(nameInput.value, feet.value,inches.value,  weight.value,diet.value);
    })();

    const data = await getDinoObjects();  
    // const human =  await getHuman();  
    data.splice(4, 0, human);
    // Add tiles to DOM
    data.map((element) => {        
            let div = document.createElement('div');
            let img = document.createElement('img');
            let p = document.createElement('p');
            let h3 = document.createElement('h3');
        
            if (element.constructor.name =='Dino') {
            p.innerHTML = getFact(human,element);
            h3.innerHTML = element.species;
            img.src= element.imagePath
            grid.appendChild(div);
            div.appendChild(h3);
            div.appendChild(img);
            div.appendChild(p);     
            } else {
            console.log(element)
            h3.innerHTML = element.name;
            img.src= element.imagePath
            grid.appendChild(div);
            div.appendChild(h3);
            div.appendChild(img);
    }
            div.className = 'grid-item'
            })

        grid.style.visibility = 'visible';
        // Remove form from screen
        form.style.display = "none";
})

    
    
