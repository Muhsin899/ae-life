import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { Input } from "./ui/input";
import { Autocomplete, GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useDebouncedCallback } from "use-debounce";
import { getReverseGeoCodingApiData } from "@/helpers/getReverseGeoCodingApiData";
import { useModal } from "./ui/modalcontext";
import { Button } from "./ui/button";
import { Typography } from "./ui/typography";
import { Navigation } from "lucide-react";
import { Icon } from "./ui/icons";

const LocationSelection = ({ onConfirmCallBack }: { onConfirmCallBack: any }) => {
  const {
    setSearchBoxQuery,
    setFormData,
    setSelectedLocation,
    searchBoxQuery,
    selectedLocation,
    currentLocation,
    detectUserLocation,
    formData,
    setavailableAddresses,
    setLocationMapVisbility,
    setaddnewAddressFormVisibility,
  } = useModal();

  const inputRef = useRef(null);

  const libraries = useMemo(() => ["places"], []);

  const [mapref, setMapRef] = useState<any>(null);
  const [placeData, setPlaceData] = useState<any>(null);
  const [loadingState, setLoadingState] = useState(false);
  const [focusLocation, setCurrentLocationFocus] = useState(true);

  const getGeoCodeDataDebounced = useDebouncedCallback((lat, lng) => {
    getGeoCodingData(lat, lng);
  }, 700);

  const handleOnLoad = (map: any) => {
    debugger;
    setMapRef(map);
    if (!loadingState) {
      getGeoCodingData(currentLocation[0], currentLocation[1]);
    }
  };

  const getGeoCodingData = (lat: string | number, lng: string | number) => {
    debugger;
    getReverseGeoCodingApiData(lat, lng).then((res) => {
      setFormData((prevData: any) => ({
        ...prevData,
        ...res,
      }));

      setSearchBoxQuery({ google_address: res.google_address, area: res.area });
      setLoadingState(false);
    });
  };

  const handleCenterChanged = () => {
    setLoadingState(true);
    if (mapref) {
      const newCenter = mapref.getCenter();
      getGeoCodeDataDebounced(newCenter.lat(), newCenter.lng());
      setSelectedLocation([newCenter.lat(), newCenter.lng()]);
      setCurrentLocationFocus(false);
    }
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  return isLoaded ? (
    <div className=" relative">
      <div className="w-[97%] absolute top-3 inset-x-0 m-auto z-[10]">
        <Autocomplete
          onLoad={(place: google.maps.places.Autocomplete) => {
            setPlaceData(place);
          }}
          restrictions={{
            country: ["ae", "sa"],
          }}
          onPlaceChanged={() => {
            if (mapref) {
              debugger;
              setLoadingState(true);
              setSelectedLocation([
                placeData.getPlace().geometry.location.lat(),
                placeData.getPlace().geometry.location.lng(),
              ]);
              setCurrentLocationFocus(false);

              getGeoCodeDataDebounced(
                placeData.getPlace().geometry.location.lat(),
                placeData.getPlace().geometry.location.lng()
              );
            }
          }}
        >
          <Input
            ref={inputRef}
            className="bg-white absolute "
            inputClassName="bg-white"
            iconLeft={
              <Icon
                variant={"inputIconLeft"}
                type="searchIcon"
                sizes={"sm"}
                className="text-slate-500  "
              />
            }
          />
        </Autocomplete>
        {/* <Autocomplete
         
              onLoad={(place: google.maps.places.Autocomplete) => {
                setPlaceData(place);
              }}
              
         
            >
              <Input
                value={searchBoxQuery}
                className="w-full"
                sizes={"sm"}
   
                iconRight={
                  <Icon
                    type="crossIcon"
                    className="m-auto"
                    sizes={"sm"}
                    onClick={() => setSearchBoxQuery("")}
                  />
                }
                onChange={(e) => {
                  setSearchBoxQuery((e.target as HTMLInputElement).value);
                }}
              />
            </Autocomplete> */}
        {/* <div className="rounded-md p-2 flex space-x-3 shadow items-center bg-white">
              <Icon
                type="locationPinIcon"
                className="text-slate-500"
                sizes={"sm"}
              />
              <div>
                <Typography
                  bold={"bold"}
                  className="text-slate-500"
                  size={"sm"}
                >
                  {searchBoxQuery}
                </Typography>
                <Typography className="text-slate-500" size={"sm"}>
                  Dubai
                </Typography>
              </div>
            </div> */}
      </div>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "350px",
        }}
        options={{
          disableDefaultUI: true,
        }}
        onDragEnd={handleCenterChanged}
        center={{
          lat: Number(selectedLocation[0]),
          lng: Number(selectedLocation[1]),
        }}
        zoom={20}
        onLoad={handleOnLoad}
      >
        <Image
          src={"/images/pin-map.png"}
          height={"50"}
          width={"50"}
          alt="location-pin"
          className="z-[1] absolute inset-x-0 m-auto top-[130px]"
        />

        <div className="absolute inset-x-0 m-auto z-[1] w-fit top-[167px]">
          <span className="relative flex h-5 w-5 ">
            <span className="animate-ping absolute duration-1000 inline-flex h-full w-full rounded-full bg-black/30"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-black/50"></span>
          </span>
        </div>

        <button
          className="z-[1] absolute right-6 bottom-6 scale-110  bg-white backdrop-blur-sm rounded-full  shadow-md p-3 cursor-pointer"
          onClick={() => {
            if (mapref) {
              // setSelectedLocation(currentLocation);
              setCurrentLocationFocus(true);
            }
            detectUserLocation();
          }}
        >
          <Navigation
            className={`w-5 h-5 m-auto text-blue-500 ${
              focusLocation ? "fill-blue-500" : ""
            }`}
          />
        </button>
      </GoogleMap>
      {loadingState ? (
        <div className="loader-line before:bg-blue-500 before:h-1 h-1 "></div>
      ) : (
        <div className="  h-1 "></div>
      )}
      <div className="bg-white  space-y-4 mt-3">
        <div className="space-y-2">
          <Typography
            size={"sm"}
            variant={"paragraph"}
            bold={"semibold"}
            className="tracking-widest"
          >
            SELECT DELIVERY LOCATION
          </Typography>
          <div className="space-y-1">
            <div className="flex justify-between items-center ">
              <div className="flex space-x-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="fill-red-500 w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>

                {searchBoxQuery && !loadingState ? (
                  <Typography bold={"bold"} size={"lg"}>
                    {searchBoxQuery.area}
                  </Typography>
                ) : (
                  <Typography bold={"semibold"} size={"lg"}>
                    Please wait...
                  </Typography>
                )}
              </div>
            </div>

            <div>
              {searchBoxQuery && !loadingState ? (
                <>
                  <Typography
                    size={"sm"}
                    variant={"paragraph"}
                    bold={"light"}
                    className="w-3/4"
                  >
                    {searchBoxQuery.google_address}
                  </Typography>
                  <Typography size={"sm"} variant={"paragraph"}>
                    {searchBoxQuery.area}
                  </Typography>
                </>
              ) : (
                <>
                  <Skeleton className="w-3/4 p-2 rounded mb-1" />
                  <Skeleton className="w-2/4 p-2 rounded " />
                </>
              )}
            </div>
          </div>
        </div>

        <Button
          className="w-full"
          rounded={"md"}
          onClick={() => {
            onConfirmCallBack()
          
          }}
        >
          CONFIRM LOCATION
        </Button>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export { LocationSelection };
