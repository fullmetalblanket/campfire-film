export default function UserIcon({ className, height = 26, width = 26, color = 'currentColor' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
      width={width}
      height={height}
      className={className}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M12 14c-5 0-9 4-9 4v2h18v-2s-4-4-9-4z" />
    </svg>
  )
}