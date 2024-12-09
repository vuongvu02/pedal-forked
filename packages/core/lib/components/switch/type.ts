import { SwitchProps as BaseProps } from "@radix-ui/react-switch";

export interface SwitchProps extends BaseProps {
  /**
   * Whether the switch is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the switch is checked.
   * @default false
   */
  checked?: boolean;

  /**
   * Callback when the checked state changes.
   */
  onCheckedChange?: (checked: boolean) => void;
}
