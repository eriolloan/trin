const trit = {
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

function toTrit(n) {
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
	let n = decInput;
	let unbalancedArray = [];

	// digits are stored in reverse order
	while (n != 0) {
		// produce carry
		let r = n % 3;

		// add the carry at the start of the trit array to return
		unbalancedArray.push(r);

		// next loop : use quotient
		n = (n - r) / 3;
	}
	return unbalancedArray;
}

function toTrin(decInput) {
	// convert to UNBALANCED trinary first
	const unbalancedArray = toUnbalanced(decInput);
	console.log("unbalanced array for " + decInput + " : " + unbalancedArray);
	let tritArray = [0];

	// convert UNBALANCED to BALANCED trinary
	for (i = 0; i < unbalancedArray.length; i++) {
		switch (unbalancedArray[i]) {
			case 3:
				// when position value greater that 1 use lowest trit
				// and pass a carry to the next position
				tritArray[i] = 0;

				// if there is a next position increment it (carry)
				if (unbalancedArray[i + 1]) {
					unbalancedArray[i + 1]++;
				} else {
					// create a new higher position
					unbalancedArray[i + 1] = 1;
				}
				break;
			case -3:
				// when position value greater that 1 use lowest trit
				// and pass a carry to the next position
				tritArray[i] = 0;

				// if there is a next position increment it (carry)
				if (unbalancedArray[i + 1]) {
					unbalancedArray[i + 1]++;
				} else {
					// create a new higher position
					unbalancedArray[i + 1] = -1;
				}
				break;
			case 2:
				// when position value greater that 1 use lowest trit
				// and pass a carry to the next position
				tritArray[i] = -1;

				// if there is a next position increment it (carry)
				if (unbalancedArray[i + 1]) {
					unbalancedArray[i + 1]++;
				} else {
					// create a new higher position
					unbalancedArray[i + 1] = 1;
				}
				break;
			case -2:
				// when position value lower that -1 use lowest trit
				// and pass a carry to the next position
				tritArray[i] = 1;

				// if there is a next position
				if (unbalancedArray[i + 1]) {
					unbalancedArray[i + 1]--;
				} else {
					// create a new higher position
					unbalancedArray[i + 1] = -1;
				}
				break;
			default:
				tritArray[i] = unbalancedArray[i];
		}
	}
	return tritArray;
}
