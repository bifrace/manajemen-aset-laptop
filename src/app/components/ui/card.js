export function Card({ children, className }) {
    return (
      <div className={`rounded-xl bg-white/10 p-4 shadow-md ${className}`}>
        {children}
      </div>
    )
  }
  
  export function CardContent({ children, className }) {
    return (
      <div className={`text-sm text-white ${className}`}>
        {children}
      </div>
    )
  }
  