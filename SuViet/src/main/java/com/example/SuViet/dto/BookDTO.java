package com.example.SuViet.dto;

import com.example.SuViet.model.Book;
import com.example.SuViet.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookDTO {
    private int bookID;
    private String title;
    private String author;
    private String category;
    private String description;
    private int pageNumber;
    private String yearOfPublication;
    private LocalDateTime createdDate;
    private String publisher;
    private double price;
    private String cover;
    private boolean enabled;
//    private Collection<Integer> periodID;
    private List<String> periodName;
    private User user;
    public static BookDTO convertToDTO(Book book) {
        BookDTO bookDTO = new BookDTO();
        bookDTO.setBookID(book.getBookID());
        bookDTO.setTitle(book.getTitle());
        bookDTO.setAuthor(book.getAuthor());
        bookDTO.setCategory(book.getCategory());
        bookDTO.setDescription(book.getDescription());
        bookDTO.setPageNumber(book.getPageNumber());
        bookDTO.setYearOfPublication(book.getYearOfPublication());
        bookDTO.setCreatedDate(book.getCreatedDate());
        bookDTO.setPublisher(book.getPublisher());
        bookDTO.setCover(book.getCover());
        bookDTO.setEnabled(book.isEnabled());
//        bookDTO.setPeriodID(book.getPeriods().stream().map(period -> period.getPeriodID()).collect(Collectors.toList()));
        bookDTO.setPeriodName(book.getPeriods().stream().map(period -> period.getPeriodName()).collect(Collectors.toList()));
        bookDTO.setUser(book.getUser());
        return bookDTO;
    }
}
