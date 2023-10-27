import { useDispatch, useSelector } from "react-redux";
import createCartPOSTReq from "@/lib/createCart";
import { addWishListData, updateCartData } from "@/redux/cart.slice";
import { RootState } from "../redux/store";
import updateCartApiReq from "@/lib/updateCart";
import { useModal } from "@/components/ui/modalcontext";
import { toast } from "sonner";
import { useLanguage } from "./useLanguage";
import { useSession } from "next-auth/react";
import confetti from "canvas-confetti";

export function useCartActions() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart);
  const { getLatLngData, locale } = useLanguage();
  const { data: session } = useSession();

  // const cartItemsData = cartItems.cart.cart_data
  //   ? cartItems.cart.cart_data.items
  //   : [];

  // const cartId = cartItems.cart.cart_data
  //   ? cartItems.cart.cart_data.cart_id
  //   : null;

    const {items,cart_id } = cartItems.cart.cart_data || []
    

  const wishListData = cartItems.wishlist.data;

  const {
    setOrderSucessSheetState,
    setLoadingState,
    frequentlyBroughtData,
    redirect,
    setModalState,
    setModalMessage,
    modalMessage,
  } = useModal();

  const createCart = (payloadData: any) => {
    if (items.length > 0) {
      updateCart(payloadData);
    } else {
      payloadData.data.items[0].qty > 0 ? setOrderSucessSheetState(true) : null;

      const promise = new Promise((resolve) =>
        createCartPOSTReq(payloadData, session).then((res) => {
          if (!res.success) {
            debugger;
          } else {
            dispatch(updateCartData(res));
            if (frequentlyBroughtData) {
              setLoadingState("loadingDone");
            }
          }
          resolve(res);
        })
      );
      toast.promise(promise, {
        loading: "Loading...",
        success: (data: any) => {
          debugger;
          return `${data.message}`;
        },
        className: "space-x-2 rtl:space-x-reverse",
        error: "Error",
      });
    }
  };

  const updateCart = (payloadData: any) => {
    payloadData.action = "update_items";
    payloadData.data.items[0].qty > 0 ? setOrderSucessSheetState(true) : null;

    const promise = new Promise((resolve) =>
      updateCartApiReq(payloadData, cart_id, session).then((res) => {
        if (!res.success) {
          debugger;
        } else {
          debugger;
          dispatch(updateCartData(res));
          if (frequentlyBroughtData) {
            debugger;
            setLoadingState("loadingDone");
          }
        }
        resolve(res);
      })
    );

    toast.promise(promise, {
      loading: "Loading...",
      success: (data: any) => {
        debugger;
        return `${data.message}`;
      },
      error: "Error",
      className: "space-x-2 rtl:space-x-reverse",
    });
  };

  const addWishList = (payloadData: any) => {
    debugger;
    const updatedWishList = [...wishListData, ...payloadData];
    dispatch(addWishListData(updatedWishList));

    toast.success("Success", {
      description: "Item added to Wishlist",
      action: {
        label: "Check Out",
        onClick: () => redirect("/checkout"),
      },
      className: "space-x-3 rtl:space-x-reverse",
    });
    // toast({
    //   title: "Success",
    //   message: "Item added to Wishlist",
    //   type: "success",
    // });
  };

  const removeWishList = (proId: string) => {
    debugger;
    const updatedWishList = wishListData.filter(
      (proDetails: any) => proDetails.id !== proId
    );
    dispatch(addWishListData(updatedWishList));

    // toast({
    //   title: "Success",
    //   message: "Item removed from Wishlist",
    //   type: "success",
    // });

    toast.success("Success", {
      className: "space-x-3 rtl:space-x-reverse",
      description: "Item removed from Wishlist",
      action: {
        label: "Check Out",
        onClick: () => redirect("/checkout"),
      },
    });
  };

  const updateDeliverySlot = (payloadData: any) => {
    debugger;

    let requestOptions = {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${session?.token.token}`
        "Content-Type": "application/json",
        Latitude: getLatLngData()[0],
        Longitude: getLatLngData()[1],
      },
      body: JSON.stringify(payloadData),
    };
    fetch(
      `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/carts/v2/${cart_id}/update?lang=ae-en`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        debugger;
        dispatch(updateCartData(res));
      });
  };

  const updateCouponState = (
    payloadData: any,
    setInvalidModalState?: any,
    setAlertMessage?: any
  ) => {
    debugger;
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Latitude: getLatLngData()[0],
        Longitude: getLatLngData()[1],
        Authorization: `Bearer ${session?.token.token}`,
      },
      body: JSON.stringify(payloadData),
    };
    fetch(
      `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/carts/v2/${cart_id}/update?lang=${locale}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        debugger;
        dispatch(updateCartData(res));
        if (payloadData.action === "apply_coupon") {
          const { title, type, sub_title } = res.data.messages.alerts;

          if (type === "success") {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            });
          }

          setModalState(type);
          setModalMessage(title);
          setInvalidModalState(true);
          setAlertMessage(sub_title);

          toast.success("Success", {
            description: "Coupon Added Successfully",
            className: "space-x-3 rtl:space-x-reverse",
          });
        } else {
          toast.success("Success", {
            description: "Coupon Removed Successfully",
            className: "space-x-3 rtl:space-x-reverse",
          });
        }
      });
  };

  return {
    createCart,
    updateCart,
    addWishList,
    removeWishList,
    updateDeliverySlot,
    updateCouponState,
  };
}
