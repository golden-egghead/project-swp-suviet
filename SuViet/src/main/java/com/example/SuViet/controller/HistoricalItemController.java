package com.example.SuViet.controller;

import com.example.SuViet.dto.CharacterDTO;
import com.example.SuViet.dto.HistoricalItemDTO;
import com.example.SuViet.model.Character;
import com.example.SuViet.model.HistoricalItem;
import com.example.SuViet.model.Period;
import com.example.SuViet.model.Role;
import com.example.SuViet.model.User;
import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.response.ResponsePaginationObject;
import com.example.SuViet.service.HistoricalItemService;
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
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class HistoricalItemController {
    @Autowired
    private final HistoricalItemService historicalItemService;
    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));
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
        User currentUser = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        List<String> roles = getRoleName(currentUser.getRoles());
        if (roles.contains("MODERATOR")) {
            HistoricalItem toDelete = historicalItemService.findById(id).get();
            toDelete.setEnabled(false);
            historicalItemService.saveHistoricalItem(toDelete);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "The HistoricalItem deleted successfully", toDelete));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ResponseObject("FAILED", "Your role can be accessible this feature!", null)
            );
        }
    }

    @PostMapping(value = "/historicalItem/upload")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponseObject> uploadANewHistoricalItem(@RequestParam String data,
                                                                   @RequestParam("image") MultipartFile photo) throws IOException {
        //File ảnh
        Path staticPath = Paths.get("D:\\SuVietProject\\Project_SWP391_SuViet_G7\\SuViet\\src\\main\\resources");
        Path imagePath = Paths.get("historicalItems");
        if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
            Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
        }
        Path file = CURRENT_FOLDER.resolve(staticPath)
                .resolve(imagePath).resolve(photo.getOriginalFilename());
        try (OutputStream os = Files.newOutputStream(file)) {
            os.write(photo.getBytes());
        }
        ObjectMapper objectMapper = new ObjectMapper();
        HistoricalItemDTO dto = objectMapper.readValue(data, HistoricalItemDTO.class);
        User currentUser = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        List<String> roles = getRoleName(currentUser.getRoles());
        if (roles.contains("MODERATOR")) {
            List<HistoricalItem> list = historicalItemService.getAllHistoricalItemsByName(dto.getName());
            if (list.size() == 0) {
                HistoricalItem toUpload = new HistoricalItem();
                BeanUtils.copyProperties(dto, toUpload);
                toUpload.setPhoto(imagePath.resolve(photo.getOriginalFilename()).toString());
                Period period = periodService.getPeriodByPeriodName(dto.getPeriodName());
                toUpload.setPeriod(period);
                toUpload.setUser(currentUser);
                historicalItemService.saveHistoricalItem(toUpload);
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("OK", "Uploaded Successfully!", toUpload)
                );
            } else {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new ResponseObject("FAILED", "HistoricalItem has already exist!", null)
                );
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ResponseObject("FAILED", "Your role can be accessible this feature!", null)
            );
        }
    }
    @PutMapping(value = "/historicalItem/edit/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponseObject> editAHistoricalItem(@PathVariable("id") int id,
                                                         @RequestParam String data,
                                                         @RequestParam("image") MultipartFile photo) throws IOException {
        User currentUser = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        List<String> roles = getRoleName(currentUser.getRoles());
        if (roles.contains("MODERATOR")) {
            ObjectMapper objectMapper = new ObjectMapper();
            HistoricalItemDTO dto = objectMapper.readValue(data, HistoricalItemDTO.class);
            HistoricalItem toUpdate = historicalItemService.findById(id).get();
            if(toUpdate == null){
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new ResponseObject("FAILED", "The Item is not existed!", null)
                );
            }
            //xử lí ảnh
            Path staticPath = Paths.get("D:\\SuVietProject\\Project_SWP391_SuViet_G7\\SuViet\\src\\main\\resources");
            Path imagePath = Paths.get("historicalItems");
            Path oldFile = CURRENT_FOLDER.resolve(staticPath).resolve(toUpdate.getPhoto());
            Path updateFile = CURRENT_FOLDER.resolve(staticPath)
                    .resolve(imagePath).resolve(photo.getOriginalFilename());
            Files.copy(photo.getInputStream(), updateFile, StandardCopyOption.REPLACE_EXISTING);
            Files.deleteIfExists(oldFile);
            //Update
            Period period = periodService.getPeriodByPeriodName(dto.getPeriodName());
            toUpdate.setPeriod(period);
            toUpdate.setType(dto.getType());
            if (dto.hasSpecialCharacters(dto.getName()) != true) {
                toUpdate.setName(dto.getName());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new ResponseObject("FAILED", "The name is invalid!", null)
                );
            }
            toUpdate.setNation(dto.getNation());
            toUpdate.setDescription(dto.getDescription());
            toUpdate.setPhoto(imagePath.resolve(photo.getOriginalFilename()).toString());
            historicalItemService.saveHistoricalItem(toUpdate);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "The HistoricalItem updated successfully", toUpdate));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ResponseObject("FAILED", "Your role can be accessible this feature!", null)
            );
        }
    }
}
