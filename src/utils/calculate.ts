export function binaryToDecimal(value: number) {
    if (String(value).length == 1) return Number(String(value).charAt(0))

    let { length } = String(value)
    let index = length - 1;
    let result = 0;

    while (index >= 0) {
        result += Number(String(value).charAt(length - (index + 1))) * (2 ** (index));

        index--;
    }

    return result;
}

export function binaryToHexadecimal(value: number) {
    const arr = [];

    let str = String(value);
    let { length } = str;

    while (length % 4 !== 0) {
        str = '0' + str;
        length = str.length;
    }

    let i = 4;

    while (length > 0) {
        arr.push(str.slice(i - 4, i));
        length = length - 4;
        i += 4
    }

    const dictionary: { [x: string]: string } = {
        "0000": "0",
        "0001": "1",
        "0010": "2",
        "0011": "3",
        "0100": "4",
        "0101": "5",
        "0110": "6",
        "0111": "7",
        "1000": "8",
        "1001": "9",
        "1010": "A",
        "1011": "B",
        "1100": "C",
        "1101": "D",
        "1110": "E",
        "1111": "F"
    }

    let result = arr.map(b => dictionary[b]).join('');

    return result
}

export function decimalToBinary(value: number) {
    if (value === 0) return 0

    let text = ""

    while (value > 0) {
        let mod = value % 2
        text = mod + text
        value = Math.floor(value / 2)
    }

    return +text
}

export function decimalToHexadecimal(value: number) {
    if (value === 0) return "0"

    let text = ""

    const hexChars = "0123456789ABCDEF"

    while (value > 0) {
        let mod = value % 16
        text = hexChars[mod] + text
        value = Math.floor(value / 16)
    }

    return text
}

export function hexadecimalToBinary(value: string) {
    const dictionary: { [x: string]: string } = {
        "0": "0000",
        "1": "0001",
        "2": "0010",
        "3": "0011",
        "4": "0100",
        "5": "0101",
        "6": "0110",
        "7": "0111",
        "8": "1000",
        "9": "1001",
        "A": "1010",
        "B": "1011",
        "C": "1100",
        "D": "1101",
        "E": "1110",
        "F": "1111"
    }

    let binary = ""

    for (let i = 0; i < value.length; i++) {
        let char = value[i].toUpperCase()

        if (dictionary[char] != undefined) binary += dictionary[char]
        else throw new Error("Invalid hexadecimal character: " + char)
    }

    return binary
}

export function hexadecimalToDecimal(value: string) {
    let decimal = 0

    for (let i = 0; i < value.length; i++) {
        let char = value[i].toUpperCase(), valor

        if (char >= '0' && char <= '9') valor = char.charCodeAt(0) - "0".charCodeAt(0)
        else if (char >= 'A' && char <= 'F') valor = char.charCodeAt(0) - "A".charCodeAt(0) + 10
        else throw new Error("Invalid hexadecimal character: " + char)

        decimal = decimal * 16 + valor
    }

    return decimal
}

export default {
    binaryToDecimal, binaryToHexadecimal,
    decimalToBinary, decimalToHexadecimal,
    hexadecimalToBinary, hexadecimalToDecimal
}