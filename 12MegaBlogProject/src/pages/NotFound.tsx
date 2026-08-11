import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  // Safely step back in history or fall back to home
  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <main 
      className="flex min-h-[80vh] items-center justify-center p-8 text-center font-sans" 
      role="main" 
      aria-labelledby="not-found-title"
    >
      <div className="w-full max-w-md">
        {/* Visual 404 Header */}
        <span 
          className="block text-8xl font-extrabold tracking-tighter text-red-500 mb-4 select-none" 
          aria-hidden="true"
        >
          404
        </span>
        
        {/* Semantic Title */}
        <h1 
          id="not-found-title" 
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4"
        >
          Page not found
        </h1>
        
        {/* Accessible Message */}
        <p className="text-lg leading-relaxed text-gray-600 mb-10">
          The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleGoBack}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            type="button"
          >
            ← Go Back
          </button>
          
          <button 
            onClick={() => navigate('/', { replace: true })}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 cursor-pointer shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            type="button"
          >
            Take Me Home
          </button>
        </div>
      </div>
    </main>
  );
}
