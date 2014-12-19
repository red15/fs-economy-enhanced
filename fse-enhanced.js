// ==UserScript==
// @name        FS Economy Enhancement
// @namespace   nightwalkers
// @description Improvements for FS Economy usability
// @include     http://server.fseconomy.net/airport.jsp*
// @include     http://server.fseconomy.net:81/airport.jsp*
// @version     1
// @grant       none
// ==/UserScript==

// Poor man's jQuery
table = document.getElementsByTagName('table');
for (var i = 0; i < table.length; i++) {
  if (table[i].classList.contains('assigmentTable')) {
    table = table[i];
    break;
  }
}

// Adding column header
col_head = document.createElement('th');
col_head.textContent = 'Price per nm/qty';
table.rows[0].appendChild(col_head);

// Skipping first row (header)
for (var x = 1; x < table.rows.length; x++) {
  row = table.rows[x];

  qty = parseFloat(row.cells[6].textContent.split(' ')[0]) || 1;
  range = parseFloat(row.cells[4].textContent);
  price = parseFloat(row.cells[1].textContent.replace('$', '').replace(',',''));

  rounding = 2;
  calc = 0;
  while (calc === 0) {
    calc = Math.round( (price / qty / range) * Math.pow(10, rounding) ) / Math.pow(10, rounding);
    rounding++;
  }

  new_cell = document.createElement('td');
  new_cell.textContent = '$'+calc.toString();
  row.appendChild(new_cell);
}
