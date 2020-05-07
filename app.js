const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArray = [];

async function init() {
    var employeeData = await inquirer.prompt([
        {
            // Select type of employee to add
            type: "checkbox",
            name: "type",
            message: "Which type of employee would you like to add?",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        },
        {
            // Name
            type: "input",
            name: "name",
            message: "What is the employee's name?"
        },
        {
            // Id
            type: "input",
            name: "id",
            message: "What is the employee's id?"
        },
        {
            // Email
            type: "input",
            name: "email",
            message: "What is the employee's email?"
        }
    ]).then(async function(data) {
        var employeeName = data.name;
        var employeeId = data.id;
        var employeeEmail = data.email;
        switch(data.type[0]) {
            case "Manager" :
                var employeeOfficeNumber = await inquirer.prompt([
                    {
                        // Office number
                        type: "input",
                        name: "officeNumber",
                        message: "What is the employee's office number?"
                    }
                ]).then(function(data) {
                    var employeeOfficeNumber = data.officeNumber;
                    var employeeObject = new Manager(employeeName, employeeId, employeeEmail, employeeOfficeNumber);
                    employeeArray.push(employeeObject);
                });
                break;
            case "Engineer" :
                var employeeGithub = await inquirer.prompt([
                    {
                        type: "input",
                        name: "github",
                        message: "What is the employee's github username?"
                    }
                ]).then(function(data) {
                    var employeeGithub = data.github;
                    var employeeObject = new Engineer(employeeName, employeeId, employeeEmail, employeeGithub);
                    employeeArray.push(employeeObject);
                });
                break;
            case "Intern" :
                var employeeSchool = await inquirer.prompt([
                    {
                        type: "input",
                        name: "school",
                        message: "What school is the employee attending?"
                    }
                ]).then(function(data) {
                    var employeeSchool = data.school;
                    var employeeObject = new Intern(employeeName, employeeId, employeeEmail, employeeSchool);
                    employeeArray.push(employeeObject);
                });
                break;
        }
        console.log("employeeArray", employeeArray);
        continueStatement();
        });
}

function managerInquirer() {
    inquirer.prompt([
        {
            // Office number
            type: "input",
            name: "officeNumber",
            message: "What is the employee's office number?"
        }
    ]).then(function(data) {
        return data.officeNumber;
    });
}

function engineerInquirer() {
    inquirer.prompt([
        {
            // GitHub
            type: "input",
            name: "github",
            message: "What is the employee's github username?"
        }
    ]).then(function(data) {
        return data.github;
    });
}

function internInquirer() {
    inquirer.prompt([
        {
            // School
            type: "input",
            name: "school",
            message: "What school is the employee attending?"
        }
    ]).then(function(data) {
        return data.school;
    });
}

function continueStatement() {
    inquirer.prompt([
        {
            type: "checkbox",
            name: "continue",
            message: "Would you like to add another employee?",
            choices: [
                "Yes",
                "No"
            ]
        }
    ]).then(function(data) {
        if (data.continue[0] === "Yes") {
            init();
        }
        else {
            let html = render(employeeArray);
            fs.writeFile(outputPath, html, function(err) {
                if (err) {
                    return console.log(err);
                }
    
                console.log(`Success! ${outputPath} was created.`);
            });
        
        
        
        
        }
    })
}


init();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
