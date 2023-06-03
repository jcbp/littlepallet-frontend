import { ListMetadata } from "../types/list-metadata";

export const builtInListMetadata: ListMetadata = {
  _id: "list-config",
  name: "Fields configuration",
  owner: "application",
  fields: [
    {
      _id: "name",
      name: "Name",
      type: "text",
      defaultValue: "New field",
      help: "Fill in a <strong>name</strong> that is representative of the meaning of the field",
    },
    {
      _id: "type",
      name: "Type",
      type: "options",
      hiddenOnMobile: true,
      options: [
        {
          value: "boolean",
          text: "Sí / No",
        },
        {
          value: "text",
          text: "Texto",
        },
        {
          value: "multiline-text",
          text: "Texto multilínea",
        },
        {
          value: "long-text",
          text: "Texto largo",
        },
        {
          value: "options",
          text: "Opciones",
        },
        {
          value: "number",
          text: "Números",
        },
        {
          value: "color",
          text: "Color",
        },
        {
          value: "color-picker",
          text: "Selector de color",
        },
        {
          value: "date",
          text: "Fecha",
        },
        {
          value: "time",
          text: "Hora",
        },
        {
          value: "traffic-light",
          text: "Semáforo",
        },
        {
          value: "item-id",
          text: "Identificador de item",
        },
        {
          value: "rating",
          text: "Calificación de estrellas",
        },
        {
          value: "user",
          text: "Usuarios",
        },
        {
          value: "chips",
          text: "Etiquetas",
        },
      ],
      defaultValue: "text",
      help:
        "The <strong>field type</strong> determine which user-control will use for show and edit the field.<br>" +
        "<ul>" +
        "<li><strong>Boolean:</strong> shows a checkbox control</li>" +
        "<li><strong>Text:</strong> allow you to enter text on a single-line</li>" +
        "</ul>",
    },
    {
      _id: "defaultValue",
      name: "Default value",
      type: "text",
      hiddenOnMobile: true,
    },
    {
      _id: "hidden",
      name: "Hidden",
      type: "boolean",
      defaultValue: false,
      hiddenOnMobile: true,
    },
    {
      _id: "hiddenOnMobile",
      name: "Hidden on mobile",
      type: "boolean",
      defaultValue: false,
      hiddenOnMobile: true,
    },
    {
      _id: "options",
      name: "Options",
      type: "options-list",
      hidden: true,
      hiddenOnMobile: true,
      help: "Comma separated values",
    },
    {
      _id: "help",
      name: "Help text",
      type: "text",
      hidden: true,
      hiddenOnMobile: true,
      help: "Provides a description about the field (it supports HTML markup)",
    },
  ],
};
