import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Bootcamps from './components/Bootcamps';
import Portfolio from './components/Portfolio';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ServiceDetailPage from './pages/ServiceDetailPage';

function HomePage() {
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Navigate to="/services/web-development" replace />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
