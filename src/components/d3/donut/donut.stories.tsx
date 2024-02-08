import type { Meta, StoryObj } from "@storybook/react";
import { DonutChart } from ".";

const meta = {
  title: "library/Donut",
  component: DonutChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    data: [{ label: "Ne sais pas", percentage: 20 }, { label: "Réponses", percentage: 10 }, { label: "Sans réponses", percentage: 70 }],
  },
} as Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [{ label: "Ne sais pas", percentage: 20 }, { label: "Réponses", percentage: 10 }, { label: "Sans réponses", percentage: 70 }],
  },
};
