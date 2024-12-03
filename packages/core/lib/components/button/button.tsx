import classNames from "classnames";
import "./button.css";

/**
 * Props for the Button component.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The variant of the button.
   * @default "primary"
   */
  variant?: "primary" | "secondary";

  /**
   * Whether the button is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The size of the button.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
}

/**
 * A customizable button component.
 *
 * @example
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 */
export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  className,
  ...restProps
}: ButtonProps) {
  return (
    <button
      className={classNames("bls-Button", className)}
      data-variant={variant}
      data-size={size}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
}
