import { UserModel } from "../users/user.model";
import { encrypt } from "../utils/encrypt";
import { PERMISSIONS } from "../permissions/permissions";

export async function createDefaultAdmin() {
  const adminEmail = "admin@biblioteca.com";

  const exists = await UserModel.findOne({ email: adminEmail });

  if (exists) {
    console.log("Admin already exists.");
    return;
  }

  const hashed = await encrypt("admin123");

  await UserModel.create({
    name: "Administrador General",
    email: adminEmail,
    document_number: "0000000000",
    password: hashed,
    isDeleted: false,
    permissions: Object.values(PERMISSIONS) 
  });

  console.log("🟢 Default admin created:");
  console.log("Email: admin@biblioteca.com");
  console.log("Password: admin123");
}
