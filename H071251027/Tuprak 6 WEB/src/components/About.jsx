const dataDiri = [
  { id: 1, label: 'Nama', value: 'Almendo' },
  { id: 2, label: 'Asal', value: 'Kepulauan Kei, Maluku' },
  { id: 3, label: 'Program studi', value: 'Sistem Informasi' },
  { id: 4, label: 'Minat', value: 'Web Development' },
]

function About() {
  return (
    <section id="tentang" className="mx-auto max-w-5xl px-5 py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight">
            Tentang saya
          </h2>
          <p className="mt-5 max-w-prose leading-relaxed text-ink/80">
            Halo! Saya Almendo Daud Ubro, 
            mahasiswa Program Studi Sistem Informasi di Universitas Hasanuddin 
            yang berasal dari Kota Tual, Maluku, daerah 3T di ujung tenggara Provinsi Maluku.
            
            Saya memiliki ketertarikan pada pengembangan website, perancangan sistem informasi, 
            dan pemanfaatan teknologi untuk menyelesaikan berbagai permasalahan. Saya senang 
            mempelajari hal-hal baru, mengembangkan keterampilan, serta menciptakan solusi 
            digital yang bermanfaat bagi masyarakat.
          </p>
        </div>

        <dl className="divide-y divide-line border-y border-line">
          {dataDiri.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6"
            >
              <dt className="w-36 shrink-0 font-semibold text-cobalt">
                {item.label}
              </dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default About
