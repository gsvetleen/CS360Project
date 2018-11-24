var SIZE = 8;
var ASSOCIATIVITY = 4;
var SETS = 2;

function BLOCK() {
    this.tag = '';
    this.valid = '0';
    this.WORD = '0000000000000000';
    this.counter = 0;
}

var TABLE = {};

function makeBitStr(magnitude, length) {
    //if (length === 0) return '';
    return (+magnitude).toString(2).padStart(length, '0');
}

populateCache();

function populateCache() {
    TABLE.length = SETS;
    for (var i = 0; i < SETS; i++) {
        var setAddress = makeBitStr(i, Math.log2(SETS));
        TABLE[setAddress] = {
            value: {}
        };
        for (var j = 0; j < ASSOCIATIVITY; j++) {
            var blockAddress = makeBitStr(j, Math.log2(ASSOCIATIVITY));
            TABLE[setAddress].value[blockAddress] = {
                value: new BLOCK()
            };
        }
    }
}

function setByValid() {}

function setByLRU() {}

function getByTag(tag) {}

function getByAddress(index, offset) {}

function writeThough() {}