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

  /**
   * The content of the button.
   */
  children: React.ReactNode;
}
