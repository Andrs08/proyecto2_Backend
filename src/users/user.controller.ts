import readUsersAction from "./actions/read.user.action"
import {UserType} from "./user.model"

async function readUsers(): Promise<UserType[]> {
    const results = await readUsersAction();
    return results;
}

export {readUsers}