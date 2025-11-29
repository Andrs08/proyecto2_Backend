import {UserModel} from "../user.model"
import {returnUserDto} from "../user.types" 

async function deleteUserAction(id: string): Promise <returnUserDto> {

    let user = await UserModel.findById(id);
    if (!user || user.isDeleted) {
        throw new Error ("Usuario no existe")
    }

    const result = await UserModel.updateOne({_id: user.id}, {isDeleted: true});
    return {
        id: user.id,
        name: user.name, 
        email: user.name,
        document_number: user.document_number,
        permissions: user.permissions,
    }
}

export default deleteUserAction;