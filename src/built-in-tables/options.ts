import { ListConfig } from "../types/list-config";

export const builtInOptions: ListConfig = {
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
