var R0 = '0000000000000000';
var R1 = '0000000000000000';
var R2 = '0000000000000000';
var R3 = '0000000000000000';
var X0 = '0000000000111111';
var PC = '0000000000000000';
var IR = '0000000000000000';
var MAR = '0000000000000000';
var MBR = '0000000000000000';

//IR Fetch
function fetch() {
    readData(PC.substring(5));
    IR = dataBus;
}

//IR DECODE - REG FETCH
function signExtend(bstr) {
    return ('0'.repeat(16 - bstr.length) + bstr.toString(2));
}

function decode() {
    var opcode = IR.substring(0, 6);
    if (opcode === '000001') {
        LDR(IR.substring(6, 7), IR.substring(7, 8),
            IR.substring(8, 10), IR.substring(10, 16));
    }
}

//Execute
function LDR(IX, I, R, Address) {
    if (IX === '0') {
        addressBus = '0000000000' + Address;
    } else if (IX === '1') {
        addressBus = add('0000' + Address + '000000', X0);
    }

    if (I === '1') {
        if (IX === '0') {
            MAR = "0000000000" + Address;
            addressBus = MAR;
            MBR = readData();
        } else if (IX == '1') {
            MAR = add('0000' + Address + '000000', X0);
            addressBus = MAR;
            MBR = readData();
        }
    }
    
    readData();
    loadGPR(R);
}

//Memory access

function loadGPR(R) {
    if (R === '00') R0 = dataBus;
    else if (R === '01') R1 = dataBus;
    else if (R === '10') R2 = dataBus;
    else if (R === '11') R3 = dataBus;
}

//Update PC;
function uPC() {
    if (PC === '0000000000011111') {
        PC = '0000000000000000';
    } else {
        PC = add(PC, '0000000000000001');
        instruction = regFile.rows[6].cells[1];
    }
    instruction.innerHTML = PC;
}

function add(str1, str2) {
    var result = '';
    var carry = 0;

    for (var i = 15; i >= 0; i--) {
        var b1 = str1[i];
        var b2 = str2[i];
        var sum = (b1 ^ b2 ^ carry) + '';
        result = sum + result;
        carry = (b1 & b2) | (b2 & carry) | (b1 & carry) + '';
    }

    if (carry)
        result = '0000000000000000';

    return result;
}