import { useState } from "react";
import { Form } from "react-bootstrap";

export default function LoginPage() {


  const [name, setName] = useState("")

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value)
  }

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>이름</Form.Label>
          <Form.Control name="name" value={name} onChange={handleChange} />
        </Form.Group>
      </Form>
    </div>
  );
}
