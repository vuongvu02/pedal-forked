import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import baseTokens from "@bikeleasing-service/pedal-tokens";
import mobileTokens from "@bikeleasing-service/pedal-tokens/build/ts/mobile";
import desktopTokens from "@bikeleasing-service/pedal-tokens/build/ts/desktop";
import lightTokens from "@bikeleasing-service/pedal-tokens/build/ts/light";
import darkTokens from "@bikeleasing-service/pedal-tokens/build/ts/dark";
import "./tokens.styles.css";

type TokensDisplayProps = {
  tokens: Record<string, any>;
  groupName: string;
};

const TokensDisplay: React.FC<TokensDisplayProps> = ({ tokens, groupName }) => {
  const renderTokens = (
    tokenObj: any,
    path: string[] = []
  ): React.ReactNode => {
    if (typeof tokenObj !== "object" || tokenObj === null) {
      const tokenName = path[path.length - 1];
      const value = tokenObj;

      const isColor =
        typeof value === "string" &&
        (value.startsWith("#") ||
          value.startsWith("rgb") ||
          value.startsWith("hsl"));

      return (
        <div key={path.join(".")} className="token-item">
          <div className="token-name">
            <div>{tokenName}</div>
            <div className="token-path">{path.join(".")}</div>
          </div>

          <div className="token-value-container">
            {isColor && (
              <div
                className="token-color-preview"
                style={{ backgroundColor: value as string }}
              />
            )}

            <div className="token-value">{String(value)}</div>
          </div>
        </div>
      );
    }

    // For object nodes, render a section with nested tokens
    return (
      <div key={path.join(".")} className="tokens-section">
        {path.length > 0 && (
          <h3 className="tokens-section-heading">{path[path.length - 1]}</h3>
        )}

        <div className="tokens-section-content">
          {Object.entries(tokenObj).map(([key, value]) =>
            renderTokens(value, [...path, key])
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="tokens-display-container">
      <h1 className="tokens-heading">{groupName}</h1>

      {renderTokens(tokens)}
    </div>
  );
};

const meta: Meta<typeof TokensDisplay> = {
  title: "Design Tokens/All Tokens",
  component: TokensDisplay,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof TokensDisplay>;

export const BaseTokens: Story = {
  render: () => <TokensDisplay tokens={baseTokens} groupName="Base Tokens" />,
};

export const LightTokens: Story = {
  render: () => (
    <TokensDisplay tokens={lightTokens} groupName="Light Mode Tokens" />
  ),
};

export const DarkTokens: Story = {
  render: () => (
    <TokensDisplay tokens={darkTokens} groupName="Dark Mode Tokens" />
  ),
};

export const MobileTokens: Story = {
  render: () => (
    <TokensDisplay tokens={mobileTokens} groupName="Mobile Tokens" />
  ),
};

export const DesktopTokens: Story = {
  render: () => (
    <TokensDisplay tokens={desktopTokens} groupName="Desktop Tokens" />
  ),
};
