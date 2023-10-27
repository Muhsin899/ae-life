import { ProductPricesData } from "@/components/Button";
import BreadCrumb from "@/components/breadcrumb";
import { Icon } from "@/components/ui/icons";
import { Typography, typographyVariants } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RadioGroup } from "@/components/ui/radio";
import { RadioGroupItem } from "@/components/ui/radio";
import { AppointmentsLocationModal } from "@/components/appointments-location-modal";
import { appointmentLocation } from "../../../../types/types";
import { CalendarClock } from "lucide-react";
import { PaymentMethodModal } from "@/components/location-modal";

export default function Appointments({
  appointmentsData,
}: {
  appointmentsData: any;
}) {
  type proCartData = {
    id: string;
    qty: number;
    price: number;
  };

  const [proQty, setProQty] = useState<proCartData[] | null>(null);

  const [limitRechedItems, setLimitReachedItems] = useState<string[] | null>(
    null
  );

  const [appointmentsModalState, setAppointmentsModalState] = useState(false);
  const [paymentMethodModalState, setPaymentMethodModalState] = useState(false);

  const [selectedClinicData, setSelectedClinicData] =
    useState<appointmentLocation | null>(null);
  const [newCardSelected, setNewCardSelectedState] = useState<string | null>(
    null
  );

  type tabTypes = "typeTab" | "locationTab" | "PaymentTab" | "finished";

  const [pageVisibility, setPageVisibility] = useState<tabTypes>("typeTab");

  type selectedItemsProps = {
    clinicLocation: boolean;
    dateAndTime: boolean;
  };
  const [selectedItems, setSelectedItems] = useState<selectedItemsProps>({
    clinicLocation: false,
    dateAndTime: false,
  });

  const addToCart = (id: string, price: number) => {
    if (!proQty) {
      setProQty([{ id: id, qty: 1, price: price }]);
    } else {
      updateCart(id, 1, price);
    }
  };

  const getFilteredData = (id: string, data: proCartData[]) => {
    return data.filter((cartData: proCartData) => cartData.id !== id);
  };

  const updateCart = (id: string, qty: number, price: number) => {
    if (proQty) {
      if (qty === 10) {
        setLimitReachedItems((prevdata: any) =>
          prevdata ? [...prevdata, id] : [id]
        );
      }

      setProQty((prevData: any) => [
        ...getFilteredData(id, prevData),
        { id: id, qty: qty, price: price * qty },
      ]);
    }
  };

  const itemExists = (id: string) => {
    if (proQty) {
      return proQty.some((cartData) => cartData.id === id);
    }
    return false;
  };

  const getProductQty = (id: string) => {
    if (itemExists(id)) {
      return proQty?.filter((data) => data.id === id)[0].qty || 0;
    } else {
      return 0;
    }
  };

  const getTotalPrice = () => {
    if (proQty) {
      const totalPrice = proQty.reduce((accumulator, proData) => {
        return proData.price + accumulator;
      }, 0);
      return totalPrice;
    }
    return 0;
  };

  return (
    <div className="container-page-items">
      <div className="w-full py-6">
        <div className="flex">
          <div className="w-1/4">
            <div className="relative mb-2">
              <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
                <span className="text-center text-white w-full ">
                  <Icon type="appointmentsIcon" className=" m-auto" />
                </span>
              </div>
            </div>
            <div className="text-xs text-center md:text-base">Select Type</div>
          </div>
          <div className="w-1/4">
            <div className="relative mb-2">
              <div
                className="absolute flex align-center items-center align-middle content-center"
                style={{
                  width: "calc(100% - 2.5rem - 1rem)",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-full bg-gray-200  rounded items-center align-middle align-center flex-1">
                  <div
                    className={`w-0 py-1 rounded ${
                      ["locationTab", "PaymentTab", "finished"].includes(
                        pageVisibility
                      )
                        ? "bg-green-300"
                        : "bg-gray-200"
                    }`}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <div
                className={`w-10 h-10 mx-auto  rounded-full text-lg border-2 border-gray-200 flex items-center ${
                  ["locationTab", "PaymentTab", "finished"].includes(
                    pageVisibility
                  )
                    ? "bg-green-500 text-white"
                    : "bg-white text-black "
                }`}
              >
                <span className="text-center  w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="w-5 h-5 m-auto"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="text-xs text-center md:text-base">
              Address & Slot
            </div>
          </div>
          <div className="w-1/4">
            <div className="relative mb-2">
              <div
                className="absolute flex align-center items-center align-middle content-center"
                style={{
                  width: "calc(100% - 2.5rem - 1rem)",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                  <div
                    className={`w-0 py-1 rounded ${
                      ["PaymentTab", "finished"].includes(pageVisibility)
                        ? "bg-green-300"
                        : "bg-gray-200"
                    }`}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <div
                className={`w-10 h-10 mx-auto  border-2 border-gray-200 rounded-full text-lg  flex items-center ${
                  ["PaymentTab", "finished"].includes(pageVisibility)
                    ? "bg-green-500 text-white"
                    : "bg-white text-black "
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="w-5 h-5  m-auto"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0V4zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1H0z" />
                </svg>
              </div>
            </div>
            <div className="text-xs text-center md:text-base">Payment</div>
          </div>
          <div className="w-1/4">
            <div className="relative mb-2">
              <div
                className="absolute flex align-center items-center align-middle content-center"
                style={{
                  width: "calc(100% - 2.5rem - 1rem)",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                  <div
                    className={`w-0 py-1 rounded ${
                      pageVisibility === "finished"
                        ? "bg-green-300"
                        : "bg-gray-200"
                    }`}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <div
                className={`w-10 h-10 mx-auto  border-2 border-gray-200 rounded-full text-lg  flex items-center ${
                  pageVisibility === "finished"
                    ? "bg-green-500 text-white"
                    : "bg-white text-black "
                }`}
              >
                <span className={`text-center  w-full `}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="w-5 h-5  m-auto"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="text-xs text-center md:text-base">Finished</div>
          </div>
        </div>
      </div>

      <div>
        {appointmentsData.images.banner ? (
          <Image
            src={appointmentsData.images.banner}
            height={"450"}
            width={"1440"}
            className="w-full "
            alt={appointmentsData.name}
          />
        ) : (
          <div className=" flex items-center justify-center  min-h-[330px] bg-slate-100 rounded-2xl">
            <Typography
              bold={"bold"}
              size={"xxl"}
              alignment={"horizontalCenter"}
            >
              {appointmentsData.name}
            </Typography>
          </div>
        )}
      </div>
      <BreadCrumb />
      <div className="grid grid-cols-12 p-3 gap-4 ">
        <div className="lg:col-span-8 col-span-full space-y-4">
          <Button className="px-10">VISIT LIFE CLINIC</Button>

          {pageVisibility === "typeTab" &&
            appointmentsData.products.map((product: any) => (
              <div className="shadow rounded-lg p-5 sm:flex block sm:space-y-0 space-y-5 border border-slate-100 justify-between ">
                <div className="sm:space-x-4 space-x-0 sm:flex block space-y-5 sm:mx-0 mx-auto">
                  <div className={"relative"}>
                    <Image
                      src={product.images.featured_image}
                      height={160}
                      width={160}
                      className="max-w-[160px] max-h-[160px] mx-auto"
                      alt={product.title}
                    />
                    {limitRechedItems &&
                      limitRechedItems.includes(product.id) && (
                        <div className="bg-slate-700/50 flex items-center justify-center absolute inset-0 m-auto w-fit h-fit p-1 px-2">
                          <Typography
                            bold={"semibold"}
                            size={"sm"}
                            className="text-white"
                          >
                            Limit Reached
                          </Typography>
                        </div>
                      )}
                  </div>

                  <div className="flex flex-col ">
                    <div>
                      <Typography bold={"semibold"} className="text-black">
                        {product.title}
                      </Typography>
                      <hr />
                    </div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.short_description,
                      }}
                      className={cn(
                        typographyVariants({ size: "linkText", bold: "light" }),
                        "pt-3 line-clamp-4"
                      )}
                    />
                    <div className="pt-5">
                      <ProductPricesData
                        productPriceSize={"default"}
                        productPrices={product.prices}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-end ">
                  {getProductQty(product.id) > 0 ? (
                    <div className="flex items-center mx-auto">
                      <Button
                        variant={"ghost"}
                        className={`!px-1 h-[35px] w-[40px]`}
                        onClick={() =>
                          updateCart(
                            product.id,
                            getProductQty(product.id) - 1,
                            product.prices[0].price?.offer_price ||
                              product.prices[0].price?.regular_price
                          )
                        }
                      >
                        <Icon
                          type={
                            getProductQty(product.id) > 0
                              ? "minusIcon"
                              : "trashIcon"
                          }
                          sizes={"sm"}
                        />
                      </Button>
                      <Typography className="sm:px-3 px-3 flex items-center">
                        {getProductQty(product.id)}
                      </Typography>
                      <Button
                        disableBtn={
                          (limitRechedItems &&
                            limitRechedItems.includes(product.id)) ||
                          false
                        }
                        onClick={() =>
                          updateCart(
                            product.id,
                            getProductQty(product.id) + 1,
                            product.prices[0].price?.offer_price ||
                              product.prices[0].price?.regular_price
                          )
                        }
                        className={`!px-1 h-[35px] w-[40px] `}
                      >
                        <Icon
                          type={"plusIcon"}
                          sizes={"sm"}
                          variant={"default"}
                        />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      iconLeft={
                        <Icon
                          type="addToCartIcon"
                          className="ltr:mr-1 rtl:ml-1 !w-5 !h-5 "
                        />
                      }
                      className="py-2 px-10 w-full"
                      onClick={() =>
                        addToCart(
                          product.id,
                          product.prices[0].price?.offer_price ||
                            product.prices[0].price?.regular_price
                        )
                      }
                      size={"sm"}
                    >
                      <div className="leading-[0px]">ADD</div>
                    </Button>
                  )}
                </div>
              </div>
            ))}

          <div className=" space-y-4">
            {["PaymentTab", "finished"].includes(pageVisibility) && (
              <>
                <div className="shadow rounded-lg p-3  col-span-8 border border-slate-100 justify-between ">
                  <div className="flex space-x-2 ">
                    <CalendarClock className="w-5 h-5 text-life" />
                    <Typography bold={"bold"} variant={"lifeText"} size={"lg"}>
                      Date & Time
                    </Typography>
                  </div>
                  <div className="p-1">
                    <Typography bold={"light"} alignment={"horizontalCenter"}>
                      Walk in AnyTime
                    </Typography>
                  </div>
                </div>

                <div className="shadow rounded-lg p-3  col-span-8 border border-slate-100 justify-between ">
                  <div className="flex space-x-2  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="w-5 h-5 fill-blue-800"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                    <Typography bold={"bold"} variant={"lifeText"} size={"lg"}>
                      Address
                    </Typography>
                  </div>
                  <div className="p-1">
                    <Typography bold={"light"}>
                      {selectedClinicData?.address.street_address}
                    </Typography>
                  </div>
                </div>
                <div className="shadow rounded-lg p-3  col-span-8 border border-slate-100 justify-between ">
                  <div className="flex space-x-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-5 h-5 fill-blue-800 "
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0V4zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1H0z" />
                    </svg>

                    <div className="p-1">
                      <Typography
                        bold={"bold"}
                        variant={"lifeText"}
                        size={"lg"}
                      >
                        Payment Method
                      </Typography>
                    </div>
                  </div>
                  {!newCardSelected ? (
                    <button
                      className="p-2 px-0 flex items-center space-x-1 "
                      onClick={() => setPaymentMethodModalState(true)}
                    >
                      <Typography bold={"semibold"} variant={"lifeText"}>
                        Select a Payment Method
                      </Typography>
                      <Icon
                        type="chevronBottomIcon"
                        sizes={"sm"}
                        className="text-slate-500"
                      />
                    </button>
                  ) : (
                    <button
                      className="p-2 px-0 flex items-center  justify-between w-full"
                      onClick={() => setPaymentMethodModalState(true)}
                    >
                      <Typography bold={"semibold"} variant={"lifeText"}>
                        {newCardSelected}
                      </Typography>

                      <Button variant={"lifeBtn"} size={"xs"}>
                        CHANGE
                      </Button>
                    </button>
                  )}
                </div>
              </>
            )}
            {pageVisibility === "locationTab" && (
              <>
                <div className="border border-slate-200 rounded-xl shadow w-full  p-2.5 space-y-3">
                  <div>
                    <Typography bold={"bold"} variant={"lifeText"}>
                      SELECT LOCATION
                    </Typography>
                    <Typography
                      size={"linkText"}
                      bold={"light"}
                      variant={"paragraph"}
                    >
                      Visit any Life Walk in clinic to give your sample
                      conviniently located across UAE.{" "}
                    </Typography>
                  </div>
                  {selectedItems.clinicLocation && selectedClinicData ? (
                    <div className="border border-slate-200 shadow-sm  px-3 py-2  rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <Icon
                            type="checkIcon"
                            className="fill-green-600 text-white "
                          />

                          <Typography
                            bold={"bold"}
                            variant={"lifeText"}
                            size={"lg"}
                          >
                            {selectedClinicData.name}
                          </Typography>
                        </div>
                        <Button
                          variant={"lifeBtn"}
                          size={"xs"}
                          onClick={() => setAppointmentsModalState(true)}
                        >
                          CHANGE
                        </Button>
                      </div>

                      <hr className="border-slate-100" />
                      <div className="space-y-1">
                        <Typography
                          size={"linkText"}
                          bold={"light"}
                          className="text-gray-400"
                        >
                          {selectedClinicData.address.street_address}
                        </Typography>

                        <div className="flex justify-between items-center">
                          <Typography size={"linkText"}>
                            Working Hours: {selectedClinicData.working_hours}
                          </Typography>
                          <Typography
                            variant={"lifeText"}
                            size={"sm"}
                            bold={"semibold"}
                          >
                            {selectedClinicData.distance_text}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setAppointmentsModalState(true)}
                      className="w-full font-[600] py-8 "
                      size={"lg"}
                      variant={"ghost"}
                      rounded={"xl"}
                    >
                      SELECT LOCATION
                    </Button>
                  )}
                </div>
                <div className="border border-slate-200  rounded-xl shadow w-full space-y-2 p-3 ">
                  <Typography
                    bold={"semibold"}
                    variant={"lifeText"}
                    size={"sm"}
                  >
                    SELECT DATE & TIME
                  </Typography>
                  {selectedItems.dateAndTime ? (
                    <RadioGroup value="1">
                      <button className="bg-[#f4f7ff] w-full p-3 rounded-xl flex items-center space-x-3 border border-slate-200 shadow">
                        <RadioGroupItem value="1" />
                        <Typography bold={"light"}>Walk in AnyTime</Typography>
                      </button>
                    </RadioGroup>
                  ) : (
                    <Button
                      className="w-full font-[600] py-8 "
                      disableBtn={!selectedItems.clinicLocation}
                      size={"lg"}
                      variant={"ghost"}
                      rounded={"xl"}
                    >
                      SELECT DATE AND TIME
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 col-span-full flex flex-col justify-start gap-y-3">
          <div className="shadow rounded-lg p-3  col-span-8 border border-slate-100 justify-between ">
            <Typography size={"sm"} variant={"lifeText"} bold={"semibold"}>
              YOUR BOOKING
            </Typography>
            {getTotalPrice() > 0 ? (
              <div className="space-y-2  pt-3">
                <div
                  className={cn(
                    typographyVariants({ variant: "lifeText", size: "xs" }),
                    "flex justify-between"
                  )}
                >
                  <p>Order Total</p>
                  <p>AED {getTotalPrice().toFixed(2)}</p>
                </div>
                <div
                  className={cn(
                    typographyVariants({ variant: "lifeText", size: "xs" }),
                    "flex justify-between"
                  )}
                >
                  <p>Discount</p>
                  <p>- AED 0.00</p>
                </div>
                <div
                  className={cn(
                    typographyVariants({ variant: "lifeText", size: "xs" }),
                    "flex justify-between"
                  )}
                >
                  <p>Extra</p>
                  <p>AED 0.00</p>
                </div>
                <div
                  className={cn(
                    typographyVariants({ variant: "lifeText", size: "xs" }),
                    "flex justify-between"
                  )}
                >
                  <p>Estimated VAT %</p>
                  <p>AED 0.00</p>
                </div>
                <hr />
                <div
                  className={cn(
                    typographyVariants({
                      variant: "lifeText",
                      size: "xs",
                      bold: "bold",
                    }),
                    "flex justify-between"
                  )}
                >
                  <div className="flex justify-between items-center w-full pt-2">
                    <div className="flex space-x-2 ">
                      <Typography
                        variant={"lifeText"}
                        size={"sm"}
                        bold={"bold"}
                      >
                        {" "}
                        Total Amount
                      </Typography>
                      <Typography
                        variant={"paragraph"}
                        size={"xs"}
                        bold={"light"}
                        className="leading-5"
                      >
                        {" "}
                        (Inclusive of VAT)
                      </Typography>
                    </div>

                    <Typography
                      bold={"semibold"}
                      size={"sm"}
                      variant={"primary"}
                    >
                      <span>AED {getTotalPrice().toFixed(2)}</span>
                    </Typography>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-3">
                <Typography size={"xs"}>
                  Please add at least one test.
                </Typography>
              </div>
            )}
          </div>

          <Button
            className="w-full before:content-['PROCEED'] hover:before:content-['PROCEED_TO_CONTINUE']"
            rounded={"md"}
            disableBtn={
              getTotalPrice() === 0 || pageVisibility === "PaymentTab"
                ? newCardSelected === null
                : false
            }
            iconLeft={
              pageVisibility === "finished" ? (
                <Icon
                  variant={"inputIconRight"}
                  type="loadingIcon"
                  sizes={"sm"}
                  animation={"spin"}
                />
              ) : null
            }
            onClick={() => {
              pageVisibility === "typeTab"
                ? setPageVisibility("locationTab")
                : pageVisibility === "locationTab"
                ? setPageVisibility("PaymentTab")
                : setPageVisibility("finished");
            }}
          ></Button>
        </div>
      </div>

      <AppointmentsLocationModal
        size={"xl"}
        showModal={appointmentsModalState}
        setCloseModal={setAppointmentsModalState}
        setSelectedClinicData={setSelectedClinicData}
        setSelectedItems={setSelectedItems}
        selectedClinicData={selectedClinicData}
      />

      <PaymentMethodModal
        setNewCardSelectedState={setNewCardSelectedState}
        newCardSelected={newCardSelected}
        showModal={paymentMethodModalState}
        setCloseModal={setPaymentMethodModalState}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/appointments/${
      params?.appointments
    }?lang=${locale || "ae-en"}`
  );

  const appointmentsData = await res.json();

  return {
    props: {
      appointmentsData: appointmentsData.data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/appointments/list`
  );

  const data = await res.json();

  const allPaths = data.data.appointments.map((appPageData: any) => ({
    params: { appointments: appPageData.slug },
  }));

  return {
    fallback: "blocking",
    paths: allPaths,
  };
};
