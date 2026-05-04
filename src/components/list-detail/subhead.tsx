import Button from "../common/button";
import {
  Cog8ToothIcon,
  EllipsisVerticalIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon, ArrowLeftIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Fab from "../common/fab";
import { useIsMobile } from "../../hooks/mobile";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Props {
  title: string;
  disableAddItem: boolean;
  isFiltersActive: boolean;
  onClickBackBtn: (value: any) => void;
  onClickConfigBtn: (value: any) => void;
  onAddItem: (value: any) => void;
  onToggleFilters: (value: any) => void;
  onClickShareBtn: () => void;
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
  onClickShareBtn,
  children,
}) => {
  const { isMobile } = useIsMobile();

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
          {isMobile ? (
            <Menu as="div" className="relative mr-2">
              <Menu.Button
                as={Button}
                variant="light"
                tooltip="Acciones"
                className="sm:mr-3"
              >
                <EllipsisVerticalIcon className="h-5 w-5 text-gray-800" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right rounded-md border border-gray-200 bg-white p-1 shadow-lg focus:outline-none z-20">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={clsx(
                          "flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm",
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        )}
                        onClick={onToggleFilters}
                      >
                        <FunnelIcon
                          className={clsx(
                            "h-4 w-4",
                            isFiltersActive ? "text-blue-900" : "text-gray-500"
                          )}
                        />
                        {isFiltersActive ? "Ocultar filtros" : "Filtros"}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={clsx(
                          "flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm",
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        )}
                        onClick={onClickShareBtn}
                      >
                        <UserPlusIcon className="h-4 w-4 text-gray-500" />
                        Compartir lista
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={clsx(
                          "flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm",
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        )}
                        onClick={onClickConfigBtn}
                      >
                        <Cog8ToothIcon className="h-4 w-4 text-gray-500" />
                        Configuración
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <>
              <Button
                variant="light"
                toggle
                tooltip="Filtros"
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
                tooltip="Compartir lista"
                className="sm:mr-3"
                onClick={onClickShareBtn}
              >
                <UserPlusIcon className="h-5 w-5 text-gray-800" />
              </Button>
              <Button
                variant="light"
                tooltip="Configuración"
                className="sm:mr-3"
                onClick={onClickConfigBtn}
              >
                <Cog8ToothIcon className="h-5 w-5 text-gray-800" />
              </Button>
            </>
          )}
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
