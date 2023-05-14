import React from "react";
import ListCard from "./list-card";
import { ListSummary } from "../types/list-summary";

type Props = {
  lists: ListSummary[];
  title: string;
  onClick: (list: ListSummary) => void;
  showOwner?: boolean;
};

const ListsGrid: React.FC<Props> = ({
  lists,
  title,
  onClick,
  showOwner = false,
}) => {
  return (
    <div className="my-3">
      <h1 className="text-xl font-semibold mb-3 mt-2">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lists.map((list) => (
          <div key={list._id} className="mb-4">
            <ListCard list={list} showOwner={showOwner} onClick={() => onClick(list)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListsGrid;
