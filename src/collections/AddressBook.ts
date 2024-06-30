import { CollectionConfig } from "payload/types";

export const AddressBook: CollectionConfig = {
  slug: "addressBook",
  admin: {
    useAsTitle: "address",
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "defaultDeliveryAddress",
      type: "checkbox",
    },
    {
      name: "defaultBillingAddress",
      type: "checkbox",
    },
    {
      name: "name",
      type: "text",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "email",
      type: "text",
    },
    {
      name: "address",
      type: "text",
    },
    {
      name: "apartmentNumber",
      type: "text",
    },
    {
      name: "city",
      type: "text",
    },
    {
      name: "postalCode",
      type: "text",
    },
  ],
};
