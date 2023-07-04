package com.example.SuViet.controller;

import com.example.SuViet.dto.BookDTO;
import com.example.SuViet.dto.CharacterDTO;
import com.example.SuViet.model.*;
import com.example.SuViet.model.Character;
import com.example.SuViet.repository.PeriodRepository;
import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.response.ResponsePaginationObject;
import com.example.SuViet.service.BookService;
import com.example.SuViet.service.PeriodService;
import com.example.SuViet.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
    private final BookService bookService;
    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));
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

    //Lam crud cho book
    private static List<String> getRoleName(Collection<Role> roles) {
        if (roles.isEmpty()) {
            return null;
        }

        return roles.stream().map(Role::getRoleName).collect(Collectors.toList());
    }

    @DeleteMapping(value = "/Books/delete/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponseObject> deleteABook(@PathVariable("id") int id) {
        //role mod
        // tim character, co ton tai update: disable, ko ton tai bao
        //save
        User currentUser = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        List<String> roles = getRoleName(currentUser.getRoles());
        if (roles.contains("MODERATOR")) {
            Book toDelete = bookService.findBookById(id).get();
            toDelete.setEnabled(false);
            bookService.saveBook(toDelete);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "The Book deleted successfully", toDelete));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ResponseObject("FAILED", "Your role can be accessible this feature!", null)
            );
        }
    }
    @PostMapping(value = "/book/upload")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponseObject> uploadANewCharacter(@RequestParam String data,
                                                              @RequestParam("image") MultipartFile cover) throws IOException, ParseException {
        Path staticPath = Paths.get("D:\\SuVietProject\\Project_SWP391_SuViet_G7\\SuViet\\src\\main\\resources");
        Path imagePath = Paths.get("books");
        if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
            Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
        }
        Path file = CURRENT_FOLDER.resolve(staticPath)
                .resolve(imagePath).resolve(cover.getOriginalFilename());
        try (OutputStream os = Files.newOutputStream(file)) {
            os.write(cover.getBytes());
        }
        ObjectMapper objectMapper = new ObjectMapper();
        BookDTO dto = objectMapper.readValue(data, BookDTO.class);
        User currentUser = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        List<String> roles = getRoleName(currentUser.getRoles());
        if (roles.contains("MODERATOR")){
            List<Book> existedBook = bookService.findBookByName(dto.getTitle());
            if(existedBook.size() == 0){
                Book toUpload = new Book();
                BeanUtils.copyProperties(dto, toUpload);
                toUpload.setCover(imagePath.resolve(cover.getOriginalFilename()).toString());
                toUpload.setUser(currentUser);

                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                Date currentDate = formatter.parse(formatter.format(new Date(System.currentTimeMillis())));
                toUpload.setCreatedDate(currentDate);

                List<String> periodNames = dto.getPeriodName();
                List<Period> periods = new ArrayList<>();
                for (int i = 0; i < periodNames.size(); i++) {
                    Period period = periodRepository.findByPeriodName(periodNames.get(0));
                    periods.add(period);
                }

                if (periods.size() == 0) {
                    return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                            new ResponseObject("FAILED", "Cannot find out period", null)
                    );
                }
                toUpload.setPeriods(periods);
                bookService.saveBook(toUpload);
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("OK", "Uploaded successfully!", toUpload)
                );
            }else{
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new ResponseObject("FAILED", "Book has already exist!", null)
                );
            }
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ResponseObject("FAILED", "Your role can be accessible this feature!", null)
            );
        }
    }
    @PutMapping(value = "/book/edit/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponseObject> editABook(@PathVariable("id") int id,
                                                         @RequestParam String data,
                                                         @RequestParam("image") MultipartFile cover) throws IOException {
        User currentUser = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        List<String> roles = getRoleName(currentUser.getRoles());
        if (roles.contains("MODERATOR")) {
            ObjectMapper objectMapper = new ObjectMapper();
            BookDTO dto = objectMapper.readValue(data, BookDTO.class);
            Book toUpdate = bookService.findBookById(id).get();
            System.out.println("BOOK: " + toUpdate);
            if(toUpdate == null){
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new ResponseObject("FAILED", "The book is not existed!", null)
                );
            }

            //xử lí ảnh
            Path staticPath = Paths.get("D:\\SuVietProject\\Project_SWP391_SuViet_G7\\SuViet\\src\\main\\resources");
            Path imagePath = Paths.get("books");
            System.out.println("OLD FILE: " + CURRENT_FOLDER.resolve(staticPath).resolve(toUpdate.getCover()).toString());
            Path oldFile = CURRENT_FOLDER.resolve(staticPath).resolve(toUpdate.getCover());

            Path updateFile = CURRENT_FOLDER.resolve(staticPath)
                    .resolve(imagePath).resolve(cover.getOriginalFilename());
            Files.copy(cover.getInputStream(), updateFile, StandardCopyOption.REPLACE_EXISTING);
            Files.deleteIfExists(oldFile);
            toUpdate.setCover(imagePath.resolve(cover.getOriginalFilename()).toString());
            //xử lí title
            if (dto.hasSpecialCharacters(dto.getTitle()) != true) {
                toUpdate.setTitle(dto.getTitle());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new ResponseObject("FAILED", "The title is invalid!", null)
                );
            }
            //xử lí period
            List<String> periodNames = dto.getPeriodName();
            List<Period> periods = new ArrayList<>();
            for (int i = 0; i < periodNames.size(); i++) {
                Period period = periodRepository.findByPeriodName(periodNames.get(0));
                periods.add(period);
            }

            if (periods.size() == 0) {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new ResponseObject("FAILED", "Cannot find out period", null)
                );
            }
            toUpdate.setPeriods(periods);
            toUpdate.setTitle(dto.getTitle());
            toUpdate.setAuthor(dto.getAuthor());
            toUpdate.setCategory(dto.getCategory());
            toUpdate.setDescription(dto.getDescription());
            toUpdate.setPageNumber(dto.getPageNumber());
            toUpdate.setYearOfPublication(dto.getYearOfPublication());
            toUpdate.setPublisher(dto.getPublisher());
            toUpdate.setEnabled(dto.isEnabled());
           bookService.saveBook(toUpdate);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "The Character updated successfully", toUpdate));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ResponseObject("FAILED", "Your role can be accessible this feature!", null)
            );
        }
    }
}