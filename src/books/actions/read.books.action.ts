import { bookModel } from "../book.model";
import { returnListBookDto } from "../book.types";

type BookFilters = {
  name?: string;
  genre?: string;
  publisher?: string;
  author?: string;
  isAvaible?: boolean;
  publication_date_from?: Date;
  publication_date_to?: Date;
};

async function readBooksAction(
  filters: BookFilters,
  page: number = 1
): Promise<returnListBookDto> {
  
  const limit = 2;
  const query: any = { isDeleted: false };

  if (filters.name) {
    query.name = { $regex: filters.name, $options: "i" };
  }

  if (filters.genre) {
    query.genre = filters.genre;
  }

  if (filters.publisher) {
    query.publisher = filters.publisher;
  }

  if (filters.author) {
    query.author = filters.author;
  }

  if (filters.isAvaible !== undefined) {
    query.isAvaible = filters.isAvaible;
  }

  if (filters.publication_date_from || filters.publication_date_to) {
    query.publication_date = {};

    if (filters.publication_date_from) {
      query.publication_date.$gte = new Date(filters.publication_date_from);
    }

    if (filters.publication_date_to) {
      query.publication_date.$lte = new Date(filters.publication_date_to);
    }
  }

  const skip = (page - 1) * limit;

  const totalBooks = await bookModel.countDocuments(query);

  const books = await bookModel
    .find(query)
    .skip(skip)
    .limit(limit)
    .select("name")
    .exec();

  const maxPage = Math.ceil(totalBooks / limit);

  return {
    books,
    pagination: {
      page,
      maxPage,
      perPage: limit,
      total: totalBooks,
    },
  };
}

export default readBooksAction;
