import React from "react";
import { List } from "../../types/list";
import useShareListModal from "./useShareListModal";
import ShareListModalView from "./ShareListModalView";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  list: List;
}

const ShareListModal: React.FC<Props> = ({ isOpen, onClose, list }) => {
  const {
    tableFields,
    tableItems,
    creatingUser,
    handleAddUser,
    handleUpdateUserField,
    handleRemoveUser,
  } = useShareListModal(list);

  return (
    <ShareListModalView
      isOpen={isOpen}
      onClose={onClose}
      owner={list.owner}
      tableFields={tableFields}
      tableItems={tableItems}
      creatingUser={creatingUser}
      onAddUser={handleAddUser}
      onUpdateUserField={handleUpdateUserField}
      onRemoveUser={handleRemoveUser}
    />
  );
};

export default ShareListModal;
