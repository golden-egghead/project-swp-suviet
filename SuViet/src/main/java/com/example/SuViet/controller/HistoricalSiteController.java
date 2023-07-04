package com.example.SuViet.controller;

import com.example.SuViet.model.HistoricalSite;
import com.example.SuViet.model.Role;
import com.example.SuViet.model.User;
import com.example.SuViet.repository.PeriodRepository;
import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.response.ResponsePaginationObject;
import com.example.SuViet.service.HistoricalSiteService;
import com.example.SuViet.service.ImageStorageService;
import com.example.SuViet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/historicalSites")
@CrossOrigin(origins = "http://localhost:3000")
public class HistoricalSiteController {
    private final HistoricalSiteService historicalSiteService;

    private final UserService userService;

    private final ImageStorageService imageStorageService;

    @Autowired
    PeriodRepository periodRepository;

    public HistoricalSiteController(HistoricalSiteService historicalSiteService, UserService userService, ImageStorageService imageStorageService) {
        this.historicalSiteService = historicalSiteService;
        this.userService = userService;
        this.imageStorageService = imageStorageService;
    }

    @GetMapping("/{offset}")
    public ResponseEntity<ResponsePaginationObject> getAllHistoricalSite(@PathVariable int offset) {
        if (offset <= 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponsePaginationObject("FAILED", "We do not have page " + offset, offset, 6,
                            0, 0, null)
            );
        }
        int count = 0;
        List<HistoricalSite> historicalSites = historicalSiteService.getAllHistoricalSites();
        for (int i = 0; i < historicalSites.size(); i++) {
            count++;
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponsePaginationObject("OK", "Query successfully", offset, 6, count,
                        Math.ceil(count / 6.0), historicalSiteService.getHistoricalSitesWithPagination(offset, 6))
        );
    }

    @GetMapping("/search/{offset}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponsePaginationObject> searchVideosById(@RequestParam(value = "title") String title, @PathVariable int offset) {
        if (offset <= 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponsePaginationObject("FAILED", "We do not have page " + offset, offset, 6,
                            0, 0, null)
            );
        }
        int count = 0;
        int countAll = 0;
        List<HistoricalSite> historicalSiteList = historicalSiteService.getAllHistoricalSitesByName(title);
        List<HistoricalSite> allHistoricalSiteList = historicalSiteService.getAllHistoricalSites();
        for (int i = 0; i < historicalSiteList.size(); i++) {
            count++;
        }

        for (int i = 0; i < allHistoricalSiteList.size(); i++) {
            countAll++;
        }
        if (title.trim().isEmpty() || title.trim() == "") {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query successfully", offset, 6, countAll,
                            Math.ceil(countAll / 6.0), historicalSiteService.getHistoricalSitesWithPagination(offset, 6))
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponsePaginationObject("OK", "Query successfully", offset, 6, count,
                        Math.ceil(count / 6.0), historicalSiteService.getAllHistoricalSitesByName(title, offset, 6))
        );
    }

    @GetMapping("/moderator-historicalSites")
    public ResponseEntity<ResponseObject> getAllOwnHistoricalSites() {
        User user = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Query successfully", historicalSiteService.getAllOwnHistoricalSites(user))
        );
    }

    @PostMapping("/upload-historicalSite")
    public ResponseEntity<ResponseObject> uploadAHistoricalSite(@RequestParam("location") String location,
                                                                @RequestParam("description") String description,
                                                                @RequestParam("historicalSiteName") String historicalSiteName,
                                                                @RequestParam("periodName") String periodName,
                                                                @RequestParam("photo") MultipartFile file) {
        List<HistoricalSite> historicalSites = historicalSiteService.findAllByNameAndEnabled(historicalSiteName, true);
        HistoricalSite historicalSite = new HistoricalSite();
        User user = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        List<Role> roles = (List<Role>) user.getRoles();
        for (Role r : roles) {
            if (r.getRoleName().equals("MEMBER") || r.getRoleName().equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        new ResponseObject("FAILED", "Unforbidden", null)
                );
            }
        }
        int count = 0;
        for (HistoricalSite hs : historicalSites) {
            if (hs.isEnabled()) {
                count = 1;
            }
        }
        if (historicalSites.size() > 0 && count == 1) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "Historical Site has already exist!", null)
            );
        } else {
            historicalSite.setHistoricalSiteName(historicalSiteName);
            historicalSite.setDescription(description);
            historicalSite.setLocation(location);
            historicalSite.setCreatedDate(LocalDateTime.now());
            historicalSite.setUser(user);
            historicalSite.setEnabled(true);
            historicalSite.setPhoto("http://localhost:8080/api/historicalSites/files/" + imageStorageService.storeFile(file));
            historicalSite.setDetail(description);
            historicalSite.setPeriod(periodRepository.findByPeriodName(periodName));
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Saved...", historicalSiteService.saveHistoricalSite(historicalSite))
            );
        }
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<byte[]> readDetailFile(@PathVariable String filename) {
        try {
            byte[] bytes = imageStorageService.readFileContent(filename);
            return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.IMAGE_JPEG)
                    .body(bytes);
        } catch (Exception e) {
            return ResponseEntity.noContent().build();
        }
    }

    @PutMapping("/update-historicalSite/{historicalSiteID}")
    public ResponseEntity<ResponseObject> updateHistoricalSite(@PathVariable int historicalSiteID,
                                                               @RequestParam("location") String location,
                                                               @RequestParam("description") String description,
                                                               @RequestParam("historicalSiteName") String historicalSiteName,
                                                               @RequestParam("periodName") String periodName,
                                                               @RequestParam("photo") MultipartFile file) {

        HistoricalSite historicalSite = historicalSiteService.getHistoricalSiteByID(historicalSiteID).get();
        User user = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        List<Role> roles = (List<Role>) user.getRoles();
        for (Role r : roles) {
            if (r.getRoleName().equals("MEMBER") || r.getRoleName().equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        new ResponseObject("FAILED", "Unforbidden", null)
                );
            }
        }
        if (historicalSite == null) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "There is no video with id " + historicalSiteID, null)
            );
        }
        if (historicalSite.getUser() == null) {
            historicalSite.setUser(user);
        } else {
            if (user != historicalSite.getUser()) {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new ResponseObject("FAILED", "You cannot update this video!", null)
                );
            }
        }
        historicalSite.setHistoricalSiteName(historicalSiteName);
        historicalSite.setDescription(description);
        historicalSite.setLocation(location);
        historicalSite.setCreatedDate(LocalDateTime.now());
        historicalSite.setUser(user);
        historicalSite.setEnabled(true);
        historicalSite.setPhoto("http://localhost:8080/api/historicalSites/files/" + imageStorageService.storeFile(file));
        historicalSite.setDetail(description);
        historicalSite.setPeriod(periodRepository.findByPeriodName(periodName));
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Updated succesfully...", historicalSiteService.saveHistoricalSite(historicalSite))
        );
    }

    @DeleteMapping("/delete-historicalSite/{historicalSiteID}")
    public ResponseEntity<ResponseObject> deleteAVideo(@PathVariable int historicalSiteID) {
        boolean checkDelete = historicalSiteService.deleteAHistoricalSite(historicalSiteID);
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
                    new ResponseObject("OK", "Deleted successfully!",
                            historicalSiteService.saveHistoricalSite(historicalSiteService.getHistoricalSiteByID(historicalSiteID).get()))
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                new ResponseObject("FAILED", "Deleted fail!", null)
        );
    }
}
