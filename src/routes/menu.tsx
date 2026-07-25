import { createFileRoute } from "@tanstack/react-router";
import { OrderPage } from "./order";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu - Mustafa Coffee House" },
      {
        name: "description",
        content: "Browse the Mustafa Coffee House menu and order ahead.",
      },
    ],
  }),
  component: OrderPage,
});
