interface SourceItem {
  label: string;
  url: string;
}

interface SourcesListProps {
  title?: string;
  sources: SourceItem[];
}

export function SourcesList({ title = "Sources", sources }: SourcesListProps) {
  if (!sources || sources.length === 0) return null;
  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <ul className="list-disc pl-6 space-y-2">
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}


