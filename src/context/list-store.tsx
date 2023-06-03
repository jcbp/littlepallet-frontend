import { ReactNode, createContext, useContext, useReducer } from "react";
import listReducer, { initialState, Action } from "../reducers/list-reducer";

type ListStoreContextType = [typeof initialState, React.Dispatch<Action>];

const ListStoreContext = createContext<ListStoreContextType>([initialState, () => {}]);

interface Props {
  children?: ReactNode;
}

const ListStoreProvider: React.FC<Props> = ({ children }) => {
  const listStore = useReducer(listReducer, initialState);

  return (
    <ListStoreContext.Provider value={listStore}>
      {children}
    </ListStoreContext.Provider>
  );
};

const useListStore = (): typeof initialState => useContext(ListStoreContext)[0];
const useListDispatch = (): React.Dispatch<Action> => useContext(ListStoreContext)[1];

export { ListStoreContext, useListStore, useListDispatch };
export default ListStoreProvider;
