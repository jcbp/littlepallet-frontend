import { ReactNode, createContext, useContext } from "react";
import {
  useListMetadataReducer,
  ListMetadataStore,
  Action,
} from "../reducers/list-metadata-reducer";

type ListMetadataStoreContextType = [ListMetadataStore, React.Dispatch<Action>];

const ListMetadataStoreContext = createContext<ListMetadataStoreContextType>([
  { listMetadata: null },
  () => {},
]);

interface Props {
  children?: ReactNode;
}

const ListMetadataStoreProvider: React.FC<Props> = ({ children }) => {
  return (
    <ListMetadataStoreContext.Provider value={useListMetadataReducer()}>
      {children}
    </ListMetadataStoreContext.Provider>
  );
};

const useListMetadataStore = (): ListMetadataStore =>
  useContext(ListMetadataStoreContext)[0];
const useListMetadataDispatch = (): React.Dispatch<Action> =>
  useContext(ListMetadataStoreContext)[1];

export {
  ListMetadataStoreContext,
  useListMetadataStore,
  useListMetadataDispatch,
};
export default ListMetadataStoreProvider;
