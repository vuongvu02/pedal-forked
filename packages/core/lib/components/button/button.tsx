import classNames from "classnames";
import type { ButtonProps } from "./type";
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
      data-size={size}
      data-variant={variant}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
}

Button.displayName = "Button";
