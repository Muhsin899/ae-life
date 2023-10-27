import ModalContainer from "./ui/modal-container";
import { Button, buttonVariants } from "./ui/button";
import { Icon } from "./ui/icons";
import { Typography } from "./ui/typography";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useModal } from "./ui/modalcontext";
import { RadioGroup, RadioGroupItem } from "./ui/radio";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import { Player } from "@lottiefiles/react-lottie-player";

const LocationModal = () => {
  const { setSheetOpen } = useModal();
  const router = useRouter();
  const {
    locationModalState,
    setLocationModalState,
    setCurrentLocation,
    setSelectedLocation,
    setAddressDataIndex,
    detectUserLocation,
    getLocationByIp,
    setCurrentCordinates,
  } = useModal();

  // const setCurrentCordinates = (lat: number, lng: number) => {
  //   setCurrentLocation([lat, lng]);
  //   setSelectedLocation([lat, lng]);

  //   getReverseGeoCodingApiData(lat, lng).then((res) => {
  //     debugger;
  //     localStorage.setItem("geoLocation", JSON.stringify(res));
  //     setAddressDataIndex(res);
  //   });
  //   router.reload();

  //   // getReverseGeoCodingApiData(lat, lng);
  // };
  // const getLocationByIp = () => {
  //   try {
  //     fetch("https://ipwho.is/")
  //       .then((res) => res.json())
  //       .then((res) => {
  //         setCurrentCordinates(res.latitude, res.longitude);
  //       });
  //   } catch (err) {
  //     setCurrentCordinates(25.192622, 55.276383);
  //   }
  // };

  // const detectUserLocation = () => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setCurrentCordinates(
  //           position.coords.latitude,
  //           position.coords.longitude
  //         );
  //         // router.reload();
  //       },
  //       (error) => {
  //         getLocationByIp();
  //         // router.reload();
  //       }
  //     );
  //   }
  // };

  const detectLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentCordinates(
            position.coords.latitude,
            position.coords.longitude
          );
          setTimeout(() => {
            router.reload();
          }, 400);
        },
        (error) => {
          getLocationByIp();
          setTimeout(() => {
            router.reload();
          }, 400);
        }
      );
    }
  };

  return (
    <ModalContainer
      showModal={locationModalState}
      setCloseModal={setLocationModalState}
    >
      <div className="relative bg-white rounded-lg ">
        <div className="flex items-center justify-between rounded-t ">
          <Button
            type="button"
            variant={"closeBtn"}
            rounded={"full"}
            size={"sm"}
            onClick={() => setLocationModalState(false)}
          >
            <Icon type="crossIcon" />
          </Button>
        </div>
        <div className="text-center space-y-4">
          <Typography
            variant={"primary"}
            type="h5"
            size={"xl"}
            bold={"semibold"}
            alignment={"horizontalCenter"}
          >
            {" "}
            Where do you want the delivery?
          </Typography>
          {/* <Player
            src="/animations/location-animation.json"
            loop
            autoplay
            className="player"
          /> */}
          <Typography size={"sm"} alignment={"horizontalCenter"}>
            By knowing your area, we will be able to provide instant delivery
            from the nearest Life store around you!{" "}
          </Typography>
          <Button
            size={"lg"}
            className="w-full"
            onClick={() => detectLocation()}
          >
            Detect My Location
          </Button>
          <Typography bold={"bold"} size={"lg"} alignment={"horizontalCenter"}>
            OR
          </Typography>

          <Input
            sizes={"sm"}
            placeholder="Type Location"
            buttonLeft={
              <select
                id="country"
                className={cn(
                  buttonVariants({
                    variant: "normal",
                  }),
                  "rtl:rounded-l-none ltr::rounded-r-none"
                )}
              >
                <option selected>Ship To</option>
                <option value="ae">UAE</option>
                <option value="sa">KSA</option>
              </select>
            }
          />
          <Button
            variant={"primaryLink"}
            size={"lg"}
            onClick={() => {
              setLocationModalState(false);
              setSheetOpen(true);
            }}
          >
            Or Login Now
          </Button>

          <Typography size={"xs"} alignment={"horizontalCenter"}>
            {" "}
            Get access to My Address, Orders & Prescriptions in your profile
            section.
          </Typography>
        </div>
      </div>
    </ModalContainer>
  );
};

export const PaymentMethodModal = ({
  showModal,
  setCloseModal,
  newCardSelected,
  setNewCardSelectedState,
}: {
  showModal: any;
  setCloseModal: any;
  newCardSelected: string | null;
  setNewCardSelectedState: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const paymentMethods = [
    {
      id: "Pay with New Card",
      description: (
        <Typography size={"sm"} bold={"semibold"}>
          Pay with New Card
        </Typography>
      ),
      imageUrl: "https://www.lifepharmacy.com/images/card.svg",
    },
    {
      id: "Pay with Tabby",
      description: (
        <div>
          <Typography size={"sm"} bold={"semibold"}>
            4 Interest Free Payments
          </Typography>
          <Typography size={"xs"} bold={"semibold"}>
            No Fees Pay with any Card
          </Typography>
        </div>
      ),
      imageUrl: "https://www.lifepharmacy.com/images/tabby.svg",
    },
  ];

  return (
    <ModalContainer
      size={"default"}
      showModal={showModal}
      setCloseModal={setCloseModal}
    >
      <div className=" space-y-3">
        <div className="flex justify-between">
          <Typography bold={"semibold"} variant={"lifeText"}>
            Select Payment Method
          </Typography>
          <button
            onClick={() => {
              setCloseModal(false);
            }}
          >
            <Icon type="crossIcon" />
          </button>
        </div>
        <RadioGroup
          className={"space-y-1"}
          defaultValue={newCardSelected || undefined}
          onValueChange={(value: string) => setNewCardSelectedState(value)}
        >
          {paymentMethods.map((payMethod) => (
            <label
              htmlFor={payMethod.id}
              className="flex justify-between rtl:space-x-reverse py-3  w-full items-center border border-slate-200 p-4 rounded-lg cursor-pointer"
            >
              <div className="space-x-4 items-center flex">
                <RadioGroupItem value={payMethod.id} id={payMethod.id} />
                {payMethod.description}
              </div>
              <Image src={payMethod.imageUrl} height={50} width={50} alt="" />
            </label>
          ))}
        </RadioGroup>

        <Button
          onClick={() => {
            setCloseModal(false);
          }}
          disableBtn={!newCardSelected}
          className="text-xs w-full"
        >
          SELECT AND CONTINUE
        </Button>
      </div>
    </ModalContainer>
  );
};

export default LocationModal;
