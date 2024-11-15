function cetakPola(n) {
    for (let i = 0; i < n; i++) {
        let line = ' '.repeat(i); // Menambahkan spasi di awal setiap baris
        for (let j = 0; j < n - i; j++) {
            // Menambahkan # dan + secara bergantian
            if ((i + j) % 2 === 0) {
                line += '#';
            } else {
                line += '+';
            }
            if (j < n - i - 1) {
                line += ' '; // Menambahkan spasi di antara karakter
            }
        }
        console.log(line); // Menampilkan baris yang sudah dibentuk
    }
}

cetakPola(5);