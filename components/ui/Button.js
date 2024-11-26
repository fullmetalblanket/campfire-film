export default function Button({ children, onClick, variant="primary", size="md", icon, className, disabled }) {

  const Icon = icon;
  const iconClasses = icon ? 'flex items-center justify-center' : '';
  let iconSizes = {height: 14, width: 14};
  switch (size) {
    case 'xs' || 'extra-small':
      iconSizes = {height: 16, width: 16};
      break;
    case 'sm' || 'small':
      iconSizes = {height: 18, width: 18};
      break;
    case 'lg':
      iconSizes = {height: 22, width: 22};
      break;
    case 'xl':
      iconSizes = {height: 24, width: 24};
      break;
    default:
      iconSizes = {height: 20, width: 20};
  }

  const baseClasses = `font-bold py-0 rounded-lg tracking-widest uppercase disabled:opacity-50 disabled:pointer-events-none ${iconClasses}`;
  const primaryClasses = `${baseClasses} bg-orange-500 text-white hover:bg-orange-600`;
  const secondaryClasses = `${baseClasses} bg-gray-400 text-white hover:bg-gray-500`;
  const outlineClasses = `${baseClasses} border border-gray-400 text-gray-600 bg-white hover:text-black hover:bg-gray-100`;
  const addToCartClasses = `${baseClasses} bg-green-600 text-white hover:bg-green-500`;
  const errorClasses = `${baseClasses} bg-red-600 text-white hover:bg-red-500`;

  const paddingExtraSmall = variant && (size === 'xs' || size === 'extra-small') ? 'px-4 min-h-8' : '';
  const paddingSmall = variant && (size === 'sm' || size === 'small') ? 'px-4 min-h-9' : '';
  const paddingDefault = variant && (size === 'md' || size === 'medium')  ? 'px-6 min-h-11' : '';
  const paddingLarge = variant && (size === 'lg' || size === 'large') ? 'px-10 min-h-12' : '';
  const paddingExtraLarge = variant && (size === 'xl' || size === 'extra-large') ? 'px-12 min-h-14' : '';

  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses = primaryClasses;
      break;
    case 'secondary':
      variantClasses = secondaryClasses;
      break;
    case 'outline':
      variantClasses = outlineClasses
      break;
    case 'buy':
      variantClasses = addToCartClasses;
      break;
    case 'error':
      variantClasses = errorClasses;
      break;
    default:
      variantClasses = 'tracking-widest hover:underline';
  }
  let sizeClasses = '';
  switch (size) {
    case 'xs' || 'extra-small':
      sizeClasses = `text-xs ${paddingExtraSmall} `;
      break;
    case 'sm' || 'small':
      sizeClasses = `text-sm ${paddingSmall} `;
      break;
    case 'lg':
      sizeClasses = `text-lg ${paddingLarge} `;
      break;
    case 'xl':
      sizeClasses = `text-xl ${paddingExtraLarge} `;
      break;
    default:
      sizeClasses = `text-md ${paddingDefault} `;
  }

  return (
    <button 
      className={`${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <Icon className="mr-2 -mt-[1px]" {...iconSizes} />}
      <span>{ children }</span>
    </button>
  )
}