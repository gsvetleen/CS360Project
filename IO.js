var memTable = document.getElementsByClassName('memt')[0];
var regFile = document.getElementsByClassName('regfile')[0];

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
        addressBus = ('0'.repeat(16 - (+i).toString(2).length) + (+i).toString(2));
        readData();
        cell2.innerHTML = dataBus; 
    }
    populateCache(4,4,2);
    console.log(TABLE);
})();

function updateCache() {
    
}

function updateMemory() {
    for(var i = 0; i < 2048; i++){
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