import { BorderInputField, DeliverInstructionsBtn } from "@/components/Button";
import BreadCrumb from "@/components/breadcrumb";
import {
  OrderSummaryComp,
  ReturnsComponent,
  TipsComp,
} from "@/components/cartcomp";
import InvalidOTPModal from "@/components/invalid-otp-modal";
import { PaymentMethodModal } from "@/components/location-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useModal } from "@/components/ui/modalcontext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { Typography, typographyVariants } from "@/components/ui/typography";
import { useCartActions } from "@/hooks/useCartActions";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Checkout({}) {
  const [paymentMethodModalState, setPaymentMethodModalState] = useState(false);
  const [btnLoadingState, setBtnLoadingState] = useState(false);
  const [couponCodeValue, setCouponCodeValue] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [invalidModalState, setInvalidModalState] = useState(false);
  const [paywithNewCardVisibility, setPaywithNewCardVisibility] =
    useState(false);
  const { data: session } = useSession();
  const { updateDeliverySlot, updateCouponState } = useCartActions();

  const {
    setSheetOpen,

    AddressDataIndex,
    locationOnClickHandle,
    modalState,
  } = useModal();

  const [loadingState, setLoadingState] = useState(true);

  // useEffect(() => {
  //   setModalFixedState(true);
  //   setDomLoaded(true);
  //   !session ? setSheetOpen(true) : setSheetOpen(false);
  // }, [session]);

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      if (session) {
        setLoadingState(false);
      } else {
        setSheetOpen(true);
      }
    }
    checkSession();
  }, [session]);

  const cartItems = useSelector((state: RootState) => state.cart);
  const cartItemsData = cartItems.cart.cart_data
    ? cartItems.cart.cart_data.items
    : [];
  const shipmentData =
    cartItems && cartItems.cart.shipment_data
      ? cartItems.cart.shipment_data[0]
      : null;
  const cartSummery = cartItems && cartItems.cart.cart_summary;
  const { currentCountryDetails } = useLanguage();
  const [newCardSelected, setNewCardSelectedState] = useState<null | string>(
    null
  );
  // console.log(shipmentData);


  // console.log(shipmentData.available_slots);

  return (
    <>
      <div className="container-page">
        <BreadCrumb />
        {!loadingState && (
          <div className="grid grid-cols-12 gap-x-3 px-[10px] py-5 max-w-[1440px] mx-auto">
            <div className="space-y-3 md:col-span-8 col-span-full">
              <div className="shadow rounded-lg px-1 py-2 border border-blue-800">
                <div className=" text-white flex justify-between  px-3 py-0.5 items-center">
                  <div className="flex space-x-2 items-center rtl:space-x-reverse">
                    <Icon
                      type="locationPinIcon"
                      sizes={"sm"}
                      className="text-life "
                    />
                    <Typography variant={"lifeText"} bold={"bold"}>
                      {AddressDataIndex?.type || "Home"}
                    </Typography>
                  </div>
                  <Button
                    variant={"lifeBtn"}
                    onClick={() => locationOnClickHandle()}
                    size={"sm"}
                  >
                    CHANGE
                  </Button>
                </div>
                <hr className="   border-slate-200 mt-1 mx-2 " />
                {session && session.token.addresses.length > 0 ? (
                  <div className="pt-2 px-3 space-y-1">
                    <Typography
                      size={"sm"}
                      variant={"paragraph"}
                      bold={"semibold"}
                    >
                      {AddressDataIndex?.name}
                    </Typography>

                    <Typography
                      size={"sm"}
                      variant={"paragraph"}
                      bold={"semibold"}
                    >
                      {AddressDataIndex?.google_address}
                    </Typography>

                    <Typography
                      size={"sm"}
                      bold={"semibold"}
                      className="text-black"
                    >
                      Phone: {AddressDataIndex?.phone}
                    </Typography>
                  </div>
                ) : (
                  <div className="w-full p-5">
                    <Typography
                      variant={"paragraph"}
                      size={"xs"}
                      alignment={"horizontalCenter"}
                      className="italic"
                    >
                      Please click on change and choose delivery address.
                    </Typography>
                  </div>
                )}
              </div>

              <Typography bold={"semibold"} variant={"lifeText"} size={"lg"}>
                {" "}
                Delivery Options
              </Typography>

              <div className="shadow rounded-lg p-2 border-2 border-muted">
                <div className="bg-pink-100 text-white flex justify-between rounded-full px-3 py-1">
                  <div className="flex space-x-2 items-center rtl:space-x-reverse">
                    <Typography variant={"lifeText"} size={"sm"} bold={"bold"}>
                      Delivery From: {shipmentData && shipmentData.store_code}
                    </Typography>
                  </div>
                  <Typography variant={"lifeText"} size={"sm"} bold={"bold"}>
                    Shipment 1
                  </Typography>
                </div>

                <div className="py-5">
                  <div className="flex space-x-3 rtl:space-x-reverse overflow-x-auto scrollbar-thin pb-2">
                    {cartItemsData.length > 0 ? (
                      cartItemsData.map((cartData: any) => (
                        <div className="min-h-[60px] min-w-[60px] relative border-2 border-muted rounded-lg">
                          <Image
                            src={
                              cartData.items[0].featured_image
                                ? cartData.items[0].featured_image
                                : "/images/default-product-image.png"
                            }
                            alt="pro-img"
                            height="50"
                            width="50"
                            className="h-full w-full rounded-lg"
                          />
                          <div className="absolute -right-2 -bottom-2 rounded-full bg-primary  flex items-center justify-center py-[1px] px-1.5">
                            <Typography variant={"secondary"} size={"xs"}>
                              {" "}
                              <small>x </small> {cartData.items[0].qty}
                            </Typography>
                          </div>
                        </div>
                      ))
                    ) : (
                      <Typography
                        size={"sm"}
                        variant={"paragraph"}
                        alignment={"horizontalCenter"}
                        className="italic w-full"
                      >
                        Items Added to the Cart will Appear here
                      </Typography>
                    )}
                  </div>
                </div>
                <div className="divide-gray-300 divide-y   ">
                  <RadioGroup
                    className={"!gap-1"}
                    defaultValue={
                      shipmentData
                        ? cartItems.cart.shipment_data[0].selected_slot.id
                        : null
                    }
                    onValueChange={(value) => {
                      debugger;
                      updateDeliverySlot(
                        {
                          action: "update_slot",
                          data: {
                            store_code:
                              cartItems.cart.shipment_data[0].store_code,
                            slot_id: value,
                          },
                        }
                      );
                    }}
                  >
                    {shipmentData &&
                      shipmentData.available_slots.map(
                        (avSlot: any, indx: number) => (
                          <label
                            htmlFor={`delivery_slot-${indx}`}
                            className={`cursor-pointer flex justify-between items-center  border-t  py-3 px-3 `}
                          >
                            <div className="flex space-x-4 rtl:space-x-reverse items-center">
                              <Image
                                src={`https://www.lifepharmacy.com/images/${avSlot.shipment_label}-nr.svg`}
                                height={35}
                                width={35}
                                alt="standard-icon"
                              />
                              <div className="">
                                <div className="flex space-x-3 items-center">
                                  <Typography
                                    variant={"lifeText"}
                                    bold={"bold"}
                                  >
                                    {avSlot.title}
                                  </Typography>
                                  {avSlot.label && (
                                    <div className="border-green-600 border bg-green-50 text-green-600 h-fit px-5 rounded-sm">
                                      <Typography
                                        size={"xs"}
                                        className="uppercase"
                                      >
                                        {" "}
                                        {avSlot.label}
                                      </Typography>
                                    </div>
                                  )}
                                </div>

                                <Typography size={"sm"}>
                                  {avSlot.subtitle}
                                </Typography>
                              </div>
                            </div>
                            <RadioGroupItem
                              value={avSlot.id}
                              id={`delivery_slot-${indx}`}
                            />
                          </label>
                        )
                      )}
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="space-y-4 md:col-span-4 col-span-full md:mt-0 mt-4">
              <div className="rounded-lg space-y-1">
                <Typography variant={"lifeText"} bold={"bold"}>
                  HAVE A COUPON ?
                </Typography>{" "}
                <Input
                  sizes={"sm"}
                  placeholder="Enter Coupon Code"
                  className="rounded-r-none border-dashed !text-base font-normal"
                  type="text"
                  value={couponCodeValue}
                  onChange={(e) =>
                    setCouponCodeValue((e.target as HTMLInputElement).value)
                  }
                  buttonRight={
                    <Button
                      onClick={() =>
                        updateCouponState(
                          {
                            action: "apply_coupon",
                            data: {
                              coupon_code: couponCodeValue,
                            },
                          },
                          setInvalidModalState,
                          setAlertMessage
                        )
                      }
                      className="rounded-l-none"
                    >
                      Apply
                    </Button>
                  }
                />
              </div>
              <div className="shadow-sm rounded-lg border-muted border p-3 space-y-2">
                <Typography variant={"lifeText"} bold={"bold"}>
                  Delivery Instructions
                </Typography>{" "}
                <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 ">
                  {cartItems.cart.delivery_instructions &&
                    cartItems.cart.delivery_instructions.map((instr: any) => (
                      <DeliverInstructionsBtn instr={instr} />
                    ))}
                </div>
                <hr className="border-slate-100" />
                <Input
                  placeholder="Add a note"
                  className=" border-t-0 border-x-0 rounded-none font-normal !text-sm "
                  inputClassName=" placeholder:text-xs"
                  buttonLeft={
                    <Image
                      src={"https://www.lifepharmacy.com/images/notes.svg"}
                      alt="note"
                      width={50}
                      height={50}
                    />
                  }
                />
              </div>
              <ReturnsComponent />
              <TipsComp />

              <OrderSummaryComp />
              <div className="md:block hidden">
                <BorderInputField
                  label={
                    <div className="flex items-center space-x-2 rtl:space-x-reverse  bg-white w-fit">
                      <Typography
                        size={"sm"}
                        variant={"lifeText"}
                        bold={"bold"}
                      >
                        PAYING WITH
                      </Typography>
                      <img
                        src="https://www.lifepharmacy.com/images/card.svg"
                        height={23}
                        width={23}
                      />
                    </div>
                  }
                  description={
                    !newCardSelected ? (
                      <div className="pb-3  pt-4">
                        <u
                          onClick={() => setPaymentMethodModalState(true)}
                          className={cn(
                            buttonVariants({ variant: "primaryLink" }),
                            "space-x-1  rtl:space-x-reverse cursor-pointer "
                          )}
                        >
                          Choose Payment Method
                          <Icon type="chevronBottomIcon" sizes={"sm"} />
                        </u>
                      </div>
                    ) : (
                      <button
                        className="pb-3 pt-4 flex items-center justify-between w-full "
                        onClick={() => setPaymentMethodModalState(true)}
                      >
                        <Typography variant={"primary"}>
                          {newCardSelected}
                        </Typography>
                        <Button size={"xs"}>CHANGE</Button>
                      </button>
                    )
                  }
                />
              </div>

              <div className="md:flex hidden sm:space-x-2 sm:rtl:space-x-reverse md:space-y-0 space-y-2 ">
                <BorderInputField
                  label={
                    <Typography size={"sm"} variant={"lifeText"} bold={"bold"}>
                      TOTAL PAYABLE
                    </Typography>
                  }
                  description={
                    <Typography
                      variant={"primary"}
                      size={"sm"}
                      bold={"semibold"}
                      className="py-2.5 pt-3"
                    >
                      {currentCountryDetails.currency} {cartSummery?.total}{" "}
                    </Typography>
                  }
                />
                <Button
                  onClick={() => setBtnLoadingState(true)}
                  isLoading={btnLoadingState}
                  size={"lg"}
                  rounded={"lg"}
                  disableBtn={!newCardSelected}
                  className="w-full text-sm"
                  iconLeft={
                    btnLoadingState && (
                      <Icon
                        type="loadingIcon"
                        sizes={"sm"}
                        animation={"spin"}
                        className="mx-2"
                      />
                    )
                  }
                >
                  PLACE ORDER{" "}
                </Button>
              </div>
            </div>

            <PaymentMethodModal
              setNewCardSelectedState={setNewCardSelectedState}
              newCardSelected={newCardSelected}
              showModal={paymentMethodModalState}
              setCloseModal={setPaymentMethodModalState}
            />
            <InvalidOTPModal
              modalState={modalState}
              showModal={
                invalidModalState && alertMessage !== (undefined || "")
              }
              setCloseModal={setInvalidModalState}
              modalMessage={alertMessage}
              modalHeader="OOPS..."
              buttonProps={
                <Button
                  className="mx-auto w-full"
                  onClick={() => {
                    setInvalidModalState(false);
                  }}
                >
                  OK
                </Button>
              }
            />
          </div>
        )}
      </div>

      <div className="md:hidden block sticky bottom-[3.7rem] left-0 right-0 w-full col-span-full bg-white p-3 py-4 border-t border-slate-200">
        {paywithNewCardVisibility ? (
          <div className="block space-y-2 sm:flex sm:space-x-2 space-x-0  sm:space-y-0">
            <div className="sm:w-3/5 w-full">
              <BorderInputField
                label={
                  <div className="flex items-center space-x-2 rtl:space-x-reverse  bg-white ">
                    <Typography size={"sm"} variant={"lifeText"} bold={"bold"}>
                      PAYING WITH
                    </Typography>
                    <img
                      src="https://www.lifepharmacy.com/images/card.svg"
                      height={23}
                      width={23}
                    />
                  </div>
                }
                description={
                  <div className="py-3 pt-4">
                    <u
                      onClick={() => {
                        setPaymentMethodModalState(true);
                      }}
                      className={cn(
                        buttonVariants({ variant: "primaryLink" }),
                        "space-x-1  rtl:space-x-reverse cursor-pointer "
                      )}
                    >
                      Choose Payment Method
                      <Icon type="chevronBottomIcon" sizes={"sm"} />
                    </u>
                  </div>
                }
              />
            </div>

            <Button
              className=" sm:w-2/5 w-full"
              variant={"lifeBtn"}
              rounded={"lg"}
            >
              {" "}
              <div>
                <div>PLACE ORDER</div>
                <div>
                  {currentCountryDetails.currency} {cartSummery?.total}{" "}
                </div>
              </div>{" "}
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              setPaywithNewCardVisibility(true);

              setPaymentMethodModalState(true);
            }}
            variant={"lifeBtn"}
            className="w-full py-3"
            size={"lg"}
          >
            SELECT PAYMENT METHOD
          </Button>
        )}
      </div>
    </>
  );
}
