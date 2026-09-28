import { Badge } from "@/components/ui/badge";

export default function ProfileDetailItem({
  icon: Icon,
  iconBg = "bg-primary/10",
  iconColor = "text-primary",
  label,
  value,
  badge,
  href,
  children,
  className = "",
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {Icon && (
        <div
          className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          <Icon className="size-4" />
        </div>
      )}

      <div className="min-w-0">
        {label && <p className="text-muted-foreground text-[11px] font-medium">{label}</p>}

        {children ? (
          children
        ) : (
          <div className="flex flex-wrap items-center gap-1.5">
            {href ? (
              <a
                href={href}
                className="text-foreground hover:text-primary block truncate text-xs font-semibold transition-colors"
                title={typeof value === "string" ? value : undefined}
              >
                {value}
              </a>
            ) : (
              <span className="text-foreground truncate text-xs font-semibold">{value}</span>
            )}

            {badge && (
              <Badge
                variant="outline"
                className="border-border/60 text-muted-foreground px-1.5 py-0 text-[10px] font-normal"
              >
                {badge}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
