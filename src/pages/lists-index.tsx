import React from "react";
import { useGetLists } from "../hooks/api/list";
import { useCurrentUser } from "../hooks/api/user";
import ListsGrid from "../components/lists-grid";
import { ListSummary } from "../types/list-summary";
import { useNavigate } from "react-router-dom";
import ListsEmptyState from "../components/empty-states/lists-empty-state";
import Loader from "../components/loader";

const ListsIndex = () => {
  const navigate = useNavigate();
  const { responseData: lists, loading: isLoading, error } = useGetLists();
  const { responseData: currentUser, loading: isUserLoading } =
    useCurrentUser();
  const myLists: ListSummary[] = [];
  const sharedByMe: ListSummary[] = [];
  const sharedWithMe: ListSummary[] = [];

  const handleCreateList = () => {
    // create list
  };

  const handleClick = (list: ListSummary) => {
    navigate(`/lists/${list._id}`);
  };

  if (!lists || isLoading || isUserLoading || error) {
    return (
      <Loader
        loading={isLoading || isUserLoading}
        error={error}
        isEmpty={!lists}
        emptyState={<ListsEmptyState onCreateList={handleCreateList} />}
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
      <ListsGrid title="Mis listas" lists={myLists} onClick={handleClick} />
      <ListsGrid
        title="Listas compartidas por mí"
        lists={sharedByMe}
        onClick={handleClick}
      />
      <ListsGrid
        title="Listas compartidas conmigo"
        lists={sharedWithMe}
        onClick={handleClick}
      />
    </>
  );
};

export default ListsIndex;
