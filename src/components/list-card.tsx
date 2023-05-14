import { formatDate } from "../helpers/date";
import { ListSummary } from "../types/list-summary";
import {
  UserIcon,
  UsersIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

interface ListCardProps {
  list: ListSummary;
  onClick: () => void;
  showOwner: boolean;
}

const ListCard: React.FC<ListCardProps> = ({ list, onClick, showOwner }) => {
  const ownerName = list.owner.split("@")[0];

  return (
    <div
      className="cursor-pointer border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:!border-gray-300 h-40"
      onClick={onClick}
    >
      <div className="bg-white rounded-t-lg py-2 px-3">
        <h3 className="text-gray-900 font-medium text-base py-2 px-1 mb-3 border-b border-gray-200">
          {list.name}
        </h3>
        <div className="flex flex-col px-1">
          {showOwner && (
            <span className="flex items-center mb-3">
              <span className="text-gray-900 text-sm">{ownerName}</span>
              <span className="rounded-full border !border-green-600/20 ml-2 px-1 bg-green-50 text-green-900/70 flex flex-row items-center text-xs">
                <UserIcon className="h-3 w-3 mr-1 text-gray-300" />
                Propietario
              </span>
            </span>
          )}
          {list.users && list.users.length > 0 && (
            <span className="text-gray-500 text-sm flex items-center mb-2">
              <UsersIcon className="h-4 w-4 mr-2 text-gray-300" />
              Usuarios compartidos: {list.users.length}
            </span>
          )}
          {list.updatedAt && (
            <span className="text-gray-500 text-sm  flex items-center mb-2">
              <DocumentTextIcon className="h-4 w-4 mr-2 text-gray-300" />
              Actualizada el {formatDate(list.updatedAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListCard;
