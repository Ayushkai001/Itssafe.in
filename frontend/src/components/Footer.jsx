import logo from '../assets/brand/itssafe-logo.webp';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer id="site-footer" className="footer">
      <div className="wrap-text">
        <div className="footer__top">
          <span className="footer__logo">
            <img src={logo} alt="ITSSAFE Solutions" width="120" height="123" loading="lazy" decoding="async" />
          </span>
          <a href="https://www.linkedin.com/company/itssafe-solutions-pvt-ltd/" target="_blank" rel="noopener noreferrer">
            LinkedIn: ITSSAFE SOLUTIONS PRIVATE LIMITED
          </a>
        </div>
        <p className="footer__legal">
          Copyright © {YEAR} ITSSAFE Solutions Private Limited. All rights reserved. All technologies are patented and
          developed in India.
        </p>
      </div>
    </footer>
  );
}
