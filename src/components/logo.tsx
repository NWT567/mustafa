import mustafaHorizontalLogo from "@/assets/Mustafa_logo-horizontal.webp";

export function Logo({
  className = "h-9 w-9",
  showWordmark = false,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  const resolvedClassName = showWordmark
    ? `${className} w-auto max-w-[14rem]`
    : className;

  return (
    <span className="inline-flex items-center gap-2">
      <img
        src={showWordmark ? mustafaHorizontalLogo : "/mustafa-mark.svg"}
        alt="Mustafa Coffee House"
        className={`shrink-0 object-contain ${resolvedClassName}`}
        loading={showWordmark ? "eager" : "lazy"}
        decoding="async"
      />
    </span>
  );
}
