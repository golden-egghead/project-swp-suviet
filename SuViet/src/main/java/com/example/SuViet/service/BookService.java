package com.example.SuViet.service;

import com.example.SuViet.model.Book;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface BookService {
    Optional<Book> findBookById(int id);
    Book saveBook(Book book);
    List<Book> getAllBooks();
    List<Book> findBookByName(String nameBook);
    Page<Book> getBookWithPaging(int offset, int pageSize);
    Page<Book> findBookByNameWithPaging(String nameBook,int offset, int pageSize);
    Page<Book> getBooksWithSortAndPaging(int offset, int pageSize, String field);
    List<Book> findBookByAuthor(String author);
    Page<Book> findBookByAuthorWithPaging(String author,int offset, int pageSize);

}
