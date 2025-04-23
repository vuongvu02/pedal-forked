import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@pedal-ui/core/lib";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Basic: Story = {
  render: (args) => <Button {...args} />,
  args: {
    children: "Hello",
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <>
      <Button {...args} variant="primary">
        Primary
      </Button>{" "}
      <Button {...args} variant="secondary">
        Secondary
      </Button>
    </>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <>
      <Button {...args} size="sm">
        Small
      </Button>{" "}
      <Button {...args} size="md">
        Medium
      </Button>{" "}
      <Button {...args} size="lg">
        Large
      </Button>
    </>
  ),
};
export const Disabled: Story = {
  render: (args) => (
    <Button {...args} disabled>
      Hello
    </Button>
  ),
};
