export const NumberAbbreviation = ["", "K", "M", "B", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U", "D", "T",
"Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U",
"D", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N",
"Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp",
"O", "N", "Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U", "D", "T", "Q", "Qt",
"Sx", "Sp", "O", "N", "Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U", "D", "T",
"Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U",
"D", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N",
"Dc", "U", "D", "T", "Q", "Qt", "Sx", "Sp", "O", "N", "Dc"]

export const DisplayNumber = (number) => {
    if (number < 1000) {
        return number.toFixed(2)
    } else {
        let a = number;
        a = a.toFixed(2);
        a = a.toLocaleString("fullwide", { useGrouping: false });
        let b = a.length;
        let c = ((b - 1) / 3)
        c = Math.floor(c) - 1;
  
        let d = a.substring(0, (b - 4) % 3 + 1);
  
        let e = a.substring(d.length, d.length + 2);
  
        return d + "." + e + NumberAbbreviation[c]
    }
}
  
export default DisplayNumber;