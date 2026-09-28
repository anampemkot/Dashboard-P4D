/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { ProviderApp } from "@/packages/design-system";

export default function App() {
  return (
    <ProviderApp>
      <RouterProvider router={router} />
    </ProviderApp>
  );
}


