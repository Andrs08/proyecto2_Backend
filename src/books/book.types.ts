type createBookDto = {
    name: string;
    code: string;
    genre: string;
    publication_date: string;
    publisher: string;
    author: string;
}

type returnBookDto = {
    id: string;
} & createBookDto &
{
    isAvaible: boolean;
}

type updateBookDto = {
    name?: string;
    genre?: string;
    publication_date?: string;
    publisher?: string;
    author?: string;
    isAvaible?: boolean;
}

type returnListBookDto = {
  books: {
    name: string;
  }[];
  pagination: {
    page: number;
    maxPage: number;
    perPage: number;
    total: number;
  };
};


export {createBookDto, returnBookDto, updateBookDto, returnListBookDto}