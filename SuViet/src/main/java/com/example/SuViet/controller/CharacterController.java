package com.example.SuViet.controller;

import com.example.SuViet.model.*;
import com.example.SuViet.model.Character;
import com.example.SuViet.service.impl.CharacterServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api")
public class CharacterController {
    private final CharacterServiceImpl service;

    public CharacterController(CharacterServiceImpl service) {
        this.service = service;
    }
    @GetMapping("/characters")
    public ResponseEntity<ResponseObject> getAllCharacters(){
        List<Character> characterList = service.getAllCharacters();
        return ResponseEntity.status(HttpStatus.OK).body(
            new ResponseObject("OK", "Query successfully!!", characterList)
        );
    }

    @GetMapping("/characters/{offset}")
    public ResponseEntity<ResponsePaginationObject> getAllVideos(@PathVariable int offset) {
        int count = 0;
        List<Character> characterList = service.getAllCharacters();
        for (int i = 0; i < characterList.size(); i++) {
            count++;
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponsePaginationObject("OK", "Query successfully",  offset, 6, count,
                        Math.ceil(count / 6.0), service.getCharactersWithPagination(offset, 6))
        );
    }

    @GetMapping("/characters/search/{keyword}/{offset}")
    @ResponseBody
    public ResponseEntity<ResponsePaginationObject> searchCharacterByName(@RequestParam String keyword, @PathVariable int offset){
        List<Character> characterList = service.findCharactersByName(keyword);
        int count = 0;
        for(int i = 0; i < characterList.size(); i++){
            count++;
        }
        if(keyword.trim().isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponsePaginationObject()
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponsePaginationObject("OK", "Query successfully",offset, 6, count,
                        Math.ceil(count / 6.0), service.searchCharactersByNameWithPagination(keyword, offset, 6))

        );
    }

    @GetMapping("/thoi_ky/{keyword}")
    public  ResponseEntity<ResponseObject> filterCharactersByPeriod(@PathVariable("keyword") String keyword){
           List<ICharacter> list = service.filterByPeriod(keyword);
           return ResponseEntity.status(HttpStatus.OK).body(
                   new ResponseObject("OK", "Query Successfully", list)
           );
    }
}