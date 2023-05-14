import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface ItemMenuProps {
  onRemoveItem: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const ItemMenu: React.FC<ItemMenuProps> = ({
  onRemoveItem,
  onMoveUp,
  onMoveDown,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="bg-gray-50 hover:bg-gray-100 p-1.5 m-1 rounded-full">
        <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onMoveUp}
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } flex w-full items-center px-4 py-2 text-sm`}
                  role="menuitem"
                >
                  <ArrowUpIcon className="h-4 w-4 mr-2 text-gray-500" />
                  Mover hacia arriba
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onMoveDown}
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } flex w-full items-center px-4 py-2 text-sm`}
                  role="menuitem"
                >
                  <ArrowDownIcon className="h-4 w-4 mr-2 text-gray-500" />
                  Mover hacia abajo
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onRemoveItem}
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } flex w-full items-center px-4 py-2 text-sm`}
                  role="menuitem"
                >
                  <TrashIcon className="h-4 w-4 mr-2 text-gray-500" />
                  Eliminar
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ItemMenu;
