import { UserModel } from "../user.model";
import { encrypt } from "../../utils/encrypt";
import { updateUserDto, returnUserDto } from "../user.types";

async function updateUserAction(id: string, data: updateUserDto): Promise<returnUserDto> {

  const user = await UserModel.findOne({ _id: id, isDeleted: false });

  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  const updateFields: any = {};

  if (data.name) updateFields.name = data.name;

  if (data.email) {
    const emailExists = await UserModel.findOne({
      email: data.email,
      _id: { $ne: id }
    });

    if (emailExists) {
      throw new Error("El email ya está registrado.");
    }

    updateFields.email = data.email;
  }

  if (data.password) {
    updateFields.password = await encrypt(data.password);
  }

  const updated = await UserModel.findByIdAndUpdate(id, { $set: updateFields },{ new: true });

  return {
    id: updated!._id.toString(),
    name: updated!.name,
    email: updated!.email,
    document_number: updated!.document_number,
    permissions: updated!.permissions
  };
}

export default updateUserAction;