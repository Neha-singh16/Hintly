interface HintResponseProps {
  hint: string;
}

export function HintResponse({ hint }: HintResponseProps) {
  // Format the hint with proper line breaks and emoji styling
  const formatHint = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return null;
      
      // Style emoji headers
      if (trimmedLine.match(/^[💡🎯⚡🔑✨]/)) {
        return (
          <div key={index} style={{ 
            fontWeight: '600', 
            fontSize: '14px',
            marginTop: index > 0 ? '12px' : '0',
            marginBottom: '6px',
            color: 'var(--accent-blue)'
          }}>
            {trimmedLine}
          </div>
        );
      }
      
      // Style bullet points
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
        return (
          <div key={index} style={{ 
            paddingLeft: '16px',
            marginBottom: '4px',
            lineHeight: '1.6'
          }}>
            {trimmedLine}
          </div>
        );
      }
      
      // Regular lines
      return (
        <div key={index} style={{ 
          marginBottom: '6px',
          lineHeight: '1.6'
        }}>
          {trimmedLine}
        </div>
      );
    });
  };

  return (
    <div className="hint-response scrollbar" data-testid="hint-response">
      <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
        {formatHint(hint)}
      </div>
    </div>
  );
}
