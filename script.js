"use strict"

let unit = '';

const coeficient = 17.817;

const form = document.forms.values;

const beakerLength = form.elements.beaker;

let length = beakerLength.value;

beakerLength.addEventListener('input', inputLength);

const frets = form.elements.fret;

let amountFrets = frets.value;

frets.addEventListener('input', inputFret);

const calc = document.querySelector('#calc');
calc.addEventListener('click', calculate);

document.body.addEventListener('ready-table', selectLines);

document.querySelector('.fa-long-arrow-left').addEventListener('click', back);

let download = document.querySelector('.share');
download.addEventListener('click', generatePDF);

let measureUnit = document.forms.unit;
measureUnit.addEventListener('change', chooseUnit);

