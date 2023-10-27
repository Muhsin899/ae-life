import ModalContainer from "./ui/modal-container";
import React from "react";
import { useModal } from "./ui/modalcontext";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";
import { Icon } from "./ui/icons";
import { AddNewAddressForm } from "./addnewAddressForm";
import { Map as Maps } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AddressGroup } from "./singleAddressComp";
import { LocationSelection } from "./location-selection";

const AddressModal = () => {
  const { update, data: session } = useSession();
  const router = useRouter();

  const {
    setaddNewAddress,
    addNewAddress,
    setAddressDataIndex,
    AddressDataIndex,
    availableAddresses,
    setavailableAddresses,
    setaddnewAddressFormVisibility,
    addnewAddressFormVisibility,
    addNewAddressClick,
    setAddNewAddressClick,
    formData,
    setLocationMapVisbility,
    locationMapVisibility,
  } = useModal();

  function setCloseModal() {
    setaddNewAddress(false);
    setTimeout(() => {
      setaddnewAddressFormVisibility(false);
      setLocationMapVisbility(false);
    }, 200);
  }

  const onLocationConfirmCallBack = () => {
    if (formData.latitude !== undefined || "") {
      setavailableAddresses(false);
      setLocationMapVisbility(false);
      setaddnewAddressFormVisibility(true);
    }
  }
  const addressOnEditClick = () => {
    setaddNewAddress(true);
    setavailableAddresses(false);
    setLocationMapVisbility(true);
  }

  return (
    <ModalContainer
      size={"xl"}
      showModal={addNewAddress && session?.token.addresses ? true : false}
      setCloseModal={setCloseModal}
    >
      {addNewAddressClick &&
      session?.token.addresses &&
      session?.token.addresses.length === 0 ? (
        <div className=" bg-white rounded-lg   overflow-y-auto no-scrollbar min-h-fit  max-h-[calc(80vh-1rem)] ">
          <div className="space-y-6">
            <Maps className="w-20 h-20" />
            <div className="py-5">
              <Typography bold={"bold"} size={"xl"}>
                You have no saved Addresses
              </Typography>
              <p className="text-gray-400 text-sm py-1">
                Start by adding a new address
              </p>
            </div>
          </div>
          <div className="flex items-center rtl:space-x-reverse space-x-2 border-t border-gray-200 rounded-b  sticky bottom-0">
            <Button
              className="w-full"
              onClick={() => {
                setAddNewAddressClick(false);
                setLocationMapVisbility(true);
              }}
            >
              ADD NEW ADDRESS
            </Button>
          </div>
        </div>
      ) : null}
      {addnewAddressFormVisibility ? (
        <AddNewAddressForm isModal={true} setCloseModal={setCloseModal} />
      ) : null}

      {/* {automCompleteVisibility && (
        <div>
          <div className="flex space-x-5 py-2 items-center">
            <Icon type="chevronLeftIcon" />
            <Input
              ref={inputRef}
              onChange={(e) => {
                debounced(e.target.value);
              }}
              className="bg-slate-50"
              inputClassName="bg-slate-50"
              sizes={"sm"}
              iconLeft={
                <Icon
                  variant={"inputIconLeft"}
                  type="searchIcon"
                  sizes={"sm"}
                  className="text-slate-500  "
                />
              }
              iconRight={
                <button className="bg-slate-400 p-0.5 rounded-full">
                  <Icon type="crossIcon" sizes={"xs"} className="text-white" />
                </button>
              }
            />
          </div>
          <div className="py-3 ">
            <Typography size={"sm"} className="mb-3 text-slate-600">
              SEARCH RESULTS
            </Typography>
            {autoCompleteData && autoCompleteData.length > 0 ? (
              autoCompleteData.map((ad: any) => (
                <button
                  onClick={() => placeClicked(ad.place_id)}
                  className="p-2  flex items-center w-full space-x-5 border-b-slate-100 border-b hover:bg-slate-50 rounded-lg hover:border-b-white"
                >
                  <Icon type="locationPinIcon" sizes={"sm"} />
                  <div className="space-y-1">
                    <Typography bold={"semibold"} size={"sm"}>
                      {ad?.structured_formatting.main_text}
                    </Typography>
                    <Typography variant={"paragraph"} size={"xs"}>
                      {ad?.structured_formatting.secondary_text}
                    </Typography>
                  </div>
                </button>
              ))
            ) : (
              <div className="h-60"></div>
            )}
          </div>
        </div>
      )} */}

      {locationMapVisibility && <LocationSelection onConfirmCallBack={onLocationConfirmCallBack}/>}

      {session && session.token.addresses.length > 0 && availableAddresses ? (
        <div className=" overflow-y-auto overflow-x-hidden  no-scrollbar  min-h-fit  max-h-[calc(80vh-1rem)]">
          <div className="w-full flex justify-between pb-2 items-center">
            <div className="flex space-x-2 rtl:space-x-reverse items-center">
              <Icon
                type="locationPinIcon"
                className="text-white fill-red-400"
              />
              <Typography size={"lg"} bold={"bold"} variant={"lifeText"}>
                Addresses
              </Typography>
            </div>

            <Button
              size={"sm"}
              rounded={"md"}
              onClick={() => {
                setavailableAddresses(false);
                setLocationMapVisbility(true);
              }}
            >
              ADD NEW ADDRESS
            </Button>
          </div>
          <AddressGroup addressOnEditCallBack={addressOnEditClick()}/>

          <div className="w-full bg-white pt-3 sticky bottom-0 leading-tight">
            <Button
              type="submit"
              rounded={"lg"}
              className="w-full"
              onClick={() => {
                debugger;
                update({ selected_address: AddressDataIndex }).then((res) => {
                  // setAddressDataIndex(AddressDataIndex);
                  setCloseModal();
                  router.reload();
                });
              }}
            >
              CONFIRM ADDRESS
            </Button>
          </div>
        </div>
      ) : null}
    </ModalContainer>
  );
};

export default AddressModal;
