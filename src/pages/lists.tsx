import React from "react";
import useLists from "../hooks/use-lists";
import useCurrentUser from "../hooks/use-current-user";

const Lists = () => {
  const { lists, isLoading, error } = useLists();
  const { currentUser, isLoading: isUserLoading } = useCurrentUser();

  if (isLoading) {
    return <p>Cargando listas...</p>;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error}</p>;
  }

  return (
    <div>
      <h1>Listas</h1>
      {!isUserLoading && <div>{JSON.stringify(currentUser)}</div>}
      <ul>
        {lists.map((list) => (
          <li key={list._id}>{list.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Lists;
