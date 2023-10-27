import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, ReactNode } from "react";
import { Typography } from "./typography";
import { Icon } from "./icons";

const SelectContainer = React.forwardRef(
  (
    {
      inputProps,
      setValue,
      children,
      iconProps,
    }: {
      inputProps: any;
      setValue: any;
      children: any;
      iconProps?: ReactNode;
    },
    ref: any
  ) => {
    return (
      <Listbox value={inputProps.value} onChange={setValue} ref={ref}>
        <div className="relative mt-1 flex w-full  space-x-2">
          {iconProps && (
            <div className="bg-blue-50   sm:px-5 px-3.5  flex items-center   rounded-lg text-blue-500">
              {iconProps}
            </div>
          )}

          <Listbox.Button className="bg-blue-50 flex-1 relative  text-sm w-full cursor-default   sm:py-1.5 sm:pl-4 py-1 pl-3 pr-10 text-left rounded-lg focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ">
            <div>
              <Typography variant={"paragraph"} size={"xs"}>
                {inputProps.type}
              </Typography>
              <Typography
                className="block truncate"
                variant={"lifeText"}
                size={"sm"}
                bold={"bold"}
              >
                {inputProps.value}
              </Typography>
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <Icon
                type="chevronBottomIcon"
                className="text-life"
                sizes={"sm"}
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition-all ease-in duration-200"
            leaveFrom="opacity-100 -translate-y-0"
            leaveTo="opacity-0 "
            enterFrom="scale-[99%] opacity-0 -translate-y-3 "
            enterTo="scale-100 translate-y-0 opacity-100"
            enter="transition-all ease-in duration-50"
          >
            {children}
          </Transition>
        </div>
      </Listbox>
    );
  }
);

const SelectOptionsContainer = React.forwardRef((props: any, ref: any) => {
  return (
    <Listbox.Options
      ref={ref}
      className="absolute mt-14   !mx-auto max-h-60 w-full rounded-md bg-white sm:p-2 p-1  shadow border border-muted ring-1 ring-black ring-opacity-5 focus:outline-none  text-sm"
    >
      {props.children}
    </Listbox.Options>
  );
});

const SelectOption = React.forwardRef(
  (
    { keyValueData, children }: { keyValueData: any; children: any },
    ref: React.Ref<any>
  ) => {
    return (
      <Listbox.Option
        key={keyValueData.key}
        className={({ active, selected }) =>
          `relative rounded-md text-blue-900 font-semibold  cursor-pointer select-none py-1.5 pl-4 rtl:pr-4 pr-4 group ${
            selected ? "bg-blue-100 " : ""
          }`
        }
        value={keyValueData.value}
        ref={ref}
      >
        {children}
      </Listbox.Option>
    );
  }
);

export { SelectContainer, SelectOptionsContainer, SelectOption };
