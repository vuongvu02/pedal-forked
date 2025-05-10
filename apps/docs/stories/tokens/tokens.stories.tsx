import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import defaultTokens from "@bikeleasing-service/pedal-tokens";
import desktopTokens from "@bikeleasing-service/pedal-tokens/build/ts/desktop";
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
            <div className="token-path">
              --p-{path.join("-").toLowerCase().replace(/\s+/g, "-")}
            </div>
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
      <p className="tokens-description">
        👉 Learn more about our{" "}
        <a href="/?path=/docs/design-tokens-readme--docs#token-build-structure">
          Token Build Structure
        </a>
      </p>
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

export const DefaultTokens: Story = {
  render: () => (
    <TokensDisplay tokens={defaultTokens} groupName="Default Tokens" />
  ),
};

export const DarkTokens: Story = {
  render: () => (
    <TokensDisplay tokens={darkTokens} groupName="Dark Mode Tokens" />
  ),
};

export const DesktopTokens: Story = {
  render: () => (
    <TokensDisplay tokens={desktopTokens} groupName="Desktop Tokens" />
  ),
};
