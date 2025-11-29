import { UserModel } from "../user.model";

export async function updatePermissionsAction(id: string, permissions: string[]) {
  const user = await UserModel.findById(id);

  if (!user || user.isDeleted) {
    throw new Error("Usuario no encontrado.");
  }

  user.permissions = permissions;

  await user.save();

  return {
    id: user._id.toString(),
    email: user.email,
    permissions: user.permissions
  };
}
