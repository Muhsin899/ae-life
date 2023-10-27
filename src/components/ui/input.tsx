import * as React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Typography, typographyVariants } from "./typography";
import { IconProps } from "./icons";

export const inputVariants = cva(
  "transition-all  duration-500 h-fit px-2 focus-within:border-blue-400 focus-within:border  w-full   shadow-sm flex",
  {
    variants: {
      variant: {
        default: "",
        inputWithBtnRight: "rounded-l-none rtl:rounded-r-none",
        inputWithBtnLeft: "rounded-r-none rtl:rounded-l-none",
        smallSearch: "bg-slate-100",
      },
      sizes: {
        default: "sm:p-2.5 p-2 sm:pl-4 pl-3",
        sm: "sm:py-1.5 sm:pl-4 py-1 pl-3",
        lg: "p-4",
        xs: "p-2",
      },
      rounded: {
        lg: "rounded-lg",
        full: "rounded-full",
        sm: "rounded",
      },
      border: {
        default: "border-gray-200 border",
        none: "border border-transparent",
      },
      bg: {
        white: "bg-white",
        blue: "bg-blue-50",
      },
    },
    defaultVariants: {
      variant: "default",
      sizes: "default",
      rounded: "lg",
      border: "default",
      bg: "white",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  buttonLeft?: React.ReactNode;
  buttonRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  buttonVariant?: string;
  iconRight?: React.ReactNode;
  iconSize?: IconProps["sizes"];
  inputLoadingState?: boolean;
  inputClassName?: string;
  inputLabel?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      sizes,
      buttonVariant,
      buttonLeft,
      iconRight,
      iconLeft,
      buttonRight,
      rounded,
      iconSize,
      inputClassName,
      border,
      bg,
      inputLabel,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex w-full">
        {buttonLeft && buttonLeft}
        <div
          className={cn(
            inputVariants({ variant, sizes, rounded, border, bg }),
            typographyVariants({ size: sizes }),
            ` ${iconLeft ? "md:px-4 px-3" : ""} 
        ${buttonLeft && "ltr:rounded-l-none rtl:rounded-r-none"} 
        ${buttonRight && "ltr:rounded-r-none rtl:rounded-l-none "}`,
            className
          )}
          ref={ref}
        >
          {iconLeft && iconLeft}
          <div className="w-full">
            {inputLabel && (
              <Typography variant={"paragraph"} size={"xs"}>
                {inputLabel}
              </Typography>
            )}
            <input
              className={cn(
                "w-full placeholder:text-slate-400 placeholder:font-[200] placeholder:text-sm",
                bg === "blue" ? "text-life font-semibold bg-blue-50":"",inputClassName
              )}
              {...props}
            />
          </div>
          {iconRight && iconRight}
        </div>
        {buttonRight && buttonRight}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
