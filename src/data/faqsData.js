/**
 * faqsData.js
 *
 * Single source of truth for the home-page FAQ accordion (src/components/FAQ.jsx)
 * and the FAQPage structured data emitted for the home route (src/seo/seo.js).
 * Keeping them here means the visible answers and the JSON-LD can never drift.
 */

export const clientFaqs = [
  {
    question: 'What services does Kodeio offer?',
    answer:
      'Kodeio offers end-to-end digital solutions including Brand Identity Design, UI/UX Design, Web Development, Mobile App Prototyping, and E-Commerce Development. We also organize practical bootcamps with internship placement.',
  },
  {
    question: 'What kind of businesses do you work with?',
    answer:
      'We partner with startups, emerging brands, and established organizations looking for high-performance websites and product experiences.',
  },
  {
    question: 'How quickly can I get started?',
    answer:
      'You can book an audit or discovery call right away. We usually kick off projects within 3 to 5 business days after scope confirmation.',
  },
  {
    question: 'Can Kodeio handle both design and development?',
    answer:
      'Yes, we provide seamless handoff and full-stack execution from initial user research and wireframing through to final deployment.',
  },
  {
    question: 'What are your pricing options?',
    answer:
      'We provide transparent milestone-based project quotes as well as monthly dedicated retainer models customized to your needs.',
  },
];

export const learnerFaqs = [
  {
    question: 'Who are the tech bootcamps for?',
    answer:
      'Our bootcamps are built for both beginners and upskillers aiming to build industry-level portfolios and secure internships.',
  },
  {
    question: 'What is the format of the classes?',
    answer:
      'Classes are live, interactive sessions with experienced mentors, accompanied by weekly design challenges and collaborative projects.',
  },
  {
    question: 'How do internship opportunities work?',
    answer:
      'Top-performing students are connected directly with partner companies and internal Kodeio projects for hands-on internships.',
  },
  {
    question: 'What tools will I learn?',
    answer:
      'Depending on your track, you will learn Figma, React, JavaScript, modern CSS, Git, and cutting-edge AI design workflows.',
  },
  {
    question: 'Is certification provided upon completion?',
    answer:
      'Yes, all graduates receive an industry-recognized certificate from Kodeio verifying their practical skills and completed projects.',
  },
];

/* Combined, de-duplicated list used for the home page's FAQPage JSON-LD. */
export const homeFaqs = [...clientFaqs, ...learnerFaqs];
