var R0  = '0000000000000000';
var R1  = '0000000000000000';
var R2  = '0000000000000000';
var R3  = '0000000000000000';
var X0  = '0000011111100000';
var PC  = '0000000000000000';
var IR  = '0000000000000000';
var MAR = '0000000000000000';
var MBR = '0000000000000000';

//IR Fetch
function fetch() {
    addressBus = PC;
    readData();
    IR = dataBus;
}

//STEP
function cycle(i) {
    if (i > 31) return;
    fetch();
    decode();
    uPC();
    updateRegisters();
    updateMemory();
    setTimeout(cycle, 1000, ++i);
}

function decode() {
    var opcode = IR.substring(0, 6);
    var I = IR.substring(6, 7);
    var IX = IR.substring(7, 8);
    var R = IR.substring(8, 10);
    var Address = IR.substring(10, 16);
    if (opcode === '000001') {
        LDR(IX, I, R, Address);
    } else if (opcode === '000010') {
        STR(IX, I, R, Address);
    } else if (opcode === "101001") {
        LDX(R);
    } else if (opcode === "101010") {
        STX(IX, I, R, Address);
    }
}

//Execute
function getEA() {
    if (IX === '0') {
        MAR = signExtend(Address);
        addressBus = MAR;
    } else if (IX === '1') {
        MAR  = add(signExtend(Address), X0);
        addressBus =  MAR;
    }

    if (I === '1') {
        readData();
        MAR = dataBus;
        addressBus = MAR;
    }
}

function LDX(IX, I, R, Address) {
	getEA();
    readData();
    X0 = dataBus;
}

function STX(IX, I , R, Address) {
	getEA();
    dataBus = X0;
    writeData();
}

function LDR(IX, I, R, Address) {
    getEA();
    readData();
    loadGPR(R);
}

function STR(IX, I, R, Address) {
    getEA();
    storeGPR(R);
    writeData();
}

function signExtend(bstr) {
    return ('0'.repeat(16 - bstr.length) + bstr.toString(2));
}

//Register access

function storeGRP(R) {
    if (R === '00') dataBus = R0;
    else if (R === '01') dataBus = R1;
    else if (R === '10') dataBus = R2;
    else if (R === '11') dataBus = R3;
}

function loadGPR(R) {
    if (R === '00') R0 = dataBus;
    else if (R === '01') R1 = dataBus;
    else if (R === '10') R2 = dataBus;
    else if (R === '11') R3 = dataBus;
}

//Update PC;
function uPC() {
    PC = add(PC, '0000000000000001');
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