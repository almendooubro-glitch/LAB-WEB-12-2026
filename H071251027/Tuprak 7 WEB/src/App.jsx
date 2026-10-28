import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import MenuList from "./components/MenuList.jsx";
import RingkasanPesanan from "./components/RingkasanPesanan.jsx";
import FormPesan from "./components/FormPesan.jsx";
import Footer from "./components/Footer.jsx";

const DATA_MENU = [
  { id: 1, gambar: "/images/kopi-susu.png", nama: "Kopi Susu", kategori: "Kopi", harga: 18000, tersedia: true, deskripsi: "Espresso dengan susu segar dan gula aren." },
  { id: 2, gambar: "/images/americano.png", nama: "Americano", kategori: "Kopi", harga: 15000, tersedia: true, deskripsi: "Espresso dengan air panas, rasa kuat dan bersih." },
  { id: 3, gambar: "/images/cappuccino.png", nama: "Cappuccino", kategori: "Kopi", harga: 22000, tersedia: true, deskripsi: "Espresso, susu panas, dan busa susu tebal." },
  { id: 4, gambar: "/images/matcha-latte.png", nama: "Matcha Latte", kategori: "Non-Kopi", harga: 24000, tersedia: true, deskripsi: "Teh hijau matcha dengan susu." },
  { id: 5, gambar: "/images/teh-tarik.png", nama: "Teh Tarik", kategori: "Non-Kopi", harga: 14000, tersedia: false, deskripsi: "Teh susu yang ditarik hingga berbusa." },
  { id: 6, gambar: "/images/cokelat-panas.png", nama: "Cokelat Panas", kategori: "Non-Kopi", harga: 20000, tersedia: true, deskripsi: "Cokelat pekat dengan susu hangat." },
  { id: 7, gambar: "/images/roti-bakar.png", nama: "Roti Bakar", kategori: "Makanan", harga: 16000, tersedia: true, deskripsi: "Roti tebal dengan selai cokelat dan keju." },
  { id: 8, gambar: "/images/pisang-goreng.png", nama: "Pisang Goreng", kategori: "Makanan", harga: 12000, tersedia: false, deskripsi: "Pisang goreng renyah dengan taburan keju." },
  { id: 9, gambar: "/images/nasi-goreng.png", nama: "Nasi Goreng", kategori: "Makanan", harga: 25000, tersedia: true, deskripsi: "Nasi goreng kampung dengan telur mata sapi." },
];

const DAFTAR_KATEGORI = ["Semua", "Kopi", "Non-Kopi", "Makanan"];

function App() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [pesanan, setPesanan] = useState([]);
  const [pesananTerkirim, setPesananTerkirim] = useState(null);

  const menuTampil =
    kategoriAktif === "Semua"
      ? DATA_MENU
      : DATA_MENU.filter((m) => m.kategori === kategoriAktif);

  const itemPesanan = pesanan.map((p) => {
    const menu = DATA_MENU.find((m) => m.id === p.id);
    return { ...menu, jumlah: p.jumlah };
  });

  const totalItem = itemPesanan.reduce((jml, item) => jml + item.jumlah, 0);
  const totalHarga = itemPesanan.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  );

  function handleTambah(id) {
    const menu = DATA_MENU.find((m) => m.id === id);
    if (!menu || !menu.tersedia) return; 

    setPesananTerkirim(null);
    setPesanan((lama) => {
      const ada = lama.some((p) => p.id === id);
      if (ada) {
        return lama.map((p) =>
          p.id === id ? { ...p, jumlah: p.jumlah + 1 } : p
        );
      }
      return [...lama, { id, jumlah: 1 }];
    });
  }

  function handleKurang(id) {
    setPesanan((lama) =>
      lama
        .map((p) => (p.id === id ? { ...p, jumlah: p.jumlah - 1 } : p))
        .filter((p) => p.jumlah > 0)
    );
  }

  function handleKirim(nama, meja) {
    setPesananTerkirim({ nama, meja });
    setPesanan([]);
  }

  return (
    <div className="min-h-screen bg-amber-50 text-stone-800 flex flex-col">
      <Navbar totalItem={totalItem} totalHarga={totalHarga} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        {pesananTerkirim !== null && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-green-300 bg-green-50 p-4 text-green-800"
          >
            <p className="font-semibold">
              Terima kasih, {pesananTerkirim.nama}!
            </p>
            <p className="text-sm">
              Pesanan Anda untuk meja {pesananTerkirim.meja} sudah kami terima
              dan sedang disiapkan.
            </p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 ">
            <MenuList
              menu={menuTampil}
              daftarKategori={DAFTAR_KATEGORI}
              kategoriAktif={kategoriAktif}
              onPilihKategori={setKategoriAktif}
              itemPesanan={itemPesanan}
              onTambah={handleTambah}
            />
          </section>

          <aside className="space-y-6">
            <RingkasanPesanan
              items={itemPesanan}
              totalItem={totalItem}
              totalHarga={totalHarga}
              onTambah={handleTambah}
              onKurang={handleKurang}
            />
            <FormPesan totalItem={totalItem} onKirim={handleKirim} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;