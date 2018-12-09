var memTable = document.getElementsByClassName('memt')[0];
var regFile = document.getElementsByClassName('regfile')[0];

//Populate Registers/RAM on Load
(function() {
    updateRegisters();
    for (var i = 0; i < 2048; i++) {
        var row = memTable.insertRow(-1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        cell0.innerHTML = i;
        cell1.innerHTML = ('0'.repeat(11 - (+i).toString(2).length) + (+i).toString(2));
        addressBus = ('0'.repeat(16 - (+i).toString(2).length) + (+i).toString(2));
        readData();
        cell2.innerHTML = dataBus;
    }
})();

function setCache() {
    var lines = document.getElementById('lines');
    var sets = document.getElementById('sets').innerHTML;
    var blocks = document.getElementById('blocks').innerHTML;
    var words = document.getElementById('words').innerHTML;
    if (populateCache(sets, blocks, words)) {
        for (var i = 0; i < sets * blocks; i++) {
            var line = lines.insertRow(-1);
            var tag = line.insertCell(0);
            var index = line.insertCell(1);
            var valid = line.insertCell(2);
            var data = line.insertCell(3);
            tag.innerHTML = '';
            index.innerHTML = '';
            valid.innerHTML = '0';
            data.innerHTML = '';
        }
    } else {
        setStatus('Invalid Cache Parameters');
    }
}

function updateCache() {
    var c = 1;
    for (var i = 0; i < SETS; i++) {
        var indexB = makeBitStr(i, SSL);
        for (var j = 0; j < BLOCKS; j++) {
            if (TABLE[indexB].value[j].value.valid == '1') {
                var line = document.getElementById('lines').rows[c];
                var tag = line.cells[0];
                var index = line.cells[1];
                var valid = line.cells[2];
                var data = line.cells[3];
                tag.innerHTML = TABLE[indexB].value[j].value.tag;
                index.innerHTML = indexB;
                valid.innerHTML = TABLE[indexB].value[j].value.valid;
                var dataE = '';
                for (var k = 0; k < WORDS; k++) {
                    dataE += '(' + k + ') ' + TABLE[indexB].value[j].value.WORD[makeBitStr(k, OSL)] + ' ';
                }
                data.innerHTML = dataE;
                c++;
            }
        }
    }
    document.getElementById('hits').innerHTML = HIT;
    document.getElementById('misses').innerHTML = MISS;
    document.getElementById('replaces').innerHTML = REPLACE;
}

function setStatus(msg) {
    document.getElementById('status').innerHTML = msg;
}

function updateMemory() {
    for (var i = 0; i < 2048; i++) {
        var row = memTable.rows[i];
        var cell0 = row.cells[0];
        var cell1 = row.cells[1];
        var cell2 = row.cells[2];
        cell0.innerHTML = i;
        cell1.innerHTML = ('0'.repeat(11 - (+i).toString(2).length) + (+i).toString(2));
        addressBus = ('0'.repeat(16 - (+i).toString(2).length) + (+i).toString(2));
        readData();
        cell2.innerHTML = dataBus;
    }
}

function updateRegisters() {
    //GRPS
    regFile.rows[1].cells[1].innerHTML = GPR['00'].value;
    regFile.rows[2].cells[1].innerHTML = GPR['01'].value;
    regFile.rows[3].cells[1].innerHTML = GPR['10'].value;
    regFile.rows[4].cells[1].innerHTML = GPR['11'].value;
    //INDEX
    regFile.rows[5].cells[1].innerHTML = X0;
    //PC
    regFile.rows[6].cells[1].innerHTML = PC;
    //Indirect Adressing
    regFile.rows[7].cells[1].innerHTML = IR;
    //MAR
    regFile.rows[8].cells[1].innerHTML = MAR;
    //MBR
    regFile.rows[9].cells[1].innerHTML = MBR;
}