import "./button.css";

export function StartButton({ handleStartButtonClick, children }) {
  return (
    <div>
      <button
        type="button"
        className="start-button"
        onClick={handleStartButtonClick}
      >
        {children}
      </button>
    </div>
  );
}

export function StopButton({ handleStopButton }) {
  return (
    <div>
      <button
        type="button"
        className="stop-button"
        onClick={handleStopButton}
      ></button>
    </div>
  );
}
