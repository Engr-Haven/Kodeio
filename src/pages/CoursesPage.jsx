import PlaceholderPage from '../components/PlaceholderPage';

/**
 * PLACEHOLDER — the Courses page is still to be written.
 *
 * The bootcamp overview currently lives in the `Bootcamps` section on the home
 * page (`#courses`). Swap this out for the real catalogue when it is ready.
 */
export default function CoursesPage() {
  return (
    <PlaceholderPage
      title="Courses"
      lede="Our full course catalogue is on its way. In the meantime, the bootcamp overview and pricing are on the home page."
      actions={[
        { label: 'See Current Bootcamps', to: '/#courses', arrow: true },
        { label: 'Talk to Us', to: '/contact', variant: 'outline' },
      ]}
    />
  );
}