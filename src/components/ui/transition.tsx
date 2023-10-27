import { Dialog, Transition, TransitionRootProps } from "@headlessui/react";
import { FC, Fragment } from "react";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
const TransitionComp = ({
  showTransition,
  children,
}: {
  showTransition: boolean;
  children: any;
}) => {
  // const [isShowing, setIsShowing] = useState(setTransition);

  return (
    <Transition
      as={Fragment}
      appear
      show={showTransition}
      enter="transform transition ease-in-out duration-500 sm:duration-700 "
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transform transition ease-in-out duration-500 sm:duration-700"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      {children}
    </Transition>
  );
};

const LgSearchMenuTransition = ({ children }: { children: any }) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      {children}
    </Transition>
  );
};

const SideBarMenuTranstion = ({
  children,
  customWidthBreakPoint,
  isOpen,
  IsSideBarMenu,
  setIsClosed,
}: {
  children: any;
  isOpen: any;
  IsSideBarMenu?: boolean;
  setIsClosed: any;
  customWidthBreakPoint?: number;
}) => {
  const { width } = useWindowDimensions();

  return (customWidthBreakPoint && width < customWidthBreakPoint) ||
    width < 767 ||
    IsSideBarMenu ? (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={setIsClosed}>
        <Transition.Child
          as={Fragment}
          enter="ease-in duration-500"
          enterFrom=""
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`fixed inset-0   ${
              IsSideBarMenu ? "" : "bg-black bg-opacity-25"
            }`}
          />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="ease-in duration-500 "
            enterFrom="  -translate-x-full "
            enterTo="  translate-x-0"
            leave="ease-in duration-300"
            leaveFrom="translate-x-0"
            leaveTo=" -translate-x-full"
          >
            <Dialog.Panel className="relative flex  md:max-w-md w-full flex-1 flex-col bg-white shadow-md overflow-y-auto overflow-x-hidden">
              {children}
              <div className="absolute right-0 top-0 -mr-12 pt-2 opacity-100">
                <button
                  type="button"
                  onClick={() => setIsClosed(false)}
                  className="ml-1 flex h-10 w-10 items-center justify-center focus:outline-none ring-2 ring-inset ring-white bg-black/50"
                >
                  <span className="sr-only">Close sidebar</span>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-6 w-6 text-white"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  ) : (
    <>
      <div>{children}</div>
    </>
  );
};

export { TransitionComp, LgSearchMenuTransition, SideBarMenuTranstion };
