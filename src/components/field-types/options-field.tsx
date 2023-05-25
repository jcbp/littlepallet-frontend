import React, { FC, ChangeEvent } from "react";
import { Field } from "../../types/field";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface Props {
  value: string;
  field: Field;
  onChange: (value: string) => void;
}

const getDefaultValue = (field: Field): string => {
  return typeof field.defaultValue === "string" ? field.defaultValue : "";
};

const ColoredOptionsField: FC<Props> = ({ value, field, onChange }) => {
  const normalizedOptions = field.options?.map((item) =>
    item && item.value
      ? item
      : { text: item[0], value: item[0], color: item[1] ?? "" }
  );

  const getSelectedOptionColor = (value: string) => {
    const selectedOption = normalizedOptions?.find(
      (option) => option.value === value
    );
    return selectedOption && selectedOption.color;
  };

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div>
        <Menu.Button className="bg-gray-50 hover:bg-gray-100 rounded-lg mr-5 outline-none shadow-focus w-full">
          <span
            className="flex items-center w-full px-3 py-1.5 rounded"
            style={{
              backgroundColor: getSelectedOptionColor(
                value || getDefaultValue(field)
              ),
            }}
          >
            {value || getDefaultValue(field)}
            <ChevronDownIcon className="h-5 w-5 ml-auto" />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-0 px-0.5 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 w-full border border-gray-300">
          <div>
            {normalizedOptions?.map((option, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-100 text-gray-950 border-gray-200" : "text-gray-700 border-transparent"
                    } flex items-center px-4 py-1 rounded border`}
                    style={{
                      backgroundColor: active ? option.color : `${option.color}b0`,
                      margin: "0.25rem",
                      width: "calc(100% - 0.5rem)",
                    }}
                    onClick={() => onChange(option.value)}
                  >
                    {option.text}
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

export default ColoredOptionsField;
