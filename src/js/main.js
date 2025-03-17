/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js"
import { getDatabase,
    ref,
    push,
    onValue
            } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js"


const firebaseConfig = {
   databaseURL: "https://unit-converter-scrimba-default-rtdb.europe-west1.firebasedatabase.app/"
};


const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "inputs")

document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.querySelector('button')
    convertButton.addEventListener('click', onConvertClickButton)
})

onValue(referenceInDB, function(snapshot) {
    console.log(snapshot)
})


function onConvertClickButton() {

    const inputValue = document.querySelector('input').value
    const outputValueFeet =  (inputValue * 3.281).toFixed(2)
    const outputValueGallons =  (inputValue * 0.264).toFixed(2)
    const outputValuePounds =  (inputValue * 2.204).toFixed(2)
    const outputValueMeters =  (inputValue / 3.281).toFixed(2)
    const outputValueLiters =  (inputValue / 0.264).toFixed(2)
    const outputValueKilograms =  (inputValue / 2.204).toFixed(2)

    document.querySelector('#length').textContent = `${inputValue} meters = ${outputValueFeet} feet | ${inputValue} feet = ${outputValueMeters} meters`
    document.querySelector('#volume').textContent = `${inputValue} liters = ${outputValueGallons} gallons | ${inputValue} gallons = ${outputValueLiters} liters`
    document.querySelector('#mass').textContent = `${inputValue} kilograms = ${outputValuePounds} pounds | ${inputValue} pounds = ${outputValueKilograms} kilograms`

    push(referenceInDB, inputValue)
}