import { useLanguage } from "@/hooks/useLanguage";
import { appointmentLocation } from "../../types/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ModalContainer, { ModalProps } from "./ui/modal-container";
import { useModal } from "./ui/modalcontext";
import { Typography } from "./ui/typography";
import { useEffect, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { RadioGroup, RadioGroupItem } from "./ui/radio";

interface AppointmentsLocationModalProps extends ModalProps {
  setSelectedClinicData: any;
  selectedClinicData: any;
  setSelectedItems: any;
}

const AppointmentsLocationModal = (props: AppointmentsLocationModalProps) => {
  const [clinicLocationData, setCLiniLocationData] = useState<
    appointmentLocation[] | null
  >(null);
  const [loadingState, setLoadingState] = useState(false);
  const [placeData, setPlaceData] = useState<any>(null);

  const { setSelectedLocation, selectedLocation } = useModal();

  const { locale } = useLanguage();

  const getCLinicLocationData = () => {
    fetch(
      `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/appointments/health-checkup-tests/locations?latitude=${selectedLocation[0]}&longitude=${selectedLocation[1]}&lang=${locale}&channel=web`
    )
      .then((res) => res.json())
      .then((data) => {
        setCLiniLocationData(data.data);
        setLoadingState(false);
      });
  };

  useEffect(() => {
    debugger;
    setLoadingState(true);

    if (selectedLocation) {
      getCLinicLocationData();
    }
  }, [selectedLocation]);

  return (
    <ModalContainer {...props}>
      <div className="h-full">
        <div className="space-y-2">
          <Typography
            bold={"bold"}
            variant={"lifeText"}
            alignment={"horizontalCenter"}
            size={"lg"}
          >
            SELECT LOCATION
          </Typography>
          <Autocomplete
            onLoad={(place: google.maps.places.Autocomplete) => {
              setPlaceData(place);
            }}
            restrictions={{
              country: ["ae", "sa"],
            }}
            onPlaceChanged={() => {
              debugger;
              setSelectedLocation([
                placeData.getPlace().geometry.location.lat(),
                placeData.getPlace().geometry.location.lng(),
              ]);
              //   setCurrentLocationFocus(false);
            }}
          >
            <Input
              placeholder="Burj Khalifa, Dubai"
              buttonRight={
                <button className="bg-white p-1 flex items-center justify-center border-l-0 border border-slate-200 px-5 rounded-r-lg">
                  <img
                    src="https://www.lifepharmacy.com/images/svg/location-blue.svg"
                    className="text-life w-5 h-4.5"
                  />
                </button>
              }
            />
          </Autocomplete>

          <div className="py-2 space-y-2 overflow-y-auto h-[calc(80vh-150px)]">
            {clinicLocationData && !loadingState ? (
              <RadioGroup
                defaultValue={props.selectedClinicData?.id || clinicLocationData[0].id.toString()}
                className=""
                onValueChange={(id) => {
                  props.setSelectedClinicData(
                    clinicLocationData.filter((data) => data.id === Number(id))[0]
                  );
                }}
              >
                {clinicLocationData?.map((data, indx) => (
                  <div>
                    <RadioGroupItem
                      className="peer sr-only"
                      id={data.id.toString()}
                      value={data.id.toString()}
                    >
                      SELECT
                    </RadioGroupItem>
                    <label
                      htmlFor={data.id.toString()}
                      className="peer-data-[state=checked]:border-blue-800 block cursor-pointer border border-slate-200 shadow-sm  px-3 py-3  rounded-lg space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <img
                            src="https://www.lifepharmacy.com/images/svg/location-work.svg"
                            className="text-life w-5 h-4.5"
                          />
                          <Typography
                            bold={"semibold"}
                            variant={"lifeText"}
                            size={"lg"}
                          >
                            {data.name}
                          </Typography>
                        </div>
                        <RadioGroupItem
                          className="peer "
                          id={data.id.toString()}
                          value={data.id.toString()}
                        />
                      </div>

                      <hr className="border-slate-100" />
                      <div className="space-y-1">
                        <Typography
                          size={"linkText"}
                          bold={"light"}
                          className="text-gray-400"
                        >
                          {data.address.street_address}
                        </Typography>

                        <div className="flex justify-between items-center">
                          <Typography size={"linkText"}>
                            Working Hours: {data.working_hours}
                          </Typography>
                          <Typography
                            variant={"lifeText"}
                            size={"sm"}
                            bold={"semibold"}
                          >
                            {data.distance_text}
                          </Typography>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            ) : //   <div className="flex-col h-[calc(80vh-150px)] flex-1 flex items-center justify-center">
            //     <div className="dot-pulse"></div>
            //   </div>
            null}
          </div>
        </div>
        <Button
          className="w-full sticky bottom-0 left-0 right-0 "
          variant={"lifeBtn"}
          onClick={() => {
            props.setSelectedItems({ clinicLocation: true, dateAndTime: true });
            props.setCloseModal(false);
          }}
        >
          SELECT AND CONTINUE
        </Button>
      </div>
    </ModalContainer>
  );
};

export { AppointmentsLocationModal };
