import styles from "./button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  ...restProps
}: ButtonProps) {
  return (
    <button
      className={styles.root}
      data-variant={variant}
      data-size={size}
      {...restProps}
    >
      test
    </button>
  );
}
