export default function FeedbackMessage({children, message, variant='default'}) {
  const baseClasses = 'rerlative border rounded-lg mb-4 p-4 px-6';
  const defaultClasses = 'bg-slate-100 border-slate-400 text-slate-700';
  const successClasses = 'bg-green-100 border-green-400 text-green-700';
  const errorClasses = 'bg-red-100 border-red-400 text-red-700';
  const warningClasses = 'bg-yellow-100 border-yellow-400 text-yellow-700';

  let variantClasses = defaultClasses;
  switch(variant) {
    case 'success':
      variantClasses = successClasses;
      break;
    case 'error':
      variantClasses = errorClasses;
      break;
    case 'warning':
      variantClasses = warningClasses;
      break;
    default:
      variantClasses = defaultClasses;
  }

  return (
    <div className={`${baseClasses} ${variantClasses}`} role="alert">
      <span className="block sm:inline">{children || message}</span>
    </div>
  )
}