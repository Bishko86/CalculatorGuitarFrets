"use strict"
// import { unit, chooseUnit, invalidData, calcGuitarFrets, styleTabPdf } from './functions.js'

//coeficient for calculate frets
const coeficient = 17.817;

// form link
const form = document.forms.values;

//data for length guitar's beaker
const beakerLength = form.elements.beaker;

let length = beakerLength.value;

beakerLength.addEventListener('input', inputLength);

function inputLength() {
    const btnCalc = document.querySelector('#calc');
    if (isNaN(beakerLength.value)) {
        invalidData('#invalidCase');
        btnCalc.setAttribute('disabled', 'true');
    }
    else {
        document.querySelector('#invalidCase').innerHTML = '';
        length = beakerLength.value;
        btnCalc.removeAttribute('disabled');
    }
}
//data for amount of frets 
const frets = form.elements.fret;

let amountFrets = frets.value;

frets.addEventListener('input', inputFret);

function inputFret() {
    const btnCalc = document.querySelector('#calc');
    if (isNaN(frets.value)) {
        invalidData('#invalCase');
        btnCalc.setAttribute('disabled', 'true');
    }
    else {
        document.querySelector('#invalCase').innerHTML = '';
        amountFrets = frets.value;
        btnCalc.removeAttribute('disabled');
    }
}
// button calculate
const calc = document.querySelector('#calc');
calc.addEventListener('click', calculate);

function calculate() {
    calc.disabled = true;
    if (!length || !amountFrets || isNaN(length) && isNaN(amountFrets)) return;
    if (length * 1 === 0 || amountFrets * 1 === 0) {
        if (length * 1 === 0) {

            invalidData('#invalidCase');
        }
        if (amountFrets * 1 === 0) {

            invalidData('#invalCase');
        }
        return
    }
    calcGuitarFrets(length, amountFrets, coeficient, unit);
    let infoBlock = document.querySelector('.calculation');
    let content = document.querySelector('.wrap');

    setTimeout(() => {
        content.style.display = 'none';
        calc.disabled = false;
    }, 500);

    infoBlock.classList.add('animate');
}

//select rows of table
let tableBodyEvent = document.body;
tableBodyEvent.addEventListener('ready-table', selectLines);

function selectLines(event) {
    let tabLines = Array.from(event.detail.children);
    table.addEventListener('click', (e) => {
        let target = e.target;
        let parent = e.target.parentNode;
        let grandParent = e.target.parentNode.parentNode;
        for (let i = 0; i < tabLines.length; i++) {
            if (tabLines[i].classList.contains('selected')) {
                tabLines[i].classList.remove('selected');
            }
        }
        if (target.tagName == 'TR') {
            target.classList.add('selected');
            target.firstChild.style.color = '1f1f#1f';
        }
        if (target.tagName == 'TD') {
            parent.classList.add('selected');
            parent.firstChild.style.color = '#1f1f1f';
        }
        if (target.tagName == 'SPAN') {
            grandParent.classList.add('selected');
            grandParent.firstChild.style.color = '#1f1f1f';
        }
    });
}
//hide calculations
document.querySelector('.fa-long-arrow-left').addEventListener('click', back);

function back() {
    let content = document.querySelector('.wrap');
    setTimeout(() => { content.style.display = 'block' });
    let animate = document.querySelector('.calculation');
    animate.classList.remove('animate');
    setTimeout(() => {
        document.querySelector('#table').remove();
    }, 1000);
}

//download PDF file with calculates
let download = document.querySelector('.share');
download.addEventListener('click', confirmDownloadPDF);

function confirmDownloadPDF() {
    const confirmWindow = document.querySelector('.mod_block');
    confirmWindow.style.display = 'flex';
}

const modal = document.querySelector('.mod_block');

modal.addEventListener('click', handlerModalWindow)
function handlerModalWindow(e) {
    const modalBlock = document.querySelector('.mod_block');
    const modal = document.querySelector('.modal');
    const target = e.target;

    if (target.tagName === 'BUTTON' && target.classList.contains('cancel')) {
        modalBlock.style.display = 'none';
    }
    else if (target.tagName === 'DIV' && target.classList.contains('mod_block')) {
        modalBlock.style.display = 'none';
    }
    else if (target.tagName === 'BUTTON' && target.classList.contains('ok')) {
        generatePDF();
        modal.classList.add('close_modal');
        setTimeout(() => {
            modalBlock.style.display = 'none';
            modal.classList.remove('close_modal')
        }, 1000);
    }
}


//choose unit measure - mm , inch, none
let measureUnit = document.forms.unit;
measureUnit.addEventListener('change', chooseUnit);