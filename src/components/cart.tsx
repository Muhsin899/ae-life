import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {SingleCartItem} from "./single-cart-item";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { Typography } from "./ui/typography";
import { cn } from "@/lib/utils";
import { Icon } from "./ui/icons";
import { useLanguage } from "@/hooks/useLanguage";
import {  Tag } from "lucide-react";
import getLatestCartDetails from "@/lib/getLatestCart";
import { updateCartData } from "@/redux/cart.slice";
import { OrderSummaryComp, ReturnsComponent } from "./cartcomp";
import { Input } from "./ui/input";
import { useCartActions } from "@/hooks/useCartActions";
import InvalidOTPModal from "./invalid-otp-modal";
import { useModal } from "./ui/modalcontext";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const [invalidModalState, setInvalidModalState] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { modalState, modalMessage } = useModal();

  const cartData = cartItems.cart.cart_data;

  const { coupon_code, coupon_discount } = cartItems.cart.cart_summary;
  const cartId = cartData ? cartData.cart_id : null;

  const [couponActive, setCouponActive] = useState("");
  const { updateCouponState } = useCartActions();

  useEffect(() => {
    if (cartId) {
      getLatestCartDetails({ cartID: cartId }).then((res) => {
        updateCartData(res);
      });
    }
  }, [cartId]);

  const cartItemsData = cartItems.cart.cart_data
    ? cartItems.cart.cart_data.items
    : [];

  return (
    <div className="pb-6">
      {cartItemsData.length > 0 ? (
        <>
          <div className="pt-0 w-full py-1 rounded-xl mx-auto h-fit space-y-3">
            {cartItemsData.map((cartData: any) => (
              <SingleCartItem item={cartData.items[0]} />
            ))}
          </div>
          <div className="  bg-white rounded-lg w-full space-y-3">
            <div className="border border-slate-200 shadow p-3 rounded-lg space-y-3">
              <div className="flex space-x-2 items-center">
                <Tag className="text-life" />
                <Typography bold={"bold"} variant={"lifeText"}>
                  Apply Coupon
                </Typography>
              </div>
              {/*           
                <Input
                  onChange={(e) => setCouponActive(e.target.value)}
                  className="bg-emerald-50 border border-green-500  border-dashed"
                  inputClassName="bg-emerald-50  placeholder:text-base text-green-900 font-semibold uppercase"
                  placeholder="Enter Coupon Code"
                  iconLeft={
                    <svg
                      className="mr-3 w-7 h-7"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                      />
                    </svg>
                  }
                  value={
              
                 
                          cartSummery.coupon_applied+
                    
                   
                          "YOU SAVED"+ cartSummery.coupon_discount+ "ON THIS ORDER"
               
                    
                  }
                  iconRight={
                    <button
                      onClick={() => {
                        applyCoupon(
                          {
                            action: "apply_coupon",
                            data: {
                              coupon_code: couponActive,
                            },
                          },
                          cartItems.cart.cart_data.cart_id,
                          setInvalidModalState,
                          setAlertMessage
                        );
                      }}
                      disabled={couponActive.length === 0}
                      className="font-semibold text-green-700 disabled:text-green-200 ml-2"
                    >
                      Apply
                    </button>
                  }
                /> */}

              <div className="flex justify-between items-center rounded-lg border-green-600 border-dashed border px-3 bg-green-100 p-2">
                {coupon_code ? (
                  <>
                    <div className="flex space-x-3 items-center">
                      <div>
                        <svg
                          className=" w-8 h-9 text-green-900"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                          />
                        </svg>
                      </div>
                      <div className="">
                        <Typography
                          variant={"lifeText"}
                          bold={"semibold"}
                          className="uppercase"
                        >
                          {coupon_code}
                        </Typography>
                        <Typography size={"xs"} bold={"semibold"}>
                          YOU SAVED {Number(coupon_discount).toFixed(2)} AED ON
                          THIS ORDER
                        </Typography>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        updateCouponState({
                          action: "remove_coupon",
                          data: {
                            coupon_code: coupon_code,
                          },
                        });
                      }}
                    >
                      <Typography size={"sm"} bold={"bold"} variant={"danger"}>
                        REMOVE
                      </Typography>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex space-x-1 items-center">
                      <div>
                        <svg
                          className="mr-3 w-7 h-7"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                          />
                        </svg>
                      </div>
                      <input
                        onChange={(e) => setCouponActive(e.target.value)}
                        className="bg-green-100 placeholder:capitalize placeholder:text-sm leading-[0px] uppercase text-green-800 font-semibold"
                        placeholder="Enter Coupon Code"
                      />
                    </div>
                    <button
                      onClick={() => {
                        updateCouponState(
                          {
                            action: "apply_coupon",
                            data: {
                              coupon_code: couponActive,
                            },
                          },
                          setInvalidModalState,
                          setAlertMessage
                        );
                      }}
                      disabled={couponActive.length === 0}
                      className="font-semibold text-linkText text-green-700 disabled:text-green-200 ml-2"
                    >
                      Apply
                    </button>
                  </>
                )}
              </div>
            </div>
            <OrderSummaryComp />

            <InvalidOTPModal
              modalState={modalState}
              showModal={
                invalidModalState && alertMessage !== (undefined || "")
              }
              setCloseModal={setInvalidModalState}
              modalMessage={alertMessage}
              modalHeader={modalMessage}
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
        </>
      ) : (
        <div className="mx-auto space-y-4 py-5">
          <Icon sizes={"xl"} type="cartMenuIcon" />
          <Typography variant={"lifeText"} size={"lg"}>
            No products added to the cart
          </Typography>
          <Button size={"lg"} className="w-full">
            RETURN TO SHOP
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
