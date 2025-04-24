import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import baseTokens from "@bikeleasing-service/pedal-tokens";
import mobileTokens from "@bikeleasing-service/pedal-tokens/build/ts/mobile";
import desktopTokens from "@bikeleasing-service/pedal-tokens/build/ts/desktop";
import lightTokens from "@bikeleasing-service/pedal-tokens/build/ts/light";
import darkTokens from "@bikeleasing-service/pedal-tokens/build/ts/dark";

type TokensDisplayProps = {
  tokens: typeof baseTokens;
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
        <div
          key={path.join(".")}
          style={{
            padding: "1rem",
            border: "1px solid #eee",
            borderRadius: "6px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          <div
            style={{
              fontWeight: "500",
              color: "#333",
              flexBasis: "40%",
            }}
          >
            {tokenName}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexBasis: "60%",
              justifyContent: "flex-end",
            }}
          >
            {isColor && (
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: value as string,
                  borderRadius: "4px",
                  border: "1px solid rgba(0,0,0,0.1)",
                  flexShrink: 0,
                }}
              />
            )}

            <div
              style={{
                fontSize: "0.9rem",
                fontFamily: "monospace",
                color: "#666",
                fontWeight: "400",
              }}
            >
              {String(value)}
            </div>
          </div>
        </div>
      );
    }

    // For object nodes, render a section with nested tokens
    return (
      <div key={path.join(".")} style={{ marginBottom: "2rem" }}>
        {path.length > 0 && (
          <h3
            style={{
              borderBottom: "1px solid #eee",
              paddingBottom: "0.5rem",
              marginBottom: "1rem",
              fontSize: "1.2rem",
              color: "#333",
            }}
          >
            {path[path.length - 1]}
          </h3>
        )}

        <div style={{ paddingLeft: path.length > 0 ? "1rem" : 0 }}>
          {Object.entries(tokenObj).map(([key, value]) =>
            renderTokens(value, [...path, key])
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: "50px 100px",
        maxWidth: "1000px",
        margin: "100px auto",
        border: "1px solid #eee",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>{groupName}</h1>

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
