import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div style={{ marginTop: 15 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '50%',
          margin: '0 auto',
        }}
      >
        <label>Password Field</label>
        <input type="password" />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '50%',
          margin: '0 auto',
        }}
      >
        <label>Regular Field</label>
        <input type="text" />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '50%',
          margin: '0 auto',
        }}
      >
        <label>Credit Card Field</label>
        <input type="text" className="Credit-Card" />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '50%',
          margin: '0 auto',
        }}
      >
        <label>Credit Card Field</label>
        <input type="text" className="credit-card" />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '50%',
          margin: '0 auto',
        }}
      >
        <label>Credit Card Field</label>
        <input type="text" className="credit-card" />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '50%',
          margin: '0 auto',
        }}
      >
        <label>Credit Card Field</label>
        <input type="text" data-private />
      </div>
    </div>
  );
};

export default Home;
