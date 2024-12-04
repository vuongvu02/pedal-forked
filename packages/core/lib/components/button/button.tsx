import classNames from "classnames";
import { ButtonProps } from "./type";
import "./button.css";

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
