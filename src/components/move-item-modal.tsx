import React, { useState, useEffect } from "react";
import ModalDialog from "./common/modal-dialog";

interface MoveItemModalProps {
  isOpen: boolean;
  itemId: string | null;
  onClose: () => void;
  onConfirm: (position: number) => void;
}

const MoveItemModal: React.FC<MoveItemModalProps> = ({
  isOpen,
  itemId,
  onClose,
  onConfirm,
}) => {
  const [targetPosition, setTargetPosition] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setTargetPosition("");
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (targetPosition.trim() !== "") {
      onConfirm(parseInt(targetPosition, 10));
    }
  };

  return (
    <ModalDialog
      isOpen={isOpen}
      onClose={onClose}
      title={itemId ? `Mover item #${itemId}` : "Mover item"}
    >
      <div className="mt-2">
        <p className="text-sm text-gray-500 mb-4">
          Ingrese la nueva posición.
        </p>
        <input
          type="number"
          min="0"
          className="w-full rounded-md border-gray-300 py-2 px-3 shadow-sm border focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={targetPosition}
          onChange={(e) => setTargetPosition(e.target.value)}
          placeholder="Ej. 0 para el inicio"
        />
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={targetPosition.trim() === ""}
          onClick={handleConfirm}
        >
          Aceptar
        </button>
      </div>
    </ModalDialog>
  );
};

export default MoveItemModal;
