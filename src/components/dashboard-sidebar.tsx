// import { SideBarMenuTranstion, TransitionComp } from "./ui/transition";
// import { useModal } from "./ui/modalcontext";
// import { Typography } from "./ui/typography";
// import { Button } from "./ui/button";
// import { Icon, IconProps } from "./ui/icons";
// import { useState } from "react";
// import {
//   AccountDetailsComp,
//   AddressComp,
//   AppointmentsComp,
//   ContactUs,
//   OrderComp,
//   RewardsComp,
//   VouchersComp,
// } from "@/components/dashboard-components";
// import { useRouter } from "next/router";
// import InvalidOTPModal from "./invalid-otp-modal";
// import { signOut, useSession } from "next-auth/react";
// import { toast } from "sonner";
// import { BadgeCheck } from "lucide-react";

// const DashboardSidebar = () => {
//   const { dashboardSideBarState, setDashboardSideBarState } = useModal();

//   const { data: session } = useSession();

//   return (
//     <SideBarMenuTranstion
//       isOpen={dashboardSideBarState}
//       setIsClosed={setDashboardSideBarState}
//       IsSideBarMenu={true}
//     >
//       <div className="bg-white py-4 px-6 flex items-center justify-between border-b border-slate-200 shadow-sm">

//       </div>

//       {/* {menuItemVisiblity === "Addresses" && <AddressComp />} */}

//     </SideBarMenuTranstion>
//   );
// };

