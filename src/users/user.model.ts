import { model, Schema } from "mongoose";


// DECLARE MODEL TYPE
type UserType = {
  name: string;
  email: string;
  document_number: string;
  password: string;
  permissions: string[];
  isDeleted: boolean;
};

// DECLARE MONGOOSE SCHEMA
const UserSchema = new Schema<UserType>({

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    document_number: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    permissions: {
      type: [String],
      default: [],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

});

// DECLARE MONGO MODEL
const UserModel = model<UserType>("User", UserSchema);

// EXPORT ALL
export { UserModel, UserSchema, UserType};
