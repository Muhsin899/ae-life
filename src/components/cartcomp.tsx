import Image from "next/image";
import { Typography, typographyVariants } from "./ui/typography";
import { RadioGroup, RadioGroupItem } from "./ui/radio";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

const ReturnsComponent = () => {
  return (
    <div className="border-2 border-slate-100 h-fit flex p-2 rounded-lg shadow-sm mb-3 items-center ">
      <div className="mr-2">
        <Image
          src={"https://www.lifepharmacy.com/images/return.svg"}
          height={35}
          width={35}
          alt={"delivery"}
        />
      </div>
      <div className="p-1">
        <Typography bold={"bold"} variant={"lifeText"}>
          {" "}
          Return Policy
        </Typography>
        <Typography size={"xs"} variant={"paragraph"}>
          Orders once placed can't be returned or exchanged{" "}
        </Typography>
        <a href="https://www.lifepharmacy.com/refund-policy" className="text-blue-500  text-xs">
          Learn More
        </a>
      </div>
    </div>
  );
};

const TipsComp = () => {
  const cartItems = useSelector((state: RootState) => state.cart);

  const driverTipsData = cartItems ? cartItems.cart.driver_tips : null;
  const { currentCountryDetails } = useLanguage();

  return (
    <div className="shadow-sm rounded-lg p-3 border border-slate-100">
      <Typography variant={"lifeText"} bold={"bold"}>
        Tip Your delivery partner
      </Typography>
      <Typography size={"xs"}>
        100% of the tip will be paid to the rider
      </Typography>
      {driverTipsData && (
        <RadioGroup>
          <div className="py-3 flex space-x-3 overflow-x-auto no-scrollbar">
            {driverTipsData.map((tipdata: any) => (
              <div>
                <RadioGroupItem
                  className="sr-only peer"
                  id={tipdata.amount}
                  value={tipdata.amount}
                />
                <label
                  htmlFor={tipdata.amount}
                  className="peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:border-blue-700 cursor-pointer  py-2.5 px-4 relative flex space-x-2 items-center shadow-lg  shadow-slate-200 border-slate-100 border rounded-lg"
                >
                  <p> {tipdata.icon}</p>
                  <Typography
                    variant={"lifeText"}
                    bold={"bold"}
                    className="!leading-3"
                    whitespace={"nowrap"}
                  >
                    {currentCountryDetails.currency} {tipdata.amount}
                  </Typography>
                  {tipdata.label && (
                    <div className="h-fit -left-2 right-0 absolute bg-red-500 text-[10px] -bottom-1.5 rounded-bl-lg rounded-br-lg text-white text-center">
                      {tipdata.label}
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>
        </RadioGroup>
      )}
    </div>
  );
};

const OrderSummaryComp = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const { currentCountryDetails } = useLanguage();

  const cartSummery = cartItems && cartItems.cart.cart_summary;

  return (
    cartSummery && (
      <div className="border-2 border-muted h-fit  p-3 rounded-lg shadow-sm text-life  text-xs space-y-2">
        <Typography bold={"bold"}>ORDER SUMMARY</Typography>
        <div
          className={cn(
            "space-y-2.5 pt-2",
            typographyVariants({
              variant: "lifeText",
              size: "sm",
              bold: "semibold",
            })
          )}
        >
          <div className="flex justify-between">
            <p>Order Total</p>
            <p>
              {" "}
              {currentCountryDetails.currency}{" "}
              {cartSummery.sub_total.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between text-green-500">
            <p>Items Discount</p>
            <p>
              - {currentCountryDetails.currency}{" "}
              {cartSummery.item_discount.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Estimated VAT %</p>
            <p>
              {" "}
              {currentCountryDetails.currency} {cartSummery.vat.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p>
              Shipping{" "}
              <span>
                <a href="#" className="text-primary mx-1">
                  <small> Know More</small>
                </a>
              </span>
            </p>
            {cartSummery.shipping_fee != 0 ? (
              <p>{cartSummery.shipping_fee.toFixed(2)}</p>
            ) : (
              <p>FREE</p>
            )}
            {/* <p> FREE ABOVE 29 AED</p> */}
          </div>
        </div>
        <div className="bg-slate-100 w-10/12 mx-auto h-[1px] my-2 "></div>

        <div className="flex justify-between py-1 ">
          <div className="flex space-x-2 ">
            <Typography variant={"lifeText"} size={"sm"} bold={"bold"}>
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
          <p className="text-primary font-semibold text-base">
            {currentCountryDetails.currency} {cartSummery.total}
          </p>
        </div>

        <img
          src="https://www.lifepharmacy.com/images/payment-method.svg"
          className="mx-auto pt-2"
        />
      </div>
    )
  );
};

export { ReturnsComponent, TipsComp, OrderSummaryComp };
