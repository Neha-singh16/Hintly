interface HintResponseProps {
  hint: string;
}

export function HintResponse({ hint }: HintResponseProps) {
  return (
    <div className="hint-response scrollbar" data-testid="hint-response">
      <p>{hint}</p>
    </div>
  );
}
