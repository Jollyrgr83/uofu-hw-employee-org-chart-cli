const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = require("./lib/questions");

// initializes employee array for use in rendering html
const employeeArray = [];
// contains user prompts to construct employee objects and push them to employee array
async function init() {
    // asks initial questions (type, name, id, and email)
    await inquirer.prompt([
        questions.type
    ]).then(async function(data) {
        // data validation for employee type question
        if (data.type[1] != undefined || data.type[0] === undefined) {
            console.log("Please select one type of employee.")
            return init();
        }
        // creates new employee object base on answer to employee type question (data.type[0])
        
        switch(data.type[0]) {
            case "manager" :
                var employeeObject = new Manager(await inquiry("name"), await inquiry("id"), await inquiry("email"), await inquiry(data.type[0], "extra"));
                break;
            case "engineer" :
                var employeeObject = new Engineer(await inquiry("name"), await inquiry("id"), await inquiry("email"), await inquiry(data.type[0], "extra"));
                break;
            case "intern" :
                var employeeObject = new Intern(await inquiry("name"), await inquiry("id"), await inquiry("email"), await inquiry(data.type[0], "extra"));
                break;
        }
        // adds employee object to employee array
        employeeArray.push(employeeObject);
        // asks if user would like to continue adding more employees or to end the program
        continueStatement();
        });
}
// used to ask the extra question for each employee type
async function inquiry(question, dataName) {
    if (dataName === undefined) {
        var dataName = question;
    }
    return await inquirer.prompt([questions[question]]).then(function(data) {
        // data validation for empty inputs
        if (data[dataName] === "") {
            console.log("Please enter a value.");
            return inquiry(question, dataName);
        }
        // data validation for email address input
        else if (question === "email" && data[dataName].indexOf("@") === -1) {
            console.log("Please enter a valid email address.");
            return inquiry(question, dataName);
        }
        return data[dataName];
    });
}
// asks if user would like to continue adding more employees or to end the program
function continueStatement() {
    inquirer.prompt([questions.continue]).then(function(data) {
        // if yes, loop through init function
        if (data.continue[0] === "Yes") {
            init();
        }
        // otherwise, end the loop and create the organization chart html file
        else {
            fs.writeFile(outputPath, render(employeeArray), function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log(`Success! Your organization chart is at ${outputPath}.`);
            });        
        }
    });
}
//starting script
init();
