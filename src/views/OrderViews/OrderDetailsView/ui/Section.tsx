const Section = ({ title, children }) => (
  <section className="mb-8">
    <div className="mb-4 flex justify-between">
      <h1 className="text-lg font-medium text-neutral-600 dark:text-neutral-300">
        {title}
      </h1>
    </div>
    {children}
  </section>
);

export default Section
