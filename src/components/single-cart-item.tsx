import { RootState } from "@/redux/store";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { ProductBestSellerBadge } from "./ui/badge";
import { Typography } from "./ui/typography";
import { cn } from "@/lib/utils";
import { AddOrEditCartBtn, ProductPricesData } from "./Button";
import { Icon } from "./ui/icons";
import { useLanguage } from "@/hooks/useLanguage";
import { useModal } from "./ui/modalcontext";

const SingleCartItem = ({ item }: { item: any }) => {
  const cartItems = useSelector((state: RootState) => state.cart);

  const cartItemsData = cartItems.cart.cart_data
    ? cartItems.cart.cart_data.items
    : [];
  const [proQty, setProQty] = useState<any>(0);

  const { currentCountryDetails } = useLanguage();
  const { setBuyOneGetOneModal, setBuyOneGetOneModalProps } = useModal();
  // const offervalue = item.offers ? item.offers.value : null;

  const getProductQuantity = (productId: any) => {
    const productItem = cartItemsData?.find((item: any) =>
      item.items[0].id === productId ? item.items[0].qty : null
    );
    return productItem ? productItem.items[0].qty : 0;
  };
  const itemExists = () => {
    return cartItemsData?.some(
      (itemData: any) => itemData.items[0].id === item.id
    );
  };

  useEffect(() => {
    setProQty(getProductQuantity(item.id));
  }, []);

  const freeItemSelectedOnClick = () => {
    debugger
    setBuyOneGetOneModalProps(item);

    setBuyOneGetOneModal(true);
  };

  const { type, is_special } = item.offers || {};

  const OfferWrapper = ({ children }: { children: ReactNode }) => {
    switch (type) {
      case "bxgy":
        return (
          <div className="">
            <div className="rounded-xl p-2 px-3 border border-slate-200 shadow flex justify-between items-center">
              <Typography variant={"lifeText"} size={"linkText"} bold={"bold"}>
                {is_special}
              </Typography>
              <Image
                src={`https://www.lifepharmacy.com/images/${
                  item.shipment_label || "standard"
                }-nr.svg`}
                alt="delivery-img"
                width={25}
                height={25}
              />
            </div>
            <div className="p-2.5 bg-[#f4f7ff] rounded-b-xl space-y-3">
              {children}
              <button
                onClick={() => freeItemSelectedOnClick()}
                className=" w-full border border-black rounded border-dashed blinking p-3 py-4 flex justify-center items-center group hover:bg-slate-500 hover:text-white "
              >
                <div className="flex space-x-1.5 items-center">
                  <Icon
                    type="addToCartIcon"
                    sizes={"sm"}
                    className="group-hover:fill-white fill-black"
                  />
                  <Typography size={"sm"}>Select your free item</Typography>
                </div>
              </button>
              <div className="flex items-center justify-between">
                <div className="bg-white shadow   p-2 rounded">
                  <Typography
                    size={"xs"}
                    className="flex space-x-1"
                    variant={"lifeText"}
                    bold={"bold"}
                  >
                    {" "}
                    <span>You Saved:{"   "}</span>{" "}
                    <span className="text-green-700">
                      {currentCountryDetails.currency}{" "}
                      {Number(item.unit_price).toFixed(2)}
                    </span>{" "}
                  </Typography>
                </div>
                <button className="bg-[#17a2b8] p-1.5 text-white rounded px-2 ">
                  <Typography size={"xs"}>Add More Items</Typography>{" "}
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <div>{children}</div>;
    }
  };

  return proQty > 0 && itemExists() && cartItemsData ? (
    <OfferWrapper>
      <div className="shadow rounded-lg border border-slate-200 p-2.5 bg-white">
      <SingleCartData item={item} />

      </div>
    </OfferWrapper>
  ) : null;
};

const SingleCartData = ({ item }: { item: any }) => {
  const OfferType = (offer_type: string, offerValue: number) => {
    switch (offer_type) {
      case "flat_percentage_discount":
        return `FLAT ${offerValue}% OFF`;
      default:
        return "";
    }
  };

  return (
    <div className="flex space-x-3 relative bg-white  rounded-lg">
      {/* <Link
        href={`/product/${item.slug}`}
        className="flex space-x-3 rtl:space-x-reverse"
      > */}
        <div className=" relative   h-fit my-auto ">
          <Image
            src={
              item.featured_image
                ? item.featured_image
                : "/images/default-product-image.png"
            }
            height={80}
            width={80}
            className=" border border-slate-200 rounded-lg my-auto max-w-[100px] max-h-[100px]"
            alt="pro_Image"
          />
          {/* <ProductRatingBadge productRating={item.rating} /> */}
        </div>
        <div className="rounded-lg flex-col flex-grow justify-between flex md:col-span-9 col-span-8  space-y-1">
          <Typography variant={"lifeText"} bold={"semibold"} lineClamp={"two"}>
            {item.title}
          </Typography>
          {item.offers ? (
            <div className="bg-red-500 w-fit text-[10px] py-0.5 px-2  rounded text-white font-[300]">
              {OfferType(item.offers.type, item.offers.value)}
            </div>
          ) : null}

          <div className="whitespace-nowrap overflow-hidden text-ellipsis w-full">
            {item.categories
              ? item.categories.map((cat: any) => (
                  <Link
                    href={`/products?categories=${cat.slug}`}
                    className={cn(
                      buttonVariants({
                        variant: "categoryBtn",
                        size: "xs",
                      }),
                      "mr-2"
                    )}
                  >
                    {cat.name}
                  </Link>
                ))
              : null}
          </div>

          <ProductPricesData
            productPriceSize={"lg"}
            productPrices={item.prices}
          />
        </div>
      {/* </Link> */}

      <ProductBestSellerBadge proLabelData={item.label} />

      <div className="absolute bottom-0 right-0 rtl:left-2 flex h-7 ">
        <AddOrEditCartBtn isSingleProductPage={false} proId={item.id} />
      </div>
    </div>
  );
};

export { SingleCartItem, SingleCartData };
