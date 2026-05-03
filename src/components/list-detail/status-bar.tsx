import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

export type StatusBarMessageType = "success" | "error";

export interface StatusBarMessage {
  type: StatusBarMessageType;
  text: string;
}

interface Props {
  message: StatusBarMessage | null;
  visibleMs?: number;
}

const statusConfig: Record<
  StatusBarMessageType,
  {
    icon: typeof CheckCircleIcon;
    iconClassName: string;
  }
> = {
  success: {
    icon: CheckCircleIcon,
    iconClassName: "text-green-600",
  },
  error: {
    icon: XCircleIcon,
    iconClassName: "text-red-600",
  },
};

const StatusBar: React.FC<Props> = ({ message, visibleMs = 1000 }) => {
  const [currentMessage, setCurrentMessage] = useState<StatusBarMessage | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!message) {
      return;
    }

    setCurrentMessage(message);
    setIsVisible(true);

    const timeoutId = window.setTimeout(() => {
      setIsVisible(false);
    }, visibleMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [message, visibleMs]);

  const currentStatus = currentMessage ? statusConfig[currentMessage.type] : null;

  return (
    <div className="h-5 px-1" aria-live="polite" aria-atomic="true">
      <Transition
        as={Fragment}
        show={isVisible && !!currentStatus}
        enter="transition-opacity duration-150 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setCurrentMessage(null)}
      >
        <div className="flex justify-end h-full items-center gap-1.5 text-s text-gray-600">
          {currentStatus && (
            <>
              <currentStatus.icon
                className={`h-4 w-4 ${currentStatus.iconClassName}`}
              />
              <span>{currentStatus && currentMessage?.text}</span>
            </>
          )}
        </div>
      </Transition>
    </div>
  );
};

export default StatusBar;
