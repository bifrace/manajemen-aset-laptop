export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl p-4 shadow-md ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`text-sm ${className}`}>
      {children}
    </div>
  );
}
