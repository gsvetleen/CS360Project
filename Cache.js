var SIZE = 8;
var ASSOCIATIVITY = 1;
var SETS = 8;
var ASL = 3;
var SSL = 1;
    

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

function isPowOf2(str) {
    return ((str != 0) && !(str & (str - 1)));
}

function warmUp() {}

function populateCache(words, words_per_set) {
    if(!(isPowOf2(words) && isPowOf2(words_per_set) && words_per_set < words) && words & words_per_set) 
        return false;
    SIZE = words;
    ASSOCIATIVITY = words_per_set;
    SETS = words/words_per_set;
    ASL = Math.log2(words);
	SSL = Math.log2(words_per_set);
    setUpTable();
    return true;
}

function setUpTable() {
    TABLE.length = SETS;
    for (var i = 0; i < SETS; i++) {
        var setAddress = makeBitStr(i, SSL);
        TABLE[setAddress] = {
            value: {}
        };
        for (var j = 0; j < ASSOCIATIVITY; j++) {
            var blockAddress = makeBitStr(j, ASL);
            TABLE[setAddress].value[blockAddress] = {
                value: new BLOCK()
            };
        }
    }
}

function setByValid() {}

function setByLRU() {}

function getByTag(tag, index) {
    var set = TABLE[index].value;
    for (var i = 0; i < ASSOCIATIVITY; i++) {
        if (set[makeBitStr(i, ASL)].value.tag == tag)
            return set[makeBitStr(i, ASL)].value.WORD;
    }
    return false;
}

function getByAddress(tag, index, offset) {
    if(TABLE[index].value[offset].value.tag == tag) {
        return TABLE[index].value[offset].value.WORD;
    }
    return false;
}

function replaceBlock(index) {
    
}
       
function getData(address) {
    
}

function writeThough() {}