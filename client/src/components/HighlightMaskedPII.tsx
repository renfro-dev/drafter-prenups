/**
 * Component to visually highlight masked PII tokens for unauthenticated users
 * Highlights [ENCRYPTED] and $***,*** values with distinct styling
 */

interface HighlightMaskedPIIProps {
  text: string;
  className?: string;
}

export function HighlightMaskedPII({ text, className = "" }: HighlightMaskedPIIProps) {
  // Pattern to match encrypted tokens: [ENCRYPTED] and $***,***
  const encryptedPattern = /(\[ENCRYPTED\]|\$\*\*\*,\*\*\*)/g;
  
  // Split text by encrypted tokens and preserve them
  const parts = text.split(encryptedPattern);
  
  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Check if this part is an encrypted token
        if (part === '[ENCRYPTED]') {
          return (
            <span 
              key={index}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted/60 border border-border text-muted-foreground font-mono text-sm"
              title="Sign in to see your personal information"
            >
              🔒 [ENCRYPTED]
            </span>
          );
        } else if (part === '$***,***') {
          return (
            <span 
              key={index}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted/60 border border-border text-muted-foreground font-mono text-sm"
              title="Sign in to see exact amounts"
            >
              💰 $***,***
            </span>
          );
        }
        // Return regular text as-is
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}
