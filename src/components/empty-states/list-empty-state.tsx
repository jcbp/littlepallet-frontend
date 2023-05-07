import React from "react";
import { Card } from "react-bootstrap";

const ListEmptyState = () => {
  return (
    <Card className="mt-4">
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <i className="bi bi-exclamation-circle fs-2 text-secondary" />
        <Card.Title>No se puede mostrar la lista</Card.Title>
        <Card.Text className="text-secondary">
          Asegurate que la lista exista y tengas permisos para verla
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ListEmptyState;
