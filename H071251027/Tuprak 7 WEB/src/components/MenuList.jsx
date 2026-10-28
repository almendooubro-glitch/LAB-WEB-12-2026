import MenuCard from "./MenuCard.jsx";

function MenuList({
  menu,
  daftarKategori,
  kategoriAktif,
  onPilihKategori,
  itemPesanan,
  onTambah,
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {daftarKategori.map((kategori) => (
          <button
            key={kategori}
            type="button"
            onClick={() => onPilihKategori(kategori)}
            className={
              "px-4 py-2 rounded-full text-sm font-medium border transition " +
              (kategori === kategoriAktif
                ? "bg-amber-700 text-white border-amber-700"
                : "bg-white text-stone-700 border-stone-300 hover:bg-amber-100")
            }
          >
            {kategori}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {menu.map((item) => {
          const dipesan = itemPesanan.find((p) => p.id === item.id);
          return (
            <MenuCard
              key={item.id}
              id={item.id}
              nama={item.nama}
              gambar={item.gambar}
              kategori={item.kategori}
              harga={item.harga}
              tersedia={item.tersedia}
              deskripsi={item.deskripsi}
              jumlahDipesan={dipesan ? dipesan.jumlah : 0}
              onTambah={onTambah}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MenuList;
