import { useState } from "react";

const MEJA_MAKS = 20;

function FormPesan({ totalItem, onKirim }) {
  const [nama, setNama] = useState("");
  const [meja, setMeja] = useState("");
  const [error, setError] = useState({ pesanan: "", nama: "", meja: "" });

  function handleSubmit(e) {
    e.preventDefault();

    const namaBersih = nama.trim();
    const nomorMeja = Number(meja);
    const errorBaru = { pesanan: "", nama: "", meja: "" };

    if (totalItem === 0) {
      errorBaru.pesanan = "Pesanan masih kosong. Pilih menu terlebih dahulu.";
    }
    if (namaBersih.length < 2) {
      errorBaru.nama = "Nama wajib diisi (minimal 2 karakter).";
    }
    if (
      meja === "" ||
      !Number.isInteger(nomorMeja) ||
      nomorMeja < 1 ||
      nomorMeja > MEJA_MAKS
    ) {
      errorBaru.meja = "Nomor meja harus angka bulat 1 sampai " + MEJA_MAKS + ".";
    }

    setError(errorBaru);

    if (errorBaru.pesanan || errorBaru.nama || errorBaru.meja) {
      return; 
    }

    onKirim(namaBersih, nomorMeja);
    setNama("");
    setMeja("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm space-y-3"
    >
      <h2 className="font-semibold text-lg">Data Pemesan</h2>

      {error.pesanan && (
        <p role="alert" className="text-sm text-red-600 bg-red-50 rounded p-2">
          {error.pesanan}
        </p>
      )}

      <div>
        <label htmlFor="nama" className="block text-sm font-medium mb-1">
          Nama 
        </label>
        <input
          id="nama"
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama Anda"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        {error.nama && <p className="text-xs text-red-600 mt-1">{error.nama}</p>}
      </div>

      <div>
        <label htmlFor="meja" className="block text-sm font-medium mb-1">
          Nomor Meja
        </label>
        <input
          id="meja"
          type="number"
          value={meja}
          onChange={(e) => setMeja(e.target.value)}
          placeholder={"1 - " + MEJA_MAKS}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        {error.meja && <p className="text-xs text-red-600 mt-1">{error.meja}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-stone-900 text-white py-2 text-sm font-medium hover:bg-stone-700"
      >
        Kirim Pesanan
      </button>
    </form>
  );
}

export default FormPesan;
