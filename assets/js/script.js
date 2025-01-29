// Variables
const ageInput = document.getElementById('age');
const courseInput = document.getElementById('course');
const sectionInput = document.getElementById('section');
const nameInput = document.getElementById('name');
const Grade1Input  = document.getElementById('Grade1'); 
const Grade2Input  = document.getElementById('Grade2'); 
const Grade3Input  = document.getElementById('Grade3'); 
const Grade4Input  = document.getElementById('Grade4'); 
const Grade5Input  = document.getElementById('Grade5');
const units1Input  = document.getElementById('units1'); 
const units2Input  = document.getElementById('units2');
const units3Input  = document.getElementById('units3');
const units4Input  = document.getElementById('units4');
const units5Input  = document.getElementById('units5');
const GWAInput = document.getElementById('TOTALGWA');
const tableOutput = document.getElementById('transaction-list');

let counter = JSON.parse(localStorage.getItem('counter')) || 0;
let transactionList = JSON.parse(localStorage.getItem('transactionList')) || [];

if (transactionList.length > 0) {
    transactionList.forEach(transaction => {
        TableRowCreator({id: transaction.id, ...transaction})
    });
}

function TableRowCreator(transaction) {
    const newRow = document.createElement('tr');
    newRow.id = transaction.id;
    newRow.innerHTML = `
    <td>${counter + 1}</td>
    <td>${transaction.name}</td>
    <td>${transaction.age}</td>
    <td>${transaction.course}</td>
    <td>${transaction.section}</td>
    <td>${transaction.GWA}</td>
    <td>
        <button onClick='DeleteFunction(${transaction.id})'>Remove</button>
    </td>
    `

    tableOutput.appendChild(newRow);
}

function AddTransaction() {
    if (!ValidateInputs()) {
        alert('Please fill in all required fields.');
        return;
    }

    TableRowCreator({
        id: counter,
        name: nameInput.value,
        age: ageInput.value,
        course: courseInput.value,
        section: sectionInput.value,
        GWA: GWAInput.value
    });

    transactionList.push({
        id: counter,
        name: nameInput.value,
        age: ageInput.value,
        course: courseInput.value,
        section: sectionInput.value,
        GWA: GWAInput.value
    });

    counter++;
    localStorage.setItem('transactionList', JSON.stringify(transactionList));
    localStorage.setItem('counter', JSON.stringify(counter));

    ClearInputs();
}

function DeleteFunction(id) {
    transactionList = transactionList.filter(transaction => transaction.id !== id);
    document.getElementById(id).remove();
    localStorage.setItem('transactionList', JSON.stringify(transactionList));
}

function GetGWA() {
    let totalUnits = 0;
    let totalGrade = 0;

    const grades = [
        parseFloat(Grade1Input.value),
        parseFloat(Grade2Input.value),
        parseFloat(Grade3Input.value),
        parseFloat(Grade4Input.value),
        parseFloat(Grade5Input.value)
    ];

    const units = [
        parseFloat(units1Input.value),
        parseFloat(units2Input.value),
        parseFloat(units3Input.value),
        parseFloat(units4Input.value),
        parseFloat(units5Input.value)
    ];

    for (let i = 0; i < grades.length; i++) {
        totalUnits += units[i];
        totalGrade += grades[i] * units[i];
    }

    GWAInput.value = (totalUnits > 0) ? (totalGrade / totalUnits).toFixed(2) : 0;
}

function ValidateInputs() {
    return nameInput.value && ageInput.value && courseInput.value && sectionInput.value && 
           Grade1Input.value && Grade2Input.value && Grade3Input.value && Grade4Input.value && 
           Grade5Input.value && units1Input.value && units2Input.value && units3Input.value && 
           units4Input.value && units5Input.value;
}

function ClearInputs() {
    nameInput.value = '';
    ageInput.value = '';
    courseInput.value = '';
    sectionInput.value = '';
    Grade1Input.value = '';
    Grade2Input.value = '';
    Grade3Input.value = '';
    Grade4Input.value = '';
    Grade5Input.value = '';
    units1Input.value = '';
    units2Input.value = '';
    units3Input.value = '';
    units4Input.value = '';
    units5Input.value = '';
    GWAInput.value = '';
}