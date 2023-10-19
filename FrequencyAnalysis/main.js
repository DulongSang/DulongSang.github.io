const ENGLISH_LETTER_FREQ = {
  'A': 8.2,
  'B': 1.5,
  'C': 2.8,
  'D': 4.3,
  'E': 12.7,
  'F': 2.2,
  'G': 2.0,
  'H': 6.1,
  'I': 7.0,
  'J': 0.15,
  'K': 0.77,
  'L': 4.0,
  'M': 2.4,
  'N': 6.7,
  'O': 7.5,
  'P': 1.9,
  'Q': 0.095,
  'R': 6.0,
  'S': 6.3,
  'T': 9.1,
  'U': 2.8,
  'V': 0.98,
  'W': 2.4,
  'X': 0.15,
  'Y': 2.0,
  'Z': 0.074,
};
const ALPHABET = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

/**
 * @param {string} parentId
 * @param {{[letter: string]: number}} freq
 */
function barChart(parentId, freq) {
  const MAX_BAR_HEIGHT = '20vh';
  const BAR_COLOR1 = '#fbbc05';
  const BAR_COLOR2 = '#4285f4';

  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.width = '100%';

  const maxFreq = Math.max(Math.max(...Object.values(freq)), ENGLISH_LETTER_FREQ['E']);
  const colWidth = `${100 / Object.keys(freq).length}%`;

  ALPHABET.forEach(letter => {
    const colDiv = document.createElement('div');
    colDiv.style.width = colWidth;
    const barContainer = document.createElement('div');
    barContainer.style.height = MAX_BAR_HEIGHT;
    barContainer.style.position = 'relative';
    barContainer.style.display = 'flex';

    const letterFreq = freq[letter];
    const bar1 = document.createElement('div');
    bar1.style.backgroundColor = BAR_COLOR1;
    bar1.style.width = '40%';
    bar1.style.height = `${letterFreq * 100 / maxFreq}%`;
    bar1.style.position = 'absolute';
    bar1.style.bottom = 0;
    bar1.style.left = '10%';
    bar1.setAttribute('title', `${letterFreq.toFixed(2)}%`);
    bar1.setAttribute('class', 'bar');
    barContainer.appendChild(bar1);

    const bar2 = document.createElement('div');
    bar2.style.backgroundColor = BAR_COLOR2;
    bar2.style.width = '40%';
    bar2.style.height = `${ENGLISH_LETTER_FREQ[letter] * 100 / maxFreq}%`;
    bar2.style.position = 'absolute';
    bar2.style.bottom = 0;
    bar2.style.right = '10%';
    bar2.setAttribute('title', `${ENGLISH_LETTER_FREQ[letter]}%`);
    bar2.setAttribute('class', 'bar');
    barContainer.appendChild(bar2);

    const label = document.createElement('div');
    label.innerText = letter;
    label.style.textAlign = 'center';
    colDiv.append(barContainer);
    colDiv.appendChild(label);
    container.appendChild(colDiv);
  });

  document.getElementById(parentId).innerHTML = container.outerHTML;
}

/**
 * @param {{ [letter: string]: number }} freq
 * @param {number} shiftAmount
 * @returns {{ [letter: string]: number }}
 */
function performShift(freq, shiftAmount) {
  const shiftedFreq = {}
  for (const letter of ALPHABET) {
    let index = ALPHABET.indexOf(letter) - shiftAmount;
    if (index < 0) {
      index += ALPHABET.length;
    }
    shiftedFreq[letter] = freq[ALPHABET[index]];
  }
  return shiftedFreq;
}

/**
 * @param {string} message
 * @returns {{ [letter: string]: number }}
 */
function getLetterFrequencies(message) {
  const letterFreq = {};
  for (const letter of ALPHABET) {
    letterFreq[letter] = 0;
  }
  const letters = Array.from(message.toUpperCase()).filter(ch => ch in letterFreq);
  letters.forEach(ch => {
    letterFreq[ch]++;
  });
  if (letters.length != 0) {
    for (const letter in letterFreq) {
      letterFreq[letter] = letterFreq[letter] * 100 / letters.length;
    }
  }

  return letterFreq;
}

/**
 * @param {{ [letter: string]: number }} freq
 */
function updateFreqTable(freq) {
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const dataRow = document.createElement('tr');
  ALPHABET.forEach(letter => {
    const header = document.createElement('th');
    header.innerText = letter;
    headerRow.appendChild(header);
    const data = document.createElement('td');
    data.innerText = `${freq[letter].toFixed(2)}%`;
    dataRow.appendChild(data);
  });
  table.appendChild(headerRow);
  table.appendChild(dataRow);
  document.getElementById('frequency-table-container').innerHTML = table.outerHTML;
}

let letterFreq = getLetterFrequencies('');
barChart('result-container', letterFreq);

document.getElementById('analyze-button').onclick = () => {
  const message = document.getElementById('message-input').value;
  shiftAmount = 0;
  letterFreq = getLetterFrequencies(message);
  document.getElementById('shift-amount-container').innerText = `Shift amount: ${shiftAmount} (${ALPHABET[shiftAmount]})`;
  barChart('result-container', letterFreq);
  updateFreqTable(letterFreq);
};

let shiftAmount = 0;
document.getElementById('shift-left-btn').onclick = () => {
  shiftAmount = shiftAmount == 0 ? ALPHABET.length - 1 : shiftAmount - 1;
  document.getElementById('shift-amount-container').innerText = `Shift amount: ${shiftAmount} (${ALPHABET[shiftAmount]})`;
  const shiftedFreq = performShift(letterFreq, shiftAmount);
  barChart('result-container', shiftedFreq);
  updateFreqTable(shiftedFreq);
};
document.getElementById('shift-right-btn').onclick = () => {
  shiftAmount = shiftAmount == ALPHABET.length - 1 ? 0 : shiftAmount + 1;
  document.getElementById('shift-amount-container').innerText = `Shift amount: ${shiftAmount} (${ALPHABET[shiftAmount]})`;
  const shiftedFreq = performShift(letterFreq, shiftAmount);
  barChart('result-container', shiftedFreq);
  updateFreqTable(shiftedFreq);
};

