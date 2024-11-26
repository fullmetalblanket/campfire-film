import Spinner from '@/components/ui/Spinner';
import Container from '@/components/layout/Container';

export default function LoadingOverlay({ 
    text="loading...", 
    position="absolute",
    title,
    description,
    showBackground=true,
  }) {

  return (
    <div className={`${position} ${showBackground ? 'bg-white/65' : ''} top-0 left-0 w-full h-full bg-opacity-50 flex items-center justify-center z-10`}>
      <Container className="max-w-sm mt-[-5%] bg-white shadow-lg" background={false}>
        <div className="text-center">
          {title && <h2 className={`text-2xl font-bold ${description ? 'mb-2' : 'mb-5'}`}>{title}</h2>}
          {description && <p className="text-gray-600 mb-5">{description}</p>}
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="">
            <Spinner height={40} width={40} />
          </div>
          <div className="mt-4">
            { text }
          </div>
        </div>
      </Container>
    </div>
  )
}