type createUserDto = {
    name: string;
    email: string;
    document_number: string;
    password: string;
}

type returnUserDto = {
    id: string
    name: string;
    email: string;
    document_number: string;
    permissions: string[];
}

type loginUserDto = {
    email: string;
    password: string;
}

type loginResponseDto = {
    token: string;
    user: returnUserDto;
}


export {createUserDto, returnUserDto, loginUserDto, loginResponseDto}