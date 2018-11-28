var GPR = [];
var X0 = '0000011111000000';
var PC = '0000000000000000';
var IR = '0000000000000000';
var MAR = '0000000000000000';
var MBR = '0000000000000000';
var ZF = '0';
var CF = '0';
var SF = '0';

GPR['00'] = {
    value: '0000000000000000'
};
GPR['01'] = {
    value: '0000000000000000'
};
GPR['10'] = {
    value: '0000000000000000'
};
GPR['11'] = {
    value: '0000000000000000'
};

//IR Fetch
function fetch() {
    addressBus = PC;
    readData();
    IR = dataBus;
}

//STEP
function cycle() {
    if (PC === '0000000000011111') return;
    fetch();
    decode();
    updateRegisters();
    updateMemory();
    setTimeout(cycle, 100);
}

function step() {
    if (PC === '0000000000011111') return;
    fetch();
    decode();
    updateRegisters();
    updateMemory();
}

function decode() {
    var opcode = IR.substring(0, 6);
    var I = IR[6];
    var IX = IR[7];
    var R = IR.substring(8, 10);
    var Address = IR.substring(10);
    if (opcode === '000001') {
        LDR(I, IX, R, Address);
        uPC();
    } else if (opcode === '000010') {
        STR(I, IX, R, Address);
        uPC();
    } else if (opcode === '010001') {
        CMP(I, IX, R, Address);
        uPC();
    } else if (opcode === '101001') {
        LDX(I, IX, Address);
        uPC();
    } else if (opcode === '101010') {
        STX(I, IX, Address);
        uPC();
    } else if (opcode == "001010") {
        JE(I, IX, Address);
    } else if (opcode == "001011") {
        JNE(I, IX, Address);
    } else if (opcode == "001100") {
        JG(I, IX, Address);
    } else if (opcode == "001110") {
        JGE(I, IX, Address);
    } else if (opcode == "001111") {
        JL(I, IX, Address);
    } else if (opcode == "010000") {
        JLE(I, IX, Address);
    } else if (opcode == "001101") {
        JUMP(I, IX, Address);
    } else if (opcode == '001000') {
        DEC(R);
        uPC();
    } else uPC();
}

function DEC(R) {
    for (var i = 15; i >= 0; i--) {
        if (GPR[R].value[i] === '1') {
            GPR[R].value = flipBit(GPR[R].value, i);
            break;
        } else GPR[R].value = flipBit(GPR[R].value, i);
    }
}

function LDX(I, IX, Address) {
    getEA(I, IX, Address);
    readData();
    X0 = dataBus;
}

function STX(I, IX, Address) {
    getEA(I, IX, Address);
    dataBus = X0;
    writeData();
}

function LDR(I, IX, R, Address) {
    getEA(I, IX, Address);
    readData();
    loadGPR(R);
}

function STR(I, IX, R, Address) {
    getEA(I, IX, Address);
    storeGPR(R);
    writeData();
}

function JE(I, IX, Address) {
    if (ZF === '1') {
        getEA(I, IX, Address);
        readData();
        PC = dataBus;
    } else uPC();
}

function JNE(I, IX, Address) {
    if (ZF === '0') {
        getEA(I, IX, Address);
        readData();
        PC = dataBus;
    } else uPC();
}

function JG(I, IX, Address) {
    if (ZF === '0' && SF === '0') {
        getEA(I, IX, Address);
        readData();
        PC = dataBus;
    } else uPC();
}

function JGE(I, IX, Address) {
    if (ZF === '1' || SF === '0') {
        getEA(I, IX, Address);
        readData();
        PC = dataBus;
    } else uPC();
}

function JL(I, IX, Address) {
    if (SF === '1') {
        getEA(I, IX, Address);
        readData();
        PC = dataBus;
    } else uPC();
}

function JLE(I, IX, Address) {
    if (ZF === '1' || SF === '1') {
        getEA(I, IX, Address);
        readData();
        PC = dataBus;
    } else uPC();
}

function JUMP(I, IX, Address) {
    getEA(I, IX, Address);
    readData();
    PC = dataBus;
}

//Effective Address
function getEA(I, IX, Address) {
    if (I === '1') {
        addressBus = signExtend(Address);
        readData();
        MAR = dataBus;
    } else MAR = signExtend(Address);

    if (IX === '1') {
        MAR = add(MAR, X0);
    }
    addressBus = MAR;
}

function CMP(I, IX, R, Address) {
    ZF = '0';
    CF = '0';
    SF = '0';
    getEA(I, IX, Address);
    readData();
    MBR = dataBus;
    for (var i = 0; i < 16; i++) {
        ZF = NOT(MBR[i] ^ GPR[R].value[i]) + '';
        if (ZF == 0) {
            CF = MBR[i] + '';
            break;
        }
    }
    SF = CF;
}

function LDX(I, IX, Address) {
    getEA(I, IX, Address);
    readData();
    X0 = dataBus;
}

function STX(I, IX, Address) {
    getEA(I, IX, Address);
    dataBus = X0;
    writeData();
}

function LDR(I, IX, R, Address) {
    getEA(I, IX, Address);
    readData();
    loadGPR(R);
}

function STR(I, IX, R, Address) {
    getEA(I, IX, Address);
    storeGPR(R);
    writeData();
}

function NOT(str) {
    return str ^= '1';
}

function signExtend(bstr) {
    return bstr.padStart(16, '0');
}

//Register access

function storeGPR(R) {
    dataBus = GPR[R].value;
}

function loadGPR(R) {
    GPR[R].value = dataBus;
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

function sub(str1, str2) {

}

function flipBit(string, index) {
    return string.substring(0, index) + NOT(string[index]) + string.substring(index + 1);
}