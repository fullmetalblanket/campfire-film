export default function PageContainer({ children, className }) {
  return  (
    <div className={`max-w-3xl min-h-[300px] mx-auto flex-grow container px-4 sm:px-6 lg:px-8 py-0 pt-6 md:pt-7 ${className}`}>
      {children}
    </div>
  )
}