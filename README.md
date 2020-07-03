# trin

## Description
Simple decimal to balanced ternary converter using vanilla JS. A rudimentary HTML/Scss UI is provided. 

Balanced trinary is a positional number system where digits (called *trits*) are independently signed. Legal balanced trinary values are *-1 *, *0 * and *1*. 

---

The decimal input value is temporarily converted to unbalanced trinary, resulting in an array of digits with legal value  *0 *, *1 * or *2*. 

The unbalanced notation is then converted to balanced trinary.

**Only works with integers (positive or negative).**

## Use : Web tool
- input a decimal integer in the first field. 
- the second field shows the balanced trinary value. Trits values are comma-separated and listed from least significant value to most significant value (left to right).

## Use : JS

### toTrin()

- toTrin( *decimalInteger* )
- Returns an array of trit values :
```
everything = toTrin(42);

>> everything = [ 0, -1, -1, -1, 1 ]
```


### toTrit()

- toTrit( *tritValue* )
- Returns a trit object when passed *-1 *, *0 * or *1*.  :
```
myTrit = toTrit(-1);

>> myTrit = Object { 
		value: -1, 
		sign: "-", 
		string: "T", 
		glyph: "/" 
		}
```


### toUnbalanced()

- toUnbalanced( *decimalInteger* )

- Returns an array of unbalanced trinary values :
```
everything = toUnbalanced(42);

>> everything = [ 0, 2, 1, 1 ]
```

## TODO
### toTrin()
Return trit objects by default (with value and various notations).

### toTrit()
Accomodate for passed arrays.

### fromTrin(*trinValue*)
Convert from balanced trinary to decimal.