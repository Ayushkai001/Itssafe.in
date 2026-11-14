import ayush from '../assets/team/founder-ayush.webp';
import rajnish from '../assets/team/founder-rajnish.webp';
import Reveal from './Reveal';

const FOUNDERS = [
  { name: 'Ayush K', role: 'Director & CEO', img: ayush },
  { name: 'Rajnish Kumar Singh', role: 'Director & COO', img: rajnish },
];

export default function Team() {
  return (
    <section id="team" className="team" data-theme="light" aria-labelledby="team-title">
      <div className="wrap-wide">
        <Reveal as="h2" id="team-title" className="t-h2">
          Founders.
        </Reveal>

        <ul className="team__grid">
          {FOUNDERS.map((f, i) => (
            <Reveal as="li" key={f.name} className="founder" delay={i * 0.1} y={36}>
              <div className="founder__portrait">
                <img src={f.img} alt={`${f.name}, ${f.role}`} width="600" height="600" loading="lazy" decoding="async" />
              </div>
              <p className="founder__name">{f.name}</p>
              <p className="founder__role">{f.role}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
