import { useState } from "react";

function MenuCard({
  id,
  nama,
  gambar,
  kategori,
  harga,
  tersedia,
  deskripsi,
  jumlahDipesan,
  onTambah,
}) {

  const [detailTerbuka, setDetailTerbuka] = useState(false);
  const [gambarGagal, setGambarGagal] = useState(false);

  return (
    <article
      className={
        "rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-2 " +
         "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg " +
        (tersedia ? "border-stone-200 hover:border-amber-300"
      : "border-stone-200 opacity-60")
      }
    >
      {gambarGagal ? (
        <div className="w-full h-36 rounded-lg bg-amber-100 flex items-center justify-center text-5xl">
          {ikonKategori}
        </div>
      ) : (
        <img
          src={gambar}
          alt={nama}
          onError={() => setGambarGagal(true)}
          className={
            "w-full h-80 object-cover rounded-lg transition-transform duration-300 " +
            "hover:scale-[1.02] " +
            (tersedia ? "" : "grayscale")
          }
        />
      )}

      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="font-semibold text-lg">{nama}</h2>
          <span className="text-xs text-stone-500">{kategori}</span>
        </div>
        {!tersedia && (
          <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-1 rounded">
            Habis
          </span>
        )}
      </div>

      <p className="font-medium text-amber-800">
        Rp {harga.toLocaleString("id-ID")}
      </p>

      {detailTerbuka && <p className="text-sm text-stone-600">{deskripsi}</p>}

      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        <button
          type="button"
          onClick={() => setDetailTerbuka(!detailTerbuka)}
          className="text-sm text-amber-700 underline"
        >
          {detailTerbuka ? "Tutup detail" : "Lihat detail"}
        </button>

        <div className="flex items-center gap-2">
          {jumlahDipesan > 0 && (
            <span className="text-xs text-stone-500">
              Dipesan: {jumlahDipesan}
            </span>
          )}
          <button
            type="button"
            disabled={!tersedia}
            onClick={() => onTambah(id)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-amber-700 hover:bg-amber-800 disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed"
          >
            {tersedia ? "Tambah" : "Habis"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default MenuCard;
