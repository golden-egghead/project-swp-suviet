package com.example.SuViet.repository;

import com.example.SuViet.model.Book;
import com.example.SuViet.model.Character;
import com.example.SuViet.model.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findAllByEnabled(boolean enabled);

   Page<Book> findAllByEnabled(boolean enabled, PageRequest pageRequest);

    Page<Book> findAllByTitleContainingAndEnabled(@Param("title") String bookName,boolean enabled, PageRequest pageRequest);

    List<Book> findAllByTitleContainingAndEnabled(@Param("title") String bookName, boolean enabled);

    Page<Book> findAllByAuthorContainingAndEnabled(@Param("title") String author,boolean enabled, PageRequest pageRequest);

    List<Book> findAllByAuthorContainingAndEnabled(@Param("title") String author, boolean enabled);
}
