package com.example.SuViet.controller;

import com.example.SuViet.model.Book;
import com.example.SuViet.model.Character;
import com.example.SuViet.model.ResponsePaginationObject;
import com.example.SuViet.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
private final BookService bookService;


    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/Books/{offset}")
    public ResponseEntity<ResponsePaginationObject> getAllBooks(@PathVariable int offset){
        List<Book> bookList = bookService.getAllBooks();
        int count = 0;
        for(int i = 0; i < bookList.size(); i++){
            count++;
        }
        if(bookList.size() == 0){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponsePaginationObject()
            );
        }else{
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!",offset, 6, offset,
                            Math.ceil(count / 6.0), bookService.getBookWithPaging(offset, 6))
            );
        }
    }

    @GetMapping("/Books/search/{offset}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponsePaginationObject> searchBookByName(@PathVariable int offset, @RequestParam("title") String keyword ){
        List<Book> bookList = bookService.findBookByName(keyword);
        List<Book> allBookList = bookService.getAllBooks();
        int count = 0, countAll = 0;

        for(int i = 0; i < bookList.size(); i++){
            count++;
            countAll++;
        }
        if(keyword.trim().isEmpty() || keyword.trim() == ""){
          return ResponseEntity.status(HttpStatus.OK).body(
                  new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, countAll,
                          Math.ceil(countAll / 6.0), bookService.getBookWithPaging(offset, 6))
          );
        }else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, count,
                            Math.ceil(count / 6.0), bookService.findBookByNameWithPaging(keyword, offset, 6))
            );
        }
    }
    @GetMapping("/Books/searchAuthor/{offset}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponsePaginationObject> searchBookByAuthor(@PathVariable int offset, @RequestParam("author") String author ){
        List<Book> bookList = bookService.findBookByAuthor(author);
        List<Book> allBookList = bookService.getAllBooks();
        int count = 0, countAll = 0;

        for(int i = 0; i < bookList.size(); i++){
            count++;
            countAll++;
        }
        if(author.trim().isEmpty() || author.trim() == ""){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, countAll,
                            Math.ceil(countAll / 6.0), bookService.getBookWithPaging(offset, 6))
            );
        }else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, count,
                            Math.ceil(count / 6.0), bookService.findBookByAuthorWithPaging(author, offset, 6))
            );
        }
    }
    @GetMapping("/booksSortByTitle/{offset}")
    public ResponseEntity<ResponsePaginationObject> getBooksWithPaginationAndSort(@PathVariable int offset) {
        Page<Book> booksWithPagination = bookService.getBooksWithSortAndPaging(offset, 6, "title");
        int listSize = booksWithPagination.getSize();
        int count = 0;
        for (int i = 0; i < listSize; i++) {
            count++;
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponsePaginationObject("OK", "Query successfully", offset, 6, count,
                        Math.ceil(count / 6.0), booksWithPagination)
        );
    }

}