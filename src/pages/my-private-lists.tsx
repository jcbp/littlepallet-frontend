import React, { useState } from "react";
import {
  useCreateList,
  useGetLists,
  useSoftDeleteList,
} from "../hooks/api/lists";
import { useCurrentUser } from "../hooks/api/user";
import ListsGrid from "../components/lists-grid";
import { ListSummary } from "../types/list-summary";
import { useNavigate } from "react-router-dom";
import ListsEmptyState from "../components/empty-states/lists-empty-state";
import Loader from "../components/loader";
import { PlusIcon } from "@heroicons/react/24/outline";
import ModalDialog from "../components/common/modal-dialog";
import CreateListDialog from "../components/create-list-dialog";
import clsx from "clsx";
import Fab from "../components/common/fab";

const MyPrivateLists = () => {
  const navigate = useNavigate();
  const { lists, loading, error } = useGetLists();
  const { responseData: currentUser, loading: isUserLoading } =
    useCurrentUser();
  const { createList } = useCreateList();
  const { softDeleteList } = useSoftDeleteList();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateList = (name: string) => {
    setIsModalOpen(false);
    createList(name);
  };

  const handleOpenList = (list: ListSummary) => {
    navigate(`/lists/${list._id}`);
  };

  const handleRemoveList = (list: ListSummary) => {
    softDeleteList(list._id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading || isUserLoading || !currentUser || error) {
    return (
      <Loader
        loading={loading || isUserLoading}
        error={error}
        isEmpty={!lists}
        emptyState={
          <ListsEmptyState onCreateList={() => setIsModalOpen(true)} />
        }
      />
    );
  }

  const privateLists: ListSummary[] = lists.filter((list) => {
    return (
      list.owner === currentUser!.email && (!list.users || !list.users.length)
    );
  });

  return (
    <>
      <div className="flex my-1 pt-4 pb-2 justify-between items-center">
        <h1 className="text-xl font-semibold">Mis listas personales</h1>
        <span className="flex items-center">
          <Fab
            text="Nueva lista"
            startIcon={PlusIcon}
            onClick={() => setIsModalOpen(true)}
            className={clsx(false ? "cursor-progress" : "")}
          />
        </span>
      </div>
      <ListsGrid
        lists={privateLists}
        onOpenList={handleOpenList}
        onRemoveList={handleRemoveList}
      />

      <ModalDialog
        title="Crear nueva lista"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <CreateListDialog onCreateList={handleCreateList} />
      </ModalDialog>
    </>
  );
};

export default MyPrivateLists;
