var addressBus = '0000000000000000';
var dataBus =    '0000000000000000';

function readData(){
	dataBus = memory[addressBus.substring(5)].value;
}

function writeData(){
    memory[addressBus.substring(5)].value = dataBus;
}



