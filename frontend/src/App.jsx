import { LazyMotion, domAnimation } from 'framer-motion';
import ContactProvider from './components/contact/ContactProvider';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Features from './components/Features';
import Company from './components/Company';
import OurPromise from './components/OurPromise';
import MadeInIndia from './components/MadeInIndia';
import Team from './components/Team';
import Closing from './components/Closing';
import Footer from './components/Footer';

export default function App() {
  return (
    // `strict` guarantees only the lightweight `m` components are used (smaller bundle).
    <LazyMotion features={domAnimation} strict>
      <ContactProvider>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <Features />
          <Company />
          <OurPromise />
          <MadeInIndia />
          <Team />
          <Closing />
        </main>
        <Footer />
      </ContactProvider>
    </LazyMotion>
  );
}
