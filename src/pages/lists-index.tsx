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
import Button from "../components/common/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import ModalDialog from "../components/common/modal-dialog";
import CreateListDialog from "../components/create-list-dialog";
import clsx from "clsx";
import Fab from "../components/common/fab";

const ListsIndex = () => {
  const navigate = useNavigate();
  const { lists, loading, error } = useGetLists();
  const { responseData: currentUser, loading: isUserLoading } =
    useCurrentUser();
  const { createList } = useCreateList();
  const { softDeleteList } = useSoftDeleteList();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const myLists: ListSummary[] = [];
  const sharedByMe: ListSummary[] = [];
  const sharedWithMe: ListSummary[] = [];

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

  lists.forEach((list) => {
    if (
      (!list.users || !list.users.length) &&
      list.owner === currentUser!.email
    ) {
      myLists.push(list);
    } else if (
      list.owner === currentUser!.email &&
      list.users &&
      list.users.length > 0
    ) {
      sharedByMe.push(list);
    } else if (list.owner !== currentUser!.email) {
      sharedWithMe.push(list);
    }
  });

  return (
    <>
      <div className="flex my-1 pt-4 pb-2 justify-between items-center">
        <h1 className="text-xl font-semibold">Mis listas</h1>
        <span className="flex items-center">
          <Fab
            text="Nueva lista"
            startIcon={PlusIcon}
            onClick={() => setIsModalOpen(true)}
            className={clsx("sm:ps-2 sm:pe-4", false ? "cursor-progress" : "")}
          />
        </span>
      </div>
      <ListsGrid
        lists={myLists}
        onOpenList={handleOpenList}
        onRemoveList={handleRemoveList}
      />
      <h1 className="text-xl font-semibold my-5">Listas compartidas por mí</h1>
      <ListsGrid
        lists={sharedByMe}
        onOpenList={handleOpenList}
        onRemoveList={handleRemoveList}
      />
      <h1 className="text-xl font-semibold my-5">Listas compartidas conmigo</h1>
      <ListsGrid
        lists={sharedWithMe}
        showOwner={true}
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

export default ListsIndex;
