const URL_USERS = "https://jsonplaceholder.typicode.com/users";
const URL_TODOS = "https://jsonplaceholder.typicode.com/todos?userId=";

const daftarAnggota = document.getElementById("daftar-anggota");
const loadingAnggota = document.getElementById("loading-anggota");
const errorAnggota = document.getElementById("error-anggota");

const judulTugas = document.getElementById("judul-tugas");
const petunjukTugas = document.getElementById("petunjuk-tugas");
const loadingTugas = document.getElementById("loading-tugas");
const errorTugas = document.getElementById("error-tugas");
const kontenTugas = document.getElementById("konten-tugas");
const ringkasan = document.getElementById("ringkasan");
const progresWrap = document.getElementById("progres-wrap");
const barProgres = document.getElementById("bar-progres");
const kotakCari = document.getElementById("cari");
const pesanKosong = document.getElementById("pesan-kosong");
const daftarTugas = document.getElementById("daftar-tugas");

const formTugas = document.getElementById("form-tugas");
const inputJudul = document.getElementById("input-judul");
const tombolSimpan = document.getElementById("tombol-simpan");
const errorForm = document.getElementById("error-form");
const notifikasi = document.getElementById("notifikasi");

let daftarTugasData = [];
let itemAnggota = [];
let anggotaAktifId = null;
let permintaanTerakhir = 0;
let timerNotifikasi = null;

const TOMBOL_BIASA = ["text-gray-700", "hover:bg-gray-50"];
const TOMBOL_AKTIF = ["bg-blue-50", "text-blue-700"];
const BADGE_BIASA = ["bg-gray-100", "text-gray-500"];
const BADGE_AKTIF = ["bg-blue-600", "text-white"];

const IKON_BIASA = ["border-gray-300"];
const IKON_SELESAI = ["bg-green-600", "border-green-600"];
const JUDUL_SELESAI = ["line-through", "text-gray-400"];

function tampilkanElemen(el) {
    el.classList.remove("hidden");
}

function sembunyikanElemen(el) {
    el.classList.add("hidden");
}

async function ambilDaftarAnggota() {
    loadingAnggota.textContent = "Memuat anggota...";
    tampilkanElemen(loadingAnggota);
    sembunyikanElemen(errorAnggota);

    try {
        const response = await fetch(URL_USERS);

        if (!response.ok) {
            throw new Error(
                "Server mengembalikan status " + response.status
            );
        }

        const users = await response.json();

        daftarAnggota.innerHTML = "";
        itemAnggota = [];

        users.forEach(function (user) {
            const tombol = document.createElement("button");
            tombol.type = "button";

            tombol.classList.add(
                "w-full", "flex", "items-center", "gap-3",
                "px-3", "py-2.5", "rounded-lg", "text-left",
                "text-lg", ...TOMBOL_BIASA
            );

            const badge = document.createElement("span");
            badge.textContent = String(user.id).padStart(2, "0");

            badge.classList.add(
                "w-8", "h-8", "shrink-0", "flex",
                "items-center", "justify-center", "rounded-md",
                "text-sm", "font-mono", "font-semibold",
                ...BADGE_BIASA
            );

            const nama = document.createElement("span");
            nama.textContent = user.name;

            tombol.appendChild(badge);
            tombol.appendChild(nama);

            const item = {
                tombol: tombol, badge: badge
            };

            tombol.addEventListener("click", function () {
                ambilDaftarTugas(user, item);
            });

            daftarAnggota.appendChild(tombol);
            itemAnggota.push(item);
        });
    } catch (error) {
        errorAnggota.textContent =
            "Gagal memuat anggota: " + error.message;

        tampilkanElemen(errorAnggota);
    } finally {
        sembunyikanElemen(loadingAnggota);
    }
}

