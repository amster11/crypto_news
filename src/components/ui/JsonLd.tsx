type JsonLdProps = { data: Record<string, unknown> | null | Array<Record<string, unknown> | null> };

/** Renders one or more Schema.org objects; null entries are skipped. */
export function JsonLd({ data }: JsonLdProps) {
  const items = (Array.isArray(data) ? data : [data]).filter(
    (item): item is Record<string, unknown> => item !== null,
  );
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
