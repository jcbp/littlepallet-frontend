import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetList } from "../hooks/api/list";
import TableList from "../components/table-list";
import Loader from "../components/loader";
import ListEmptyState from "../components/empty-states/list-empty-state";
import ModalDialog from "../components/common/modal-dialog";
import { Item } from "../types/item";
import ItemDetailDialog from "../components/item-detail-dialog";
import Subhead from "../components/template-detail/subhead";
import CreateListDialog from "../components/create-list-dialog";
import { useCreateListFromTemplate } from "../hooks/api/template";

const TemplateDetail = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { list, loading, error } = useGetList(id);
  const { createList } = useCreateListFromTemplate(id);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [isNewListDialogOpen, setIsNewListDialogOpen] =
    useState<boolean>(false);

  const handleUpdateItemField = (
    itemId: string,
    fieldId: string,
    value: any
  ) => {};

  const handleViewItem = (item: Item) => {
    setCurrentItemId(item._id);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleCreateList = (name: string) => {
    createList(name, (newList) => {
      navigate(`/lists/${newList._id}`);
    });
  };

  const handleClickUseTemplate = () => {
    setIsNewListDialogOpen(true);
  };

  const handleNewListDialogClose = () => {
    setIsNewListDialogOpen(false);
  };

  const currentItem = useMemo<Item | undefined>(() => {
    return currentItemId
      ? list?.items.find((item) => item._id === currentItemId)
      : undefined;
  }, [list, currentItemId]);

  return (
    <Loader
      loading={loading}
      error={error}
      isEmpty={!list}
      emptyState={<ListEmptyState />}
    >
      {list && (
        <>
          <div className="pt-5 pb-1 sticky top-[51px] bg-white z-20">
            <Subhead
              title={list.name}
              onClickBackBtn={handleBack}
              onClickUseTemplate={handleClickUseTemplate}
            />
          </div>
          <div className="mb-48">
            <TableList
              stickyHeadTop="127px"
              fields={list.fields}
              items={list.items}
              onUpdateItemField={handleUpdateItemField}
              onViewItem={handleViewItem}
            />
          </div>

          <ModalDialog
            title={`Item #${currentItemId}`}
            isOpen={!!currentItemId}
            onClose={() => setCurrentItemId(null)}
          >
            {currentItem && (
              <ItemDetailDialog
                fields={list.fields}
                item={currentItem}
                onUpdateItemField={handleUpdateItemField}
              />
            )}
          </ModalDialog>

          <ModalDialog
            title="Crear nueva lista"
            isOpen={isNewListDialogOpen}
            onClose={handleNewListDialogClose}
          >
            <CreateListDialog
              onCreateList={handleCreateList}
              defaultName={list.name}
            />
          </ModalDialog>
        </>
      )}
    </Loader>
  );
};

export default TemplateDetail;
