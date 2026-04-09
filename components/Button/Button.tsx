import css from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Button({
  text,
  className,
  style,
  ...props
}: ButtonProps) {
  return (
    <button className={`${css.btn} ${className}`} style={style} {...props}>
      {text}
    </button>
  );
}
