import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "./ui/button";
import { Icon } from "./ui/icons";
import { Typography } from "./ui/typography";
import Image from "next/image";
import { useCartActions } from "@/hooks/useCartActions";
import { Heart } from "lucide-react";
import { useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const AddtoCartMobileview = ({
  proData,
  proQty,
  setProQty,
  addedToCart,
}: {
  addedToCart: any;
  proData: any;
  proQty: any;
  setProQty: any;
}) => {
  const wishlistItems = useSelector(
    (state: RootState) => state.cart.wishlist.data
  );
  const { currentCountryDetails } = useLanguage();

  const { sale_price, filter_price, images, title } = proData;
  const { addWishList, removeWishList } = useCartActions();
  const itemWishListState = () => {
    return wishlistItems.find((item: any) => item.id === proData.id);
  };

  const [wishListState, setWishListState] = useState(itemWishListState());

  const wishListSet = (wishListState: boolean) => {
    debugger;
    !wishListState ? addWishList([proData]) : removeWishList(proData.id);
  };

  return (


    <div className="fixed p-3 md:bottom-0 bottom-[58px] bg-white z-10 inset-x-0 shadow-[-15px_0_43px_rgba(51,51,51,.15)]">
      <div className="grid grid-cols-12 gap-x-4 container-page">
        <div className="md:flex hidden space-x-3 items-center col-span-6">
          <Image
            src={images.featured_image}
            height={50}
            width={50}
            alt={title}
          />

          <div className="pr-6">
            <Typography variant={"lifeText"} bold={"semibold"}>
              {title}
            </Typography>
          </div>
        </div>

        <div className="flex items-center justify-around md:col-span-6 col-span-full">
          <div className="lg:flex block   items-center lg:space-x-3 space-x-0 mr-3">
            <Typography
              size={"xl"}
              variant={"danger"}
              whitespace={"nowrap"}
              bold={"semibold"}
              className=""
            >
              {" "}
              <Typography size={"sm"} type="span">
                {currentCountryDetails.currency}
              </Typography>{" "}
              {sale_price.toFixed(2)}
            </Typography>

            <Typography
              type="label"
              bold={"semibold"}
              variant={"lifeText"}
              whitespace={"nowrap"}
              className="line-through flex items-center space-x-1"
            >
              {" "}
              <Typography size={"xs"} type="span">
                {currentCountryDetails.currency}
              </Typography>{" "}
              <div>{filter_price.toFixed(2)}</div>
            </Typography>
          </div>
          <div className="flex space-x-2 mr-3">
            <Button
              variant={"ghost"}
              className="!px-1 h-[35px] w-[35px]"
              rounded={"md"}
              onClick={() =>
                proQty !== 1 ? setProQty((preQty: number) => preQty - 1) : null
              }
            >
              <Icon type="minusIcon" sizes={"sm"} />
            </Button>

            <Typography className=" flex items-center" size={"sm"}>
              {proQty}
            </Typography>
            <Button
              size={"lg"}
              className="!px-1 h-[35px] w-[35px]"
              rounded={"md"}
              onClick={() =>
                proQty >= 1 ? setProQty((preQty: number) => preQty + 1) : null
              }
            >
              <Icon type="plusIcon" sizes={"sm"} />
            </Button>
          </div>
          <div className="mr-3">
            <Button
              className="max-w-[10rem]"
              onClick={() => addedToCart()}
              iconLeft={<Icon type="addToCartIcon" variant={"inputIconLeft"} />}
              rounded={"md"}
              iconType="addToCartIcon"
            >
              <span className="whitespace-nowrap"> ADD TO CART</span>
            </Button>
          </div>

          <button
            className=" sm:block hidden "
            onClick={() => {
              setWishListState(!wishListState);
              wishListSet(!wishListState);
            }}
          >
            <Heart
              className={`text-blue-500 ${
                wishListState ? "fill-blue-500" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddtoCartMobileview;
