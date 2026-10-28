function RingkasanPesanan({ items, totalItem, totalHarga, onTambah, onKurang }) {
  return (
    <section className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <h2 className="font-semibold text-lg mb-3">Ringkasan Pesanan</h2>

      {items.length === 0 ? (
        <p className="text-sm text-stone-500">
          Belum ada pesanan. Tekan Tambah pada menu yang Anda inginkan.
        </p>
      ) : (
        <ul className="divide-y divide-stone-100">
          {items.map((item) => (
            <li key={item.id} className="py-2 flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{item.nama}</p>
                <p className="text-xs text-stone-500">
                  Rp {item.harga.toLocaleString("id-ID")} × {item.jumlah} = Rp{" "}
                  {(item.harga * item.jumlah).toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onKurang(item.id)}
                  aria-label={"Kurangi " + item.nama}
                  className="w-7 h-7 rounded bg-stone-200 hover:bg-stone-300"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm">{item.jumlah}</span>
                <button
                  type="button"
                  onClick={() => onTambah(item.id)}
                  aria-label={"Tambah " + item.nama}
                  className="w-7 h-7 rounded bg-amber-700 text-white hover:bg-amber-800"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 pt-3 border-t border-stone-200 text-sm space-y-1">
        <p className="flex justify-between">
          <span>Jumlah item</span>
          <span className="font-semibold">{totalItem}</span>
        </p>
        <p className="flex justify-between">
          <span>Total harga</span>
          <span className="font-semibold">
            Rp {totalHarga.toLocaleString("id-ID")}
          </span>
        </p>
      </div>
    </section>
  );
}

export default RingkasanPesanan;
