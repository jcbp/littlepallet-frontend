import { ListMetadata } from "../types/list-metadata";

export const builtInOptions: ListMetadata = {
  _id: "options",
  name: "Options",
  owner: "application",
  fields: [
    {
      _id: "0",
      name: "Option",
      type: "text",
    },
    {
      _id: "1",
      name: "Color",
      type: "color-picker",
    },
  ],
};
