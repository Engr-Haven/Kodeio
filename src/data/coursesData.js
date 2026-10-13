/**
 * coursesData.js
 *
 * Single source of truth for all Kodeio bootcamp/course detail pages.
 * Each entry maps directly to a /courses/:courseId route rendered by
 * CourseDetailPage.jsx.
 *
 * Data is extracted faithfully from Courses-1.png, Courses-2.png, and
 * Courses-3.png design mockups.
 */

const coursesData = {
  'product-ui-ux-design': {
    id: 'product-ui-ux-design',
    slug: 'product-ui-ux-design',
    title: 'Product (UI/UX) Design',
    tag: 'Live Cohort Learning',
    headline: 'Product (UI/UX) Design',
    sub: 'Learn UI/UX design through live mentorship, practical projects, portfolio reviews, and collaborative learning. Build industry-ready skills while working on real product challenges used by modern startups and businesses.',
    duration: '8 Weeks',
    startDate: 'Starts 22nd of Aug 2026',
    mode: 'Live on Google Meet',
    curriculumTitle: "What you'll be able to do this  after this Bootcamp",
    curriculum: [
      {
        week: '01',
        title: 'Week 1: Foundations of Product Design & Visual Thinking',
        desc: 'Learn how great digital products are designed and develop the visual design fundamentals every product designer needs.',
      },
      {
        week: '02',
        title: 'Week 2: Figma Mastery & Modern Interface Design',
        desc: 'Build confidence using Figma and learn how modern design teams create interfaces efficiently.',
      },
      {
        week: '03',
        title: 'Week 3: User Experience Design & Product Thinking',
        desc: 'Learn how to solve real user problems instead of simply creating attractive screens.',
      },
      {
        week: '04',
        title: 'Week 4: Design Systems & Scalable Product Design',
        desc: 'Learn how successful companies maintain consistency across products and teams.',
      },
      {
        week: '05',
        title: 'Week 5: AI for Product Designers',
        desc: 'Learn how to use AI as a creative partner throughout the design process.',
      },
      {
        week: '06',
        title: 'Week 6: Designing Complete Product Experiences.',
        desc: 'Apply everything learned so far to a real-world product challenge.',
      },
      {
        week: '07',
        title: 'Week 7: Portfolio Projects & Case Study Creation.',
        desc: 'Learn how to present your work professionally and stand out in the job market.',
      },
      {
        week: '08',
        title: 'Week 8: Final Capstone Project & Career Preparation.',
        desc: 'Bring everything together and present your work like a professional product designer.',
      },
    ],
  },

  'wordpress-website-design': {
    id: 'wordpress-website-design',
    slug: 'wordpress-website-design',
    title: 'WordPress Website Design & Development',
    tag: 'Live Cohort Learning',
    headline: 'WordPress Website Design & Development',
    sub: 'Learn WordPress website design and development from beginner to advanced. Build responsive websites, set up domains and hosting, optimize performance, and launch professional websites for businesses, personal brands, and clients.',
    duration: '6 Weeks',
    startDate: 'Starts 22nd of Aug 2026',
    mode: 'Live on Google Meet',
    curriculumTitle: "What you'll be able to do this  after this Bootcamp",
    curriculum: [
      {
        week: '01',
        title: 'Week 1: Getting Online: Domains, Hosting & WordPress Setup',
        desc: 'Start by learning how websites are hosted and how to establish your online presence professionally.',
      },
      {
        week: '02',
        title: 'Week 2: Building Your Website Structure',
        desc: 'Learn how to organize your website and create a solid foundation for users to navigate easily.',
      },
      {
        week: '03',
        title: 'Week 3: Website Design With Elementor & Gutenberg',
        desc: 'Learn how to visually design professional websites without writing code.',
      },
      {
        week: '04',
        title: 'Week 4: Content Creation, Blogging & SEO Fundamentals',
        desc: 'Learn how to create content that attracts visitors and improves search visibility.',
      },
      {
        week: '05',
        title: 'Week 5: Essential Plugins, Security & Performance Optimization',
        desc: "Learn how to improve your website's functionality, speed, and security.",
      },
      {
        week: '06',
        title: 'Week 6: Website Launch, Maintenance & Client Readiness',
        desc: 'Prepare your website for launch and learn how to maintain it professionally.',
      },
    ],
  },

  'frontend-development': {
    id: 'frontend-development',
    slug: 'frontend-development',
    title: 'Frontend Development',
    tag: 'Live Cohort Learning',
    headline: 'Frontend Development',
    sub: 'Learn frontend development through live mentorship, practical projects, and collaborative learning. Build industry-ready skills in HTML, CSS, JavaScript, and React while shipping real, responsive websites.',
    duration: '12 Weeks',
    startDate: 'Starts 22nd of Aug 2026',
    mode: 'Live on Google Meet',
    curriculumTitle: "What you'll be able to do this  after this Bootcamp",
    curriculum: [
      {
        week: '01',
        title: 'Week 1: Web Development Foundations',
        desc: 'Understand how the web works and learn the building blocks of every website.',
      },
      {
        week: '02',
        title: 'Week 2: Modern CSS & Visual Styling',
        desc: 'Learn how to transform plain HTML into beautiful, professional interfaces.',
      },
      {
        week: '03',
        title: 'Week 3: Responsive Website Development',
        desc: 'Build websites that work seamlessly across devices.',
      },
      {
        week: '04',
        title: 'Week 4: JavaScript Fundamentals',
        desc: 'Add logic and interactivity to your websites..',
      },
      {
        week: '05',
        title: 'Week 5:  Advanced JavaScript & Problem Solving',
        desc: 'Develop the thinking process required for frontend development.',
      },
      {
        week: '06',
        title: 'Week 6: Git, GitHub & Developer Workflows',
        desc: 'Learn how modern developers collaborate and manage code.',
      },
      {
        week: '07',
        title: 'Week 7: React Fundamentals',
        desc: 'Learn the framework used by modern frontend teams.',
      },
      {
        week: '08',
        title: 'Week 8: Advanced React Development',
        desc: 'Take your React skills further by creating larger applications.',
      },
      {
        week: '09',
        title: 'Week 9: Working With APIs & Real Data.',
        desc: 'Connect applications to external services and dynamic content.',
      },
      {
        week: '10',
        title: 'Week 10: Frontend Performance & Professional Development',
        desc: 'Learn how to build production-ready applications.',
      },
      {
        week: '11',
        title: 'Week 11: Portfolio Project Development',
        desc: "Apply everything you've learned to a real-world project.",
      },
      {
        week: '12',
        title: 'Week 12: Deployment, Career Preparation & Demo Day',
        desc: 'Launch your project and prepare for opportunities in frontend development.',
      },
    ],
  },
};

// Aliases for flexible routing
coursesData['uiux'] = coursesData['product-ui-ux-design'];
coursesData['ui-ux'] = coursesData['product-ui-ux-design'];
coursesData['wordpress'] = coursesData['wordpress-website-design'];
coursesData['frontend'] = coursesData['frontend-development'];

export { coursesData };
export default coursesData;

/** Ordered list used by CoursesPage listing and sub-page switcher tabs. */
export const courseList = [
  coursesData['product-ui-ux-design'],
  coursesData['wordpress-website-design'],
  coursesData['frontend-development'],
];
