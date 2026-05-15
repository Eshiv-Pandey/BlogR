import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-icon-wrap">
        <AlertCircle size={32} />
      </div>
      <h3 className="error-title">Something went wrong</h3>
      <p className="error-desc">{message || 'An unexpected error occurred. Please try again.'}</p>
      {onRetry && (
        <button className="btn btn-primary mt-3" onClick={onRetry}>
          <RefreshCw size={15} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
