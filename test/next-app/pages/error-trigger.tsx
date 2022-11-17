import type { NextPage } from 'next';

const ErrorTrigger: NextPage = () => {
  const triggerError = () => {
    throw new Error('42');
  };

  return (
    <div>
      <button onClick={triggerError}>Trigger Error</button>
    </div>
  );
};

export default ErrorTrigger;
