import band480 from '../assets/warble/hero-band-480.webp';
import band800 from '../assets/warble/hero-band-800.webp';
import Reveal from './Reveal';
import { useContact } from './contact/context';

export default function Closing() {
  const { openContact } = useContact();

  return (
    <section id="meet" className="closing" data-theme="light" aria-labelledby="meet-title">
      <Reveal y={56} amount={0.2} className="wrap-wide closing__card">
        <div className="closing__copy">
          <p className="t-eyebrow">Warble AI</p>
          <h2 id="meet-title" className="t-h2 closing__title">
            Meet Warble AI.
          </h2>
          <p className="t-lead closing__sub">The health band that never stops watching over you.</p>
          <div className="actions closing__actions">
            <button type="button" className="btn" onClick={openContact}>
              Get in touch
            </button>
            <a className="link" href="#top">
              <span>Back to top</span>
              <span className="chev" aria-hidden="true">
                &nbsp;›
              </span>
            </a>
          </div>
        </div>
        <div className="closing__visual" aria-hidden="true">
          <span className="closing__aura" />
          <img
            src={band800}
            srcSet={`${band480} 480w, ${band800} 800w`}
            sizes="(min-width: 1024px) 340px, 60vw"
            width="800"
            height="1129"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      </Reveal>
    </section>
  );
}
