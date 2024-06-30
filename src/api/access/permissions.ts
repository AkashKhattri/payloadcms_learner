import { Access } from "payload/config";
import { FieldAccess } from "payload/types";

export const isAdminOrCreatedBy: Access = ({ req: { user } }) => {
  if (user && user.role === "admin") {
    return true;
  }
  if (user) {
    return { createdBy: { equals: user.id } };
  }

  return false;
};

export const isAdmin: FieldAccess = ({ req: { user } }) => {
  if (user && user.role === "admin") {
    return true;
  }

  return false;
};
