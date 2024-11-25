export default function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="p-6 rounded-lg border border-orange-500/20 bg-card hover:bg-orange-500/5 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}