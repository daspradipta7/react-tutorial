import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

export default function GlobalErrorBoundary() {
  const error = useRouteError();

  // Log to an external tracking service like Sentry or LogRocket in production
  console.error('Logged Production Error:', error);

  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-page">
        <h1>Error {error.status}</h1>
        <p>{error.statusText || 'Something went wrong.'}</p>
        <Link to="/">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="error-page">
      <h1>An unexpected error occurred</h1>
      <p>Please refresh the page or try again later.</p>
      <Link to="/">Return Home</Link>
    </div>
  );
}
