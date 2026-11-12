
var projArray = [];

projArray.push(
    {
        img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4994410/2f432eacce5c2be6f998e69d89e478513314ca41/header.jpg',
        name: 'Train of Thought - Murder on the Silver Line', 
        id: 'tot-card',
        description: 'Train of Thought – Murder on the Silver Line is a narrative-driven detective mystery game that combines exploration, puzzles and logical deduction into a handcrafted whodunit experience. Was on display at the Level Up & FH-Werkschau in Salzburg and is a finalist in the current Subotron Pitch Competition.', 
        projectLink: 'https://store.steampowered.com/app/4994410/Train_of_Thought_Murder_on_the_Silver_Line_ACADEMIC_VERSION/', 
        tags: ["Unity", "C#" , "Shadergraph", "WWISE", "Single-Player" ,"Detective", "Investigation" , "MMP"]
    }
)
projArray.push(
    {
        img: 'https://img.itch.zone/aW1nLzMwNDYxMDE2LnBuZw==/315x250%23c/G57BiB.png',
        name: 'Portfolio-Game', 
        id: 'portfolio-card',
        description: 'A showcase of some projects in a game environment, playable in the browser.', 
        projectLink: 'https://wahoza.itch.io/portfolio', 
        projectRepo: 'https://github.com/Wahoza/Game-Portfolio',
        tags: ["Unity", "C#" , "Shadergraph", "Blender", "Web"]
    }
)
projArray.push(
    {
        img: 'https://img.itch.zone/aW1nLzIzMzU1ODAyLnBuZw==/315x250%23c/m4DZVv.png',
        name: 'Bureaucracy', 
        id: 'bureaucracy-card',
        description: 'Bureaucracy was made as part of the Truth, Lies & Democracy GameJam, at the Belvedere in Vienna, Austria. Players must sort ballots and reach quotas in a set time frame. Bureaucracy won its designated category in the GameJam.', 
        projectLink: 'https://dreiegg.itch.io/burocracy', 
        tags: ["Unity", "C#" , "Shadergraph", "Blender", "GameJam", "Simulation"]
    }
)
projArray.push(
    {
        img: 'https://img.itch.zone/aW1nLzIzMDE5OTQzLnBuZw==/315x250%23c/d%2FY5jP.png',
        name: 'MoleDown', 
        id: 'moledown-card',
        description: 'MoleDown is a local PvP game where a generated island is destroyed over time by various hazards and players. Players can burrow, attack and pick up chunks of ground. The last player standing on the island wins.', 
        projectLink: 'https://wahoza.itch.io/moledown', 
        projectRepo: 'https://github.com/Wahoza/MoleDown',
        tags: ["Unity", "C#" , "Shadergraph", "Blender", "Local PvP", "Party Game", "Marching Cubes", "Platformer"]
    }
)
projArray.push(
    {
        img: 'https://img.itch.zone/aW1nLzIxMzgwNjgyLnBuZw==/315x250%23c/MRUgSl.png',
        name: 'OATS', 
        id: 'oats-card',
        description: 'OATS is an RTS-Tower-Defense game. Players must upgrade troops and send them to fend off waves of enemy herds. Features different variations of enemies, troops and an upgrade system for the troops', 
        projectLink: 'https://wahoza.itch.io/oats', 
        projectRepo: 'https://github.com/Wahoza/MMP2b_OATS',
        tags: ["Unity", "C#" , "Shadergraph", "Blender", "RTS", "Tower Defense", "MMP"]
    }
)
projArray.push(
    {
        img: 'https://img.itch.zone/aW1nLzIwMjAxOTY3LnBuZw==/315x250%23c/%2FT6qpX.png',
        name: 'YESSHOPPING', 
        id: 'yesshopping-card',
        description: 'YESSHOPPING is a typing game where players must type out words in order to "sell" objects within a small time frame. The more objects are sold, the less time the player is alloted to sell an object. Made during a Game Jam and won (at time of evaluation), allowing our team to compete in the Truth, Lies & Democracy Game Jam.', 
        projectLink: 'https://dreiegg.itch.io/yesshopping', 
        tags: ["Unity", "C#" , "Shadergraph", "Spellchecking", "Typing Game", "GameJam"]
    }
)
projArray.push(
    {
        img: 'https://img.itch.zone/aW1nLzE1MzMwODkzLnBuZw==/315x250%23c/%2FzCwI9.png',
        name: 'Flying Frogs', 
        id: 'ff-card',
        description: 'Flying Frogs is a local party game about evading other frogs/players tongues as a fly. Catching the fly will result in the caught player becoming a frog, and the catching player becoming the fly. Also features an AI that can replace player input.', 
        projectLink: 'https://store.steampowered.com/app/2998670/Flying_Frogs/', 
        tags: ["GODOT", "C#", "GD script" , "Local PvP", "Party Game", "Player-AI", "GameJam"]
    }
)
projArray.push(
    {
        img: 'https://img.itch.zone/aW1nLzE1NjEwMzU0LmpwZw==/315x250%23c/yB4chy.jpg',
        name: 'Ocean Paddlers', 
        id: 'op-card',
        description: 'Ocean Paddlers is a local CO-OP game where players must navigate through a rapid river together. Features a handmade level as well as procedural level generation using noise and path creation.', 
        projectLink: 'https://wahoza.itch.io/ocean-paddlers', 
        projectRepo: 'https://github.com/Wahoza/OceanPaddlers',
        tags: ["SFML", "C++" , "Custom Engine", "Local CO-OP", "Procedural Generation", "MMP"]
    }
)
const projectSection = document.getElementById('projects-grid');

for(var i = 0; i < projArray.length; i++){
    var finalStr = (
        '<div class="projects-card" id = "'+ projArray[i].id + '">' +
        '<h3>' + projArray[i].name + '</h3>' +
        '<img src =' + projArray[i].img + '></img>' +
        '<p>' + projArray[i].description + '</p>'
    );

    
    if(projArray[i].tags){
        var tagStr = '<div class = game-tag-grid>'
        var tags = projArray[i].tags;
        for (var t = 0; t < tags.length; t++)
        {
            tagStr += '<div class = game-tag>' + tags[t] + '</div>'
        }
        tagStr += '</div>';

        finalStr += tagStr;
    }
    var buttonString = '';

    if (projArray[i].projectLink){
        buttonString += '<a href='+ projArray[i].projectLink +'><div class = "btn"> To Project </div></a>'
    }
    if (projArray[i].projectRepo){
        buttonString += '<a href='+ projArray[i].projectRepo +'><div class = "btn"> To Repository </div></a>'
    }

    if(buttonString)
    {
        finalStr += '<div class = "btn-group">' + buttonString + '</div>'
    }

    finalStr += '</div>'

    projectSection.innerHTML += finalStr
}