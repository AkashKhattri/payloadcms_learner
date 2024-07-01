import payload from "payload";
import { CollectionConfig } from "payload/types";
import {
  isAdminCollection,
  isAdminField,
  isAdminOrCreatedBy,
} from "../api/access/permissions";
import { createdBy } from "../utils/fields";

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 60 * 60 * 24,
    verify: false,
    maxLoginAttempts: 5,
    lockTime: 600 * 1000,
  },
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: isAdminOrCreatedBy,
    create: () => true,
    update: isAdminOrCreatedBy,
    delete: isAdminCollection,
  },
  endpoints: [
    {
      path: "/register",
      method: "post",
      handler: async (req, res, next) => {
        if ("role" in req.body) {
          return res.status(401).send({ message: "Invalid Data" });
        }
        const data = await payload.find({
          collection: "users",
          where: {
            email: { equals: req.body.email },
          },
        });

        if (data.docs.length > 0) {
          res.status(409).send({ message: "User already exists" });
        } else {
          const create = await payload.create({
            collection: "users",
            data: {
              fullname: req.body.fullname,
              email: req.body.email,
              password: req.body.password,
              role: "user",
            },
          });
          if (create) {
            res.status(200).send(create);
          } else {
            res.status(400).send({ error: "Something Went Wrong" });
          }
        }
      },
    },
  ],
  fields: [
    {
      name: "fullname",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      access: {
        update: isAdminField,
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
    createdBy,
  ],
};

export default Users;
