package com.example.SuViet.service.impl;

import com.example.SuViet.model.Book;
import com.example.SuViet.repository.BookRepository;
import com.example.SuViet.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
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
    public Page<Book> getBookWithPaging(int offset, int pageSize) {
        return bookRepository.findAllByEnabled(true, PageRequest.of(offset - 1, pageSize));
    }

    @Override
    public Page<Book> findBookByNameWithPaging(String title, int offset, int pageSize) {
        return bookRepository.findAllByTitleContainingAndEnabled( title,true, PageRequest.of(offset - 1, pageSize));
    }
}
