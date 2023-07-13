package com.example.SuViet.controller;

import com.example.SuViet.dto.BookDTO;
import com.example.SuViet.model.*;
import com.example.SuViet.repository.PeriodRepository;
import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.response.ResponsePaginationObject;
import com.example.SuViet.service.BookService;
import com.example.SuViet.service.FileImageService;
import com.example.SuViet.service.PeriodService;
import com.example.SuViet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/Books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
    private final BookService bookService;
    private final UserService userService;
    private final FileImageService fileImageService;

    @Autowired
    PeriodRepository periodRepository;
    public BookController(BookService bookService, UserService userService, PeriodService periodService, FileImageService fileImageService) {
        this.bookService = bookService;
        this.userService = userService;
        this.fileImageService = fileImageService;
    }

    @GetMapping("/{offset}")
    public ResponseEntity<ResponsePaginationObject> getAllBooks(@PathVariable int offset) {
        List<Book> bookList = bookService.getAllBooks();
        int count = 0;
        for (int i = 0; i < bookList.size(); i++) {
            count++;
        }
        if (bookList.size() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponsePaginationObject()
            );
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, offset,
                            Math.ceil(count / 6.0), bookService.getBookWithPaging(offset, 6))
            );
        }
    }

    @GetMapping("/search/{offset}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponsePaginationObject> searchBookByName(@PathVariable int offset, @RequestParam("title") String keyword) {
        List<Book> bookList = bookService.findBookByName(keyword);
        List<Book> allBookList = bookService.getAllBooks();
        int count = 0, countAll = 0;

        for (int i = 0; i < bookList.size(); i++) {
            count++;
            countAll++;
        }
        if (keyword.trim().isEmpty() || keyword.trim() == "") {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, countAll,
                            Math.ceil(countAll / 6.0), bookService.getBookWithPaging(offset, 6))
            );
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, count,
                            Math.ceil(count / 6.0), bookService.findBookByNameWithPaging(keyword, offset, 6))
            );
        }
    }

    @GetMapping("/searchAuthor/{offset}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponsePaginationObject> searchBookByAuthor(@PathVariable int offset, @RequestParam("author") String author) {
        List<Book> bookList = bookService.findBookByAuthor(author);
        List<Book> allBookList = bookService.getAllBooks();
        int count = 0, countAll = 0;

        for (int i = 0; i < bookList.size(); i++) {
            count++;
            countAll++;
        }
        if (author.trim().isEmpty() || author.trim() == "") {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, countAll,
                            Math.ceil(countAll / 6.0), bookService.getBookWithPaging(offset, 6))
            );
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, count,
                            Math.ceil(count / 6.0), bookService.findBookByAuthorWithPaging(author, offset, 6))
            );
        }
    }

    @GetMapping("/SortByTitle/{offset}")
    public ResponseEntity<ResponsePaginationObject> getBooksWithPaginationAndSort(@PathVariable int offset) {
        Page<BookDTO> booksWithPagination = bookService.getBooksWithSortAndPaging(offset, 6, "title");
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

    //Lam crud cho book
    private static List<String> getRoleName(Collection<Role> roles) {
        if (roles.isEmpty()) {
            return null;
        }

        return roles.stream().map(Role::getRoleName).collect(Collectors.toList());
    }

    @PostMapping("/upload_book")
    public ResponseEntity<ResponseObject> uploadABook(@RequestParam("title") String title,
                                                      @RequestParam("title") String author,
                                                      @RequestParam("title") String category,
                                                      @RequestParam("title") String description,
                                                      @RequestParam("title") int pageNumber,
                                                      @RequestParam("title") String publisher,
                                                      @RequestParam("title") String yearOfPublication,
                                                      @RequestParam("title") double price,
                                                      @RequestParam("title") List<String> periodName,
                                                      @RequestParam("title") MultipartFile cover
                                                      ) {
        List<Book> books = bookService.findBookByName(title);
        User user = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        List<Role> roles = (List<Role>) user.getRoles();
        for (Role r : roles) {
            if (r.getRoleName().equals("MEMBER") || r.getRoleName().equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        new ResponseObject("FAILED", "Unforbidden", null)
                );
            }
        }
        if (books.size() > 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "Video has already exist!", null)
            );
        } else {
            Book book = new Book();
            book.setTitle(title);
            book.setAuthor(author);
            book.setCategory(category);
            book.setDescription(description);
            book.setPageNumber(pageNumber);
            book.setYearOfPublication(yearOfPublication);
            book.setCreatedDate(LocalDateTime.now());
            book.setPublisher(publisher);
            book.setCover(book.getCover());
            book.setEnabled(true);
            book.setUser(user);
            book.setPrice(price);
            List<String> periodNames = periodName;
            List<Period> periods = new ArrayList<>();
            for (int i = 0; i < periodNames.size(); i++) {
                Period period = periodRepository.findByPeriodName(periodNames.get(0));
                periods.add(period);
            }
            if (periods.size() <= 0) {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new ResponseObject("FAILED", "Cannot find out period", null)
                );
            }
            book.setPeriods(periods);
            book.setCover("http://localhost:8080/api/Books/files/" +fileImageService.storeFile( "books",cover));
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Saved...", bookService.saveBook(book))
            );
        }

    }

    @PutMapping("/update_book/{bookID}")
    public ResponseEntity<ResponseObject> updateABook(@PathVariable int bookID,
                                                      @RequestParam("title") String title,
                                                      @RequestParam("author") String author,
                                                      @RequestParam("category") String category,
                                                      @RequestParam("description") String description,
                                                      @RequestParam("pageNumber") int pageNumber,
                                                      @RequestParam("publisher") String publisher,
                                                      @RequestParam("yearOfPublication") String yearOfPublication,
                                                      @RequestParam("price") double price,
                                                      @RequestParam("periodName") List<String> periodName,
                                                      @RequestParam("cover") MultipartFile cover) throws IOException {
        User user = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        Book book = bookService.findBookById(bookID).get();
        List<Role> roles = (List<Role>) user.getRoles();
        for (Role r : roles) {
            if (r.getRoleName().equals("MEMBER") || r.getRoleName().equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        new ResponseObject("FAILED", "Unforbidden", null)
                );
            }
        }
        if (book == null) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "There is no video with id " + bookID, null)
            );
        }
        if (book.getUser() == null) {
            book.setUser(user);
        } else {
            if (user != book.getUser()) {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new ResponseObject("FAILED", "You cannot update this video!", null)
                );
            }
        }
        book.setTitle(title);
        book.setAuthor(author);
        book.setCategory(category);
        book.setDescription(description);
        book.setPageNumber(pageNumber);
        book.setYearOfPublication(yearOfPublication);
        book.setCreatedDate(LocalDateTime.now());
        book.setPublisher(publisher);
        book.setCover(book.getCover());
        book.setEnabled(true);
        book.setUser(user);
        book.setPrice(price);
        List<String> periodNames = periodName;
        List<Period> periods = new ArrayList<>();
        for (int i = 0; i < periodNames.size(); i++) {
            Period period = periodRepository.findByPeriodName(periodNames.get(0));
            periods.add(period);
        }
        if (periods.size() <= 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "Cannot find out period", null)
            );
        }
        book.setPeriods(periods);
        String oldImage = book.getCover().substring(book.getCover().lastIndexOf('/') + 1);
        Path oldPath = Paths.get("SuViet/src/main/resources/static/books/".concat(oldImage));
        Files.deleteIfExists(oldPath);
        if(cover != null){
            book.setCover("http://localhost:8080/api/Books/files/" +fileImageService.storeFile( "books",cover));
        }else{
            book.setCover(book.getCover());
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Updated successfully", bookService.saveBook(book))
        );
    }

    @DeleteMapping("/book/delete/{bookID}")
    public ResponseEntity<ResponseObject> deleteAVideo(@PathVariable int bookID) {
        boolean checkDelete = bookService.deleteABook(bookID);
        User user = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        List<Role> roles = (List<Role>) user.getRoles();
        for (Role r : roles) {
            if (r.getRoleName().equals("MEMBER") || r.getRoleName().equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        new ResponseObject("FAILED", "Unforbidden", null)
                );
            }
        }
        if (checkDelete) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Deleted successfully!", bookService.saveBook(bookService.findBookById(bookID).get()))
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                new ResponseObject("FAILED", "Deleted fail!", null)
        );
    }
}