function pilihAnggota(itemTerpilih) {
    itemAnggota.forEach(function (item) {
        if (item === itemTerpilih) {
            item.tombol.classList.remove(...TOMBOL_BIASA);
            item.tombol.classList.add(...TOMBOL_AKTIF);

            item.badge.classList.remove(...BADGE_BIASA);
            item.badge.classList.add(...BADGE_AKTIF);
        } else {
            item.tombol.classList.remove(...TOMBOL_AKTIF);
            item.tombol.classList.add(...TOMBOL_BIASA);

            item.badge.classList.remove(...BADGE_AKTIF);
            item.badge.classList.add(...BADGE_BIASA);
        }
    });
}

async function ambilDaftarTugas(user, item) {
    const idPermintaan = ++permintaanTerakhir;
    anggotaAktifId = user.id;

    pilihAnggota(item);
    judulTugas.textContent = "Tugas " + user.name;

    sembunyikanElemen(petunjukTugas);
    sembunyikanElemen(errorTugas);
    sembunyikanElemen(kontenTugas);
    sembunyikanElemen(progresWrap);

    ringkasan.textContent = "";
    daftarTugas.innerHTML = "";
    daftarTugasData = [];
    kotakCari.value = "";
    errorForm.textContent = "";

    loadingTugas.textContent = "Memuat tugas...";
    tampilkanElemen(loadingTugas);

    try {
        const response = await fetch(URL_TODOS + user.id);

        if (!response.ok) {
            throw new Error(
                "Server mengembalikan status " + response.status
            );
        }

        const todos = await response.json();

        if (idPermintaan !== permintaanTerakhir) return;

        todos.forEach(function (todo) {
            tambahTugas({
                title: todo.title,
                completed: todo.completed
            });
        });

        tampilkanElemen(kontenTugas);
        tampilkanElemen(progresWrap);

        hitungProgresTugas();
        cariTugas();
    } catch (error) {
        if (idPermintaan !== permintaanTerakhir) return;

        errorTugas.textContent =
            "Gagal memuat tugas: " + error.message;

        tampilkanElemen(errorTugas);
    } finally {
        if (idPermintaan === permintaanTerakhir) {
            sembunyikanElemen(loadingTugas);
        }
    }
}

function tampilkanTugasSelesai(tugas) {
    tugas.judulEl.classList.add(...JUDUL_SELESAI);

    tugas.ikonEl.classList.remove(...IKON_BIASA);
    tugas.ikonEl.classList.add(...IKON_SELESAI);

    tugas.ikonEl.textContent = "✓";
}

function tambahTugas(tugas) {
    const li = document.createElement("li");

    li.classList.add(
        "flex", "items-center", "gap-4",
        "px-[24px]", "py-[16px]"
    );

    const ikonEl = document.createElement("span");

    ikonEl.classList.add(
        "w-6", "h-6", "shrink-0", "rounded-full",
        "border-2", "flex", "items-center",
        "justify-center", "text-white", "text-xs",
        "font-bold", ...IKON_BIASA
    );

    const judulEl = document.createElement("span");
    judulEl.textContent = tugas.title;

    judulEl.classList.add(
        "flex-1", "text-lg", "text-gray-900"
    );

    const aksi = document.createElement("div");
    aksi.classList.add("flex", "gap-2", "shrink-0");

    tugas.li = li;
    tugas.ikonEl = ikonEl;
    tugas.judulEl = judulEl;

    if (tugas.completed) {
        tampilkanTugasSelesai(tugas);
    }

    const kelasTombolAksi = [
        "text-sm", "px-3", "py-2", "rounded-md",
        "border", "border-gray-200", "text-gray-500",
        "hover:bg-gray-50"
    ];

    if (!tugas.completed) {
        const tombolSelesai = document.createElement("button");

        tombolSelesai.type = "button";
        tombolSelesai.textContent = "Tandai selesai";

        tombolSelesai.classList.add(...kelasTombolAksi);

        tombolSelesai.addEventListener("click", function () {
            tugas.completed = true;

            tampilkanTugasSelesai(tugas);
            tombolSelesai.remove();

            hitungProgresTugas();
        });

        aksi.appendChild(tombolSelesai);
    }

    const tombolHapus = document.createElement("button");

    tombolHapus.type = "button";
    tombolHapus.textContent = "Hapus";

    tombolHapus.classList.add(
        ...kelasTombolAksi,
        "hover:text-red-600"
    );

    tombolHapus.addEventListener("click", function () {
        daftarTugasData = daftarTugasData.filter(function (t) {
            return t !== tugas;
        });

        li.remove();

        hitungProgresTugas();
        cariTugas();
    });

    aksi.appendChild(tombolHapus);

    li.appendChild(ikonEl);
    li.appendChild(judulEl);
    li.appendChild(aksi);

    daftarTugas.appendChild(li);
    daftarTugasData.push(tugas);
}

