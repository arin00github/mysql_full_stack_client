export default function Header(props) {
  const { title } = props;

  return (
    <div className="mt-5 mb-3">
      <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>{title}</h2>
    </div>
  );
}
