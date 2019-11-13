// discrete numbers
// WS 19/20
// Till Bovermann

/*

## Decimal and Binary Numbers

or

	There are 10 kinds of people.
	Those who understand binary.

### Decimal Numeral system

— system to represent natural numbers.

We are typically representing natural numbers in a decimal system, i.e. with the ten symbols:

0
1
2
3
4
5
6
7
8
9

counting:

000, 001, 002, ... 007, 008, 009,

>> (rightmost digit is reset to zero, and the digit to its left is incremented)

010, 011, 012, ... 017, 018, 019,

...

090, 091, 092, ... 097, 098, 099,

(rightmost two digits are reset to zeroes, and next digit is incremented)

100, 101, 102, ... 107, 108, 109

...


### Binary Number system

the binary system uses only two symbols

{0, 1}

or

{HIGH, LOW}

or

{TRUE, FALSE}  // really bad wording unless semantically loaded regarding logic operations (e.g. Law of Non-contradiction (LNC: not(p and: not(p)) )

*/

(
var all = [true,false]

all.collect{|p|
	not(p and: not(p))
}
)

/*


Counting in binary

0000 - 0
0001 - 1
0010 - 2
0011 - 3
0100 - 4
0101 - 5
0110
0111
1000
1001
1010
1011
1100
1101
1110
1111
...


2r0101
  8421






// (un)signed Integer representation in the machine


challenge:

1. memory elements ("bit") can only represent binary information
0. there's only a (very) limited amount of memory elements

8 bits (= 1 Byte)


012345678
---------
000000000


1 kiloByte == 1024 Byte == 1024*8 bit
1 MegaByte == 1024 kB == …
1 gB == 1024 MB == …



*/

12345.class

12345.asBinaryString(16);
2r0011000000111001;



// print all binary numbers that can be represented with 8 bit
// each bit has to states
// combinatorics results in 2^8 combinations

(2**8).asInt.do{|val|
	"%:\t%\n".postf(val, val.asBinaryString(8))
}


((2**8).asInt).asBinaryString(8)
0.asBinaryString(8)


/*
// negative 8-bit integer representation

1 bit >> sign
7 bit >> positive number


(2**7).asInt.do{|val|
	"%:\t%\n".postf(val, val.asBinaryString(7))
}

uint8


int8

int32
uint32


2**16


*/



/*


## Fixed-point

Approximative representation of real numbers.

1234567 * (10**(-6))


10**(-2)

Example:

pi approximated in a decimal scaling factor representation of 0.000001
*/

q = q ? ();

// representation
q.fpToFloat = {|q, val, fpNum = -6|
	val * (10**(fpNum))
};

q.fpToFloat(3141593);


q.fpDistance = {|q, fp, float, fpNum = -6|
	(q.fpToFloat(fp, fpNum) - float).round(0.000001)
}

q.fpDistance(3141593, pi)

/*
binary fixed-point similar as decimal fixed-point but with a scaling factor that is a power of 2. This allows to implement it with binary shift operations.


1234563.asBinaryString(32)
(1234563 >> 6).asBinaryString(32)
(1234563 >> 6).asBinaryString(32)





((2r1011010) >> 6).asBinaryString(32)

*/


q.fpbToFloat = {|q, val, fpNum = 6|
		val * (2**(fpNum.neg))
}

q.fpbToFloat(2r1011010)


/*
## Floating point

(sign) significant * base^exponent


Float representation

https://en.wikipedia.org/wiki/Floating-point_arithmetic#Internal_representation

*/

