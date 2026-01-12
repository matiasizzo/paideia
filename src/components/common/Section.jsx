export const Section = ({ children, id, bgColor = "bg-paideia-cream", className = "" }) => {
  return (
    <section id={id} className={`${bgColor} py-20 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
};
