import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const clientFaqs = [
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

const learnerFaqs = [
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

const tabs = [
  { id: 'clients', label: 'Clients' },
  { id: 'learners', label: 'Learners' },
];

export default function FAQ() {
  const [activeTab, setActiveTab] = useState('clients');
  const [openIndex, setOpenIndex] = useState(-1);
  const head = useInView();
  const list = useInView();

  const faqs = activeTab === 'clients' ? clientFaqs : learnerFaqs;

  return (
    <section id="faq" className="bg-white pt-20 pb-24">
      <div className="shell">
        {/* Heading block is left-anchored at 720px, but the tab toggle below
            it must centre on the PAGE — so it sits outside that 720px
            constraint, as a sibling spanning the full shell width. */}
        <div ref={head.ref} className="reveal mb-12">
          <div className="mb-8 max-w-[720px]">
            <h2 className="mb-[0.85rem] font-display text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold tracking-[-0.02em] text-ink">
              Frequently Asked Questions
            </h2>
            <p className="text-[0.95rem] leading-[1.65] text-body">
              Find Questions? We&apos;ve got answers.
              <br />
              Whether you&apos;re looking to hire Kodeio or join one of our bootcamps, here are
              the things people ask most often.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="inline-flex gap-1 rounded-full bg-line p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setOpenIndex(-1);
                  }}
                  id={`faq-tab-${tab.id}`}
                  className={`min-h-11 cursor-pointer rounded-full px-[1.4rem] py-[0.45rem] text-[0.8125rem] font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-brand text-white shadow-[0_2px_6px_rgba(125,46,255,0.25)]'
                      : 'text-[#4b5563]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div ref={list.ref} className="reveal mx-auto mb-12 flex max-w-[820px] flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              id={`faq-item-${i}`}
              className={`overflow-hidden rounded-card border transition-colors duration-200 ${
                openIndex === i
                  ? 'border-line bg-surface-3'
                  : 'border-line-soft bg-surface-2 hover:bg-surface-3'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                aria-expanded={openIndex === i}
                className="flex w-full cursor-pointer items-center justify-between px-6 py-[1.15rem] text-left"
              >
                <span className="font-sans text-[0.9375rem] font-semibold text-ink-soft">
                  {faq.question}
                </span>
                <div
                  className={`flex items-center justify-center transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown size={14} strokeWidth={2} className="text-[#4b5563]" />
                </div>
              </button>

              {openIndex === i && (
                <div className="animate-fade-in px-6 pb-5 text-sm leading-[1.65] text-body">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href="#contact"
            id="btn-faq-start-project"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-brand px-[1.6rem] py-[0.65rem] text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-brand-dark"
          >
            Start a Project
            <ArrowRight size={14} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
