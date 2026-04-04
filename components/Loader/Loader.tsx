import css from "./Loader.module.css";

type LoaderSize = "small" | "medium" | "large";

interface LoaderProps {
  size?: LoaderSize;
  fullPage?: boolean;
}

const sizeClassMap: Record<LoaderSize, string> = {
  small: css.spinnerSmall,
  medium: css.spinnerMedium,
  large: css.spinnerLarge,
};

export default function Loader({
  size = "medium",
  fullPage = false,
}: LoaderProps) {
  return (
    <div className={fullPage ? css.wrapperFullPage : css.wrapper}>
      <div className={`${css.spinner} ${sizeClassMap[size]}`} />
    </div>
  );
}
