import PlaceholderPage from '../components/PlaceholderPage';

/**
 * PLACEHOLDER — the Portfolio page is still to be written.
 *
 * The home page `#portfolio` section currently holds four identical placeholder
 * cards, so there is nothing to link through to yet.
 */
export default function PortfolioPage() {
  return (
    <PlaceholderPage
      title="Portfolio"
      lede="Detailed case studies are on their way. A few of our projects are on the home page in the meantime."
      actions={[
        { label: 'See What We’ve Built', to: '/#portfolio', arrow: true },
        { label: 'Start a Project', to: '/contact', variant: 'outline' },
      ]}
    />
  );
}