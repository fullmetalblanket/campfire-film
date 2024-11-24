export default function Container({ 
    children,
    padding=true,
    className,
    background = true,
  }) {

  const paddingClass = padding ? 'p-3' : '';
  const backgroundClass = background ? 'bg-gray-800/70' : '';

  return (
    <div className={`shadow-md rounded-md border border-slate-700 overflow-hidden mb-6 ${paddingClass} ${backgroundClass} ${className}`}>
      {children}
    </div>
  )
}
