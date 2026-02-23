import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  glow?: boolean;
}

export function Card({ className, children, padding = "md", hover = false, glow = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-(--bg-surface) border border-(--border-color) rounded-2xl shadow-xs transition-all duration-200",
        padding === "sm" && "p-4",
        padding === "md" && "p-5",
        padding === "lg" && "p-6",
        hover && "hover:shadow-md hover:border-(--border-strong) hover:-translate-y-0.5 cursor-pointer",
        glow && "card-glow",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex items-center justify-between mb-4", className)}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={cn("font-display font-semibold text-(--text-primary) tracking-tight", className)}>{children}</h3>;
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("", className)}>{children}</div>;
}
