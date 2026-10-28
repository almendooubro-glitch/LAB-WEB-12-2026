# Kedai Kopi Senja

Halaman pemesanan mandiri untuk Kedai Kopi Senja (Tugas Praktikum 7: React Hooks - State & Props).

## Menjalankan

```bash
npm install
npm run dev
```

Buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Teknologi
React (Vite), JavaScript (JSX), Tailwind CSS v3.

## Pembagian State
| State | Lokasi | Keterangan |
|---|---|---|
| `kategoriAktif` | App.jsx | kategori yang sedang dipilih |
| `pesanan` | App.jsx | daftar `{ id, jumlah }`; total item & total harga dihitung dari sini |
| `pesananTerkirim` | App.jsx | data untuk ucapan terima kasih |
| `detailTerbuka` | MenuCard.jsx | tiap kartu punya state sendiri |
| `nama`, `meja`, `error` | FormPesan.jsx | isian form dan pesan kesalahan |

## Validasi
- Pesanan tidak boleh kosong.
- Nama minimal 2 karakter.
- Nomor meja berupa angka bulat 1 sampai 20.
