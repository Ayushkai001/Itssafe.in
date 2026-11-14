import logo from '../assets/brand/itssafe-logo.webp';
import { useContact } from './contact/context';
import { scrollToId } from '../lib/motion';

const YEAR = new Date().getFullYear();

const COLUMNS = [
  {
    title: 'Warble AI',
    links: [
      ['Overview', '#top'],
      ['Highlights', '#highlights'],
      ['Take a closer look', '#closer-look'],
      ['Physiology', '#physiology'],
      ['Predictive intelligence', '#intelligence'],
      ['Made in India', '#inside'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['Our focus area', '#company'],
      ['Mission and vision', '#mission'],
      ['Our promise', '#promise'],
      ['Founding team', '#team'],
    ],
  },
  {
    title: 'Connect',
    links: [
      ['Get in touch', 'contact'],
      ['LinkedIn', 'https://www.linkedin.com/company/itssafe-solutions-pvt-ltd/'],
      ['Email', 'mailto:itssafewithus@itssafe.in'],
    ],
  },
];

export default function Footer() {
  const { openContact } = useContact();

  const onLink = (href) => (e) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    scrollToId(href.slice(1));
  };

  return (
    <footer id="site-footer" className="footer">
      <div className="wrap-text">
        <div className="footer__brand">
          <span className="footer__logo">
            <img src={logo} alt="" width="120" height="123" loading="lazy" decoding="async" />
          </span>
          <p>
            <strong>Warble AI</strong> by ITSSAFE Solutions. The health band that never stops watching over you.
          </p>
        </div>

        <nav className="footer__directory" aria-label="Site directory">
          {COLUMNS.map((col) => (
            <div key={col.title} className="footer__col">
              <h3 className="footer__heading">{col.title}</h3>
              <ul>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    {href === 'contact' ? (
                      <button type="button" className="footer__link" onClick={openContact}>
                        {label}
                      </button>
                    ) : (
                      <a
                        className="footer__link"
                        href={href}
                        onClick={onLink(href)}
                        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="footer__legal">
          <p>
            Copyright © {YEAR} ITSSAFE Solutions Private Limited. All rights reserved. All technologies are patented and
            developed in India.
          </p>
          <p className="footer__locale">India</p>
        </div>
      </div>
    </footer>
  );
}
