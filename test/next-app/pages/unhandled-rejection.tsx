import type { NextPage } from 'next';

const UnhandledRejectionTrigger: NextPage = () => {
  const triggerUnhandledRejection = () => {
    Promise.reject(42);
  };

  return (
    <div>
      <button onClick={triggerUnhandledRejection}>
        Trigger Unhandled Rejection
      </button>
    </div>
  );
};

export default UnhandledRejectionTrigger;
