"use strict"
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

function calculate() {
    if (!length || !amountFrets || isNaN(length) && isNaN(amountFrets)) return;
    calcGuitarFrets(length, amountFrets, coeficient, unit);
    let infoBlock = document.querySelector('.calculation');
    let height = infoBlock.offsetHeight;
    let parentBlock = document.querySelector('.parent');
    parentBlock.style.height = height + 'px';
    infoBlock.classList.add('animate');
    customEvent();
}

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
            target.firstChild.style.color = '#1f1f1f';
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

function back() {
    let animate = document.querySelector('.calculation');
    animate.classList.remove('animate');
    document.querySelector('#table').remove();
    document.querySelector('.parent').style.height = '';
}

async function generatePDF() {
    styleTabPdf('none', 'center', '#fff', '0 0 0 0');
    const element = document.querySelector('.calculation');
    var opt = {
        margin: 5,
        filename: 'myfile.pdf',
    }
    await html2pdf().set(opt)
        .from(element).save();
    styleTabPdf('block', 'space-between', 'rgb(111, 109, 121)', '15px 0 15px 0');
}

function chooseUnit(event) {
    let target = event.target;
    if (target.id == 'none') unit = '';
    if (target.id == 'mm') unit = 'mm';
    if (target.id == 'in') unit = 'in';
}