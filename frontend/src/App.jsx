import { LazyMotion, domAnimation } from 'framer-motion';
import ContactProvider from './components/contact/ContactProvider';
import Nav from './components/Nav';
import LocalNav from './components/LocalNav';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import CloserLook from './components/CloserLook';
import Physiology from './components/Physiology';
import Intelligence from './components/Intelligence';
import Inside from './components/Inside';
import OurPromise from './components/OurPromise';
import Company from './components/Company';
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
        <LocalNav />
        <main id="main" tabIndex={-1} className="outline-none">
          <Inside />
          <Hero />
          <Highlights />
          <CloserLook />
          <Physiology />
          <Intelligence />
          <OurPromise />
          <Company />
          <Team />
          <Closing />
        </main>
        <Footer />
      </ContactProvider>
    </LazyMotion>
  );
}
