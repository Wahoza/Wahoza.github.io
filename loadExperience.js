var experienceArray = [];
// dataArray.push(
//     {name: 'Occupation', duration: 'Time', description: 'Description', ico: '<i class="fa-solid fa-code"></i>'}
// )
experienceArray.push(
    {name: 'General Education & Abitur', duration: '2014 - 2022', description: 'Completed Abitur at the Landschulheim Marquartstein', ico: '<i class="fa-solid fa-school"></i>'}
)
experienceArray.push(
    {name: 'Bachelor Graduate (BSc)', duration: '2022 - 2026', description: 'Graduate of the FH Salzburg, in MultiMediaTechnology (Computer science)', ico: '<i class="fa-solid fa-book-open"></i>'}
)
experienceArray.push(
    {name: 'Technical Artist & Game Developer', duration: '4 months', description: 'Internship at Nightingames as a Technical Artist and Developer', ico: '<i class="fa-solid fa-code"></i>'}
)

var skillsArray = ['C#', 'C++', 'JS', 'PHP', 'Python', 'OOP', 'Design Patterns', 'Documentation', 'Unity', 'Unity ShaderGraph', 'Unreal Engine', 'Blender', 'Scrum & Kanban', 'Version Control', 'Game Design', 'Teamwork']

const experienceSection = document.getElementById('experience-holder');


for(var i = 0; i < experienceArray.length; i++){
    experienceSection.innerHTML += (
        '<div class="grid-card">' +
        experienceArray[i].ico +
        '<span>' + experienceArray[i].name + '</span>' +
        '<h3>' + experienceArray[i].duration + '</h3>' +
        '<p>' + experienceArray[i].description + '</p>' +
        '</div class="grid-card">'
    );
}

var skillsString = '<div class="grid-card"> <i class="fa-regular fa-lightbulb"></i><span>Skills</span> <div class = game-tag-grid>';
for(var i = 0; i < skillsArray.length; i++)
{
    skillsString += '<div class = experience-tag>' + skillsArray[i] + '</div>';
}
skillsString += '</div></div>';
experienceSection.innerHTML += skillsString;


var achievementArray = [];
achievementArray.push(
    {name: 'Train of Thought', id: 'tot-card', description: 'Finalist in the Subotron pitch competition (still in progress)', awardLink: 'https://subotron.com/'}
)
achievementArray.push(
    {name: 'Bureaucracy', id: 'bureaucracy-card', description: 'Winner of it\'s subcategory at the Truth, Lies & Democracy GameJam at the Belvedere in Vienna', awardLink: 'https://capitalofdemocracy.eu/vienna2025/'}
)
achievementArray.push(
    {name: 'YESSHOPPING', id: 'yesshopping-card', description: 'Winner of the 12th Mmarmalade GameJam (at time of evaluation)', awardLink: 'https://itch.io/jam/12th-mmarmalade/rate/3383594'}
)
achievementArray.push(
    {name: 'Flying Frogs', id: 'ff-card', description: '3rd in the 10th Mmarmalade GameJam', awardLink: 'https://itch.io/jam/mmarmelade-game-jam'}
)
var rewardString = '<div class="grid-card grid-card--achievement"> <i class="fa-solid fa-award"></i><span>Achievements</span> <div class = achievement-grid>';
for(var i = 0; i < achievementArray.length; i++){
    rewardString += (
        '<div><a href = "#' + achievementArray[i].id + '"> <div class = "btn">' + achievementArray[i].name + '</div></a></div>' +
        '<p>' + achievementArray[i].description + '</p>'
    );

    if(achievementArray[i].awardLink)
    {
        rewardString += '<div><a href = "' + achievementArray[i].awardLink + '"> <div class = "btn"> more info </div> </a></div>'
    }else{
        rewardString += '<div></div>'
    }
}
rewardString += '</div></div>'
experienceSection.innerHTML += rewardString;