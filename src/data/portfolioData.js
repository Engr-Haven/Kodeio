/**
 * portfolioData.js
 *
 * The single source of truth for the portfolio: the cards on the home page,
 * the work grid on /portfolio, and every case-study route.
 *
 * Keep this module free of JSX and React imports. `src/seo/routes.js` imports
 * it from Node during the prerender step, so case-study URLs are discovered
 * automatically instead of being duplicated in the router and the sitemap.
 */

export const portfolioList = [
  {
    slug: 'fastai',
    id: 1,
    number: '01',
    cardTitle: 'FastAI — AI Design website',
    title: 'FastAI — AI Design website',
    tagline: 'Learning-led AI design, without hiding the craft.',
    tags: ['UI/UX Design', 'Web product'],
    cardImage: '/portfolio-fastai.png',
    cardImageFit: 'contain',
    heroImage: '/fastai-hero.png',
    cardDescription:
      'An end-to-end product experience helping emerging designers learn modern design, practice with AI, and create client-ready work with confidence.',
    summary:
      'An end-to-end product experience helping emerging designers learn modern digital design, practice with AI, and create client-ready work with confidence.',
    meta: [
      { label: 'Role', value: 'Lead product designer' },
      { label: 'Timeline', value: '8 weeks' },
      { label: 'Year', value: '2026' },
    ],
    overview: {
      heading: 'Building a clear path from curiosity to creation',
      body: 'FastAI is a learning-led AI design platform. The experience had to explain the value of AI without making design feel automatic, generic, or intimidating.',
      steps: [
        {
          number: '01',
          title: 'Discovery',
          body: 'User interviews, competitive review, and task mapping.',
        },
        {
          number: '02',
          title: 'Experience strategy',
          body: 'Information architecture, flows, and content hierarchy.',
        },
        {
          number: '03',
          title: 'Interface design',
          body: 'Responsive visual system, prototype, and usability testing.',
        },
      ],
      tags: ['Product strategy', 'UX research', 'Responsive', 'AI workflows'],
    },
    challenge: {
      heading: 'AI felt powerful — but the first step felt unclear.',
      body: 'New designers wanted speed, yet they still needed guidance, creative control, and a sense of progress. The product had to make prompting approachable while keeping craft visible.',
      stats: [
        { value: '68%', label: 'hesitated when facing an empty prompt field' },
        { value: '3 in 5', label: 'expected the AI to explain why a result worked' },
        { value: '2.4x', label: 'more confidence after guided iteration' },
      ],
      question:
        'How might we help a learner move from a rough idea to a polished visual — without hiding the design decisions in between?',
      principle:
        'The AI should feel like a studio partner: fast enough to build momentum, transparent enough to teach.',
    },
    process: {
      heading: 'A research-led process, moving from ambiguity to a teachable workflow',
      body: 'The work paired fast product exploration with weekly learner feedback, so each design decision could be tied to comprehension — not just preference.',
      steps: [
        {
          number: '01',
          title: 'Understand',
          body: 'Interview learners and working designers to uncover where AI helped — and where it removed too much of the craft.',
        },
        {
          number: '02',
          title: 'Frame',
          body: 'Map the first-project journey around three moments: choosing a starting point, shaping a prompt, and refining a result.',
        },
        {
          number: '03',
          title: 'Explore',
          body: 'Prototype several guidance models, from wizard-led flows to a flexible workspace with contextual teaching.',
        },
        {
          number: '04',
          title: 'Validate',
          body: 'Test task completion, prompt confidence, and the ability to explain design choices after creating.',
        },
      ],
    },
    journey: {
      label: 'Learner journey · first project',
      heading: 'A first project, shaped around four clear moves',
      steps: [
        { title: 'Choose', body: 'A clear project type', icon: 'click' },
        { title: 'Describe', body: 'Guided prompt blocks', icon: 'compass' },
        { title: 'Generate', body: 'Visible system status', icon: 'sparkles' },
        { title: 'Refine', body: 'Simple edit controls', icon: 'wand' },
      ],
      insights: [
        {
          title: 'Start with an outcome',
          body: '“Make a flyer” was easier to act on than an abstract “What do you want to create?” prompt.',
        },
        {
          title: 'Show the path, not every option',
          body: 'Progressive disclosure reduced decision fatigue while keeping advanced controls in reach.',
        },
        {
          title: 'Teach inside the work',
          body: 'Short contextual tips outperformed a separate onboarding tour because they arrived at the moment of need.',
        },
      ],
    },
    flow: [
      { label: 'Pick a format' },
      { label: 'Shape the prompt', tone: 'peach' },
      { label: 'Review directions' },
      { label: 'Refine the result' },
    ],
    solution: {
      heading: 'A flexible AI studio with guidance built into every step',
      body: 'The final experience balances inspiration, generation, and refinement across desktop and mobile — without turning the product into a sequence of opaque prompts.',
      note: 'Responsive from browsing inspiration to refining work.',
      features: [
        {
          eyebrow: '01 — Discover',
          title: 'Lead with outcomes, not technology',
          body: 'A clear promise, visual examples, and familiar project types help learners understand what they can make before asking them to write a prompt.',
          image: '/fastai-feature-1.png',
          icon: 'sparkles',
          layout: 'full',
          theme: 'light',
        },
        {
          eyebrow: '02 — Create and refine',
          title: 'Prompt with structure',
          body: 'Suggested attributes turn a blank input into a conversation: purpose, audience, tone, and format.',
          image: '/fastai-feature-2.png',
          icon: 'wand',
          layout: 'split',
          imageSide: 'left',
          points: [
            {
              title: 'Keep the canvas central',
              body: 'AI guidance stays alongside the work, so the learner can compare, adjust, and understand the visual impact.',
            },
            {
              title: 'Make progress visible',
              body: 'Clear generation states and saved versions preserve momentum and make experimentation feel safe.',
            },
          ],
        },
        {
          eyebrow: '03 — Learn by remixing',
          title: 'A template library designed as a learning surface',
          body: 'Each template surfaces its underlying layout choices, helping learners remix with intention instead of copying blindly.',
          icon: 'layout',
          layout: 'gallery',
          theme: 'dark',
          gallery: [
            { image: '/fastai-template-1.png', label: 'Editorial portrait' },
            { image: '/fastai-template-2.png', label: 'Event poster' },
            { image: '/fastai-template-3.png', label: 'Food campaign' },
            { image: '/fastai-template-4.png', label: 'Culture poster' },
          ],
        },
      ],
    },
    outcomes: {
      heading: 'A faster first win — and a clearer path to better work',
      body: 'Prototype testing showed that learners moved with more confidence when the experience paired strong defaults with visible creative control.',
      note: 'Validated with 12 emerging designers across two prototype rounds.',
      stats: [
        {
          value: '+31%',
          label: 'Time to first useful concept',
          note: 'from moderated prototype tests',
        },
        {
          value: '-42%',
          label: 'First-project completion',
          note: 'compared with the baseline flow',
        },
        { value: '4.6/5', label: 'Clarity of AI guidance', note: 'average post-task rating' },
      ],
    },
    learnings: {
      heading: 'Designing with AI means designing trust',
      body: 'The work left three principles for every AI product that follows.',
      items: [
        {
          number: '01',
          title: 'Guidance is a feature, not onboarding',
          body: 'Teaching works best when it responds to the learner’s current decision.',
        },
        {
          number: '02',
          title: 'Speed needs reversibility',
          body: 'Version history and clear states gave learners permission to experiment.',
        },
        {
          number: '03',
          title: 'AI quality includes explanation',
          body: 'A strong result matters, but confidence grows when users can understand and improve it.',
        },
      ],
    },
    reflection: {
      quote:
        'The strongest version of FastAI did not ask learners to trust the model. It gave them reasons to trust themselves.',
      label: 'Final design reflection',
    },
  },
  {
    slug: 'class-sync',
    id: 2,
    number: '02',
    cardTitle: 'ClassSync — Timetable to Google Calendar',
    title: 'ClassSync — Timetable to Google Calendar',
    tagline: 'One upload. One click. A semester that stays in sync.',
    tags: ['Product design', 'Web app'],
    cardImage: '/portfolio-class-sync.png',
    heroImage: '/portfolio-class-sync.png',
    cardDescription:
      'A student-first web app that turns a weekly timetable into recurring Google Calendar events, complete with reminders and PDF or Word import.',
    summary:
      'A student-first web app that turns a weekly timetable into recurring Google Calendar events — with reminders, manual editing, and PDF or Word import.',
    meta: [
      { label: 'Role', value: 'Product design & frontend' },
      { label: 'Scope', value: 'Timetable sync' },
      { label: 'Year', value: '2026' },
    ],
    overview: {
      heading: 'Turning a static timetable into a living calendar',
      body: 'ClassSync converts a university class timetable into recurring Google Calendar events with automatic reminders. The product needed to feel as simple as the job it replaces: upload, review, sync.',
      steps: [
        {
          number: '01',
          title: 'Import',
          body: 'Pull a weekly schedule out of a PDF or Word document.',
        },
        {
          number: '02',
          title: 'Review',
          body: 'Edit classes, rooms, lecturers, and semester dates in one place.',
        },
        {
          number: '03',
          title: 'Sync',
          body: 'Create recurring Google Calendar events with reminders.',
        },
      ],
      tags: ['Google Calendar API', 'OAuth', 'PDF parsing', 'Reminders'],
    },
    challenge: {
      heading: 'Students do not need another timetable app. They need fewer places to check.',
      body: 'A weekly timetable is usually a PDF, an image, or a notice board. Re-entering every class manually is slow and error-prone. The design had to remove that work without hiding what would be created in the user’s calendar.',
      stats: [
        { value: '2', label: 'timetable formats supported: PDF and .docx' },
        { value: '4', label: 'reminder presets from 10 minutes to 1 day' },
        { value: '1 click', label: 'to push the full semester to calendar' },
      ],
      question:
        'How might we turn a static timetable into a calendar students can trust — without making them re-enter a single class?',
      principle: 'Automate the repetition, keep the user in control of the result.',
    },
    process: {
      heading: 'A narrow utility, designed around the moment of trust',
      body: 'The flow was kept deliberately short. Every screen either reduces setup effort or makes the calendar result easier to understand before it is created.',
      steps: [
        {
          number: '01',
          title: 'Map the semester',
          body: 'Understand how students read timetables, where breaks sit, and which details matter week to week.',
        },
        {
          number: '02',
          title: 'Design the import',
          body: 'Support both document upload and manual entry, with a review step before anything is saved.',
        },
        {
          number: '03',
          title: 'Make sync legible',
          body: 'Show the exact recurring event that will be created and connect Google Calendar through OAuth.',
        },
        {
          number: '04',
          title: 'Test the edges',
          body: 'Cover repeated classes, overlapping times, semester start dates, and removing synced events cleanly.',
        },
      ],
    },
    journey: {
      label: 'Student journey · timetable to calendar',
      heading: 'From document to calendar in four steps',
      steps: [
        { title: 'Upload', body: 'A PDF or Word timetable', icon: 'upload' },
        { title: 'Review', body: 'Editable classes and times', icon: 'check' },
        { title: 'Sync', body: 'Recurring calendar events', icon: 'refresh' },
        { title: 'Relax', body: 'Automatic reminders', icon: 'sparkles' },
      ],
      insights: [
        {
          title: 'Start with the document they already have',
          body: 'PDF and Word upload met students where their timetable already lived.',
        },
        {
          title: 'Show the parsed week before syncing',
          body: 'A review step turned automation into something students could verify.',
        },
        {
          title: 'Let the calendar do the remembering',
          body: 'Recurring events and reminders removed the need to check another app.',
        },
      ],
    },
    solution: {
      heading: 'A small product that removes a recurring chore',
      body: 'The interface stays close to the two things students care about: their week, and the calendar they already use.',
      features: [
        {
          eyebrow: '01 — Import',
          title: 'Import without retyping',
          body: 'Upload a PDF or .docx timetable and let the parser extract classes. Anything the parser misses can be corrected in the timetable manager before syncing.',
          icon: 'upload',
        },
        {
          eyebrow: '02 — Review',
          title: 'See the week before it leaves the app',
          body: 'Days, times, rooms, and lecturers live in one editable schedule. Colour and grouping make clashes visible without turning the page into a spreadsheet.',
          icon: 'calendar',
        },
        {
          eyebrow: '03 — Sync',
          title: 'Sync once, then forget it',
          body: 'One click creates recurring Google Calendar events for the whole semester, with popup reminders and a clean way to remove every synced event later.',
          icon: 'refresh',
        },
      ],
    },
    outcomes: {
      heading: 'Less setup, fewer missed classes',
      body: 'The finished product keeps the timetable human-readable while letting Google Calendar carry the reminders.',
      note: 'Designed around the two formats students actually receive each semester.',
      stats: [
        {
          value: '1 click',
          label: 'full-semester sync',
          note: 'recurring events, not one-off copies',
        },
        { value: '4', label: 'reminder presets', note: '10, 30, 60, and 1,440 minutes' },
        { value: '2', label: 'import formats', note: 'PDF and Word documents' },
      ],
    },
    learnings: {
      heading: 'Convenience only works when the result is visible',
      body: 'A sync feature asks for a lot of trust. These choices made that trust easier to give.',
      items: [
        {
          number: '01',
          title: 'Preview beats automation',
          body: 'Showing the parsed week before syncing turned a black-box import into a reviewable step.',
        },
        {
          number: '02',
          title: 'Auth is part of the experience',
          body: 'Google sign-in has to explain why access is needed, not just ask for it.',
        },
        {
          number: '03',
          title: 'Local-first is a feature',
          body: 'Keeping timetable data on the device made the tool feel lighter and easier to trust.',
        },
      ],
    },
    reflection: {
      quote: 'The best timetable app is the one a student never has to open twice.',
      label: 'Final design reflection',
    },
  },
  {
    slug: 'melhaven',
    id: 3,
    number: '03',
    cardTitle: 'Mel Haven — Children Foundation',
    title: 'Mel Haven — Children Foundation',
    tagline: 'A warm, credible home for a mission built on care.',
    tags: ['Web design', 'Development'],
    cardImage: '/portfolio-melhaven.png',
    heroImage: '/portfolio-melhaven.png',
    cardDescription:
      'A warm, trust-building website for a children’s foundation, connecting supporters to its mission, trustees, gallery, and giving needs.',
    summary:
      'A warm, trust-building website for a children’s foundation, connecting supporters to its mission, trustees, gallery, and giving needs.',
    meta: [
      { label: 'Role', value: 'Design & build' },
      { label: 'Scope', value: 'Nonprofit website' },
      { label: 'Year', value: '2025' },
    ],
    overview: {
      heading: 'A digital home for a mission built on care',
      body: 'The Mel Haven Children Foundation provides shelter, education, healthcare, and emotional support to orphaned, vulnerable and less privileged children. The site needed to tell that story with warmth while making it easy to partner, donate, and get in touch.',
      steps: [
        {
          number: '01',
          title: 'Listen',
          body: 'Understand the foundation’s voice, audience, and the stories it is trusted to hold.',
        },
        {
          number: '02',
          title: 'Structure',
          body: 'Turn a wide range of work into a clear path from mission to involvement.',
        },
        {
          number: '03',
          title: 'Launch',
          body: 'Build a responsive site that staff can keep growing as the foundation does.',
        },
      ],
      tags: ['Storytelling', 'Donation pathways', 'Gallery', 'Trust'],
    },
    challenge: {
      heading: 'A small charity has to earn trust quickly.',
      body: 'Supporters arrive with a simple question: who are you helping, and how can I help? The site had to answer that before asking for a donation, and keep the children’s dignity at the centre of every image and sentence.',
      stats: [
        { value: '4', label: 'areas of care: shelter, education, healthcare, emotional support' },
        { value: '5', label: 'board trustees introduced with credibility' },
        { value: '12+', label: 'gallery moments showing the work in progress' },
      ],
      question:
        'How might we help a first-time supporter understand the mission, trust the people behind it, and find a meaningful way to help?',
      principle: 'Show the care first; make the next step obvious.',
    },
    process: {
      heading: 'A story-first structure for a foundation with a lot to share',
      body: 'The site was organised around the questions a new supporter asks, not around the internal shape of the organisation.',
      steps: [
        {
          number: '01',
          title: 'Meet the mission',
          body: 'Open with the foundation’s purpose, the children it serves, and the values that guide the work.',
        },
        {
          number: '02',
          title: 'Make trust visible',
          body: 'Bring the board of trustees, approvals, address, and history into the same confident visual language.',
        },
        {
          number: '03',
          title: 'Open clear doors',
          body: 'Give partners and donors obvious routes to get involved, see current needs, and make contact.',
        },
        {
          number: '04',
          title: 'Let the gallery breathe',
          body: 'Use real moments from the foundation’s outreach to carry the emotional weight of the page.',
        },
      ],
    },
    journey: {
      label: 'Supporter journey · first visit to involvement',
      heading: 'From first visit to meaningful involvement',
      steps: [
        { title: 'Meet', body: 'The mission and the children served', icon: 'heart' },
        { title: 'See', body: 'Real moments from the gallery', icon: 'library' },
        { title: 'Trust', body: 'The board and the foundation’s approvals', icon: 'users' },
        { title: 'Act', body: 'Partner, give, or get in touch', icon: 'arrow' },
      ],
      insights: [
        {
          title: 'Lead with the children, not the organisation',
          body: 'The mission and the work came before institutional language.',
        },
        {
          title: 'Make trust concrete',
          body: 'Trustees, approvals, and a real address gave supporters something to check.',
        },
        {
          title: 'Keep the next step close',
          body: 'Partner, give, and contact routes stayed within reach at every scroll depth.',
        },
      ],
    },
    solution: {
      heading: 'A site that feels like an invitation, not a brochure',
      body: 'Warmth and credibility were treated as the same design problem: every section had to show care and make the next step easy.',
      features: [
        {
          eyebrow: '01 — Mission',
          title: 'Lead with the mission',
          body: 'A direct hero statement and a concise “who we are” section explain the foundation before asking for anything.',
          icon: 'heart',
        },
        {
          eyebrow: '02 — Trust',
          title: 'Make trust visible',
          body: 'The board of trustees, federal and state approval, and a real address sit alongside the story, giving supporters concrete reasons to believe.',
          icon: 'users',
        },
        {
          eyebrow: '03 — Action',
          title: 'Give supporters a clear next step',
          body: 'Partnership, current needs, the gallery, and contact details each have an obvious route, so interest never dead-ends.',
          icon: 'arrow',
        },
      ],
    },
    outcomes: {
      heading: 'A clearer way to meet the foundation and help',
      body: 'The finished site brings the mission, the people, and the practical ways to help into one coherent experience.',
      note: 'Structured around the questions a new supporter asks before giving.',
      stats: [
        {
          value: '4',
          label: 'areas of care',
          note: 'shelter, education, healthcare, emotional support',
        },
        { value: '5', label: 'trustees introduced', note: 'with roles and backgrounds' },
        {
          value: '1',
          label: 'clear path to involvement',
          note: 'partnership, giving, and contact',
        },
      ],
    },
    learnings: {
      heading: 'Care is a design material',
      body: 'The project reinforced how much trust is carried by structure, imagery, and tone together.',
      items: [
        {
          number: '01',
          title: 'Dignity comes first',
          body: 'Photography and copy should honour the children, not use them as decoration.',
        },
        {
          number: '02',
          title: 'Trust needs specifics',
          body: 'Names, roles, approvals, and a real address do more than a page of promises.',
        },
        {
          number: '03',
          title: 'Supporters arrive on their phones',
          body: 'The giving journey has to be short, legible, and comfortable on a small screen.',
        },
      ],
    },
    reflection: {
      quote: 'Care is not a decoration. It is the structure that makes trust possible.',
      label: 'Final design reflection',
    },
  },
  {
    slug: 'bond-integrated',
    id: 4,
    number: '04',
    cardTitle: 'Bond Integrated — Infrastructure maintenance',
    title: 'Bond Integrated — Corporate Website',
    tagline: 'Building trust and sustaining value for a maintenance partner.',
    tags: ['Web design', 'Development'],
    cardImage: '/portfolio-bond.png',
    heroImage: '/portfolio-bond.png',
    liveUrl: 'https://bondintegratedlimited.com/',
    cardDescription:
      'A confident corporate website for an infrastructure and real estate maintenance company, making its services, leadership, and safety-first standards easy to trust.',
    summary:
      'A confident corporate website for an infrastructure and real estate maintenance company — bringing its services, leadership, and safety-first standards into one clear, credible experience.',
    meta: [
      { label: 'Role', value: 'Design & build' },
      { label: 'Scope', value: 'Corporate website' },
      { label: 'Year', value: '2026' },
    ],
    overview: {
      heading: 'A corporate site that makes maintenance expertise easy to trust',
      body: 'Bond Integrated Limited provides infrastructure, real estate, facility, and safety maintenance for corporate and private buildings. The site needed to translate a broad technical service offer into a clear, credible story for facility managers, property owners, and procurement teams.',
      steps: [
        {
          number: '01',
          title: 'Clarify the offer',
          body: 'Turn a wide technical service range into one dependable promise.',
        },
        {
          number: '02',
          title: 'Structure the services',
          body: 'Give each service a clear, outcome-led place on the page.',
        },
        {
          number: '03',
          title: 'Build trust',
          body: 'Bring the leadership, standards, and contact details into view.',
        },
      ],
      tags: ['Corporate positioning', 'Service architecture', 'Responsive UI', 'Trust'],
    },
    challenge: {
      heading: 'A broad technical offer can read as a list of unrelated services.',
      body: 'Maintenance, real estate management, electrical safety, facility care, and oil and gas support all sit under one brand. Visitors needed to understand the range quickly, see the safety-first standard behind it, and know exactly who to contact.',
      stats: [
        { value: '6', label: 'service areas brought into one clear structure' },
        { value: '3', label: 'board directors introduced with credibility' },
        { value: '1', label: 'direct route from first visit to enquiry' },
      ],
      question: 'How might we make a wide maintenance offer feel like one dependable promise?',
      principle: 'Lead with the promise, then prove it with services, people, and standards.',
    },
    process: {
      heading: 'A trust-first structure for a technical service business',
      body: 'The site was organised around the questions a facility manager or property owner asks before handing over a building: what do you maintain, who is behind the work, and how do I reach you?',
      steps: [
        {
          number: '01',
          title: 'Audit the offer',
          body: 'Map every service, from asset maintenance to oil and gas support, so nothing important was left off the page.',
        },
        {
          number: '02',
          title: 'Set the hierarchy',
          body: 'Lead with the brand promise, follow with the service range, then move into leadership and contact.',
        },
        {
          number: '03',
          title: 'Design the credibility',
          body: 'Use a restrained corporate visual language, real project imagery, and consistent cards to make the technical range feel considered.',
        },
        {
          number: '04',
          title: 'Build the path',
          body: 'Keep contact details, the headquarters address, and enquiry routes within reach at every scroll depth.',
        },
      ],
    },
    journey: {
      label: 'Client journey · first visit to enquiry',
      heading: 'From first impression to a confident enquiry',
      steps: [
        { title: 'Discover', body: 'A clear promise of trust and value', icon: 'compass' },
        { title: 'Explore', body: 'Six services in a scannable structure', icon: 'layers' },
        { title: 'Trust', body: 'Leadership, standards, and confidentiality', icon: 'users' },
        { title: 'Enquire', body: 'Direct contact routes and a real address', icon: 'arrow' },
      ],
      insights: [
        {
          title: 'Lead with the outcome',
          body: '“Building trust, sustaining value” framed maintenance as asset protection, not just repairs.',
        },
        {
          title: 'Make the range legible',
          body: 'Consistent service cards helped a broad technical offer feel organised and comparable.',
        },
        {
          title: 'Put people behind the promise',
          body: 'Introducing the board gave a young brand the human credibility a corporate buyer looks for.',
        },
      ],
    },
    solution: {
      heading: 'A corporate site built around confidence',
      body: 'The experience stays calm and professional, but every section has a job: state the promise, explain the services, prove the expertise, and open a clear line of contact.',
      features: [
        {
          eyebrow: '01 — Positioning',
          title: 'Lead with the promise',
          body: 'A direct hero pairs “Building Trust. Sustaining Value.” with a concise explanation of the maintenance, compliance, and safety work behind it.',
          image: '/portfolio-bond.png',
          icon: 'sparkles',
        },
        {
          eyebrow: '02 — Services',
          title: 'Make the range scannable',
          body: 'Six service areas — from asset maintenance to oil and gas support — are presented as consistent cards with concise, outcome-led descriptions.',
          icon: 'layers',
        },
        {
          eyebrow: '03 — Credibility',
          title: 'Put the people and standards in view',
          body: 'The board of directors, confidentiality statement, headquarters address, and direct contact details sit together, giving procurement teams concrete reasons to trust the company.',
          icon: 'users',
        },
      ],
    },
    outcomes: {
      heading: 'A clearer corporate shopfront for a technical partner',
      body: 'The finished site gives Bond Integrated a credible home for its full service range while keeping the route to an enquiry short.',
      note: 'Structured around the questions corporate and private clients ask before commissioning maintenance work.',
      stats: [
        {
          value: '6',
          label: 'service areas organised',
          note: 'from asset care to oil and gas support',
        },
        { value: '3', label: 'directors introduced', note: 'with roles and experience' },
        { value: '1', label: 'clear enquiry path', note: 'phone, email, and address' },
      ],
    },
    learnings: {
      heading: 'Trust is built section by section',
      body: 'The project reinforced how much a technical service brand depends on sequence: promise first, proof second, contact third.',
      items: [
        {
          number: '01',
          title: 'A promise needs proof',
          body: 'The hero statement only works because the services and leadership sections back it up.',
        },
        {
          number: '02',
          title: 'Range is not the same as clarity',
          body: 'Six services felt credible only once they shared one consistent card structure.',
        },
        {
          number: '03',
          title: 'Contact is a design decision',
          body: 'A real address, a phone line, and an email address do more for trust than another paragraph of copy.',
        },
      ],
    },
    reflection: {
      quote:
        'For a maintenance partner, the website is the first inspection. It has to look like the work is already in safe hands.',
      label: 'Final design reflection',
    },
  },
  {
    slug: 'benchmak',
    id: 5,
    number: '05',
    cardTitle: 'BenchMak — Educational Publishing',
    title: 'BenchMak — Educational Publishing',
    tagline: 'A deep catalogue, made easy to explore.',
    tags: ['Web design', 'Development'],
    cardImage: '/portfolio-benchmak.png',
    heroImage: '/portfolio-benchmak.png',
    cardDescription:
      'A catalogue-led website for an educational publisher, making its pre-school, primary, and story books easy to discover and request.',
    summary:
      'A catalogue-led website for an educational publisher, making its pre-school, primary, and story books easy to discover and request.',
    meta: [
      { label: 'Role', value: 'Design & build' },
      { label: 'Scope', value: 'Education publisher' },
      { label: 'Year', value: '2025' },
    ],
    overview: {
      heading: 'Making a deep catalogue easy to explore',
      body: 'BenchMak Technocraft develops and supplies educational resources for nursery and primary schools. The site needed to bring its books, mission, and school partnerships into one clear experience for teachers, schools, and parents.',
      steps: [
        {
          number: '01',
          title: 'Audit',
          body: 'Understand the catalogue and the different audiences who search it.',
        },
        {
          number: '02',
          title: 'Organise',
          body: 'Build navigation around school stage and subject, not internal publishing structure.',
        },
        {
          number: '03',
          title: 'Support',
          body: 'Keep mission, values, and contact close to every browsing path.',
        },
      ],
      tags: ['Catalogue', 'Information architecture', 'School partnerships', 'Responsive'],
    },
    challenge: {
      heading: 'A large catalogue can hide the books people came for.',
      body: 'Pre-school, primary, story, and other titles all compete for attention. The design had to make the range feel organised, not overwhelming, while keeping the company’s mission and credibility close at hand.',
      stats: [
        { value: '4', label: 'book categories: pre-school, primary, story, others' },
        { value: '5', label: 'states reached across Nigeria' },
        { value: '4', label: 'core values: passionate, original, change, improvement' },
      ],
      question:
        'How might we make a deep educational catalogue feel as easy to browse as a single shelf?',
      principle: 'Let the books lead, with the mission close behind.',
    },
    process: {
      heading: 'A catalogue-first structure for schools and parents',
      body: 'The design started with the moment a teacher or parent arrives looking for a specific stage, subject, or title.',
      steps: [
        {
          number: '01',
          title: 'Audit the range',
          body: 'List the books, series, and stages so the navigation reflects what actually exists.',
        },
        {
          number: '02',
          title: 'Open with books',
          body: 'Put covers and categories above company history so visitors can browse immediately.',
        },
        {
          number: '03',
          title: 'Design for comparison',
          body: 'Give every title a consistent card with a clear name, stage, and cover.',
        },
        {
          number: '04',
          title: 'Close the loop',
          body: 'Make the route from interest to a school enquiry or newsletter sign-up obvious.',
        },
      ],
    },
    journey: {
      label: 'School journey · browse to enquiry',
      heading: 'From browse to school enquiry',
      steps: [
        { title: 'Discover', body: 'A catalogue that opens with books', icon: 'book' },
        { title: 'Browse', body: 'Categories by school stage', icon: 'library' },
        { title: 'Shortlist', body: 'Consistent title cards and covers', icon: 'check' },
        { title: 'Enquire', body: 'Contact and partnership routes', icon: 'arrow' },
      ],
      insights: [
        {
          title: 'Begin with the school stage',
          body: 'Teachers and parents think in ages and stages, not publishing categories.',
        },
        {
          title: 'Repeat the same card',
          body: 'Consistent cover-led cards made a long catalogue scannable.',
        },
        {
          title: 'Keep credibility beside the books',
          body: 'Mission, reach, and contact details stayed close to every browsing path.',
        },
      ],
    },
    solution: {
      heading: 'A catalogue that respects the visitor’s time',
      body: 'The site keeps the range visible while making the publisher’s credibility easy to find when it matters.',
      features: [
        {
          eyebrow: '01 — Structure',
          title: 'Organise the catalogue by stage',
          body: 'Pre-school, primary, story, and other books each get a clear home, so visitors can start from the age group they teach or parent.',
          icon: 'library',
        },
        {
          eyebrow: '02 — Discovery',
          title: 'Show the books at their best',
          body: 'Consistent cover-led cards make a large list feel browsable and help schools compare titles without opening every page.',
          icon: 'book',
        },
        {
          eyebrow: '03 — Confidence',
          title: 'Keep the mission in view',
          body: 'The company story, vision, values, adoption across states, and contact routes sit alongside the catalogue, reinforcing why schools trust the publisher.',
          icon: 'map',
        },
      ],
    },
    outcomes: {
      heading: 'A clearer shopfront for a growing catalogue',
      body: 'The finished site gives the publisher a scalable structure for new titles while keeping the mission visible.',
      note: 'Built to scale as new titles and school partnerships are added.',
      stats: [
        { value: '4', label: 'book categories', note: 'pre-school, primary, story, others' },
        { value: '5', label: 'states reached', note: 'with schools adopting the books' },
        { value: '4', label: 'core values', note: 'passionate, original, change, improvement' },
      ],
    },
    learnings: {
      heading: 'Good structure is good hospitality',
      body: 'A catalogue is only useful if the visitor can find the right shelf without being taught the store.',
      items: [
        {
          number: '01',
          title: 'Categories are a promise',
          body: 'Navigation has to match how teachers and parents think about school stages, not how books are published.',
        },
        {
          number: '02',
          title: 'Consistency builds speed',
          body: 'Repeating the same card structure lets people scan a large catalogue with confidence.',
        },
        {
          number: '03',
          title: 'Mission belongs beside the product',
          body: 'Trust is stronger when the reason behind the books is visible while people browse them.',
        },
      ],
    },
    reflection: {
      quote: 'A catalogue is only useful when the right book is easier to find than the next one.',
      label: 'Final design reflection',
    },
  },
  {
    slug: 'foodie',
    id: 6,
    number: '06',
    cardTitle: 'Foodie — Restaurant experience',
    title: 'Foodie — Restaurant Website & Ordering Experience',
    tagline: 'A warm, appetite-first restaurant site built to turn browsing into ordering.',
    tags: ['Web design', 'Frontend'],
    cardImage: '/portfolio-foodie.png',
    heroImage: '/portfolio-foodie.png',
    cardDescription:
      'A bold restaurant website for Foodie, pairing a delivery-first hero, a clear menu, and a warm brand story with a simple ordering path.',
    summary:
      'A bold restaurant website for Foodie, pairing a delivery-first hero, a clear menu, and a warm brand story with a simple ordering path.',
    meta: [
      { label: 'Role', value: 'Design & frontend' },
      { label: 'Scope', value: 'Restaurant website' },
      { label: 'Year', value: '2026' },
    ],
    overview: {
      heading: 'Making the menu the first thing people want to see',
      body: 'Foodie is a restaurant brand serving local and international dishes. The site had to feel appetising at first glance, explain the menu quickly, and make ordering or visiting feel like the obvious next step.',
      steps: [
        {
          number: '01',
          title: 'Set the appetite',
          body: 'Lead with a bold food image, a direct promise, and two clear actions.',
        },
        {
          number: '02',
          title: 'Open the menu',
          body: 'Organise signature dishes into a scannable, image-led menu.',
        },
        {
          number: '03',
          title: 'Build desire',
          body: 'Use story, social proof, and contact details to turn interest into a visit or order.',
        },
      ],
      tags: ['Art direction', 'Responsive UI', 'Menu design', 'Ordering flow'],
    },
    challenge: {
      heading: 'A restaurant site has seconds to make people hungry.',
      body: 'Visitors arrive ready to decide: what can I order, how fast can it arrive, and does it look good? The design had to lead with appetite while keeping navigation, menu detail, and contact routes immediately clear.',
      stats: [
        { value: '3', label: 'signature dishes surfaced in the menu' },
        { value: '2', label: 'primary actions: order now and view menu' },
        { value: '4.6/5', label: 'average customer rating shown as proof' },
      ],
      question:
        'How might we make a restaurant website feel as warm and immediate as walking through the door?',
      principle: 'Lead with appetite, then remove every reason to hesitate.',
    },
    process: {
      heading: 'From menu audit to an appetite-led storefront',
      body: 'The work moved quickly from content structure to visual direction, with every section tied to a decision a hungry visitor is already making.',
      steps: [
        {
          number: '01',
          title: 'Audit the menu',
          body: 'Identify the dishes that best represent the brand and can carry the visual story.',
        },
        {
          number: '02',
          title: 'Set the hierarchy',
          body: 'Put the hero, signature burger, menu, story, reviews, and contact in the order people decide.',
        },
        {
          number: '03',
          title: 'Design the appetite',
          body: 'Use warm colour, full-bleed food photography, and confident type to make the page feel edible.',
        },
        {
          number: '04',
          title: 'Build the path',
          body: 'Keep order, menu, and contact actions consistent across desktop and mobile.',
        },
      ],
    },
    journey: {
      label: 'Customer journey · craving to order',
      heading: 'Four small steps from hunger to a decision',
      steps: [
        {
          title: 'Crave',
          body: 'A hero that makes the food the first thing seen',
          icon: 'sparkles',
        },
        { title: 'Browse', body: 'A menu that is easy to scan and compare', icon: 'book' },
        { title: 'Trust', body: 'Reviews and a human story behind the kitchen', icon: 'heart' },
        { title: 'Order', body: 'Clear actions and contact details in reach', icon: 'arrow' },
      ],
      insights: [
        {
          title: 'Food first, copy second',
          body: 'The hero lets the photography do the persuading before a single line of brand copy.',
        },
        {
          title: 'Make the menu feel finite',
          body: 'Three strong signature dishes are easier to choose from than a wall of options.',
        },
        {
          title: 'Put proof near the decision',
          body: 'Customer reviews sit just before the contact and order actions, where reassurance matters most.',
        },
      ],
    },
    solution: {
      heading: 'A restaurant site that behaves like a good menu',
      body: 'The experience stays warm and visual, but every section has a job: make the food desirable, make the choice easy, and make the next step obvious.',
      features: [
        {
          eyebrow: '01 — First impression',
          title: 'Lead with the food',
          body: 'A full-bleed hero pairs the brand promise with a direct order action and a view-menu route.',
          image: '/portfolio-foodie.png',
          imageFit: 'cover',
          icon: 'sparkles',
        },
        {
          eyebrow: '02 — Menu',
          title: 'Turn dishes into decisions',
          body: 'Cover-led menu cards give each dish a name, description, and enough visual detail to choose confidently.',
          image: '/portfolio-foodie-pizza.png',
          imageFit: 'contain',
          icon: 'layout',
        },
        {
          eyebrow: '03 — Trust',
          title: 'Bring the kitchen closer',
          body: 'The story, customer reviews, and contact details sit together, turning a menu into a place people can trust and visit.',
          image: '/portfolio-foodie-burger.jpg',
          icon: 'heart',
        },
      ],
    },
    outcomes: {
      heading: 'A storefront that opens with appetite',
      body: 'The finished site gives Foodie a clear, image-led home for its menu, story, reviews, and contact details.',
      note: 'Built as a responsive, front-end-only experience with a clear path from hero to order.',
      stats: [
        {
          value: '3',
          label: 'signature menu items',
          note: 'presented as cover-led cards',
        },
        {
          value: '2',
          label: 'primary actions',
          note: 'order now and view menu',
        },
        {
          value: '1',
          label: 'continuous brand story',
          note: 'from hero to contact',
        },
      ],
    },
    learnings: {
      heading: 'Appetite is a hierarchy problem',
      body: 'The project reinforced how much a restaurant site depends on sequence: the right image, in the right place, with the next action close by.',
      items: [
        {
          number: '01',
          title: 'The hero is the menu',
          body: 'The first screen has to look like the food people came for.',
        },
        {
          number: '02',
          title: 'Short menus feel confident',
          body: 'A focused selection reads as conviction, not limitation.',
        },
        {
          number: '03',
          title: 'Proof belongs at the decision point',
          body: 'Reviews do more work when they sit beside the action they are meant to support.',
        },
      ],
    },
    reflection: {
      quote: 'A restaurant website should make people hungry before it asks them to do anything.',
      label: 'Final design reflection',
    },
  },
  {
    slug: 'oreoluwa-olamide',
    id: 7,
    number: '07',
    cardTitle: 'Oreoluwa & Olamide — Wedding invitation',
    title: 'Oreoluwa & Olamide — A Wedding Invitation',
    tagline: 'A digital invitation that turns a date reveal into a shared moment.',
    tags: ['Web design', 'Interactive experience'],
    cardImage: '/portfolio-wed-1.png',
    cardImages: ['/portfolio-wed-1.png', '/portfolio-wed-2.png'],
    cardImageFit: 'cover',
    heroImage: '/portfolio-wed-1.png',
    heroImages: ['/portfolio-wed-1.png', '/portfolio-wed-2.png'],
    heroImageFit: 'contain',
    cardDescription:
      'An intimate digital wedding invitation with a scratch-to-reveal date, live countdown, calendar, RSVP, and a cinematic opening film.',
    summary:
      'An intimate digital wedding invitation that turns the date reveal, countdown, and RSVP into one warm, mobile-first experience.',
    meta: [
      { label: 'Role', value: 'Design & build' },
      { label: 'Scope', value: 'Wedding invitation' },
      { label: 'Year', value: '2026' },
    ],
    overview: {
      heading: 'An invitation designed to be opened, not just read',
      body: 'Oreoluwa and Olamide needed a wedding invitation that felt personal, private, and celebratory. The experience had to work like a keepsake while still handling the practical details: the date, the countdown, the calendar, and RSVP.',
      steps: [
        {
          number: '01',
          title: 'Set the mood',
          body: 'Build a warm visual world of parchment, script type, and gold detail.',
        },
        {
          number: '02',
          title: 'Reveal the date',
          body: 'Turn the date into a small interaction guests uncover themselves.',
        },
        {
          number: '03',
          title: 'Make it useful',
          body: 'Carry the celebration into a countdown, calendar save, and RSVP.',
        },
      ],
      tags: ['Art direction', 'Motion', 'Mobile-first', 'RSVP'],
    },
    challenge: {
      heading: 'A wedding site has to feel personal without making guests work.',
      body: 'The invitation needed to carry emotion and practical information at the same time. Guests had to understand the date, save it, and respond — while the experience still felt like a private moment rather than a form.',
      stats: [
        { value: '1', label: 'date reveal interaction' },
        { value: '4', label: 'live countdown units' },
        { value: '1', label: 'clear RSVP path' },
      ],
      question:
        'How might we make a digital invitation feel as intimate as opening a letter — while still making the date and RSVP effortless?',
      principle: 'Make the moment memorable, then make the details invisible.',
    },
    process: {
      heading: 'A keepsake-first process, with practicality built underneath',
      body: 'The visual language came first: how the invitation should feel when it opens. The countdown, calendar, and RSVP were then folded into that mood rather than added as separate utility screens.',
      steps: [
        {
          number: '01',
          title: 'Set the tone',
          body: 'Choose the palette, type pairing, texture, and motion that make the invitation feel personal.',
        },
        {
          number: '02',
          title: 'Design the reveal',
          body: 'Turn the date into a scratch interaction that gives guests a reason to pause.',
        },
        {
          number: '03',
          title: 'Build the rhythm',
          body: 'Move from hero to date, countdown, RSVP, and footer as one continuous scroll.',
        },
        {
          number: '04',
          title: 'Keep it effortless',
          body: 'Make the calendar, RSVP, and navigation work cleanly on a phone.',
        },
      ],
    },
    journey: {
      label: 'Guest journey · opening to RSVP',
      heading: 'A single scroll from surprise to response',
      steps: [
        { title: 'Open', body: 'A cinematic invitation reel sets the tone', icon: 'play' },
        { title: 'Reveal', body: 'Guests scratch to uncover the date', icon: 'wand' },
        { title: 'Remember', body: 'A countdown and calendar keep it close', icon: 'calendar' },
        { title: 'Respond', body: 'RSVP completes the experience', icon: 'check' },
      ],
      insights: [
        {
          title: 'Let guests participate',
          body: 'Scratching the date turned a static fact into a moment guests create themselves.',
        },
        {
          title: 'Motion should feel like atmosphere',
          body: 'The opening film and soft reveals set the mood without delaying the practical details.',
        },
        {
          title: 'Keep the utility quiet',
          body: 'The countdown and RSVP inherit the same warm language, so they never feel like a separate form.',
        },
      ],
    },
    solution: {
      heading: 'A digital invitation with the weight of a printed keepsake',
      body: 'The experience pairs a cinematic opening with a date reveal, live countdown, calendar, and RSVP — all in one continuous, mobile-first story.',
      features: [
        {
          eyebrow: '01 — The opening',
          title: 'Begin with a film',
          body: 'A short invitation reel gives the site a sense of occasion before the first line of copy.',
          image: '/portfolio-wed-1.png',
          imageFit: 'contain',
          icon: 'play',
        },
        {
          eyebrow: '02 — The reveal',
          title: 'Let guests uncover the date',
          body: 'A scratch-to-reveal interaction turns the wedding date into a small, personal surprise.',
          image: '/portfolio-wed-2.png',
          imageFit: 'contain',
          icon: 'wand',
        },
        {
          eyebrow: '03 — The details',
          title: 'Carry the moment into action',
          body: 'A live countdown, save-the-date calendar, and RSVP keep the practical details inside the same warm visual world.',
          icon: 'calendar',
        },
      ],
    },
    video: {
      src: '/portfolio-wedding-ad.mp4',
      poster: '/portfolio-wed-1.png',
      heading: 'The invitation, in motion',
      body: 'A short film used as the opening moment of the site, setting the tone before guests reveal the date and respond.',
    },
    outcomes: {
      heading: 'A wedding invitation that feels like a keepsake',
      body: 'The finished experience turns a single date into a warm, interactive invitation with a clear path from opening to RSVP.',
      note: 'Designed mobile-first for guests opening the link on their phones.',
      stats: [
        { value: '1', label: 'cinematic opening film' },
        { value: '4', label: 'live countdown units' },
        { value: '1', label: 'continuous RSVP path' },
      ],
    },
    learnings: {
      heading: 'The best utility disappears into the mood',
      body: 'The project showed how practical details can feel like part of the celebration when they share the same visual language.',
      items: [
        {
          number: '01',
          title: 'Interaction can be a gift',
          body: 'A small reveal gives guests something to do, not just something to read.',
        },
        {
          number: '02',
          title: 'Mobile is the venue',
          body: 'Most guests arrive on a phone, so the entire story has to work in one hand.',
        },
        {
          number: '03',
          title: 'Utility can stay warm',
          body: 'Countdowns and RSVP forms do not have to look clinical when they inherit the invitation’s tone.',
        },
      ],
    },
    reflection: {
      quote:
        'An invitation is not a page of information. It is the first moment of the celebration.',
      label: 'Final design reflection',
    },
  },
];

export const portfolioData = Object.fromEntries(
  portfolioList.map((project) => [project.slug, project])
);

/* The four cards shown on the home page: the first three projects, plus the
   wedding invitation as the intentional fourth. The full list still drives
   /portfolio and every case-study route. */
export const homePortfolioList = [
  ...portfolioList.slice(0, 3),
  portfolioList.find((project) => project.slug === 'oreoluwa-olamide'),
].filter(Boolean);

export function getNextProject(slug) {
  const index = portfolioList.findIndex((project) => project.slug === slug);
  if (index === -1) return portfolioList[0];
  return portfolioList[(index + 1) % portfolioList.length];
}
