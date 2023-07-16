import { useSelector } from 'react-redux';
import { RootState } from '../store';

const BookList = () => {
  const books = useSelector((state: RootState) => {
    const { books, genreFilter, publicationYearFilter } = state.books;
  
    // Apply the filters to the book array
    const filteredBooks = books.filter((book: any) => {
      if (genreFilter && genreFilter.length > 0) {
        if (book.genre.toLowerCase().includes(genreFilter.toLowerCase())) {
          return true;
        }
      }
      if (publicationYearFilter && publicationYearFilter.length > 0) {
        if (book.publicationYear.includes(publicationYearFilter)) {
          return true;
        }
      }
      return false;
    });
  
    return filteredBooks;
  });

  // Rest of the component code
};