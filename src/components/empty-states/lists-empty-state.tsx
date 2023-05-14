import React from "react";
import {
  DocumentMagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Button from "../common/button";

interface EmptyStateProps {
  onCreateList: () => void;
}

const ListsEmptyState: React.FC<EmptyStateProps> = ({ onCreateList }) => {
  return (
    <div className="mt-4 bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col items-center justify-center">
        <DocumentMagnifyingGlassIcon className="h-8 w-8 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900 mt-4">
          No hay listas para mostrar
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Agrega una nueva lista para comenzar
        </p>
        <Button onClick={onCreateList}>
          <PlusIcon className="h-5 w-5 mr-1" />
          Crear lista
        </Button>
      </div>
    </div>
  );
};

export default ListsEmptyState;
