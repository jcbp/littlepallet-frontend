import React from "react";
import ListCard from "./list-card";
import { ListSummary } from "../types/list-summary";

type Props = {
  lists: ListSummary[];
  onOpenList: (list: ListSummary) => void;
  onRemoveList?: (list: ListSummary) => void;
  onRestoreList?: (list: ListSummary) => void;
  showOwner?: boolean;
};

const ListsGrid: React.FC<Props> = ({
  lists,
  onOpenList,
  onRemoveList,
  onRestoreList,
  showOwner = false,
}) => {
  return (
    <div className="my-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lists.map((list) => (
          <div key={list._id} className="mb-4">
            <ListCard
              list={list}
              showOwner={showOwner}
              onOpenList={onOpenList}
              onRemoveList={onRemoveList}
              onRestoreList={onRestoreList}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListsGrid;
