import { Field } from "payload/types";

export const createdBy: Field = {
  name: "createdBy",
  type: "relationship",
  relationTo: "users",
  access: {
    update: () => false,
  },
  admin: {
    readOnly: true,
    position: "sidebar",
    condition: (data) => Boolean(data?.createdBy),
  },
};
