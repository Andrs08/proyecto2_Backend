import { UserModel } from "../user.model";
import { encrypt } from "../../utils/encrypt";
import {createUserDto, returnUserDto} from "../user.types"


async function createUserAction(input: createUserDto): Promise<returnUserDto> {
  const { name, email, document_number, password } = input;

  if (!name || !email || !document_number || !password) {
    throw new Error("Todos los campos son obligatorios.");
  }

  const emailExists = await UserModel.findOne({ email });
  if (emailExists) throw new Error("El email ya está registrado.");

  const docExists = await UserModel.findOne({ document_number });
  if (docExists) throw new Error("El número de documento ya está registrado.");

  const hashedPassword = await encrypt(password);

  const user = await UserModel.create({
    name,
    email,
    document_number,
    password: hashedPassword,
    isDeleted: false,
    permissions: []
  });

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    document_number: user.document_number,
    permissions: user.permissions
  };
}

export default createUserAction;
