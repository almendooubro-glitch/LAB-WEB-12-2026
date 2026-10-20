import foto1 from '../assets/gallery/Almendo2.jpeg'
import foto2 from '../assets/gallery/Almendo3.jpeg'
import foto3 from '../assets/gallery/Almendo4.jpeg'
import foto4 from '../assets/gallery/Almendo5.jpeg'

const daftarFoto = [
  { id: 1, src: foto1, judul: 'Pas Foto (Waktu TK)' },
  { id: 2, src: foto2, judul: 'Pas foto di tempat bermain' },
  { id: 3, src: foto3, judul: 'Pas Foto bersama bule' },
  { id: 4, src: foto4, judul: 'Pas lagi santai di depan rumah' },
]

function Gallery() {
  return (
    <section id="galeri" className="mx-auto max-w-5xl px-5 py-16 md:py-24">
      <h2 className="font-display text-4xl font-extrabold tracking-tight">
        Galeri
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {daftarFoto.map((foto) => (
          <figure
            key={foto.id}
            className="overflow-hidden rounded-2xl border border-line bg-white"
          >
            <img
              src={foto.src}
              alt={foto.judul}
              className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <figcaption className="px-4 py-3 text-sm font-medium">
              {foto.judul}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Gallery
