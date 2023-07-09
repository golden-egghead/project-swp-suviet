package com.example.SuViet.controller;

import com.example.SuViet.dto.HistoricalItemDTO;
import com.example.SuViet.model.HistoricalItem;
import com.example.SuViet.model.Period;
import com.example.SuViet.model.Role;
import com.example.SuViet.model.User;
import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.response.ResponsePaginationObject;
import com.example.SuViet.service.HistoricalItemService;
import com.example.SuViet.service.PeriodService;
import com.example.SuViet.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class HistoricalItemController {
    @Autowired
    private final HistoricalItemService historicalItemService;
    private final UserService userService;
    private final PeriodService periodService;

    public HistoricalItemController(HistoricalItemService historicalItemService, UserService userService, PeriodService periodService) {
        this.historicalItemService = historicalItemService;
        this.userService = userService;
        this.periodService = periodService;
    }


    @GetMapping("/HistoricalItems/{offset}")
    public ResponseEntity<ResponsePaginationObject> getAllHistoricalItems(@PathVariable int offset) {
        List<HistoricalItem> bookList = historicalItemService.getAllHistoricalItems();
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
                            Math.ceil(count / 6.0), historicalItemService.getHistoricalItemsWithPagination(offset, 6))
            );
        }
    }

    @GetMapping("/HistoricalItems/search/{offset}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponsePaginationObject> searchHistoricalItemByName(@PathVariable int offset, @RequestParam("title") String keyword) {
        List<HistoricalItem> historicalItemList = historicalItemService.getAllHistoricalItemsByName(keyword);
        List<HistoricalItem> allHistoricalItems = historicalItemService.getAllHistoricalItems();
        int count = 0, countAll = 0;

        for (int i = 0; i < historicalItemList.size(); i++) {
            count++;
            countAll++;
        }
        if (keyword.trim().isEmpty() || keyword.trim() == "") {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, countAll,
                            Math.ceil(countAll / 6.0), historicalItemService.getHistoricalItemsWithPagination(offset, 6))
            );
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, count,
                            Math.ceil(count / 6.0), historicalItemService.getAllHistoricalItemsByName(keyword, offset, 6))
            );
        }
    }

    @GetMapping("/historicalItemsSortByTitle/{offset}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponsePaginationObject> getHistoricalItemsWithPaginationAndSort(@PathVariable int offset) {
        Page<HistoricalItemDTO> historicalItemPage = historicalItemService.getHistoricalItemWithSortAndPaging(offset, 6, "name");
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

    //crud cho mod
    private static List<String> getRoleName(Collection<Role> roles) {
        if (roles.isEmpty()) {
            return null;
        }

        return roles.stream().map(Role::getRoleName).collect(Collectors.toList());
    }

    @DeleteMapping(value = "/historicalItem/delete/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponseObject> deleteAHistoricalItem(@PathVariable("id") int id) {
        User user = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        List<Role> roles = (List<Role>) user.getRoles();
        for (Role r : roles) {
            if (r.getRoleName().equals("MEMBER") || r.getRoleName().equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        new ResponseObject("FAILED", "Unforbidden", null)
                );
            }
        }
        boolean checkUpdate = historicalItemService.deleteAHistoricalItem(id);
        if (checkUpdate) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Deleted successfully!",historicalItemService.saveHistoricalItem(historicalItemService.findById(id).get()))
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                new ResponseObject("FAILED", "Deleted fail!", null)
        );
    }

    @PostMapping(value = "/historicalItem/upload")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponseObject> uploadANewHistoricalItem(@RequestBody HistoricalItemDTO dto) throws IOException {
        User currentUser = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        List<String> roles = getRoleName(currentUser.getRoles());
        if(roles.contains("MEMBER") || roles.contains("ADMIN")){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    new ResponseObject("FAILED", "Unforbidden", null)
            );
        }
        List<HistoricalItem> historicalItems = historicalItemService.getAllHistoricalItemsByName(dto.getName());
        if(historicalItems.size() > 0){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "HistoricalItem has already exist!", null)
            );
        }else{
           HistoricalItem historicalItem = new HistoricalItem();
            BeanUtils.copyProperties(dto, historicalItem);
            historicalItem.setUser(currentUser);
            Period period = periodService.getPeriodByPeriodName(dto.getPeriodName());
            if(period == null){
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new ResponseObject("FAILED", "Cannot find out period", null)
                );
            }
            historicalItem.setPeriod(period);
            historicalItem.setEnabled(true);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Uploaded Successfully!", historicalItemService.saveHistoricalItem(historicalItem))
            );
        }
    }
    @PutMapping(value = "/historicalItem/edit/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponseObject> editAHistoricalItem(@PathVariable("id") int id,
                                                         @RequestBody HistoricalItemDTO info){

        User currentUser = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        List<String> roles = getRoleName(currentUser.getRoles());
        if(roles.contains("MEMBER") || roles.contains("ADMIN")){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    new ResponseObject("FAILED", "Unforbidden", null)
            );
        }
       HistoricalItem historicalItem = historicalItemService.findById(id).get();
        if (historicalItem == null) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "There is no character with id " + id, null)
            );
        }
        if (historicalItem.getUser() == null) {
            historicalItem.setUser(currentUser);
        } else {
            if (currentUser != historicalItem.getUser()) {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new ResponseObject("FAILED", "You cannot update this Item!", null)
                );
            }
        }
        historicalItem.setName(info.getName());
        historicalItem.setNation(info.getNation());
        historicalItem.setDescription(info.getDescription());
        historicalItem.setPhoto(info.getPhoto());
        Period period = periodService.getPeriodByPeriodName(info.getPeriodName());
        if(period == null){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "Cannot find out period", null)
            );
        }
        historicalItem.setPeriod(period);

        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "The Character updated successfully",   historicalItemService.saveHistoricalItem(historicalItem))
        );
    }
}
