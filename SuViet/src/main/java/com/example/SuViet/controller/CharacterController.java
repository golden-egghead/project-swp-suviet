package com.example.SuViet.controller;

import com.example.SuViet.dto.CharacterDTO;
import com.example.SuViet.model.Character;
import com.example.SuViet.repository.CharacterRepository;
import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.response.ResponsePaginationObject;
import com.example.SuViet.service.CharacterService;
import com.example.SuViet.service.impl.CharacterServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping(path = "api")
@CrossOrigin(origins = "http://localhost:3000")
public class CharacterController {
    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));
    private final CharacterService service;
    private final CharacterRepository repository;
    public CharacterController(CharacterServiceImpl service, CharacterRepository repository) {
        this.service = service;
        this.repository = repository;
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

    //MODERATOR FUNCTION - Create A new character
    @PostMapping("/character/create")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponseObject> createANewCharacter(@RequestBody CharacterDTO dto,
                                                              @RequestParam("image") MultipartFile image) throws IllegalAccessException, IOException {

        if(dto.hasNullVariable() == true){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
                    new ResponseObject("OK", "Some information is missing!", null)
            );
        }else{
            Character newCharacter = new Character();
            newCharacter.setPeriodID(dto.getPeriodID());
            newCharacter.setCharacterName(dto.getCharacterName());
            newCharacter.setStory(dto.getStory());
            newCharacter.setEstate(dto.getEstate());
            newCharacter.setEnabled(dto.isEnabled());
            newCharacter.setDescription(dto.getDescription());

            Path staticPath = Paths.get("D:\\SuVietProject\\Project_SWP391_SuViet_G7\\SuViet\\src\\main\\resources");
            Path imagePath = Paths.get("characters");
            if(!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
                Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
            }
            Path file = CURRENT_FOLDER.resolve(staticPath)
                    .resolve(imagePath).resolve(image.getOriginalFilename());
            try (OutputStream os = Files.newOutputStream(file)) {
                os.write(image.getBytes());
            }

            newCharacter.setImage(imagePath.resolve(image.getOriginalFilename()).toString());
            repository.save(newCharacter);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Create Successfully!", newCharacter)
            );
        }
    }
}