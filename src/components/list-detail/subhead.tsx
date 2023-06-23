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
  children: React.ReactNode;
}

const Subhead: React.FC<Props> = ({
  title,
  disableAddItem,
  isFiltersActive,
  onClickBackBtn,
  onClickConfigBtn,
  onAddItem,
  onToggleFilters,
  children,
}) => {
  return (
    <>
      <div className="flex items-center mb-4">
        <div className="">
          <Button
            variant="light"
            onClick={onClickBackBtn}
            startIcon={ArrowLeftIcon}
            className="sm:px-3"
          >
            <span className="hidden sm:inline sm:ms-2 sm:pe-1">Volver</span>
          </Button>
        </div>
        <div className="grow flex ms-4">
          <h1 className="text-2xl font-light text-gray-900">{title}</h1>
        </div>
        <div className="flex">
          <Button
            variant="light"
            toggle
            isActive={isFiltersActive}
            className="mr-2 sm:mr-3"
            onClick={onToggleFilters}
          >
            <FunnelIcon
              className={clsx(
                "h-5 w-5 ",
                isFiltersActive ? "text-blue-900" : "text-gray-800"
              )}
            />
          </Button>
          <Button
            variant="light"
            className="sm:mr-3"
            onClick={onClickConfigBtn}
          >
            <Cog8ToothIcon className="h-5 w-5 text-gray-800" />
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

      {isFiltersActive && <>{children}</>}
    </>
  );
};

export default Subhead;
