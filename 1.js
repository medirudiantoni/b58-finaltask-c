// Seorang investor menginvestasikan modalnya sebesar 1 miliar ke beberapa instrumen keuangan.
//      350 juta ditempatkan ke deposito bank dengan keuntungan 3,5% per tahun,
//      sedangkan 650 juta ditempatkan di:
//          obligasi negara sebesar 30% dengan keuntungan 13% per tahun,
//          35% ditempatkan di saham A dengan keuntungan 14,5% per tahun,
//          dan sisanya ditempatkan di saham B dengan keuntungan 12,5% per tahun.
//Buatlah sebuah fungsi yang menghitung dan mencetak total uang investor setelah dua tahun.

// 1. 3,5% x 350 / 100 = 12,25 x 2 = 24,5 jt
// 2. 30% 650 = 195;    13%  =   25,35 x 2 = 50,7 jt
// 3. 35% 650 = 227,5  14,5% =   32.987.500 x 2 = 65.975.000
// 3. 35% 650 = 227,5  12,5% =   28.437.500 x 2 = 56.875.000
//                                                  198.050.000

function toRupiah(nilai){
  const hasil = Array.from(nilai.toString());
  hasil.splice(hasil.length - 3, 0, ".");
  hasil.splice(hasil.length - 7, 0, ".");
  hasil.splice(hasil.length - 11, 0, ".");
  return hasil.join("");
};

function persenToNum(moneyQty, earningPercentage, year){
  let earningNumber = earningPercentage * moneyQty / 100;
  if(year){
    earningNumber = earningNumber * year;
  }
  return earningNumber;
}

function calculateTotalInvestorsMoney(){
  const moneyB = 650000000;
  const obligasi = { persen: 30, untung: 13 };
  const sahamA = { persen: 35, untung: 14.5 };
  const sahamB = { persen: 100 - (obligasi.persen + sahamA.persen), untung: 12.5 };

  const jumlahObligasi = persenToNum(moneyB, obligasi.persen);
  const jumlahSahamA = persenToNum(moneyB, sahamA.persen);
  const jumlahSahamB = persenToNum(moneyB, sahamB.persen);

  const untungDepositBank = persenToNum(350000000, 3.5, 2);
  const untungObligasi = persenToNum(jumlahObligasi, obligasi.untung, 2);
  const untungSahamA = persenToNum(jumlahSahamA, sahamA.untung, 2);
  const untungSahamB = persenToNum(jumlahSahamB, sahamB.untung, 2);

  const totalUntung2tahun = untungDepositBank + untungObligasi + untungSahamA + untungSahamB;

  const final = toRupiah(totalUntung2tahun + 1000000000);
  return `Total uang investor setelah 2 tahun: Rp ${final},-`
};

console.log(" ")
console.log("====================== Hasil Akhir ====================")
console.log(" ")
console.log(calculateTotalInvestorsMoney());
console.log(" ")
console.log("_______________________________________________________")
console.log(" ");

