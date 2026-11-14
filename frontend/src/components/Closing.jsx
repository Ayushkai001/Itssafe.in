import Reveal from './Reveal';

export default function Closing() {
  return (
    <section id="meet" className="closing" aria-labelledby="meet-title">
      <div className="wrap-wide">
        <Reveal as="h2" id="meet-title" className="t-h2">
          Meet Warble AI.
        </Reveal>
        <Reveal as="p" className="t-lead closing__sub" delay={0.06}>
          Visit our website for more.
        </Reveal>
        <Reveal className="actions" delay={0.12}>
          <a className="btn" href="https://www.itssafe.in/">
            www.itssafe.in
          </a>
          <a className="link" href="#top">
            <span>Back to top</span>
            <span className="chev" aria-hidden="true">
              &nbsp;›
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
