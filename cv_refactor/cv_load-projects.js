const cv_projectSection = document.getElementById("projects-container");

const cv_projects = [];
cv_projects.push(
    {
        name: "To Catch The Biggest Fish ",
        duration: "04/2023 - 06/2023",
        description: ("To catch the biggest fish was created during the Multimedia-Technology Bachelor's Degree Program at the FH-Salzburg, as a Multimedia Project (MMP) 1. It was produced in a self-made game engine. The game-loop " + 
            "revolves around the player casting a line to catch fish, catching them with a quick time event and then buying more upgrades that improve the process."),
        tasks: ["Code (Engine, AI, Player Controller, Game State Machine, Collision Detection, ...)", "Art", "Game Design"],
        madeWith: ["C#", "SFML"],
        linkToProject: "https://wahoza.itch.io/to-catch-the-biggest-fish",
        linkToRepository: "https://github.com/Wahoza/TCTBF"
    }
)

cv_projects.push(
    {
        name: "Flying Frogs",
        duration: "03/2024",
        description: ("Flying Frogs was created during a three day game jam in a team of five and expanded upon in private. It placed 3rd overall in the jam. The game-loop " + 
            "involves one player being a fly, and the rest of the session are frogs. The frogs attempt to catch the fly, and on success they become the fly. The player with the most time spent as the fly wins."
        ),
        tasks: ["AI (Fly & Frog)", "Fly Controller", "Backend Logic", "Particle Systems"],
        madeWith: ["C#", "GD-Script", "Godot"],
        linkToProject: "https://store.steampowered.com/app/2998670/Flying_Frogs",
    }
)
cv_projects.push(
    {
        name: "Ocean Paddlers",
        duration: "04/2024 - 05/2024",
        description: ("Ocean Paddlers was created during the Multimedia-Technology Bachelor's Degree Program at the FH-Salzburg, as a MMP 2a. It was made in a team of two, with a self-made game engine. " +
            "The game-loop revolves around two players navigating a raft through a river, avoiding obstacles and getting pickups in a progressively generated environment."
        ),
        tasks: ["AI", "Controls", "Level generation", "Game-State Handling", "Backend Logic", "Collision Handling", "Level & Game Design", "Art"],
        madeWith: ["C++", "SFML"],
        linkToProject: "https://wahoza.itch.io/ocean-paddlers",
        linkToRepository: "https://github.com/Wahoza/OceanPaddlers"
    }
)
cv_projects.push(
    {
        name: "TrenchC(o)at",
        duration: "12/2024",
        description: ("TrenchC(o)at was created during a three day game jam in a team of six. It placed 3rd overall in the jam. The game-loop " +
            " revolves around up to three players buying items from a grocery store as cats, and hiding from other customers."
        ),
        tasks: ["Item handling", "Coat Controller", "Game Design"],
        madeWith: ["C#", "Unity"],
        linkToProject: "https://wahoza.itch.io/trenchcoat",
    }
)
cv_projects.push(
    {
        name: "Parkour Quarrel",
        duration: "12/2024 - 02/2025",
        description: ("Parkour Quarrel was created as a private project. The game-loop revolves around (up to) five players racing across a map, and once finished, they place obstacles into the environment. This loop is repeated until one player crosses a point threshold."        ),
        tasks: ["Code", "Shadergraph", "3D Art & UI", "Game Design"],
        madeWith: ["C#", "Unity", "Blender"],
        linkToProject: "https://wahoza.itch.io/parkourquarrel",
        linkToRepository: "https://github.com/Wahoza/ParkourQuarrel"
    }
)
cv_projects.push(
    {
        name: "YESSHOPPING",
        duration: "03/2025",
        description: ("YESSHOPPING was created during a three day game jam in a team of five. It won the jam, allowing members of the team to later participate in the Truth Lies & Democracy game jam. The game-loop " + 
            "involves typing out sentences in order to sell items within a given amount of time"),
        tasks: ["Backend Code for Spellchecking", "UI, Flavor and Juice Elements", "Game Design"],
        madeWith: ["C#", "Unity"],
        linkToProject: "https://dreiegg.itch.io/yesshopping",
    }
)
cv_projects.push(
    {
        name: "OATS",
        duration: "03/2025 - 06/2025",
        description: ("OATS was created during the Multimedia-Technology Bachelor's Degree Program at the FH-Salzburg, as a MMP 2b. It was made in a team of 2. "+
            "The game-loop is a crossover between 3D real time strategy and some rogue-like approaches. The player controls multiple units, and must use these to defend a central target from various waves of enemies. Between certain waves, the players troops can be upgraded."
        ),
        tasks: ["AIs & Pathfinding", "Shadergraph", "3D Art"],
        madeWith: ["C#", "Unity", "Blender"],
        linkToProject: "https://wahoza.itch.io/oats",
        linkToRepository: "https://github.com/Wahoza/MMP2b_OATS"
    }
)
cv_projects.push(
    {
        name: "Moledown",
        duration: "05/2025 - 07/2025",
        description: ("Moledown was created as a private project. The game-loop revolves around (up to) five players attempting to survive on an island that is being progressively destroyed by the environment and the players, using marching cubes. The last player to not have fallen off the island wins."        ),
        tasks: ["Code & Optimization", "Shadergraph", "3D Art & UI", "Level & Game Design"],
        madeWith: ["C#", "Unity", "Blender"],
        linkToProject: "https://wahoza.itch.io/moledown",
        linkToRepository: "https://github.com/Wahoza/Moledown"
    }
)
cv_projects.push(
    {
        name: "Bureaucracy",
        duration: "09/2025",
        description: ("Bureaucracy was created during the three day 2025 \"Truth, Lies & Democracy\" game jam at the Belvedere in Vienna. It won it's respective category. " + 
            "The game-loop revolves around the player sorting ballots based on different criteria during a set time period, and to win they must pass a threshold on ballots evaluated correctly."),
        tasks: ["Object Interaction", "Flavor and Juice Elements", "3D Art", "Game Design"],
        madeWith: ["C#", "Unity", "Blender"],
        linkToProject: "https://dreiegg.itch.io/burocracy",
    }
)
cv_projects.push(
    {
        name: "Train of Thought – Murder on the Silver Line ",
        duration: "10/2025 - current",
        description: ("Train of Thought was created during the Multimedia-Technology Bachelor's Degree Program at the FH-Salzburg, as a MMP 3. It was created in a team of nine, in collaboration with other FH-departments. " +
            "The game-loop revolves around the player exploring a train as the detective Maeve Ashford, solving puzzles and a murder mystery plot."
        ),
        tasks: ["Object Interaction", "Player Controls", "Dialogue Components", "Flavor and Juice Elements", "Game Design"],
        madeWith: ["C#", "Unity", "WWise"],
        linkToProject: "https://store.steampowered.com/app/4994410/Train_of_Thought__Murder_on_the_Silver_Line_ACADEMIC_VERSION/",
    }
)


