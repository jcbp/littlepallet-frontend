import React, { FC, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Field } from "../../types/field";

interface Props {
  value: string;
  field: Field;
  onChange: (value: string) => void;
}

const TrafficLightField: FC<Props> = ({ value, field, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    value ?? "default"
  );

  const handleSelect = (newValue: string) => {
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const getCircleClass = (color: string): string => {
    switch (color) {
      case "green":
        return "bg-green-400 border-green-600/50";
      case "yellow":
        return "bg-yellow-400 border-yellow-500/50";
      case "red":
        return "bg-red-400 border-red-600/50";
      default:
        return "bg-gray-300 border-gray-400/50";
    }
  };

  return (
    <div className="ms-5">
      <Menu>
        <Menu.Button className="inline-flex justify-center items-center space-x-2">
          <div
            className={`h-4 w-4 rounded-full border ${getCircleClass(
              selectedValue
            )}`}
          ></div>
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-green-100 text-green-900" : "text-gray-700"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={() => handleSelect("green")}
                  >
                    <div
                      className={`h-4 w-4 rounded-full ${getCircleClass(
                        "green"
                      )}`}
                    ></div>
                    <span className="mx-3">Green</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-yellow-100 text-yellow-900" : "text-gray-700"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={() => handleSelect("yellow")}
                  >
                    <div
                      className={`h-4 w-4 rounded-full ${getCircleClass(
                        "yellow"
                      )}`}
                    ></div>
                    <span className="mx-3">Yellow</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-red-100 text-red-900" : "text-gray-700"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={() => handleSelect("red")}
                  >
                    <div
                      className={`h-4 w-4 rounded-full ${getCircleClass(
                        "red"
                      )}`}
                    ></div>
                    <span className="mx-3">Red</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default TrafficLightField;
