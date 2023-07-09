package com.example.SuViet.service.impl;

import com.example.SuViet.dto.BookDTO;
import com.example.SuViet.model.Book;
import com.example.SuViet.repository.BookRepository;
import com.example.SuViet.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Optional<Book> findBookById(int id) {
        return bookRepository.findById(id);
    }

    @Override
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAllByEnabled(true);
    }

    @Override
    public List<Book> findBookByName(String title) {
        return bookRepository.findAllByTitleContainingAndEnabled(title, true);
    }

    @Override
    public Page<BookDTO> getBookWithPaging(int offset, int pageSize) {
        Page<Book> books = bookRepository.findAllByEnabled(true, PageRequest.of(offset - 1, pageSize));
        return books.map(book -> BookDTO.convertToDTO(book));
    }

    @Override
    public Page<BookDTO> findBookByNameWithPaging(String title, int offset, int pageSize) {
        Page<Book> books = bookRepository.findAllByTitleContainingAndEnabled( title,true, PageRequest.of(offset - 1, pageSize));
        return books.map(book -> BookDTO.convertToDTO(book));
    }

    @Override
    public Page<BookDTO> getBooksWithSortAndPaging(int offset, int pageSize, String field) {
        Page<Book> books = bookRepository.findAllByEnabled(true,PageRequest.of(offset - 1, pageSize).withSort(Sort.by(field)));
        return books.map(book -> BookDTO.convertToDTO(book));
    }

    @Override
    public List<Book> findBookByAuthor(String author) {
        return bookRepository.findAllByAuthorContainingAndEnabled(author, true);
    }

    @Override
    public Page<BookDTO> findBookByAuthorWithPaging(String author, int offset, int pageSize) {
        Page<Book> books = bookRepository.findAllByAuthorContainingAndEnabled(author, true, PageRequest.of(offset -1, pageSize));
        return books.map(book -> BookDTO.convertToDTO(book));
    }

    @Override
    public boolean deleteABook(int bookID) {
        Book bookToDelete = bookRepository.findById(bookID).get();
        try {
            if (bookToDelete.isEnabled()) {
                bookToDelete.setEnabled(false);
            } else  {
                bookToDelete.setEnabled(true);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
