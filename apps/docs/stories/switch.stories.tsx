import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "@bls/core/lib";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
};

export default meta;

type Story = StoryObj<typeof Switch>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Basic: Story = {
  render: (args) => <Switch {...args} />,
  args: {},
};

export const Disabled: Story = {
  render: (args) => <Switch {...args} disabled />,
};
