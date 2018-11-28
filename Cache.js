var SIZE = 8;
//Words per Set
var ASSOCIATIVITY = 1;
var SETS = 8;
//Set size bit length
var ASL = 0;
//Index bit length
var SSL = 3;
var TABLE = {};
var HIT = 0;
var MISS = 0;
var REPLACE = 0;

console.log(populateCache(8, 8));

function BLOCK() {
    this.valid = '0';
    this.tag = '';
    this.WORD = '';
    this.counter = 0;
}

function makeBitStr(magnitude, length) {
    if (length === 0) return '';
    return (+magnitude).toString(2).padStart(length, '0');
}

function isPowOf2(str) {
    return ((str != 0) && !(str & (str - 1)));
}

function populateCache(words, words_per_set) {
    if(!(isPowOf2(words) && isPowOf2(words_per_set) && words_per_set <= words) && words & words_per_set) 
        return false;
    SIZE = words;
    ASSOCIATIVITY = words_per_set;
    SETS = words/words_per_set;
    SSL = Math.log2(SETS);
	ASL = Math.log2(words_per_set);
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

function getByValid(set) {
    MISS++;
    for (var i = 0; i < ASSOCIATIVITY; i++) {
        if (set[makeBitStr(i, ASL)].value.valid == '0')
            return set[makeBitStr(i, ASL)].value;
    }
}

function getByLRU(set) {
    REPLACE++;
    var LRUBlock = set[makeBitStr(0, ASL)];
    for(var i = 1; i < ASSOCIATIVITY; i++) {
        if(set[makeBitStr(i-1, ASL)].value.counter > set[makeBitStr(i, ASL)].value.counter)
            LRUBlock = set[makeBitStr(i, ASL)].value;
    }
    return LRUBlock;
}

function setBlock(tag, index, block) {
    block.valid = '1';
    block.tag = tag;
    block.counter = 0;
    readData(tag+index);
    block.WORD = dataBus;
    return block;
}
       
function getBlock() {
    var tag = addressBus.substring(0, 16-SSL);
    var index = addressBus.substring(16-SSL, 17);
    var set = TABLE[index].value;
    var isFull = '1';
    for (var i = 0; i < ASSOCIATIVITY; i++) {
        isFull &= set[makeBitStr(i, ASL)].value.valid;
        if (set[makeBitStr(i, ASL)].value.tag == tag && set[makeBitStr(i, ASL)].value.valid) {
            HIT++;
            set[makeBitStr(i, ASL)].value.counter++;
            return set[makeBitStr(i, ASL)].value;
        }
    }
    if(!isFull)
        return setBlock(tag, index, getByValid(set));
    else
        return setBlock(tag, index, getByLRU(set));
}

function write(){
    writeData();
    getBlock().WORD = dataBus;
}

function read(){
    dataBus = getBlock().WORD;
}