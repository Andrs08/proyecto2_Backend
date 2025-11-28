import { UserModel } from "../user.model";
import { returnUserDto } from "../user.types";

async function readUserAction(document: string): Promise<returnUserDto> {
  const user = await UserModel.findOne({ document_number: document, isDeleted: false });

  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    document_number: user.document_number,
    permissions: user.permissions,
  };
}

export default readUserAction;
