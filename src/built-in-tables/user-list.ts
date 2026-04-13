import { ListMetadata } from "../types/list-metadata";

export const builtInUserListMetadata: ListMetadata = {
  _id: "user-list-config",
  name: "Shared Users Configuration",
  owner: "application",
  fields: [
    {
      _id: "email",
      name: "Correo electrónico",
      type: "text",
      defaultValue: "",
    },
    {
      _id: "role",
      name: "Rol",
      type: "options",
      options: [
        {
          value: "viewer",
          text: "Viewer",
        },
        {
          value: "editor",
          text: "Editor",
        },
      ],
      defaultValue: "viewer",
    },
  ],
};
