import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetList,
  useAddItem,
  useRemoveItem,
  useUpdateItemField,
  useMoveItem,
} from "../hooks/api/list";
import TableList from "../components/table-list";
import Loader from "../components/loader";
import ListEmptyState from "../components/empty-states/list-empty-state";
import { useHighlightItem } from "../hooks/highlight-item";
import ModalDialog from "../components/common/modal-dialog";
import { Item } from "../types/item";
import ItemDetailDialog from "../components/item-detail-dialog";
import Filters from "../components/list-detail/filters";
import Subhead from "../components/list-detail/subhead";
import { Field } from "../types/field";
import { ItemsFilter, useFilteredItems } from "../hooks/table-list";
import { useIsMobile } from "../hooks/mobile";

const ListDetail = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { list, loading, error } = useGetList(id);
  const { addItem, addingItem } = useAddItem(id);
  const { removeItem } = useRemoveItem(id);
  const { moveItem } = useMoveItem(id);
  const { updateItemField } = useUpdateItemField(id);
  const { highlightedItemId, highlightColor, highlightItem } =
    useHighlightItem();
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [isFiltersActive, setIsFiltersActive] = useState<boolean>(false);
  const [filter, setFilter] = useState<ItemsFilter | null>(null);
  const { isMobile } = useIsMobile();

  const handleUpdateItemField = (
    itemId: string,
    fieldId: string,
    value: any
  ) => {
    updateItemField(itemId, fieldId, value);
  };

  const handleAddItem = () => {
    addItem({}, (newItem) => {
      window.scrollTo(0, document.body.scrollHeight);
      highlightItem(newItem._id, "green");
    });
  };

  const handleRemoveItem = (itemId: string) => {
    highlightItem(itemId, "red", removeItem);
  };

  const handleMoveItem = (itemId: string, shift: number) => {
    highlightItem(itemId, "red", () => {
      moveItem(itemId, shift, () => {
        highlightItem(itemId, "green");
      });
    });
  };

  const handleViewItem = (item: Item) => {
    setCurrentItemId(item._id);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleConfigList = () => {
    navigate(`/lists/${id}/edit`);
  };

  const handleToggleFilters = () => {
    const isActive = !isFiltersActive;
    setIsFiltersActive(isActive);
    if (!isActive) {
      setFilter(null);
    }
  };

  const handleFilterChange = (field: Field, value: any) => {
    setFilter({ field, value });
  };

  const currentItem = useMemo<Item | undefined>(() => {
    return currentItemId
      ? list?.items.find((item) => item._id === currentItemId)
      : undefined;
  }, [list, currentItemId]);

  const items = useFilteredItems(list, filter);

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
              disableAddItem={addingItem}
              isFiltersActive={isFiltersActive}
              onClickBackBtn={handleBack}
              onClickConfigBtn={handleConfigList}
              onAddItem={handleAddItem}
              onToggleFilters={handleToggleFilters}
            />
            {isFiltersActive && (
              <Filters fields={list.fields} onChange={handleFilterChange} />
            )}
          </div>
          <div className="mb-48">
            <TableList
              highlightItem={highlightedItemId}
              highlightColor={highlightColor}
              stickyHeadTop={
                isFiltersActive ? (isMobile ? "258px" : "183px") : "127px"
              }
              fields={list.fields}
              items={items}
              onUpdateItemField={handleUpdateItemField}
              onRemoveItem={handleRemoveItem}
              onMoveItem={handleMoveItem}
              onViewItem={handleViewItem}
            />
          </div>

          <ModalDialog
            title={`Ver item #${currentItemId}`}
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
        </>
      )}
    </Loader>
  );
};

export default ListDetail;
