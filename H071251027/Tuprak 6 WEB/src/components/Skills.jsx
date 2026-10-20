
import htmlCss from '../assets/gallery/htmldancss.png';
import javascript from '../assets/gallery/Javascript.jpg';
import react from '../assets/gallery/react.png';
import tailwind from '../assets/gallery/tailwind.webp';
import gitGithub from '../assets/gallery/gitgithub.png';

const daftarSkill = [
  {id: 1, nama: 'HTML & CSS', gambar: htmlCss},
  {id: 2, nama: 'JavaScript', gambar: javascript},
  {id: 3, nama: 'React', gambar: react},
  {id: 4, nama: 'Tailwind CSS', gambar: tailwind},
  {id: 5, nama: 'Git & GitHub', gambar: gitGithub},
];

function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-5xl px-5 py-16 md:py-24"
    >
      <h2 className="font-display text-4xl font-extrabold tracking-tight">
        Skills
      </h2>

      <p className="mt-3 text-gray-600">
        Teknologi yang sedang saya pelajari dan gunakan.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {daftarSkill.map((skill) => (
          <div
            key={skill.id}
            className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-white p-5 text-center transition-transform duration-300 hover:-translate-y-1"
          >
            <img
              src={skill.gambar}
              alt={skill.nama}
              className="h-14 w-14 object-contain"
            />

            <h3 className="text-sm font-semibold">
              {skill.nama}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
