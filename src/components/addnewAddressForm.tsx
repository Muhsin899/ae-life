import { Button } from "./ui/button";
import { Icon } from "./ui/icons";
import { Input } from "./ui/input";
import { useModal } from "./ui/modalcontext";
import { Typography } from "./ui/typography";
import { useSession } from "next-auth/react";
import { isValidPhoneNumber } from "react-phone-number-input";
import Image from "next/image";
import countriesData from "../data/countries-data.json";
import { inputVariants } from "./ui/input";
import { useMemo, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { formatPhoneNumber } from "react-phone-number-input";

import {
  SelectContainer,
  SelectOption,
  SelectOptionsContainer,
} from "./ui/select";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useForm } from "react-hook-form";
const AddNewAddressForm = ({
  isModal,
  setCloseModal,

  setLocationMapVisbility,
  setaddnewAddressFormVisibility,
}: {
  isModal: boolean;
  setCloseModal?: any;

  setLocationMapVisbility?: any;
  setaddnewAddressFormVisibility?: any;
}) => {
  const { data: session, update } = useSession();
  const { countries } = useLanguage();

  const {
    currentLocation,
    selectedLocation,
    formData,
    selectedCountryData,
    setCountriesDrawerState,
    formDataInitState,
    setFormData,
  } = useModal();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    values: { ...formData, phone: formatPhoneNumber(`+${formData.phone}`) },
  });

  const libraries = useMemo(() => ["places"], []);


  const listboxRef = useRef<any>(null);

  const deliveryOptions = ["Home", "Other"];

  const createdAndUpdatedData = () => {
    const currentDate = new Date();

    if (formData.id) {
      return {
        updated_at: currentDate.toISOString(),
      };
    } else {
      return {
        created_at: currentDate.toISOString(),
        updated_at: currentDate.toISOString(),
      };
    }
  };

  const addressFormOnSubmit = (data: any): void => {
    debugger;

    saveAddresstoDb({
      ...data,
      ...createdAndUpdatedData(),
      ...{
        phone:
          "+" +
          selectedCountryData.callingCodes +
          getValues("phone").replace(/\s/g, ""),
        latitude: currentLocation[0].toString(),
        longitude: currentLocation[1].toString(),
      },
    });
  };

  function saveAddresstoDb(formDatas: any) {
    debugger;
    console.log(formDatas);

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.token.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDatas),
    };
    fetch(
      `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/user/save-address`,
      requestOptions
    )
      .then((response) => {
        debugger;
        if (response.ok) {
          debugger;

          setFormData(formDataInitState);
          return response.json();
        } else {
          throw new Error("Request failed");
        }
      })
      .then((result: any) => {
        const updatedAddress = session?.token.addresses.filter(
          (addr: any) => addr.id !== result.data.address.id
        );

        if (updatedAddress.length === session?.token.addresses.length) {
          update({
            addresses: [
              ...updatedAddress,
              { id: result.data.address.id, ...result.data.address },
            ],
          });
        } else {
          update({
            addresses: [...session?.token.addresses, result.data.address],
          });
        }

        if (isModal) {
          setCloseModal();
        } else {
          setaddnewAddressFormVisibility(false);
        }
      })
      .catch((error) => console.log("error while fetching search data", error));
  }
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  return (
    isLoaded ?
    <div className="relative  rounded-lg overflow-y-auto no-scrollbar bg-white">
      <div className="flex justify-between">
        <div className=" flex items-center space-x-3 rtl:space-x-reverse">
          {isModal && (
            <>
              <button
                onClick={() => {
                  debugger;
                  setaddnewAddressFormVisibility(false);

                  setLocationMapVisbility(true);

                  // setavailableAddresses(true);

                  setFormData(formDataInitState);
                }}
              >
                <Icon type="chevronLeftIcon" />
              </button>

              <Typography size={"lg"} variant={"lifeText"} bold={"bold"}>
                Your Address
              </Typography>
            </>
          )}
        </div>

        {isModal && (
          <button
            onClick={() => {
              setCloseModal();
              setFormData(formDataInitState);
            }}
          >
            <Icon type="crossIcon" className="text-slate-700" />
          </button>
        )}
      </div>
      <div className="relative py-4">
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "150px",
            borderRadius: "0.5rem",
          }}
          options={{
            gestureHandling: "none",
            zoomControl: false,
            scrollwheel: false,
            draggable: false,
            fullscreenControl: false,
          }}
          center={{
            lat: Number(selectedLocation[0]),
            lng: Number(selectedLocation[1]),
          }}
          zoom={20}
        >
          <Image
            src={"/images/pin-map.png"}
            height={"50"}
            width={"50"}
            alt="location-pin"
            className="z-[1] absolute inset-x-0 m-auto top-[30px]"
          />
          <div className="absolute h-fit m-auto z-[1] w-fit inset-0 ">
            <span className="relative flex h-5 w-5 ">
              <span className="animate-ping absolute duration-1000 inline-flex h-full w-full rounded-full bg-black/30"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-black/50"></span>
            </span>
          </div>
        </GoogleMap>
      </div>

      <div className="  bg-white ">
        <form
          className="space-y-3 "
          onSubmit={handleSubmit(addressFormOnSubmit)}
        >
          <div className="space-y-1.5 pt-2">
            <Typography variant={"lifeText"} bold={"bold"} size={"lg"}>
              Address Details
            </Typography>

            <SelectContainer
              inputProps={{ value: formData.type, type: "Type" }}
              setValue={(value: any) =>
                setFormData((prevData: any) => ({ ...prevData, type: value }))
              }
              ref={listboxRef}
              iconProps={<Icon type={"homeIconMenu"} sizes={"sm"} />}
            >
              <SelectOptionsContainer ref={listboxRef}>
                {deliveryOptions.map((person, personIdx) => (
                  <SelectOption
                    keyValueData={{ key: personIdx, value: person }}
                    ref={listboxRef}
                  >
                    <span>{person}</span>
                  </SelectOption>
                ))}
              </SelectOptionsContainer>
            </SelectContainer>
          </div>
          <div className="flex space-x-6 rtl:space-x-reverse">
            <Input
              inputLabel="Emirates"
              rounded={"lg"}
              {...register("state", { required: true })}
              sizes={"sm"}
              className={`${
                errors.state?.type === "required" ? "border-red-500" : ""
              }`}
              required
              bg={"blue"}
              border={"none"}
            />

            <Input
              rounded={"lg"}
              sizes={"sm"}
              {...register("city", { required: true })}
              required
              inputLabel="City *"
              bg={"blue"}
              className={`${
                errors.city?.type === "required" ? "border-red-500" : ""
              }`}
              border={"none"}
            />
          </div>

          <Input
            {...register("google_address", {
              required: true,
            })}
            sizes={"sm"}
            className={`${
              errors.google_address?.type === "required" ? "border-red-500" : ""
            }`}
            required
            bg={"blue"}
            border={"none"}
            rounded={"lg"}
            inputLabel="Google Address"
          />

          <div className="flex space-x-6 rtl:space-x-reverse">
            <Input
              {...register("flat_number", {
                required: true,
              })}
              sizes={"sm"}
              className={`${
                errors.flat_number?.type === "required" ? "border-red-500" : ""
              }`}
              required
              bg={"blue"}
              border={"none"}
              rounded={"lg"}
              inputLabel="Flat / Villa *"
            />
            <Input
              {...register("building", {
                required: true,
              })}
              sizes={"sm"}
              className={`${
                errors.building?.type === "required" ? "border-red-500" : ""
              }`}
              required
              bg={"blue"}
              border={"none"}
              rounded={"lg"}
              inputLabel="Building *"
            />
          </div>

          <SelectContainer
            inputProps={{ value: formData.country, type: "Country" }}
            setValue={(value: any) =>
              setFormData((prevData: any) => ({ ...prevData, country: value }))
            }
            ref={listboxRef}
            iconProps={<Icon sizes={"sm"} type="countryIcon" />}
          >
            <SelectOptionsContainer ref={listboxRef}>
              {countries.map((countryData, indx) => (
                <SelectOption
                  keyValueData={{ key: indx, value: countryData.country }}
                  ref={listboxRef}
                >
                  <span>{countryData.country}</span>
                </SelectOption>
              ))}
            </SelectOptionsContainer>
          </SelectContainer>
          <textarea
            {...register("additional_info", {
              required: false,
            })}
            rows={2}
            placeholder="Additional information (eg. Area, Landmark)"
            className={cn(
              inputVariants({
                variant: "default",
                rounded: "lg",
                bg: "blue",
                border: "none",
              }),
              "placeholder:text-slate-400  sm:text-sm text-xs text-life font-semibold placeholder:font-normal"
            )}
          ></textarea>

          <div className="space-y-1.5">
            <Typography variant={"lifeText"} bold={"bold"} size={"lg"}>
              Personal Details
            </Typography>
            <Input
              sizes={"sm"}
              rounded={"lg"}
              {...register("name", {
                required: true,
              })}
              className={`${
                errors.name?.type === "required" ? "border-red-500" : ""
              }`}
              type="text"
              name="name"
              bg={"blue"}
              border={"none"}
              inputLabel="Name *"
            />
            {errors.name?.type === "required" && (
              <Typography variant={"danger"} size={"sm"}></Typography>
            )}
          </div>
          <div>
            {/* <Typography className="mb-1" bold={"semibold"}>
              Enter your mobile number <span className="text-red-500">*</span>
            </Typography> */}

            <Input
              bg={"blue"}
              border={"none"}
              rounded={"lg"}
              {...register("phone", {
                required: true,
                validate: (value: any) =>
                  isValidPhoneNumber(
                    "+" + selectedCountryData.callingCodes + value
                  ),
              })}
              className={`font-semibold  !shadow-none ${
                errors.phone?.type === "validate" ? "border-red-500 " : ""
              }`}
              buttonLeft={
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setCountriesDrawerState(true);
                  }}
                  rounded={"lg"}
                  variant={"white"}
                  className="text-black bg-blue-100"
                  position={"inputLeftBtn"}
                  size={"sm"}
                >
                  {selectedCountryData ? (
                    <>
                      <Image
                        src={`https://hatscripts.github.io/circle-flags/flags/${selectedCountryData.alpha2Code.toLowerCase()}.svg`}
                        width="50"
                        height="50"
                        className={`sm:w-6 sm:h-6 h-6 w-6 `}
                        alt={countriesData[0].name}
                      />
                      <Typography className="px-1.5" bold={"bold"}>
                        {" "}
                        +{selectedCountryData.callingCodes}
                      </Typography>

                      <Icon type="chevronBottomIcon" sizes={"lg"} />
                    </>
                  ) : null}
                </Button>
              }
            />
            {errors.phone?.type === "required" && (
              <Typography variant={"danger"} size={"xs"}>
                Phone Number is Required
              </Typography>
            )}
          </div>

          <Button type="submit" className="w-full" rounded={"md"}>
            SAVE ADDRESS
          </Button>
        </form>
      </div>
    </div>
    : <div></div>
  );
};

export { AddNewAddressForm };
