var R0  = '0000000000000000';
var R1  = '0000000000000000';
var R2  = '0000000000000000';
var R3  = '0000000000000000';
var X0  = '0000011111100000';
var PC  = '0000000000000000';
var IR  = '0000000000000000';
var MAR = '0000000000000000';
var MBR = '0000000000000000';
var ZF  = '';
var CF  = '';
var SF  = '';

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
    var I = IR[6];
    var IX = IR[7];
    var R = IR.substring(8, 10);
    var Address = IR.substring(10, 16);
    if (opcode === '000001') {
        LDR(IX, I, R, Address);
    } else if (opcode === '000010') {
        STR(IX, I, R, Address);
    } else if (opcode === '010001') {
        CMP(IX, I, R, Address);
    } else if (opcode === '101001') {
        LDX(IX, I, Address);
    } else if (opcode === '101010') {
        STX(IX, I, Address);
    }
}

//Effective Address
function getEA(IX, I, Address) {
    if (IX === '0') {
        console.log("HELLO");
        MAR = signExtend(Address);
        addressBus = MAR;
    } else if (IX === '1') {
        MAR = add(signExtend(Address), X0);
        addressBus =  MAR;
    }

    if (I === '1') {
        readData();
        MAR = dataBus;
        addressBus = MAR;
    }
}

function CMP(IX, I, R, Address) {
    ZF  = '1';
    CF  = '0';
    SF  = '0';
    getEA();
    readData();
    MBR = dataBus;
    R = regRef(R);
    for (var i = 15; i >= 0; i--) {
        if(ZF === '1')
        ZF = ~ (MBR[i] ^ R[i]);
        if(CF === '0')
        CF = (MBR[i] | R[i]) & ~R[i];
    }
    SF = CF;
    console.log(R);
    console.log(ZF, CF, SF);
}

function LDX(IX, I, Address) {
	getEA(IX, I, Address);
    readData();
    X0 = dataBus;
}

function STX(IX, I, Address) {
	getEA(IX, I, Address);
    dataBus = X0;
    writeData();
}

function LDR(IX, I, R, Address) {
    getEA(IX, I, Address);
    readData();
    loadGPR(R);
}

function STR(IX, I, R, Address) {
    getEA(IX, I, Address);
    storeGPR(R);
    writeData();
}

function signExtend(bstr) {
    return ('0'.repeat(16 - bstr.length) + bstr.toString(2));
}

//Register access
        
function regRef(R) {
    if (R === '00') R = R0;
    else if (R === '01') R = R1;
    else if (R === '10') R = R2;
    else if (R === '11') R = R3;
    return R;
}

function storeGPR(R) {
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

//Binary add
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