export function LoadingIndicator() {
  return (
    <div className="loading-indicator" data-testid="loading-indicator">
      <span>Thinking</span>
      <span className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </div>
  );
}
