export function Badge({ children, variant = 'wood', className = '' }) {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className = ''
}) {
  return (
    <div className={`section-header ${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      {title && <h2>{title}</h2>}
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
