import React from "react";
import { useGetLists, useSoftDeleteList } from "../hooks/api/lists";
import { useCurrentUser } from "../hooks/api/user";
import ListsGrid from "../components/lists-grid";
import { ListSummary } from "../types/list-summary";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";

const ListsSharedWithMe = () => {
  const navigate = useNavigate();
  const { lists, loading, error } = useGetLists();
  const { responseData: currentUser, loading: isUserLoading } =
    useCurrentUser();
  const { softDeleteList } = useSoftDeleteList();

  const handleOpenList = (list: ListSummary) => {
    navigate(`/lists/${list._id}`);
  };

  const handleRemoveList = (list: ListSummary) => {
    softDeleteList(list._id);
  };

  if (loading || isUserLoading || !currentUser || error) {
    return (
      <Loader
        loading={loading || isUserLoading}
        error={error}
        isEmpty={!lists}
        emptyState={<>EmptyState - Aún no te han compartido ninguna lista</>}
      />
    );
  }

  const sharedWithMe: ListSummary[] = lists.filter((list) => {
    return list.owner !== currentUser!.email;
  });

  return (
    <>
      <h1 className="text-xl font-semibold my-5">Listas compartidas conmigo</h1>
      <ListsGrid
        lists={sharedWithMe}
        onOpenList={handleOpenList}
        onRemoveList={handleRemoveList}
      />
    </>
  );
};

export default ListsSharedWithMe;