function hitungProgresTugas() {
    const total = daftarTugasData.length;

    const selesai = daftarTugasData.filter(function (t) {
        return t.completed;
    }).length;

    ringkasan.textContent =
        selesai + " dari " + total + " tugas selesai";

    const persen = total === 0 ? 0
        : Math.round((selesai / total) * 100);

    barProgres.style.width = persen + "%";
}

function cariTugas() {
    const kataKunci = kotakCari.value.trim().toLowerCase();

    let jumlahTampil = 0;

    daftarTugasData.forEach(function (tugas) {
        const cocok = tugas.title
            .toLowerCase()
            .includes(kataKunci);

        if (cocok) {
            tugas.li.classList.remove("hidden");
            jumlahTampil++;
        } else {
            tugas.li.classList.add("hidden");
        }
    });

    if (daftarTugasData.length === 0) {
        pesanKosong.textContent = "Belum ada tugas.";
        tampilkanElemen(pesanKosong);
    } else if (jumlahTampil === 0) {
        pesanKosong.textContent =
            "Tidak ada tugas yang cocok.";

        tampilkanElemen(pesanKosong);
    } else {
        sembunyikanElemen(pesanKosong);
    }
}

kotakCari.addEventListener("input", cariTugas);

function simpanTugas(judul) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const sudahAda = daftarTugasData.some(function (t) {
                return t.title.toLowerCase() === judul.toLowerCase();
            });

            if (sudahAda) {
                reject(
                    new Error(
                        'Tugas "' + judul + '" sudah ada di daftar.'
                    )
                );
            } else {
                resolve({
                    title: judul, completed: false
                });
            }
        }, 1000);
    });
}

function beriNotifikasi(pesan) {
    notifikasi.textContent = pesan;
    tampilkanElemen(notifikasi);

    clearTimeout(timerNotifikasi);

    timerNotifikasi = setTimeout(function () {
        sembunyikanElemen(notifikasi);
    }, 3000);
}

formTugas.addEventListener("submit", async function (event) {
    event.preventDefault();

    const judul = inputJudul.value.trim();
    errorForm.textContent = "";

    if (judul.length < 5) {
        errorForm.textContent =
            "Judul tugas tidak boleh kosong dan minimal 5 karakter.";

        return;
    }

    const idAnggotaSaatKlik = anggotaAktifId;

    tombolSimpan.disabled = true;
    tombolSimpan.textContent = "Menyimpan...";

    try {
        const tugasBaru = await simpanTugas(judul);

        if (idAnggotaSaatKlik !== anggotaAktifId) return;

        tambahTugas(tugasBaru);

        hitungProgresTugas();
        cariTugas();

        inputJudul.value = "";

        beriNotifikasi("Tugas berhasil ditambahkan.");
    } catch (error) {
        errorForm.textContent = error.message;
    } finally {
        tombolSimpan.textContent = "Simpan";
        tombolSimpan.disabled = false;
    }
});

inputJudul.addEventListener("input", function () {
    errorForm.textContent = "";
});

ambilDaftarAnggota();
