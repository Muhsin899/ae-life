import { useLanguage } from "@/hooks/useLanguage";
import { SingleCartData } from "./single-cart-item";
import ModalContainer from "./ui/modal-container";
import { useModal } from "./ui/modalcontext";
import { Typography } from "./ui/typography";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { Input } from "./ui/input";

const BuyOneGetOneModal = () => {
  const { BuyOneGetOneModal, setBuyOneGetOneModal, buyOneGetOneModalProps } =
    useModal();
  const { currentCountryDetails } = useLanguage();

  const { featured_image, prices, offers, unit_price, slug } =
    buyOneGetOneModalProps || {};

  const { is_special } = offers || {};
  return (
    <ModalContainer
      size={"lg"}
      showModal={BuyOneGetOneModal}
      setCloseModal={setBuyOneGetOneModal}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center ">
          <Typography variant={"lifeText"} bold={"bold"}>
            {is_special}
          </Typography>
          <div className="bg-white shadow   p-1 rounded border border-slate-100">
            <Typography
              size={"xs"}
              className="flex space-x-1"
              variant={"lifeText"}
              bold={"bold"}
            >
              {" "}
              <span>You Saved:{"   "}</span>{" "}
              <span className="text-green-700">
                {currentCountryDetails.currency} {Number(unit_price).toFixed(2)}
              </span>{" "}
            </Typography>
          </div>
        </div>
        <div className="flex space-x-2 items-center">
          <div className="border  shadow rounded-lg">
            <Image
              src={featured_image}
              height={100}
              width={100}
              alt={slug}
              className="rounded-lg"
            />
          </div>
          <button className="border border-blue-300 blinking flex flex-col space-y-2 justify-center p-2 shadow-blue-300 shadow h-[100px] w-[100px] rounded-lg ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 mx-auto text-blue-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <Typography
              className="text-blue-900"
              alignment={"horizontalCenter"}
              size={"xs"}
              bold={"semibold"}
            >
              Add Your Free Item
            </Typography>
          </button>
        </div>
        <Input
          className="w-full rounded-md"
          sizes={"sm"}
          placeholder="Search..."
        />
        <SingleCartData item={buyOneGetOneModalProps} />
      </div>
    </ModalContainer>
  );
};

export { BuyOneGetOneModal };
