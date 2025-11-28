import {Schema, model} from "mongoose"

type book = {
    name: string;
    code: string;
    genre: string;
    publication_date: string;
    publisher: string;
    author: string;
    isDeleted: boolean;
    isAvaible: boolean;
}

const bookSchema = new Schema<book> ({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
    },
    publication_date: {
        type: String,
        required: true,
        trim: true,
    },
    publisher: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    }, 
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isAvaible: {
        type: Boolean,
        default: true,
    }
})

const bookModel = model<book>("Book", bookSchema)