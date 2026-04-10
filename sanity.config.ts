"use client";

import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { dataset, projectId } from "./src/sanity/env";
import { SITE_URL } from "./src/lib/site";
import { schema } from "./src/sanity/schemaTypes";
import { resolve } from "./src/sanity/presentation/resolve";
import { structure } from "./src/sanity/structure";
import { BASE_PATH } from "./src/lib/basePath";

const studioBasePath = `${BASE_PATH}/studio`;
const previewInitialUrl =
  process.env.NODE_ENV === "development"
    ? `http://localhost:3000${BASE_PATH}/`
    : `${SITE_URL}/`;

export default defineConfig({
  basePath: studioBasePath,
  /** Só usado quando `NextStudio` monta; `src/sanity/env` rejeita IDs de exemplo (`your-project-id`, …). */
  projectId: projectId || 'placeholder',
  dataset: dataset || 'production',
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        initial: previewInitialUrl,
      },
      allowOrigins: ["http://localhost:*", "https://yoooobe.github.io"],
    }),
  ],
})
