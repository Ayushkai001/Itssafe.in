import Reveal from './Reveal';
import { keepCompounds as k } from '../lib/text';
import logo from '../assets/itssafe_logo.png';
import watermark from '../assets/vision-watermark.jpg';
import missionWatermark from '../assets/mission-watermark.png';

export default function Company() {
  return (
    <section id="company" className="company" data-theme="dark" aria-labelledby="company-title">
      {/* ── DPIIT Certificate Badge (restored from pre-Figma build) ── */}
      <a
        href="https://drive.google.com/file/d/17d763UN_hCj1pfiwkKuEvo-JyF3D8ahF/view"
        target="_blank"
        rel="noopener noreferrer"
        title="View DPIIT Certificate"
        aria-label="View DPIIT Certificate"
        className="dpiit-badge fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center bg-white text-black px-1.5 py-6 select-none shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer transition-transform duration-300 hover:-translate-x-1 hover:shadow-green-400/40"
      >
        <span
          className="dpiit-badge__text font-bold text-[10px] uppercase tracking-[0.3em] whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          DPIIT<span className="dpiit-badge__dot text-green-700 my-3 inline-block">●</span> CERTIFIED
        </span>
      </a>

      <div className="wrap-text company__intro">
        <Reveal y={20} amount={0.3}>
          <img
            src={logo}
            alt="ITSSAFE Solutions"
            className="company__logo"
            width="72"
            height="74"
            loading="lazy"
            decoding="async"
          />
        </Reveal>
        <Reveal as="p" className="t-eyebrow" delay={0.04}>
          Who we are
        </Reveal>
        <Reveal as="h3" id="company-title" className="t-h2" delay={0.06}>
          ITSSAFE SOLUTIONS PRIVATE LIMITED
        </Reveal>
        <Reveal as="p" className="t-lead" delay={0.12}>
          Start Up that manufactures AIoT solutions for the next generation of safety systems.
          Our objective is straightforward but extremely important , utilizing the latest technological solutions for the protection of human life in hazardous conditions.
        </Reveal>
        <Reveal delay={0.18}>
          <a className="link" href="#promise">
            <span>View our scope</span>
            <span className="chev" aria-hidden="true">
              &nbsp;›
            </span>
          </a>
        </Reveal>
      </div>

      <div className="wrap-wide company__cards">
        <Reveal as="article" id="mission" y={48} amount={0.25} className="mv-card" aria-labelledby="mission-title">
          <div className="mv-card__watermark" aria-hidden="true">
            <img
              src={watermark}
              alt=""
              loading="lazy"
              decoding="async"
              className="mv-card__watermark-img"
              width="872"
              height="500"
            />
          </div>
          <p className="t-tile-eyebrow">Our mission</p>
          <h3 id="mission-title" className="t-quote mv-card__title">
            To Save Life. <span className="mv-card__accent">Protect tomorrow.</span>
          </h3>
          <p className="t-subhead mv-card__sub">
            Intelligent Technology. Safer Mines. Stronger <br className="br-xl" />
            Tomorrow.
          </p>
          <p className="t-small mv-card__body">
            Currently Itssafe Solutions is on a mission to prevent <br className="br-xl" />
            disasters in mines through their AI model <br className="br-xl" />
            and {k('next-gen')} wearable devices. <br className="br-xl" />
            Because every worker deserves to return home.
          </p>
        </Reveal>

        <Reveal
          as="article"
          y={48}
          amount={0.25}
          delay={0.1}
          className="mv-card mv-card--vision"
          aria-labelledby="vision-title"
        >
          <div className="mv-card__watermark" aria-hidden="true">
            <img
              src={missionWatermark}
              alt=""
              loading="lazy"
              decoding="async"
              className="mv-card__watermark-img mv-card__watermark-img--graphic"
              width="936"
              height="820"
            />
          </div>
          <p className="t-tile-eyebrow">Our vision</p>
          <h3 id="vision-title" className="t-quote mv-card__title">
            To revolutionize industry through intelligent systems.
          </h3>
          <p className="t-small mv-card__body">
            Which eliminate preventable industrial risks, making every person predictively safe.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
