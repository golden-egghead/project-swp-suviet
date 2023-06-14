package com.example.SuViet.controller;

import com.example.SuViet.model.*;
import com.example.SuViet.model.Character;
import com.example.SuViet.service.CharacterService;
import com.example.SuViet.service.impl.CharacterServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api")
@CrossOrigin(origins = "http://localhost:3000")
public class CharacterController {
    private final CharacterService service;

    public CharacterController(CharacterServiceImpl service) {
        this.service = service;
    }

    @GetMapping("/characters/{offset}")
    public ResponseEntity<ResponsePaginationObject> getAllCharacters(@PathVariable int offset) {
        int count = 0;
        List<Character> characterList = service.getAllCharacters();
        for (int i = 0; i < characterList.size(); i++) {
            count++;
        }
        if(characterList.size() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponsePaginationObject()
            );
        }else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query successfully", offset, 6, count,
                            Math.ceil(count / 6.0), service.getCharactersWithPagination(offset, 6))
            );
        }
    }

    @GetMapping("/characters/search/{offset}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponsePaginationObject> searchBookByName(@PathVariable int offset, @RequestParam("title") String keyword ){
        List<Character> characterList = service.searchCharactersByName(keyword);
        List<Character> allCharactersList = service.getAllCharacters();
        int count = 0, countAll = 0;

        for(int i = 0; i < characterList.size(); i++){
            count++;
            countAll++;
        }
        if(keyword.trim().isEmpty() || keyword.trim() == ""){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, countAll,
                            Math.ceil(countAll / 6.0), service.getCharactersWithPagination(offset, 6))
            );
        }else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, count,
                            Math.ceil(count / 6.0), service.searchCharactersByNameWithPagination(keyword, offset, 6))
            );
        }
    }

    @GetMapping("/thoi_ky/{keyword}")
    public ResponseEntity<ResponseObject> filterCharactersByPeriod(@PathVariable("keyword") String keyword) {
        List<ICharacter> list = service.filterByPeriod(keyword);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Query Successfully", list)
        );
    }

    @GetMapping("/charactersSort/{offset}")
    public ResponseEntity<ResponsePaginationObject> getCharactersWithPaginationAndSort(@PathVariable int offset) {
        Page<Character> charactersWithPagination = service.getCharacterWithSortAndPaging(offset, 6, "characterName");
        int listSize = charactersWithPagination.getSize();
        int count = 0;
        for (int i = 0; i < listSize; i++) {
            count++;
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponsePaginationObject("OK", "Query successfully", offset, 6, count,
                        Math.ceil(count / 6.0), charactersWithPagination)
        );
    }
}