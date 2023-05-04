import React from "react";
import useLists from "../hooks/use-lists";
import useCurrentUser from "../hooks/use-current-user";
import ListsGrid from "../components/lists-grid";
import { ListSummary } from "../types/list-summary";
import { useNavigate } from "react-router-dom";

const ListsIndex = () => {
  const navigate = useNavigate();
  const { lists, isLoading, error } = useLists();
  const { currentUser, isLoading: isUserLoading } = useCurrentUser();

  if (isLoading || isUserLoading) {
    return <p>Cargando listas...</p>;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error}</p>;
  }

  const myLists: ListSummary[] = [];
  const sharedByMe: ListSummary[] = [];
  const sharedWithMe: ListSummary[] = [];

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

  const handleClick = (list: ListSummary) => {
    navigate(`/lists/${list._id}`);
  };

  return (
    <div>
      <div className="flex flex-col">
        <ListsGrid lists={myLists} title="Mis listas" onClick={handleClick} />
        <ListsGrid
          lists={sharedByMe}
          title="Listas compartidas por mí"
          onClick={handleClick}
        />
        <ListsGrid
          lists={sharedWithMe}
          title="Listas compartidas conmigo"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default ListsIndex;
