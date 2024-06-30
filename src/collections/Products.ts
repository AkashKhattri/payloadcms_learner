import { CollectionConfig } from "payload/types";
import { generateSlug } from "../utils/generateSlug";
import { afterProductChanges } from "../api/hooks/afterChanges";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
  },
  hooks: {
    afterChange: [afterProductChanges],
  },
  fields: [
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
      hooks: {
        beforeChange: [
          ({ data }) => {
            data.slug = generateSlug(data.name);
          },
        ],
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "source",
      type: "text",
    },
    {
      name: "removedStatus",
      type: "checkbox",
      hidden: true,
    },
    {
      name: "orderLimit",
      type: "number",
      required: true,
      validate: (val) => {
        if (val <= 0) {
          return "Order limit must be greater than 0";
        } else {
          return true;
        }
      },
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
      defaultValue: 0,
    },
    {
      name: "sellingPrice",
      type: "number",
      defaultValue: 0,
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data.discount > 0) {
              data.sellingPrice =
                data.price - data.price * (data.discount / 100);
            } else {
              data.sellingPrice = 0;
            }
          },
        ],
      },
    },
    {
      name: "stock",
      type: "number",
      required: true,
    },
    {
      name: "discount",
      type: "number",
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
