import readUsersAction from "./actions/read.user.action"
import createUserAction from "./actions/create.user.action"
import {createUserDto ,returnUserDto} from "./user.types"

async function readUser(id: string): Promise<returnUserDto> {
    const user = await readUsersAction(id);
    return user;
}

async function createUser (user: createUserDto): Promise<returnUserDto> {
    const result = await createUserAction(user);
    return result;
}



export {readUser, createUser}