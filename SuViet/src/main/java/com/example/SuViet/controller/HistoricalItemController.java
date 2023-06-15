package com.example.SuViet.controller;

import com.example.SuViet.model.Book;
import com.example.SuViet.model.HistoricalItem;
import com.example.SuViet.model.ResponsePaginationObject;
import com.example.SuViet.service.HistoricalItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class HistoricalItemController {
    @Autowired
    private final HistoricalItemService historicalItemService;

    public HistoricalItemController(HistoricalItemService historicalItemService) {
        this.historicalItemService = historicalItemService;
    }


    @GetMapping("/HistoricalItems/{offset}")
    public ResponseEntity<ResponsePaginationObject> getAllHistoricalItems(@PathVariable int offset){
        List<HistoricalItem> bookList = historicalItemService.getAllHistoricalItems();
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
                            Math.ceil(count / 6.0), historicalItemService.getHistoricalItemsWithPagination(offset, 6))
            );
        }
    }

    @GetMapping("/HistoricalItems/search/{offset}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponsePaginationObject> searchHistoricalItemByName(@PathVariable int offset, @RequestParam("title") String keyword ){
        List<HistoricalItem> historicalItemList = historicalItemService.getAllHistoricalItemsByName(keyword);
        List<HistoricalItem> allHistoricalItems = historicalItemService.getAllHistoricalItems();
        int count = 0, countAll = 0;

        for(int i = 0; i < historicalItemList.size(); i++){
            count++;
            countAll++;
        }
        if(keyword.trim().isEmpty() || keyword.trim() == ""){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, countAll,
                            Math.ceil(countAll / 6.0), historicalItemService.getHistoricalItemsWithPagination(offset, 6))
            );
        }else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, count,
                            Math.ceil(count / 6.0), historicalItemService.getAllHistoricalItemsByName(keyword, offset, 6))
            );
        }
    }
    @GetMapping("/historicalItemsSortByTitle/{offset}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponsePaginationObject> getHistoricalItemsWithPaginationAndSort(@PathVariable int offset) {
        Page<HistoricalItem> historicalItemPage = historicalItemService.getHistoricalItemWithSortAndPaging(offset, 6, "name");
        int listSize = historicalItemPage.getSize();
        int count = 0;
        for (int i = 0; i < listSize; i++) {
            count++;
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponsePaginationObject("OK", "Query successfully", offset, 6, count,
                        Math.ceil(count / 6.0), historicalItemPage)
        );
    }

}
