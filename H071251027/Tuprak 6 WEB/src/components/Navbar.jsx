const menus = [
  { id: 1, label: 'Beranda', href: '#beranda' },
  { id: 2, label: 'Tentang', href: '#tentang' },
  { id: 3, label: 'Keahlian', href: '#keahlian' },
  { id: 4, label: 'Galeri', href: '#galeri' },
]

function Navbar() {
  const handleMenuClick = (namaMenu) => {
    console.log("Menu diklik:", namaMenu)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-5 py-3 sm:flex-row">
        <a
          href="#beranda"
          className="font-display text-2xl font-extrabold tracking-tight text-ink">Almendo!
        </a>
        <ul className="flex items-center gap-1 text-sm font-medium sm:text-base">
          {menus.map((menu) => (
            <li key={menu.id}>
              <a
                href={menu.href}
                onClick={() => handleMenuClick(menu.label)}
                className="rounded-full px-3 py-1.5 text-ink/80 transition-colors hover:bg-sky hover:text-cobalt focus-visible:outline-2 focus-visible:outline-cobalt sm:px-4"
              >
                {menu.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
