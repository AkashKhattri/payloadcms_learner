import { CollectionConfig } from "payload/types";
import { generateSlug } from "../utils/generateSlug";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      hooks: {
        beforeChange: [
          ({ data }) => {
            data.slug = generateSlug(data.name);
          },
        ],
      },
      required: true,
    },
    {
      name: "slug",
      type: "text",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
  ],
};
