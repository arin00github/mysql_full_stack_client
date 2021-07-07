export default function Header(props) {
  const { title } = props;

  return (
    <div className="mt-5 text-center" style={{ marginBottom: "60px" }}>
      <h2 style={{ fontSize: "36px", fontWeight: "bold" }}>{title}</h2>
    </div>
  );
}
