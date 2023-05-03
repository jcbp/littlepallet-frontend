import { ListSummary } from "../types/list-summary";

interface ListCardProps {
  list: ListSummary;
  onClick: () => void;
}

export const ListCard: React.FC<ListCardProps> = ({ list, onClick }) => {
  const ownerName = list.owner.split("@")[0];

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-4 cursor-pointer transition duration-300 hover:shadow-2xl h-[150px]"
      onClick={onClick}
    >
      <h2 className="text-md font-medium">{list.name}</h2>
      <p className="text-gray-500 mt-2 max-w-full overflow-hidden text-sm leading-tight">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Creado por: {ownerName}
        </span>
      </p>
      {list.users && list.users.length > 0 && (
        <p className="text-gray-500 mt-2 max-w-full overflow-hidden text-sm leading-tight">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Usuarios compartidos: {list.users.length}
          </span>
        </p>
      )}
    </div>
  );
};
