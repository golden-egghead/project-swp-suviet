package com.example.SuViet.controller;

import com.example.SuViet.dto.BookDTO;
import com.example.SuViet.model.*;
import com.example.SuViet.repository.PeriodRepository;
import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.response.ResponsePaginationObject;
import com.example.SuViet.service.BookService;
import com.example.SuViet.service.PeriodService;
import com.example.SuViet.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
    private final BookService bookService;
    private final UserService userService;
    private final PeriodService periodService;

    @Autowired
    PeriodRepository periodRepository;
    public BookController(BookService bookService, UserService userService, PeriodService periodService) {
        this.bookService = bookService;
        this.userService = userService;
        this.periodService = periodService;
    }

    @GetMapping("/Books/{offset}")
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

    @GetMapping("/Books/search/{offset}")
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

    @GetMapping("/Books/searchAuthor/{offset}")
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

    @GetMapping("/booksSortByTitle/{offset}")
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

    @PostMapping("/upload-video")
    public ResponseEntity<ResponseObject> uploadABook(@RequestBody BookDTO bookDTO) {
        List<Book> books = bookService.findBookByName(bookDTO.getTitle());
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
            BeanUtils.copyProperties(bookDTO, book);
            book.setCreatedDate(LocalDateTime.now());
            book.setUser(user);
            List<String> periodNames = bookDTO.getPeriodName();
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
            book.setEnabled(true);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Saved...", bookService.saveBook(book))
            );
        }

    }

    @PutMapping("/update-video/{videoID}")
    public ResponseEntity<ResponseObject> updateABook(@PathVariable int bookID,
                                                       @RequestBody BookDTO bookDTO) {
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
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setCategory(bookDTO.getCategory());
        book.setDescription(bookDTO.getDescription());
        book.setPageNumber(bookDTO.getPageNumber());
        book.setYearOfPublication(bookDTO.getYearOfPublication());
        book.setCreatedDate(LocalDateTime.now());

        book.setPublisher(bookDTO.getPublisher());
        book.setPrice(bookDTO.getPrice());
        book.setCover(bookDTO.getCover());
        book.setEnabled(true);

        List<String> periodNames = bookDTO.getPeriodName();
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
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Updated successfully", bookService.saveBook(book))
        );
    }

    @DeleteMapping("/delete-video/{videoID}")
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