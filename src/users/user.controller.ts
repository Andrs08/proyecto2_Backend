import readUsersAction from "./actions/read.user.action"
import createUserAction from "./actions/create.user.action"
import {createUserDto ,returnUserDto, loginUserDto, loginResponseDto, updateUserDto} from "./user.types"
import loginUserAction from "./actions/login.user.action"
import deleteUserAction from "./actions/delete.user.action"
import updateUserAction from "./actions/update.user.action"
import { updatePermissionsAction } from "./actions/update.permissions.action";

async function readUser(id: string): Promise<returnUserDto> {
    const user = await readUsersAction(id);
    return user;
}

async function createUser (user: createUserDto): Promise<returnUserDto> {
    const result = await createUserAction(user);
    return result;
}

async function loginController (user: loginUserDto): Promise<string> {
    const result = await loginUserAction(user);
    return result;
}

async function deleteUserController (id: string): Promise <returnUserDto> {
    const user_deleted = await deleteUserAction(id);

    return user_deleted;
}

async function updateUserController (id: string, user: updateUserDto): Promise <returnUserDto> {
    const user_updated = await updateUserAction(id, user);

    return user_updated;
}

async function updateUserPermissionsController(id: string, permissions: string[]) {
    return await updatePermissionsAction(id, permissions);
}

export {readUser, createUser, loginController, deleteUserController, updateUserController, updateUserPermissionsController};