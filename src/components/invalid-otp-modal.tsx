import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import ModalContainer from "./ui/modal-container";
import { Typography } from "./ui/typography";

import { ReactNode } from "react";
const InvalidOTPModal = ({
  showModal,
  setCloseModal,
  modalMessage,
  modalHeader,
  buttonProps,
  modalState,
}: {
  showModal: any;
  setCloseModal: any;
  modalMessage: string;
  modalHeader: string;
  buttonProps: ReactNode;
  modalState: "success" | "warning" | "error" | null;
}) => {
  return (
    <ModalContainer showModal={showModal} setCloseModal={setCloseModal}>
      <div className="rounded-t-xl text-center ">
        {modalState === "warning" ? (
          <AlertCircle className="w-32 h-32 mx-auto fill-orange-400 text-white animate-scaleIn duration-700" />
        ) : modalState === "error" ? (
          <XCircle className="w-32 h-32 mx-auto fill-red-500 text-white animate-scaleIn duration-700" />
        ) : modalState === "success" ? (
          <CheckCircle2 className="w-32 h-32 mx-auto fill-green-500 text-white animate-scaleIn duration-700" />
        ) : null}
      </div>
      <Typography size={"xl"} bold={"bold"} alignment={"horizontalCenter"}>
        {modalHeader}
      </Typography>
      <div className=" p-5 text-center">
        <Typography variant={"paragraph"} alignment={"horizontalCenter"}>
          {modalMessage}
          {/* {notValidModalMessage} */}
        </Typography>
      </div>
      {buttonProps}
    </ModalContainer>
  );
};

export default InvalidOTPModal;
