import React, { useState } from "react";
import ListsGrid from "../components/lists-grid";
import { ListSummary } from "../types/list-summary";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import {
  useGetTrashedLists,
  useHardDeleteList,
} from "../hooks/api/trashed-lists";
import ModalDialog from "../components/common/modal-dialog";

const Trash = () => {
  const navigate = useNavigate();
  const { data: trashedLists, isLoading: loading, error } = useGetTrashedLists();
  const { mutate: hardDeleteList } = useHardDeleteList();
  const [listToRemove, setListToRemove] = useState<ListSummary | null>(null);

  const handleOpenList = (template: ListSummary) => {
    navigate(`/lists/${template._id}`);
  };

  const handleRemoveList = (list: ListSummary) => {
    setListToRemove(list);
  };

  const confirmRemoveList = () => {
    if (listToRemove) {
      hardDeleteList(listToRemove._id);
      setListToRemove(null);
    }
  };

  if (loading || error) {
    return (
      <Loader
        loading={loading}
        error={error ? error.message : null}
        isEmpty={!trashedLists || trashedLists.length === 0}
        emptyState={<>EmptyState - No hay listas en la papelera</>}
      />
    );
  }

  return (
    <>
      <h1 className="text-xl font-semibold my-5">Papelera</h1>
      <ListsGrid
        lists={trashedLists ?? []}
        onOpenList={handleOpenList}
        onRemoveList={handleRemoveList}
      />
      <ModalDialog
        isOpen={!!listToRemove}
        onClose={() => setListToRemove(null)}
        title="Eliminar lista permanentemente"
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            ¿Estás seguro que deseas eliminar la lista <strong>{listToRemove?.name}</strong> de forma permanente? Esta acción no se puede deshacer.
          </p>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
            onClick={confirmRemoveList}
          >
            Eliminar
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:mt-0 sm:w-auto sm:text-sm transition-colors duration-200"
            onClick={() => setListToRemove(null)}
          >
            Cancelar
          </button>
        </div>
      </ModalDialog>
    </>
  );
};

export default Trash;
