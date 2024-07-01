import { CollectionConfig, Field } from "payload/types";

const productNameField: Field = {
  name: "name",
  type: "text",
  required: true,
  hooks: {
    afterChange: [
      ({ value, previousValue, req }) => {
        `User ID ${req.user.id} changed their membership status from ${previousValue} to ${value}.`;
      },
    ],
  },
};

export const Products: CollectionConfig = {
  slug: "products",
  fields: [
    productNameField,
    {
      name: "source",
      type: "text",
    },
    {
      name: "removedStatus",
      type: "checkbox",
    },
    {
      name: "orderLimit",
      type: "number",
      required: true,
    },
    {
      name: "newArrival",
      type: "checkbox",
    },
    {
      name: "slug",
      type: "text",
    },
    {
      name: "isFeatured",
      type: "checkbox",
    },
    {
      name: "toDisplay",
      type: "checkbox",
    },
    {
      name: "price",
      type: "number",
    },
    {
      name: "sellingPrice",
      type: "number",
    },
    {
      name: "stock",
      type: "number",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "information",
      type: "array",
      fields: [
        {
          name: "key",
          type: "text",
        },
        {
          name: "value",
          type: "text",
        },
      ],
    },
  ],
};
