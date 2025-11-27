import {Schema, model} from "mongoose"

type book = {
    //nombre, genero, fecha de publicación, casa editorial, autor, disponibilidad
    name: string;
    codigo: string;
    gender: string;
    publication_date: string;
    publishing_house: string;
    author: string;
    isDeleted: boolean;
}

const bookSchema = new Schema<book> ({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    codigo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
    },
    publication_date: {
        type: String,
        required: true,
        trim: true,
    },
    publishing_house: {
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
    }
})