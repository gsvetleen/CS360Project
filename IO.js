var memTable = document.getElementsByClassName('memt')[0];
var regFile = document.getElementsByClassName('regfile')[0];
var input = document.getElementsByClassName('in')[0];

//Populate Registers/RAM on Load
(function(){
	updateRegisters();
    
    for(var i = 0; i < 2048; i++){
		var row = memTable.insertRow(-1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        cell0.innerHTML = i;
        cell1.innerHTML = ('0'.repeat(11 - (+i).toString(2).length) + (+i).toString(2));
        cell2.innerHTML = "0000000000000000";
    }
})();

function updateRegisters() {
    //GRPS
    regFile.rows[1].cells[1].innerHTML = R0;
    regFile.rows[2].cells[1].innerHTML = R1;
    regFile.rows[3].cells[1].innerHTML = R2;
    regFile.rows[4].cells[1].innerHTML = R3;   
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

function loadInstruction() {
    dataBus = input.value;
    addressBus = pcPointer;
    writeData();
    memTable.rows[parseInt(pcPointer, 2)].cells[2].innerHTML = dataBus;
    nextPC();
}