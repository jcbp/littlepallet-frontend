import { useIsMobile } from "../../hooks/mobile";
import Button from "../common/button";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

interface Props {
  title: string;
  onClickBackBtn: (value: any) => void;
  onClickUseTemplate: () => void;
}

const Subhead: React.FC<Props> = ({
  title,
  onClickBackBtn,
  onClickUseTemplate,
}) => {
  const { isMobile } = useIsMobile();
  return (
    <div className="flex items-center mb-4">
      <div className="">
        <Button
          variant="light"
          onClick={onClickBackBtn}
          className="sm:ps-2 sm:pe-4"
        >
          <ArrowLeftIcon className="h-5 w-5 text-gray-800 sm:mr-2" />
          <span className="hidden sm:inline">Volver</span>
        </Button>
      </div>
      <div className="grow flex ms-4">
        <h1 className="text-2xl font-light text-gray-900">{title}</h1>
      </div>
      <div className="flex">
        <Button className="sm:px-4" onClick={onClickUseTemplate}>
          <DocumentDuplicateIcon className="h-5 w-5 text-white sm:mr-2" />
          {!isMobile && <>Usar plantilla</>}
        </Button>
      </div>
    </div>
  );
};

export default Subhead;
