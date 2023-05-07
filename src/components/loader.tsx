import { ReactNode } from "react";
import { Spinner, Alert } from "react-bootstrap";

interface Props {
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  emptyState: ReactNode;
  children?: ReactNode;
}

const Loader: React.FC<Props> = ({
  loading,
  error,
  isEmpty,
  emptyState,
  children,
}) => {
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: "-120px" }}
      >
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        Ha ocurrido un error: {error}
      </Alert>
    );
  }

  if (isEmpty) {
    return <>{emptyState}</>;
  }

  if (children) {
    return <>{children}</>;
  }

  return null;
};

export default Loader;
