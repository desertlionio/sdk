import type { NextPage } from 'next';

const ErrorTrigger: NextPage = () => {
  const triggerError = () => {
    const a = undefined;
    // @ts-ignore
    a.test;
  };

  return (
    <div>
      <button onClick={triggerError}>Trigger Error</button>
    </div>
  );
};

export default ErrorTrigger;
