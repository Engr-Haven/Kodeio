import PlaceholderPage from '../components/PlaceholderPage';

/**
 * PLACEHOLDER — the About Us page is still to be written.
 *
 * It exists as a real route so the navbar and footer links resolve to something
 * today. Swap the markup for the finished page; no routing, navbar, or footer
 * changes will be needed.
 */
export default function AboutPage() {
  return (
    <PlaceholderPage
      title="About Us"
      lede="This page is on its way. Check back shortly for the full story of Kodeio."
      actions={[
        { label: 'View Our Services', to: '/services/web-development', arrow: true },
        { label: 'Explore Bootcamps', to: '/#courses', variant: 'outline' },
      ]}
    />
  );
}