// export { DashboardSidebar };

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModal } from "./ui/modalcontext";
import { Typography } from "./ui/typography";
import { Icon, IconProps } from "./ui/icons";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import {
  AccountDetailsComp,
  AddressComp,
  AppointmentsComp,
  ContactUs,
  OrderComp,
  RewardsComp,
  VouchersComp,
} from "./dashboard-components";
import { useRouter } from "next/router";
import InvalidOTPModal from "./invalid-otp-modal";
import { toast } from "sonner";
import { TransitionComp } from "./ui/transition";
import { LocationSelection } from "./location-selection";
import { AddNewAddressForm } from "./addnewAddressForm";
import Cart from "./cart";
import { useLanguage } from "@/hooks/useLanguage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function DashbaordExample() {
  interface menuItemProps {
    type?: string | null;
    name: string;
    onClick: () => void;
    iconType: IconProps["type"];
    component?: React.ReactNode;
  }

  const {
    setFormData,
    formDataInitState,
    AddressDataIndex,
    setAddressDataIndex,
    dashboardSideBarState,
    setDashboardSideBarState,
    locationOnClickHandle,
  } = useModal();

  const { type, google_address } = AddressDataIndex || "";

  const [menuItemVisiblity, setMenuItemVisiblity] = useState<
    menuItemProps["name"][]
  >(["My Account"]);

  const [logOutWarningModal, setLogOutWarningModal] = useState(false);

  console.log(AddressDataIndex);

  const router = useRouter();

  const onLocationConfirmCallBack = () => {
    setMenuItemVisiblity((prev) => [...prev, "Address Form"]);
  };

  const addressOnEditClick = () => {
    setMenuItemVisiblity((prev) => [...prev, "Select Your Location"]);
  };

  const menuItems: menuItemProps[] = [
    {
      name: "Cart",
      onClick: () => {
        setMenuItemVisiblity((prev) => [...prev, "Cart"]);
      },
      iconType: "cartMenuIcon",
      component: <Cart />,
    },
    {
      name: "Addresses",
      onClick: () => {
        setMenuItemVisiblity((prev) => [...prev, "Addresses"]);
      },
      iconType: "addressesIcon",
      component: <AddressComp addressOnEditClick={addressOnEditClick} />,
    },
    {
      name: "Buy Again",
      onClick: () => {
        setMenuItemVisiblity((prev) => [...prev, "Buy Again"]);
      },
      iconType: "buyAgainIcon",
      component: <OrderComp />,
    },
    {
      name: "Transactions",
      onClick: () => {
        setMenuItemVisiblity((prev) => [...prev, "Transactions"]);
      },
      iconType: "transactionsIcon",
      component: <AddressComp addressOnEditClick={addressOnEditClick} />,
    },
    {
      name: "Wishlist",
      onClick: () => {
        router.push("/wishlist");
      },
      iconType: "wishlistIcon",
    },
    {
      name: "Appointments",
      onClick: () => {
        setMenuItemVisiblity((prev) => [...prev, "Appointments"]);
      },
      iconType: "appointmentsIcon",
      component: <AppointmentsComp />,
    },
    {
      name: "Contact Us",
      onClick: () => {
        setMenuItemVisiblity((prev) => [...prev, "Contact Us"]);
      },
      iconType: "chatWithUsIcon",
      component: <ContactUs />,
    },

    {
      type: "all",
      name: "Orders",
      onClick: () => {
        setMenuItemVisiblity((prev) => [...prev, "Orders"]);
      },
      iconType: "ordersIcon",
      component: <OrderComp />,
    },
    {
      type: "mainMenu",
      name: "Vouchers",
      onClick: () => {
        setMenuItemVisiblity((prev) => [...prev, "Vouchers"]);
      },
      iconType: "giftsIcon",
      component: <VouchersComp />,
    },
    {
      type: "accountDetails",
      name: "Account Details",
      onClick: () => {
        setMenuItemVisiblity((prev) => [...prev, "Account Details"]);
      },
      iconType: "giftsIcon",
      component: <AccountDetailsComp />,
    },
    {
      type: "mainMenu",
      name: "Rewards",
      onClick: () => {
        setMenuItemVisiblity((prev) => [...prev, "Rewards"]);
      },
      iconType: "rewardsIcon",
      component: <RewardsComp />,
    },
    {
      type: null,
      name: "Select Your Location",
      onClick: () => {
        setMenuItemVisiblity((prev) => [...prev, "Select Your Location"]);
      },
      iconType: "locationPinIcon",
      component: (
        <LocationSelection onConfirmCallBack={onLocationConfirmCallBack} />
      ),
    },
    {
      type: null,
      name: "Address Form",
      onClick: () => {
        setMenuItemVisiblity((prev) => [...prev, "Address Form"]);
      },
      iconType: "locationPinIcon",
      component: <AddNewAddressForm isModal={false} />,
    },
    {
      type: null,
      name: "Check Out",
      onClick: () => {
        setMenuItemVisiblity((prev) => [...prev, "Check Out"]);
      },
      iconType: "locationPinIcon",
      component: <AddNewAddressForm isModal={false} />,
    }
  ];

  const logoutMenu: menuItemProps = {
    name: "Log Out",
    onClick: () => {
      setLogOutWarningModal(true);
    },
    iconType: "LogoutIcon",
  };

  const { data: session, update } = useSession();

  const { currentCountryDetails } = useLanguage();
  const cartItems = useSelector((state: RootState) => state.cart);

  const cartSummery = cartItems.cart.cart_summary;

  return (
    <>
      <Transition.Root show={dashboardSideBarState} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={setDashboardSideBarState}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 " />
          <div className="fixed inset-0 overflow-hidden ">
            <div className="absolute inset-0 overflow-hidden ">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl  ">
                    <nav
                      className="flex h-full w-full flex-col   bg-white shadow-2xl"
                      aria-label="Chat history"
                    >
                      {/* Header Part */}
                      <div className="mb-0.5 flex justify-between p-4 shadow-md">
                        {menuItemVisiblity.length > 1 && (
                          <button
                            onClick={() =>
                              setMenuItemVisiblity((prev) => prev.slice(0, -1))
                            }
                          >
                            <Icon
                              type="chevronLeftIcon"
                              className="text-slate-500"
                              sizes={"lg"}
                            />
                          </button>
                        )}
                        <Typography
                          size={"xl"}
                          bold={"semibold"}
                          className="leading-normal"
                        >
                          {Array.isArray(menuItemVisiblity)
                            ? menuItemVisiblity[menuItemVisiblity.length - 1]
                            : menuItemVisiblity}
                        </Typography>
                        {menuItemVisiblity.length === 1 ? (
                          <button
                            onClick={() => setDashboardSideBarState(false)}
                          >
                            <Icon
                              type="crossIcon"
                              className="text-slate-500"
                              sizes={"lg"}
                            />
                          </button>
                        ) : (
                          <span></span>
                        )}
                      </div>
                      {menuItemVisiblity[menuItemVisiblity.length - 1] ===
                        "Cart" && (
                        <div className="bg-blue-700  p-2 py-2.5 px-2.5  w-full text-white flex items-center  justify-between">
                          <div className="flex items-center space-x-2 ">
                            <div>
                              <Typography
                                whitespace={"nowrap"}
                                size={"linkText"}
                              >
                                Deliver to :
                              </Typography>
                            </div>

                            <div className="space-x-1.5  flex mt-0.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="fill-white w-5 h-4"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                              </svg>
                              <Typography
                                bold={"light"}
                                size={"sm"}
                                lineClamp={"one"}
                              >
                                {type} :{" "}
                                <span className="px-1">{google_address}</span>
                              </Typography>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setFormData(AddressDataIndex);
                              setMenuItemVisiblity((prev) => [
                                ...prev,
                                "Select Your Location",
                              ]);
                            }}
                            className="mt-0.5"
                          >
                            <Typography bold={"semibold"} size={"sm"}>
                              CHANGE
                            </Typography>
                          </button>
                        </div>
                      )}
                      {/* Header Part */}

                      {/* Content Part */}
                      <div className="flex-col flex-1 transition-opacity duration-500 -mr-2 pr-2   overflow-x-hidden relative">
                        <div className="w-full bg-gray-100  space-y-5 flex-1 flex-col  pb-5 absolute inset-0 overflow-y-auto">
                          <div className="w-full p-6 flex items-center justify-between bg-[#6785FC] rounded-b-3xl shadow-md">
                            <div className="flex items-center space-x-3">
                              <div>
                                <div className="w-[85px] h-[85px] rounded-full bg-slate-100 border-4 border-green-500 relative">
                                  <div className="rounded-full  p-1  absolute  w-fit m-auto -right-2 -bottom-1">
                                    <BadgeCheck className="text-white fill-green-500 w-7 h-7" />
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-1 pr-3 rtl:pl-3">
                                <div className="flex items-center space-x-1.5">
                                  <Typography
                                    bold={"semibold"}
                                    variant={"secondary"}
                                    size={"xl"}
                                  >
                                    {session?.token.name || "User"}
                                  </Typography>
                                </div>
                                <div className="text-white ">
                                  <Typography bold={"light"}>
                                    {" "}
                                    {session?.token.phone ||
                                      session?.token.email}
                                  </Typography>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant={"white"}
                              rounded={"lg"}
                              className="text-black"
                              onClick={() =>
                                setMenuItemVisiblity((prev) => [
                                  ...prev,
                                  "Account Details",
                                ])
                              }
                            >
                              edit
                            </Button>
                          </div>
                          <div className="rounded-lg bg-white border border-slate-200 mx-6  space-y-6 pt-7 ">
                            <div className="flex  items-center justify-between sm:px-10 px-5 w-full overflow-x-auto no-scrollbar">
                              {menuItems.map(
                                (menuItem) =>
                                  (menuItem.type === "mainMenu" ||
                                    menuItem.type === "all") && (
                                    <button
                                      className="space-y-2 mr-3"
                                      onClick={() => menuItem.onClick()}
                                    >
                                      {" "}
                                      <div className="rounded-full p-6 bg-[#6785FC] shadow space-y-1">
                                        <Icon
                                          type={menuItem.iconType}
                                          className="fill-white text-white !w-7 !h-7"
                                        />
                                      </div>
                                      <Typography
                                        variant={"lifeText"}
                                        bold={"semibold"}
                                        alignment={"horizontalCenter"}
                                      >
                                        {menuItem.name}
                                      </Typography>
                                    </button>
                                  )
                              )}
                            </div>
                            <div>
                              {menuItems.map(
                                (menuItem) =>
                                  menuItem.type === undefined &&
                                  menuItem.name !== "Log Out" && (
                                    <button
                                      onClick={() => menuItem.onClick()}
                                      className="hover:bg-slate-100 transition-colors duration-200 px-4 border-gray-100 border-t block w-full  bg-white last:rounded-b-lg"
                                    >
                                      <div className=" py-4 px-1.5 flex items-center justify-between">
                                        <div className="flex items-center space-x-5">
                                          <Icon
                                            type={menuItem.iconType}
                                            className="text-life"
                                          />
                                          <Typography
                                            variant={"lifeText"}
                                            bold={"semibold"}
                                          >
                                            {menuItem.name}
                                          </Typography>
                                        </div>
                                        <Icon
                                          type="chevronRightIcon"
                                          className="!w-5 !h-5 text-life"
                                        />
                                      </div>
                                    </button>
                                  )
                              )}
                            </div>
                          </div>
                          <div className="mx-6">
                            <button
                              onClick={() => logoutMenu.onClick()}
                              className="hover:bg-slate-100 transition-colors duration-200 px-4 border-gray-200 border block w-full  bg-white mt-5 rounded-lg"
                            >
                              <div className=" py-4 px-1.5 flex items-center justify-between ">
                                <div className="flex items-center space-x-5">
                                  <Icon
                                    type={logoutMenu.iconType}
                                    className="text-life"
                                  />
                                  <Typography
                                    variant={"lifeText"}
                                    bold={"semibold"}
                                  >
                                    {logoutMenu.name}
                                  </Typography>
                                </div>
                                <Icon
                                  type="chevronRightIcon"
                                  className="!w-5 !h-5 text-life"
                                />
                              </div>
                            </button>
                          </div>
                        </div>

                        {menuItems.map((menuItem) => (
                          <TransitionComp
                            showTransition={menuItemVisiblity.includes(
                              menuItem.name
                            )}
                          >
                            <div className="shadow-[-50px_1px_60px_14px_rgba(0,0,0,0.2)]  absolute inset-0 flex overflow-y-auto flex-col flex-1 bg-white z-50 ">
                              <div className="p-6">{menuItem.component}</div>
                            </div>
                          </TransitionComp>
                        ))}
                      </div>
                      {/* Content Part */}

                      {/* Footer Part */}
                      {menuItemVisiblity[menuItemVisiblity.length - 1] ===
                        "Addresses" && (
                        <div className="border-t border-slate-500/20   ">
                          <div className="p-3 px-6 bg-white flex space-x-4">
                            <Button
                              className="w-full"
                              variant={"outline"}
                              onClick={() => {
                                setFormData(formDataInitState);
                                setMenuItemVisiblity((prev) => [
                                  ...prev,
                                  "Select Your Location",
                                ]);
                              }}
                            >
                              Add new Address
                            </Button>
                            <Button
                              className="w-full"
                              onClick={() => {
                                update({
                                  selected_address: AddressDataIndex,
                                }).then((res) => {
                                  // setAddressDataIndex(AddressDataIndex);

                                  router.reload();
                                });
                              }}
                            >
                              Continue
                            </Button>
                          </div>
                        </div>
                      )}

                      {menuItemVisiblity[menuItemVisiblity.length - 1] ===
                        "Cart" && (
                        <div className="border-t border-slate-500/20   ">
                          <div className="p-3 px-6 bg-white flex space-x-5">
                            <div className="flex flex-col ">
                              <div className="flex space-x-1 flex-1 items-center text-life">
                                <Typography bold={"bold"}>
                                  {currentCountryDetails.currency}
                                </Typography>
                                <Typography bold={"bold"} size={"lg"}>
                                  {cartSummery.total}
                                </Typography>
                              </div>
                              <Typography
                                whitespace={"nowrap"}
                                bold={"semibold"}
                                size={"sm"}
                                variant={"lifeText"}
                              >
                                VIEW DETAILS
                              </Typography>
                            </div>

                            <Button
                              iconRight={
                                <ArrowRight className="w-7 h-7 bg-white p-1 rounded-lg text-life ml-auto bounce-horizontal" />
                              }
                              variant={"lifeBtn"}
                              rounded={"lg"}
                              className="w-full "
                              onClick={() => {
                                update({
                                  selected_address: AddressDataIndex,
                                }).then((res) => {
                                  setAddressDataIndex(AddressDataIndex);

                                  router.reload();
                                });
                              }}
                            >
                              <span className="font-medium">
                                PROCEED TO CHECKOUT
                              </span>
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Footer Part */}
                    </nav>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <InvalidOTPModal
        modalState={"warning"}
        showModal={logOutWarningModal}
        setCloseModal={setLogOutWarningModal}
        modalMessage="Are you sure you want to log out?"
        modalHeader="Logout"
        buttonProps={
          <div className="flex space-x-2 w-full rtl:space-x-reverse">
            <Button
              className="mx-auto w-full"
              onClick={() => {
                signOut({ callbackUrl: "/" });
                toast.success("Success", {
                  className: "space-x-3 rtl:space-x-reverse",
                  description: "Log Out Successfull",
                });
              }}
            >
              OK
            </Button>
            <Button
              variant={"outline"}
              className="mx-auto w-full"
              onClick={() => {
                setLogOutWarningModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        }
      />
    </>
  );
}