var stringToAdd = ''

for(let i = 0; i < cv_projects.length; i++){
    stringToAdd += '<div class = "project-item cv_only">'
    stringToAdd += (
        '<div class = "project-titlecard"> '+
        '<div class = "project-duration"> ' + cv_projects[i].duration +'</div>' + 
        '<div class = "project-title">' + cv_projects[i].name + '</div>' +
        '</div>' +
        '<div class = "project-description"> ' + cv_projects[i].description + '</div>'
    );

    let taskString = '<div class = "project-task-heading">Tasks:</div> <div class = "project-task-container">'
    let tasks = cv_projects[i].tasks;

    for(let t = 0; t < tasks.length; t++){
        taskString += '<div class = "project-task-item">' + tasks[t] + '</div>'
    }

    taskString+= '</div>'

    let madeWithString = '<div class = "project-made-with-heading">Made Using:</div> <div class = "project-made-with-container">'
    let madeWiths = cv_projects[i].madeWith;

    for(let m = 0; m < madeWiths.length; m++){
        madeWithString += '<div class = "project-made-with-item">' + madeWiths[m]+ '</div>'
    }

    madeWithString += '</div>'

    stringToAdd += taskString;
    stringToAdd += madeWithString;

    let linkString = '<div class = "project-link-container">';
    let addedLink = false;

    if(cv_projects[i].linkToProject){
        linkString += ('<a href = ' + cv_projects[i].linkToProject +'><div class = "project-link"> Project: ' + cv_projects[i].linkToProject.slice(8) + '</div></a>');
        addedLink = true;
    }

    if(cv_projects[i].linkToRepository){
        linkString += ('<a href = ' + cv_projects[i].linkToRepository +'><div class = "project-link"> Repository: ' + cv_projects[i].linkToRepository.slice(8) + '</div></a>');
        addedLink = true;
    }
    linkString += '</div>'

    if(addedLink){
        stringToAdd += linkString;
    }


    stringToAdd += "</div>"
}
cv_projectSection.innerHTML += stringToAdd
