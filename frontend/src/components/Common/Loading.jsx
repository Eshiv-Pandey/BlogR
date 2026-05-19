const Loading = ({ text = 'Loading…' }) => {
  return (
    <div className="loading-container">
      <div className="loading-inner">
        <div className="loading-ring">
          <div /><div /><div /><div />
        </div>
        <p className="loading-text">{text}</p>
      </div>
    </div>
  );
};

export default Loading;
