import {
  TransitionLink,
  TransitionLinkProps,
} from "@/components/TransitionLink";
import { PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

type Props = PrismicNextLinkProps &
  TransitionLinkProps & {
    variant?: "Primary" | "Secondary";
  };

const ButtonLink = ({
  variant = "Primary",
  className,
  ...restProps
}: Props) => {
  return (
    <TransitionLink
      className={clsx(
        "inline-flex items-center justify-center px-12 py-4 text-center font-extrabold tracking-wider uppercase transition-colors duration-300",
        variant === "Secondary"
          ? "border border-white text-white hover:bg-white/20"
          : "bg-white text-black hover:bg-white/80",
        className,
      )}
      {...restProps}
    />
  );
};

export default ButtonLink;
