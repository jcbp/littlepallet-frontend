import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const ListEmptyState = () => {
  return (
    <div className="mt-4 bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col items-center justify-center">
        <ExclamationCircleIcon className="h-8 w-8 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900 mt-4">
          No se puede mostrar la lista
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Asegúrate de que la lista exista y tengas permisos para verla
        </p>
      </div>
    </div>
  );
};

export default ListEmptyState;
