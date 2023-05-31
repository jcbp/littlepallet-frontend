import React from "react";
import ListsGrid from "../components/lists-grid";
import { ListSummary } from "../types/list-summary";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import {
  useGetDeletedLists,
  useHardDeleteList,
} from "../hooks/api/deleted-lists";

const Trash = () => {
  const navigate = useNavigate();
  const { responseData: deletedLists, loading, error } = useGetDeletedLists();
  const { hardDeleteList } = useHardDeleteList();

  const handleOpenList = (template: ListSummary) => {
    navigate(`/lists/${template._id}`);
  };

  const handleRemoveList = (list: ListSummary) => {
    // TODO: agregar confirmación antes de eliminar
    hardDeleteList(list._id);
    // TODO: actualizar el estado del listado de listas
    // (pendiente del refactor de usar un reducer para mutar el estado de las listas)
  };

  if (loading || error) {
    return (
      <Loader
        loading={loading}
        error={error}
        isEmpty={!deletedLists}
        emptyState={<>EmptyState - No hay listas eliminadas para mostrar</>}
      />
    );
  }

  return (
    <>
      <h1 className="text-xl font-semibold my-5">Listas eliminadas</h1>
      <ListsGrid
        lists={deletedLists ?? []}
        onOpenList={handleOpenList}
        onRemoveList={handleRemoveList}
      />
    </>
  );
};

export default Trash;
