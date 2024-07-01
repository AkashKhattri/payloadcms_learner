import { CollectionConfig } from "payload/types";
import { isAdminField, isAdminOrCreatedBy } from "../api/access/permissions";
import { createdBy } from "../utils/fields";

export const Orders: CollectionConfig = {
  slug: "orders",
  auth: true,
  fields: [
    {
      name: "paymentId",
      type: "text",
      access: {
        create: isAdminField,
        read: isAdminField,
        update: isAdminField,
      },
    },
    createdBy,
    {
      name: "orderItems",
      type: "array",
      access: {
        create: () => false,
        update: () => false,
      },
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: "orderItems",
          type: "relationship",
          relationTo: "products",
          hasMany: false,
        },
        {
          name: "price",
          type: "number",
          required: true,
        },
        {
          name: "disount",
          type: "number",
          required: true,
        },
        {
          name: "discountAmount",
          type: "number",
          required: true,
        },
      ],
    },
    {
      name: "paymentType",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "subTotal",
      type: "number",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "deliveredAt",
      type: "date",
    },

    {
      name: "shippingPrice",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "deliveryStatus",
      type: "select",
      options: [
        "DELIVERED",
        "PENDING",
        "PROCESSING",
        "CANCELLED",
        "ORDER_PLACED",
        "DISPATCHED",
        "ON_THE_WAY",
      ],
    },
    {
      name: "paymentStatus",
      type: "select",
      options: ["PENDING", "PAID"],
      defaultValue: "PAID",
    },
    {
      name: "grandTotal",
      type: "number",
    },
    {
      name: "billingAddress",
      type: "relationship",
      relationTo: "addressBook",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "shippingAddress",
      type: "relationship",
      relationTo: "addressBook",
      admin: {
        readOnly: true,
      },
    },
  ],
  access: {
    read: isAdminOrCreatedBy,
    update: isAdminOrCreatedBy,
    delete: isAdminOrCreatedBy,
  },
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation == "create") {
          if (req.user) {
            data.createdBy = req.user.id;
            return data;
          }
        }
      },
    ],
  },
};
