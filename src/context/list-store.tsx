import { ReactNode, createContext, useContext } from "react";
import { useListReducer, ListStore, Action } from "../reducers/list-reducer";

type ListStoreContextType = [ListStore, React.Dispatch<Action>];

const ListStoreContext = createContext<ListStoreContextType>([
  { list: null },
  () => {},
]);

interface Props {
  children?: ReactNode;
}

const ListStoreProvider: React.FC<Props> = ({ children }) => {
  return (
    <ListStoreContext.Provider value={useListReducer()}>
      {children}
    </ListStoreContext.Provider>
  );
};

const useListStore = (): ListStore => useContext(ListStoreContext)[0];
const useListDispatch = (): React.Dispatch<Action> =>
  useContext(ListStoreContext)[1];

export { ListStoreContext, useListStore, useListDispatch };
export default ListStoreProvider;
