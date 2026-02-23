import { cn, getInitials } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "muted" | "purple" | "accent";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[#1e3a8a]/10 text-[#1e3a8a]",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-sky-100 text-sky-700",
  muted: "bg-(--bg-muted) text-(--text-muted)",
  purple: "bg-purple-100 text-purple-700",
  accent: "bg-amber-100 text-amber-700",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-[#1e3a8a]",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-sky-500",
  muted: "bg-slate-400",
  purple: "bg-purple-500",
  accent: "bg-amber-500",
};

export function Badge({ variant = "default", size = "sm", className, children, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full",
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1",
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])} />}
      {children}
    </span>
  );
}

// Avatar
interface AvatarProps {
  name?: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  online?: boolean;
  className?: string;
}

const sizeMap = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-10 h-10 text-sm",
  xl: "w-12 h-12 text-base",
};

const colors = [
  "bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500",
  "bg-pink-500", "bg-indigo-500", "bg-teal-500", "bg-rose-500"
];

function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({ name = "", src, size = "md", online, className }: AvatarProps) {
  const bg = stringToColor(name);
  return (
    <div className={cn("relative shrink-0", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center text-white font-semibold overflow-hidden",
          sizeMap[size],
          !src && bg
        )}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span>{getInitials(name || "?")}</span>
        )}
      </div>
      {online !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-(--bg-surface)",
            size === "xs" || size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5",
            online ? "bg-emerald-500" : "bg-slate-400"
          )}
        />
      )}
    </div>
  );
}
