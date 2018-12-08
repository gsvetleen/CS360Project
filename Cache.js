var SIZE = 0;
var BLOCKS = 0;
var SETS = 0;
var WORDS = 0;
var BSL = 0;
var SSL = 0;
var OSL = 0;
var HIT = 0;
var MISS = 0;
var REPLACE = 0;
var TABLE = {};

function BLOCK() {
    this.valid = '0';
    this.tag = '';
    this.WORD = {};
    this.counter = 0;
}

function makeBitStr(magnitude, length) {
    if (length === 0) return '';
    return (+magnitude).toString(2).padStart(length, '0');
}

function isPowOf2(n) {
    return ((n != 0) && !(n & (n - 1)));
}

function populateCache(sets, blocks, words) {
    if (!(isPowOf2(sets) && isPowOf2(blocks) && isPowOf2(words) && sets > 0 && blocks > 0 && words))
        return false;
    SIZE = words * blocks * sets;
    SETS = sets;
    BLOCKS = blocks;
    WORDS = words;
    SSL = Math.log2(SETS);
    BSL = Math.log2(BLOCKS);
    OSL = Math.log2(WORDS);
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
        for (var j = 0; j < BLOCKS; j++) {
            TABLE[setAddress].value[j] = {
                value: new BLOCK()
            };
            for (var k = 0; k < WORDS; k++) {
                TABLE[setAddress].value[j]
                    .value.WORD[makeBitStr(k, OSL)] = '';
            }
        }
    }
}

function getByValid(set) {
    MISS++;
    for (var i = 0; i < BLOCKS; i++) {
        if (set[i].value.valid == '0')
            return set[i].value;
    }
}

function getByLRU(set) {
    MISS++;
    REPLACE++;
    var LRUBlock = set[0].value;
    for (var i = 1; i < BLOCKS; i++) {
        if (set[i - 1].value.counter > set[i].value.counter)
            LRUBlock = set[i].value;
    }
    return LRUBlock;
}

function setBlock(tag, index, block) {
    block.valid = '1';
    block.tag = tag;
    block.counter = 0;
    for (var i = 0; i < WORDS; i++) {
        var offset = makeBitStr(i, OSL);
        addressBus = tag + index + offset;
        readData();
        block.WORD[offset] = dataBus;
    }
    return block;
}

function getBlock() {
    var tag = addressBus.substring(0, 16 - SSL - OSL);
    var index = addressBus.substring(16 - SSL - OSL, 16 - OSL);
    var set = TABLE[index].value;
    var isFull = '1';
    for (var i = 0; i < BLOCKS; i++) {
        isFull &= set[i].value.valid;
        if (set[i].value.tag == tag &&
            set[i].value.valid) {
            HIT++;
            set[i].value.counter++;
            return set[i].value;
        }
    }
    if (!isFull)
        return setBlock(tag, index, getByValid(set));
    else
        return setBlock(tag, index, getByLRU(set));
}

function write() {
    writeData();
    var offset = addressBus.substring(16 - OSL, 16);
    getBlock().WORD[offset] = dataBus;
}

function read() {
    var offset = addressBus.substring(16 - OSL, 16);
    dataBus = getBlock().WORD[offset];
}