import { ReactNode } from "react";

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
      <div className="flex justify-center items-center h-screen mt-[-120px]">
        <div className="animate-spin rounded-full border-blue-300 border-t-2 border-b-2 h-8 w-8 mr-2"></div>
        <span className="text-primary">Cargando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-3">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Ha ocurrido un error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
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
