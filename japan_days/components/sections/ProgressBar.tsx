type Props = { progress: number };

export function ProgressBar({ progress }: Props) {
  return (
    <div className="bg-muted fixed top-0 right-0 left-0 z-50 h-1">
      <div
        className="bg-accent h-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
