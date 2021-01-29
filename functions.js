"use strict"
//shows warning if data incorect
function invalidData(selector) {
    let warning = document.querySelector(selector);
    let message = '<i class="fa fa-exclamation-triangle fa-lg"></i>' + 'invalid data'
    warning.innerHTML = message;
}


// creates title of table and returns function that creates row table
function addTable(scale, num, measure) {
    const table = document.createElement('table');
    const th = document.createElement('tr');
    th.innerHTML = '<th> Fret #</th> <th>nut offset</th> <th>prev.fret</th>';
    table.append(th);
    table.setAttribute('id', 'table');
    table.classList.add('html2pdf__page-break');
    const titleInfo = document.querySelector('.calc-info');
    titleInfo.innerHTML = `<pre>
	Scale : ${scale} ${measure};
	#fret : ${num}
	</pre>`;
    document.querySelector('.calculation').append(table);

    return function (...data) {
        const tr = document.createElement('tr');
        for (let i = 0; i < 3; i++) {
            let td = document.createElement('td');
            td.innerHTML = data[i];
            tr.append(td);
        }
        table.append(tr);
    }
}
//calculator 
function calcGuitarFrets(beaker, amount, constanta, measureUnit) {
    const calc = addTable(beaker, amount, measureUnit);
    let fromZero = 0;
    let beetwenFret = 0;
    for (let i = 0; i < amount; i++) {
        let number = `<span id="number"> ${i + 1} </span>`;
        beetwenFret = beaker / constanta;
        beaker = beaker - beetwenFret;
        fromZero += beetwenFret;
        let dataFret = `<span class="data"> ${fromZero.toFixed(2)} ${unit}</span>`;
        let spaceBeetFret = `<span> ${beetwenFret.toFixed(2)} ${unit}</span>`;
        calc(number, dataFret, spaceBeetFret);
    }
}
//table ready
function customEvent() {
    setTimeout(function () {
        table.dispatchEvent(new CustomEvent('ready-table', {
            bubbles: true,
            detail: {
                children: table.children
            }
        }));
    });
}
// set styles for download PDF file
function styleTabPdf(display, position, color, pdn_data) {
    document.querySelector('.back').style.display = display;
    document.querySelector('.share').style.display = display;
    let header = document.querySelector('.calcs-title');
    header.style.cssText = `justify-content: ${position};
		background-color: ${color};
		padding: ${pdn_data}
		`;
}