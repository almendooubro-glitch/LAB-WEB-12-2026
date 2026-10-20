function Hero() {
  const handleButtonClick = () => {
    console.log("Lihat Galeri")
  }

  return (
    <section id="beranda" className="bg-ink text-paper">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
        <div>
          <p className="text-lg text-sky">Halo, saya Almendo Daud Ubro 👋</p>
          <h1 className="mt-3 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Beyond Code, Creating Solutions.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-paper/75">
            Bukan sekadar menulis kode, tetapi memahami masalah, 
            merancang sistem, dan menciptakan solusi digital.
          </p>
          <a
            href="#galeri"
            onClick={handleButtonClick}
            className="mt-8 inline-block rounded-full bg-cobalt px-7 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-cobalt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >Lihat Galeri</a>
        </div>

        <div>
            <img
              src="/Almendo1.png"
              alt="Foto profil Almendo"
            />
          </div>
        </div>
    </section>
  )
}

export default Hero
