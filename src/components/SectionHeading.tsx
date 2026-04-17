type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div className={isCentered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">{body}</p>
    </div>
  );
}
