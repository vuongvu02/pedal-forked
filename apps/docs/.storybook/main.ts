import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, join, resolve } from "path";
import { getCodeEditorStaticDirs } from "storybook-addon-code-editor/getStaticDirs";

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: [
    "../stories/*.stories.tsx",
    "../stories/**/*.stories.tsx",
    "../stories/**/*.mdx",
  ],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("storybook-addon-code-editor"),
    getAbsolutePath("@storybook/addon-mdx-gfm"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  core: {},

  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return {
      ...config,
      define: { "process.env": {} },
      resolve: {
        alias: [
          {
            find: "core",
            replacement: resolve(__dirname, "../../../packages/core/"),
          },
        ],
      },
      // Add base URL for GitHub Pages
      base: configType === "PRODUCTION" ? "/pedal-ui/" : "/",
    };
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },

  staticDirs: [...getCodeEditorStaticDirs(__filename)],

  docs: {
    autodocs: true,
  },
};

export default config;
