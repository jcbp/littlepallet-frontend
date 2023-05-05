import React from "react";
import useLists from "../hooks/use-lists";
import useCurrentUser from "../hooks/use-current-user";
import ListsGrid from "../components/lists-grid";
import { ListSummary } from "../types/list-summary";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const ListsIndex = () => {
  const navigate = useNavigate();
  const { lists, isLoading, error } = useLists();
  const { currentUser, isLoading: isUserLoading } = useCurrentUser();

  if (isLoading || isUserLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando listas...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        Ha ocurrido un error: {error}
      </Alert>
    );
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
    </div>
  );
};

export default ListsIndex;
