import React from "react";
import { Card, Button } from "react-bootstrap";

interface EmptyStateProps {
  onCreateList: () => void;
}

const ListsEmptyState: React.FC<EmptyStateProps> = ({ onCreateList }) => {
  return (
    <Card className="mt-4">
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <i className="bi bi-file-earmark-x fs-2 text-secondary" />
        <Card.Title>No hay listas para mostrar</Card.Title>
        <Card.Text className="text-secondary">
          Agregá una nueva lista para comenzar
        </Card.Text>
        <Button onClick={onCreateList} className="d-flex align-items-center">
          <i className="bi bi-plus me-1 fs-5" />
          Crear lista
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ListsEmptyState;
