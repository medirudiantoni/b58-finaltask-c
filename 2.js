const inputArray = ["u", "D", "m", "w", "b", "a", "y", "s", "i", "s", "w", "a", "e", "s", "e", "o", "m", " ", " "];
const targetWord = "Dumbways is awesome";
const targetWordArray = Array.from(targetWord);

function sortWordArr(arr1, arr2) {
  arr1.sort((a, b) => {
    const indexA = arr2.indexOf(a);
    const indexB = arr2.indexOf(b);

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;

    return a.localeCompare(b);
  });

  const result = [];

  arr2.forEach((item) => {
    const index = arr1.indexOf(item);
    if (index !== -1) {
      result.push(arr1.splice(index, 1)[0]);
    }
  });

  result.push(...arr1);

  return result.join("");
}

const hasil = sortWordArr(inputArray, targetWordArray);
console.log(hasil);