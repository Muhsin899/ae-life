import { useSession } from "next-auth/react";
import { useModal } from "./ui/modalcontext";
import { RadioGroup, RadioGroupItem } from "./ui/radio";
import { Icon } from "./ui/icons";
import { Typography } from "./ui/typography";
import deleteAddress from "@/lib/deleteAddress";

const AddressGroup = ({
  addressOnEditCallBack,
}: {
  addressOnEditCallBack: any;
}) => {
  const {
    setFormData,
    AddressDataIndex,
    setAddressDataIndex
  } = useModal();

  const { data: session, update } = useSession();
  return (
    <RadioGroup
      onValueChange={(value) => {
        setAddressDataIndex(value);
      }}
      className="grid  grid-cols-1 gap-2 my-3 "
      value={AddressDataIndex.id}
    >
      {session?.token.addresses.map((addr: any) => (
        <label
          htmlFor={addr.id}
          className={`cursor-pointer   border shadow rounded-lg p-2 px-3  h-full flex flex-col justify-between ${
            addr.id === AddressDataIndex.id
              ? "border-blue-800 "
              : "border-muted"
          }`}
        >
          <div className="space-y-1">
            <div className="flex  items-center justify-between">
              <div className="flex space-x-2 items-center">
                <Icon type="homeIconMenu" className="text-life" />
                <Typography bold={"semibold"} variant={"lifeText"}>
                  {addr.type}
                </Typography>
              </div>
              <div className="flex items-center space-x-0.5 p-0.5 bg-gray-200 rounded-lg">
                <button
                  onClick={() => {
                    if (AddressDataIndex.id === addr.id) {
                      if (session?.token.addresses.length > 0) {
                        setAddressDataIndex(session?.token.addresses[0]);
                      }
                    }
                    deleteAddress(
                      {
                        address_id: addr.id,
                      },
                      session?.token.token
                    ).then((res) => {
                      debugger;
                      if (res.success) {
                        update({
                          addresses: session.token.addresses.filter(
                            (address: any) => address.id !== addr.id
                          ),
                        });
                      }
                    });
                    // update();
                  }}
                  className=" px-2   p-1.5 flex group items-center   rounded-lg"
                >
                  <Icon
                    type="trashIcon"
                    sizes={"sm"}
                    className="text-slate-400 group-hover:text-red-500"
                  />
                </button>
                <button
                  onClick={() => {
                    setFormData(addr);
                    addressOnEditCallBack();
                  }}
                  className=" px-2   p-1.5 flex items-center bg-blue-400 rounded-lg"
                >
                  <Icon type="editIcon" sizes={"sm"} className="text-white" />
                </button>
              </div>
            </div>

            <div className="w-full bg-slate-100 mx-auto h-[1px]"></div>
            <div>
              <Typography size={"sm"} variant={"paragraph"} className="mb-1">
                {" "}
                {addr.name}
              </Typography>

              <Typography size={"sm"} variant={"paragraph"}>
                {addr.google_address}
              </Typography>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Typography size={"sm"} bold={"semibold"} className="text-black">
              {addr.phone}
            </Typography>
            <RadioGroupItem
              value={addr}
              id={addr.id}
              checked={AddressDataIndex.id === addr.id}
            />
            {/* <Button
                variant={"white"}
                size={"sm"}
                className={cn(
                  typographyVariants({
                    variant: "primary",
                    size: "sm",
                  }),
                  "px-0"
                )}
                iconRight={
                  <Icon
                    type="editIcon"
                    sizes={"xs"}
                    className="ml-1 rtl:mr-1"
                  />
                }
                onClick={() => {
                  setFormData(addr);
                  setaddnewAddressFormVisibility(true);
                }}
              >
                <span className="leading-[0px]">Edit</span>
              </Button> */}

            {/* <Button
                variant={"white"}
                size={"xs"}
                className={cn(
                  typographyVariants({
                    variant: "danger",
                    size: "sm",
                  }),
                  "px-0"
                )}
                onClick={() => {
                  // update();
                  deleteAddress(
                    {
                      address_id: addr.id,
                    },
                    session?.token.token
                  ).then((res) => {
                    debugger;
                    if (res.success) {
                      update({
                        addresses: session.token.addresses.filter(
                          (address: any) => address.id !== addr.id
                        ),
                      });
                    }
                  });
                }}
                iconRight={
                  <Icon
                    type="crossIcon"
                    sizes={"sm"}
                    className="ml-1 rtl:mr-1"
                  />
                }
              >
                <span className="leading-[0px]">Delete</span>
              </Button> */}
          </div>
        </label>
      ))}
    </RadioGroup>
  );
};

export { AddressGroup };
