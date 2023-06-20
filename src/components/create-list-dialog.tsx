import { useState } from "react";
import Button from "./common/button";
import { CheckIcon } from "@heroicons/react/24/solid";

interface Props {
  onCreateList: (name: string) => void;
  defaultName?: string;
}

const CreateListDialog: React.FC<Props> = ({
  onCreateList,
  defaultName = "",
}) => {
  const [name, setName] = useState(defaultName);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
      <div className="my-4">
        <label
          htmlFor="list-name"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre del lista
        </label>
        <div className="mt-1">
          <input
            type="text"
            required
            defaultValue={name}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            onChange={handleNameChange}
          />
        </div>
      </div>
      <Button onClick={() => onCreateList(name)} className="ms-auto px-4">
        <CheckIcon className="h-5 w-5 text-white mr-1" />
        Crear lista
      </Button>
    </>
  );
};

export default CreateListDialog;
