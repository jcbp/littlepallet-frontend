import React from "react";
import { ListCard } from "./list-card";
import { ListSummary } from "../types/list-summary";

type Props = {
  lists: ListSummary[];
  title: string;
  onItemClick: (list: ListSummary) => void;
};

const ListsGrid: React.FC<Props> = ({ lists, title, onItemClick }) => {
  return (
    <div>
      <h1 className="text-xl font-medium text-blue-900 mb-3 mt-2">{title}</h1>
      <div className="flex flex-wrap">
        {lists.map((list) => (
          <div className="w-64 mr-4 mb-4" key={list._id}>
            <ListCard list={list} onClick={() => onItemClick(list)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListsGrid;
