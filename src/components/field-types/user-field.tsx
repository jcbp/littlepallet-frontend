import React, { FC, useMemo } from "react";
import { Field } from "../../types/field";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useListStore } from "../../context/list-store";
import { useListMetadataStore } from "../../context/list-metadata-store";
import { UserIcon } from "@heroicons/react/24/outline";

interface Props {
  value: string;
  field: Field;
  onChange: (value: string) => void;
}

const UserField: FC<Props> = ({ value, field, onChange }) => {
  const { list } = useListStore();
  const { listMetadata } = useListMetadataStore();

  const currentList = list || listMetadata;

  const userOptions = useMemo(() => {
    if (!currentList) return [];

    const options = [];

    // Add owner
    if (currentList.owner) {
      options.push({
        value: currentList.owner,
        text: currentList.owner.split("@")[0] || currentList.owner,
        isOwner: true,
      });
    }

    // Add shared users
    if (currentList.users) {
      currentList.users.forEach((user) => {
        if (user.email) {
          options.push({
            value: user.email,
            text: user.name || user.email.split("@")[0] || user.email,
            isOwner: false,
          });
        }
      });
    }

    // Remove duplicates (just in case)
    const uniqueOptions: any[] = [];
    const seenValues = new Set();
    options.forEach((opt) => {
      if (!seenValues.has(opt.value)) {
        seenValues.add(opt.value);
        uniqueOptions.push(opt);
      }
    });

    return uniqueOptions;
  }, [currentList]);

  const selectedOption = useMemo(() => {
    return userOptions.find((opt) => opt.value === value) || null;
  }, [userOptions, value]);

  if (userOptions.length === 0) {
    return (
      <div className="text-gray-400 text-xs italic px-3 py-1.5">
        No users available
      </div>
    );
  }

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div>
        <Menu.Button
          className={clsx(
            "rounded-lg outline-none shadow-focus w-full bg-gray-50 hover:bg-gray-100 border border-transparent focus:border-gray-300 transition-colors"
          )}
        >
          <span className="flex items-center w-full px-3 py-1.5 rounded-lg text-sm text-gray-700">
            <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate flex-1 text-left">
              {selectedOption ? selectedOption.text : <span className="text-gray-400">Seleccionar...</span>}
            </span>
            <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-400" />
          </span>
        </Menu.Button>
      </div>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Menu.Items className="origin-top-right absolute left-0 mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-30 border border-gray-200 max-h-60 overflow-y-auto">
          <div className="py-1">
            {userOptions.map((option) => (
              <Menu.Item key={option.value}>
                {({ active }) => (
                  <button
                    className={clsx(
                      "flex items-center w-full px-4 py-2 text-sm text-left transition-colors",
                      active ? "bg-indigo-50 text-indigo-900" : "text-gray-700",
                      selectedOption?.value === option.value && "font-semibold bg-gray-50"
                    )}
                    onClick={() => onChange(option.value)}
                  >
                    <div className="flex flex-col">
                      <span>{option.text}</span>
                      <span className="text-[10px] text-gray-400 truncate">{option.value}</span>
                    </div>
                    {option.isOwner && (
                      <span className="ml-auto text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                        Owner
                      </span>
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserField;
