
export default function T({ en, bn, as: Tag = "span", className = "" }) {
  return (
    <>
      <Tag className={`lang-en ${className}`}>{en}</Tag>
      <Tag className={`lang-bn ${className}`}>{bn ?? en}</Tag>
    </>
  );
}