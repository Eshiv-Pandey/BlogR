import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="state-panel error-panel">
      <AlertCircle size={44} />
      <h3>Something went wrong</h3>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
