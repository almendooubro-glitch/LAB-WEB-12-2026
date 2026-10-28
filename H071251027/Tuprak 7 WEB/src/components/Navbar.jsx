function Navbar({ totalItem, totalHarga }) {
  return (
    <header className="sticky top-0 z-10 bg-stone-900 text-amber-50 shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold">Kedai Kopi Senja</h1>
        <div className="text-right text-sm">
          <p>
            Pesanan: <span className="font-semibold">{totalItem}</span> item
          </p>
          <p>
            Total:{" "}
            <span className="font-semibold">
              Rp {totalHarga.toLocaleString("id-ID")}
            </span>
          </p>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
