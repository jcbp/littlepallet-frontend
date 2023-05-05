import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { Card, Form, Button } from "react-bootstrap";

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await login({ email, password });
      navigate("/lists");
    } catch (error) {
      setError("Email o contraseña incorrectos");
    }
  }

  return (
    <div className="min-h-screen d-flex align-items-center justify-content-center py-12 px-4 sm:px-6 lg:px-8">
      <Card style={{ width: "32rem" }} className="p-4">
        <Card.Body>
          <Card.Title className="text-center text-3xl fw-bolder text-black text-opacity-75">
            Iniciar sesión
          </Card.Title>
          <Form className="mt-8 py-5" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="pb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="pb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Recordarme" />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <a href="#" className="ml-2 block text-sm text-gray-900">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <Button variant="primary" type="submit">
                Iniciar sesión
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginPage;
