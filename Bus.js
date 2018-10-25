var addressBus = '0000000000000000';
var controlBus = '0000000000000000';
var dataBus =    '0000000000000000';
var pcPointer =  '0000000000000000';

function nextPC(){
    pcPointer = add(pcPointer, '0000000000000001');
}

function cycle(){
    fetch();
    decode();
    uPC();
    updateRegisters();
    //readData(PC);
    //if(dataBus != '0000000000000000') cycle();
}

function readData(){
	dataBus = memory[addressBus.substring(5)].value;
}

function writeData(){
    memory[addressBus.substring(5)].value = dataBus;
}



