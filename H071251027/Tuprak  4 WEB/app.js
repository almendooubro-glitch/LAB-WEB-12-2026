const dataPraktikan = [
    { nama: "Aldo", nilaiTugas: [80, 85, 90] },
    { nama: "Ayu", nilaiTugas: [84, 96, 90] },
    { nama: "Eriz", nilaiTugas: [100, 100, 100] },
    { nama: "Kevin", nilaiTugas: [75, 75, 75] },
    { nama: "Julio", nilaiTugas: [45, 45, 45] }
];

const kehadiran = prompt("Masukkan nama Asisten Lab untuk memulai sistem:");

if (kehadiran === null || kehadiran.trim() === "" || !/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(kehadiran)) {

    document.write(`
        <div class="min-h-screen flex items-center justify-center bg-slate-100">
            <div class="bg-white p-8 rounded-xl shadow-lg text-center">

                <h1 class="text-2xl font-bold text-red-600">
                    Akses Ditolak
                </h1>

                <p class="text-slate-600 mt-2">
                    Nama Asisten Lab tidak valid.
                </p>

            </div>
        </div>
    `);

} else {

    function hitungRataRata(nilai) {
        let total = 0;

        for (let i = 0; i < nilai.length; i++) {
            total += nilai[i];
        }

        return total / nilai.length;
    }

    function tentukanStatus(rataRata) {
        if (rataRata >= 75) {
            return "LULUS";
        }

        return "TIDAK LULUS";
    }

    function tentukanPredikat(rataRata) {

        if (rataRata >= 90) {
            return "Sangat Baik";
        } else if (rataRata >= 80) {
            return "Baik";
        } else if (rataRata >= 75) {
            return "Cukup";
        } else if (rataRata >= 60) {
            return "Kurang";
        } else {
            return "Sangat Kurang";
        }
    }

    const hasilEvaluasi = [];

    for (let i = 0; i < dataPraktikan.length; i++) {

        const praktikan = dataPraktikan[i];

        const rataRata = hitungRataRata(praktikan.nilaiTugas);

        hasilEvaluasi.push({
            nama: praktikan.nama,
            nilaiTugas: praktikan.nilaiTugas,
            rataRata: rataRata,
            status: tentukanStatus(rataRata),
            predikat: tentukanPredikat(rataRata)
        });
    }

    let jumlahLulus = 0;
    let jumlahTidakLulus = 0;

    for (let i = 0; i < hasilEvaluasi.length; i++) {

        if (hasilEvaluasi[i].status === "LULUS") {
            jumlahLulus++;
        } else {
            jumlahTidakLulus++;
        }
    }

    console.log("=== HASIL EVALUASI PRAKTIKUM ===");
    console.log(hasilEvaluasi);

    document.write(`
        <div class="min-h-screen bg-slate-100">

            <header class="bg-slate-900 text-white">
                <div class="max-w-6xl mx-auto px-6 py-8">

                    <p class="text-blue-400 font-semibold">
                        Evaluasi Performa Praktikan
                    </p>

                    <h1 class="text-3xl font-bold mt-2">
                        SISTEM LAPORAN PRAKTIKUM
                    </h1>

                    <p class="mt-4 font-bold italic">
                      Selamat Datang Asisten <strong>${kehadiran}!</strong>
                    </p>
                    
                    <p class="text-slate-300 mt-2">
                        Berikut adalah laporan hasil Evaluasi Praktikum
                    </p>
                </div>
            </header>

            <main class="max-w-6xl mx-auto px-6 py-8">

                <div class="grid md:grid-cols-3 gap-5 mb-8">

                    <div class="bg-white p-6 rounded-xl shadow duration-300 hover:-translate-y-1 hover:shadow-xl text-center">
                        <p class="text-slate-500">
                            Total Praktikan
                        </p>

                        <h2 class="text-4xl font-bold mt-2">
                            ${hasilEvaluasi.length}
                        </h2>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow duration-300 hover:-translate-y-1 hover:shadow-xl text-center">
                        <p class="text-slate-500">
                            Jumlah Lulus
                        </p>

                        <h2 class="text-4xl font-bold text-green-600 mt-2">
                            ${jumlahLulus}
                        </h2>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow duration-300 hover:-translate-y-1 hover:shadow-xl text-center">
                        <p class="text-slate-500">
                            Tidak Lulus
                        </p>

                        <h2 class="text-4xl font-bold text-red-600 mt-2">
                            ${jumlahTidakLulus}
                        </h2>
                    </div>

                </div>

                <h2 class="text-2xl font-bold mb-5">
                    Hasil Evaluasi Praktikan
                </h2>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
    `);

    for (let i = 0; i < hasilEvaluasi.length; i++) {

        const praktikan = hasilEvaluasi[i];

        let warnaStatus = "";

        if (praktikan.status === "LULUS") {
            warnaStatus = "bg-green-100 text-green-700";
        } else {
            warnaStatus = "bg-red-100 text-red-700";
        }

        document.write(`
            <div class="bg-white p-6 rounded-xl shadow duration-300 hover:-translate-y-1 hover:shadow-xl">

                <h3 class="text-xl font-bold">
                    ${praktikan.nama}
                </h3>

                <p class="text-slate-500 mt-2">
                    Nilai Tugas:
                    ${praktikan.nilaiTugas.join(", ")}
                </p>

                <div class="bg-slate-100 p-4 rounded-lg mt-4">

                    <p class="text-sm text-slate-500">
                        Nilai Rata-rata
                    </p>

                    <p class="text-3xl font-bold">
                        ${praktikan.rataRata.toFixed(2)}
                    </p>

                </div>

                <p class="mt-4"> 
                    Predikat:
                    <strong>${praktikan.predikat}</strong>
                </p>

                <div class="${warnaStatus} text-center font-bold p-3 rounded-lg mt-4">
                    ${praktikan.status}
                </div>

            </div>
        `);
    }
    
    document.write(`
                </div>

                <div class="text-center mt-8 text-slate-500">
                    Batas kelulusan:
                    <strong>75</strong>
                </div>

            </main>

        </div>
    `);
}