export default function StatusLine() {
  return (
    <div className="relative w-full border-b-2 border-dashed">
      <div className="absolute -left-0 top-1/2 h-6 w-3 -translate-y-1/2 transform rounded-r-full bg-accent" />
      <div className="absolute -right-0 top-1/2 h-6 w-3 -translate-y-1/2 transform rounded-l-full bg-accent" />
    </div>
  );
}
