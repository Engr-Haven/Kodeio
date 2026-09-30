import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Bootcamps from './components/Bootcamps';
import Portfolio from './components/Portfolio';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Bootcamps />
        <Portfolio />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
