const trit = { // trit Objects definition
	pos: {
		value: 1,
		sign: "+",
		string: "1",
		glyph: "\\",
	},
	nul: {
		value: 0,
		sign: "ø",
		string: "0",
		glyph: "—",
	},
	neg: {
		value: -1,
		sign: "-",
		string: "T",
		glyph: "/",
	},
};


class TritArray extends Array {
// An Array of trit Objects corresponding to the PARAM.
// Accesses all the methods provided by the Array class.
//
// PARAM
//	 <-	an Array of legal balanced ternary values (Integers : -1, 0, 1).

	constructor(trinValuesArray) {
		super();

		trinValuesArray.forEach(value => {
			this.push(toTrit(value));
		});
	}

	/*—————————————————————
			TritArray METHODS
	  —————————————————————*/

	value() {
	// -> an array of numeric values (Integers : -1, 0, 1)
		let valueArray = [];
		this.forEach(trit => {
			valueArray.push(trit.value);
		});
		return valueArray;
	}

	string() {
	// ->	an array of strings representing the trits ("T", "0", "1")
		let string = "";
		this.forEach(trit => {
			string+= trit.string;
		});
		return string;
	}
}

function toTrit(n) {
// PARAM
//	<- 	a legal balanced ternary value (Integers : -1, 0, 1)
// RETURNS
//	->	the corresponding trit Object

	switch (n) {
		case 1:
			return trit.pos;
			break;
		case -1:
			return trit.neg;
			break;
		default:
			return trit.nul;
	}
}


function toUnbalanced(decInput) {
// Converts a decimal integer to unbalanced trinary.
// Needed as first step of decimal to balanced trinary conversion.
//
// PARAM
// 	<-	a decimal value
// RETURNS
//	->	an array of unbalanced trinary values (Integers : 0, 1, 2)

	let n = decInput;
	let unbalancedValuesArray = [];

	// digits are stored in reverse order
	while (n != 0) {
		// produce carry
		let r = n % 3;

		// add the carry at the start of the trit array to return
		unbalancedValuesArray.push(r);

		// next loop : use quotient
		n = (n - r) / 3;
	}
	return unbalancedValuesArray;
}

function toTrin(decInput) {
// Converts a decimal integer to trinary
//
// PARAMS
//	<-	a base10 Integer
// RETURNS
//	->	a TritArray

	// convert to UNBALANCED trinary first
	const unbalancedValuesArray = toUnbalanced(decInput);
	let tritArray = new TritArray([0]);

	// convert UNBALANCED to BALANCED trinary
	for (i = 0; i < unbalancedValuesArray.length; i++) {
		switch (unbalancedValuesArray[i]) {
			case 3:
				// when position value greater that 1 use lowest trit
				// and pass a carry to the next position
				tritArray[i] = trit.nul;

				// if there is a next position increment it (carry)
				if (unbalancedValuesArray[i + 1]) {
					unbalancedValuesArray[i + 1]++;
				} else {
					// create a new higher position
					unbalancedValuesArray[i + 1] = 1;
				}
				break;
			case -3:
				// when position value greater that 1 use lowest trit
				// and pass a carry to the next position
				tritArray[i] = trit.nul;

				// if there is a next position increment it (carry)
				if (unbalancedValuesArray[i + 1]) {
					unbalancedValuesArray[i + 1]++;
				} else {
					// create a new higher position
					unbalancedValuesArray[i + 1] = -1;
				}
				break;
			case 2:
				// when position value greater that 1 use lowest trit
				// and pass a carry to the next position
				tritArray[i] = trit.neg;

				// if there is a next position increment it (carry)
				if (unbalancedValuesArray[i + 1]) {
					unbalancedValuesArray[i + 1]++;
				} else {
					// create a new higher position
					unbalancedValuesArray[i + 1] = 1;
				}
				break;
			case -2:
				// when position value lower that -1 use lowest trit
				// and pass a carry to the next position
				tritArray[i] = trit.pos;

				// if there is a next position
				if (unbalancedValuesArray[i + 1]) {
					unbalancedValuesArray[i + 1]--;
				} else {
					// create a new higher position
					unbalancedValuesArray[i + 1] = -1;
				}
				break;
			default:
				tritArray[i] = toTrit(unbalancedValuesArray[i]);
		}
	}

	// reverse position order
	// until now arrays kept values from lowest exponent to highest exponent
	// (to manage carries)
	return tritArray.reverse();
}

function fromTrin(trinArray) {
// PARAMS
//	<-	a TrinArray
// RETURNS
//	->	a base10 Integer

	let decimal = 0;

	for (i = 0; i < trinArray.length; i++) {
		decimal += trinArray[i] * 3 ** i;
	}

	return decimal;
}


function tritsAs(tritArray, tritFlavour) {
// Produce a flavoured Array (int or Strings) from a TritArray,
// using TritArray methods
//
// PARAMS
//	<-	tritArray = a tritArray
//	<-	tritFlavour = a String corresponding to one of the TritArray "flavour"
//				methods
// RETURNS
//	->	an array from tritArray

  switch (tritFlavour) {
    case "value":
      return tritArray.value()
      break;
    case "string":
      return tritArray.string()
    break;
  }
}
