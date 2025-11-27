import {UserModel} from "../user.model";
import {UserType} from "../user.model";

async function readUsersAction (): Promise<UserType[]> {
    const results = await UserModel.find();

    return results;
}

export default readUsersAction;