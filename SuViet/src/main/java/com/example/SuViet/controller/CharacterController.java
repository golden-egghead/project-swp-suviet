package com.example.SuViet.controller;

import com.example.SuViet.model.Character;
import com.example.SuViet.model.ResponseObject;
import com.example.SuViet.service.impl.CharacterServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/characters")
public class CharacterController {
    private final CharacterServiceImpl service;

    public CharacterController(CharacterServiceImpl service) {
        this.service = service;
    }
    @GetMapping("")
    public ResponseEntity<ResponseObject> getAllCharacters(){
        List<Character> characterList = service.getAllCharacters();
        return ResponseEntity.status(HttpStatus.OK).body(
            new ResponseObject("OK", "Query successfully!!", characterList)
        );
    }
}
