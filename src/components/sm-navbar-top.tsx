import { useState } from "react";
import { TransitionComp } from "./ui/transition";
import { useLanguage } from "@/hooks/useLanguage";
import { Icon } from "./ui/icons";
import { Typography } from "./ui/typography";
import Image from "next/image";

const SmNavbarTop = () => {
  const [highestRatedP, sethighestRatedP] = useState(true);
  const { t } = useLanguage();
  return highestRatedP ? (
    <div className={highestRatedP ? "block":"hidden"}>
      <div className="flex bg-life-2 text-white text-xs px-2 py-1 justify-between items-center">
        <div className="flex justify-start items-center rtl:space-x-reverse space-x-2">
          <Icon
            type="crossIcon"
            onClick={() => sethighestRatedP(false)}
            sizes={"sm"}
          />
          <Typography lineClamp={"one"} size={"xs"} bold={"bold"}>
            {t.navbar.highest_rated_phar}
          </Typography>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Image
              src={"https://www.lifepharmacy.com/images/app-rating.svg"}
              height={15}
              width={70}
              alt={"app-rating"}
              className="mb-[3px]"
            />
                <Typography size={"xs"} type="span" className="whitespace-nowrap !text-[11px]" bold={"bold"}>
          
          {t.navbar.download_now}
        </Typography>
        </div>
    
      </div>
    </div>
  ) : null;
};

export default SmNavbarTop;
