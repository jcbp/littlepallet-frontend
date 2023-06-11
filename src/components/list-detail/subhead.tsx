import Button from "../common/button";
import { Cog8ToothIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { PlusIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Fab from "../common/fab";

interface Props {
  title: string;
  disableAddItem: boolean;
  isFiltersActive: boolean;
  onClickBackBtn: (value: any) => void;
  onClickConfigBtn: (value: any) => void;
  onAddItem: (value: any) => void;
  onToggleFilters: (value: any) => void;
}

const Subhead: React.FC<Props> = ({
  title,
  disableAddItem,
  isFiltersActive,
  onClickBackBtn,
  onClickConfigBtn,
  onAddItem,
  onToggleFilters,
}) => {
  return (
    <div className="flex items-center mb-4">
      <div className="">
        <Button
          variant="light"
          onClick={onClickBackBtn}
          className="sm:ps-2 sm:pe-4"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-800 sm:mr-2" />
          <span className="hidden sm:inline">Volver</span>
        </Button>
      </div>
      <div className="grow flex ms-4">
        <h1 className="text-2xl">{title}</h1>
      </div>
      <div className="flex">
        <Button
          variant="light"
          toggle
          isActive={isFiltersActive}
          className="sm:mr-3"
          onClick={onToggleFilters}
        >
          <FunnelIcon
            className={clsx(
              "h-6 w-6 ",
              isFiltersActive ? "text-gray-600" : "text-gray-800"
            )}
          />
        </Button>
        <Button variant="light" className="sm:mr-3" onClick={onClickConfigBtn}>
          <Cog8ToothIcon className="h-6 w-6 text-gray-800" />
        </Button>
        <Fab
          text="Nuevo item"
          startIcon={PlusIcon}
          disabled={disableAddItem}
          onClick={onAddItem}
          className={clsx(disableAddItem ? "cursor-progress" : "")}
        />
      </div>
    </div>
  );
};

export default Subhead;
