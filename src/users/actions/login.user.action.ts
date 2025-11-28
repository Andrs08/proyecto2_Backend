import { UserModel } from "../user.model";
import { compare } from "../../utils/encrypt";
import { generateToken } from "../../utils/jwt";
import { loginUserDto, loginResponseDto } from "../user.types";

async function loginUserAction(input: loginUserDto): Promise<loginResponseDto> {
  const { email, password } = input;

  if (!email || !password) {
    throw new Error("Email y contraseña son obligatorios.");
  }

  const user = await UserModel.findOne({ email, isDeleted: false });

  if (!user) {
    throw new Error("Credenciales inválidas.");
  }

  const isValid = await compare(password, user.password);
  if (!isValid) {
    throw new Error("Credenciales inválidas.");
  }

  const token = generateToken({
    id: user._id.toString(),
    email: user.email,
    permissions: user.permissions,
  });

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      document_number: user.document_number,
      permissions: user.permissions,
    },
  };
}

export default loginUserAction;
