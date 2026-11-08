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

var skillsArray = ['C#', 'C++', 'JS', 'PHP', 'Python', 'Unity', 'Unity ShaderGraph', 'Unreal Engine', 'Blender', 'Scrum & Kanban', 'Version Control']

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