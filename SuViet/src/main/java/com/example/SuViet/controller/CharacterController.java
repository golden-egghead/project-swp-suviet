package com.example.SuViet.controller;

import com.example.SuViet.dto.CharacterDTO;
import com.example.SuViet.model.Character;
import com.example.SuViet.model.Period;
import com.example.SuViet.model.Role;
import com.example.SuViet.model.User;
import com.example.SuViet.repository.CharacterRepository;
import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.response.ResponsePaginationObject;
import com.example.SuViet.service.CharacterService;
import com.example.SuViet.service.PeriodService;
import com.example.SuViet.service.UserService;
import com.example.SuViet.service.impl.CharacterServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.BeanUtils;
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
@RequestMapping(path = "api")
@CrossOrigin(origins = "http://localhost:3000")
public class CharacterController {
    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));
    private final CharacterService characterService;
    private final CharacterRepository repository;
    private final UserService userService;
    private final PeriodService periodService;

    public CharacterController(CharacterServiceImpl characterService, CharacterRepository repository, UserService userService, PeriodService periodService) {
        this.characterService = characterService;
        this.repository = repository;
        this.userService = userService;
        this.periodService = periodService;
    }

    @GetMapping("/characters/{offset}")
    public ResponseEntity<ResponsePaginationObject> getAllCharacters(@PathVariable int offset) {
        int count = 0;
        List<Character> characterList = characterService.getAllCharacters();
        for (int i = 0; i < characterList.size(); i++) {
            count++;
        }
        if (characterList.size() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponsePaginationObject()
            );
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query successfully", offset, 6, count,
                            Math.ceil(count / 6.0), characterService.getCharactersWithPagination(offset, 6))
            );
        }
    }

    @GetMapping("/characters/search/{offset}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponsePaginationObject> searchCharacterByName(@PathVariable int offset, @RequestParam("title") String keyword) {
        List<Character> characterList = characterService.searchCharactersByName(keyword);
        List<Character> allCharactersList = characterService.getAllCharacters();
        int count = 0, countAll = 0;

        for (int i = 0; i < characterList.size(); i++) {
            count++;
            countAll++;
        }
        if (keyword.trim().isEmpty() || keyword.trim() == "") {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, countAll,
                            Math.ceil(countAll / 6.0), characterService.getCharactersWithPagination(offset, 6))
            );
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query Successfully!", offset, 6, count,
                            Math.ceil(count / 6.0), characterService.searchCharactersByNameWithPagination(keyword, offset, 6))
            );
        }
    }

    @GetMapping("/charactersSort/{offset}")
    public ResponseEntity<ResponsePaginationObject> getCharactersWithPaginationAndSort(@PathVariable int offset) {
        Page<Character> charactersWithPagination = characterService.getCharacterWithSortAndPaging(offset, 6, "characterName");
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
    private static List<String> getRoleName(Collection<Role> roles) {
        if (roles.isEmpty()) {
            return null;
        }

        return roles.stream().map(Role::getRoleName).collect(Collectors.toList());
    }

    @PostMapping(value = "/character/upload")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponseObject> uploadANewCharacter(@RequestBody CharacterDTO dto) throws IOException {
        User currentUser = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        List<String> roles = getRoleName(currentUser.getRoles());
        if(roles.contains("MEMBER") || roles.contains("ADMIN")){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    new ResponseObject("FAILED", "Unforbidden", null)
            );
        }
        List<Character> characters = characterService.searchCharactersByName(dto.getCharacterName());
        if(characters.size() > 0){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "Character has already exist!", null)
            );
        }else{
            Character newCharacter = new Character();
            BeanUtils.copyProperties(dto, newCharacter);
            newCharacter.setUser(currentUser);
            Period period = periodService.getPeriodByPeriodName(dto.getPeriodName());
            if(period == null){
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new ResponseObject("FAILED", "Cannot find out period", null)
                );
            }
            newCharacter.setPeriod(period);
            newCharacter.setEnabled(true);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Uploaded Successfully!", characterService.saveCharacter(newCharacter))
            );
        }
    }

    @PutMapping(value = "/character/edit/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponseObject> editACharacter(@PathVariable("id") int id,
                                                         @RequestBody Character info) throws IOException {
        User currentUser = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        Character character = characterService.getCharacterById(id).get();
        List<String> roles = getRoleName(currentUser.getRoles());
        if(roles.contains("MEMBER") || roles.contains("ADMIN")){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    new ResponseObject("FAILED", "Unforbidden", null)
            );
        }
        if (character == null) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "There is no character with id " + id, null)
            );
        }
        if (character.getUser() == null) {
            character.setUser(currentUser);
        } else {
            if (currentUser != character.getUser()) {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new ResponseObject("FAILED", "You cannot update this video!", null)
                );
            }
        }
        character.setCharacterName(info.getCharacterName());
        character.setEnabled(true);
        character.setImage(info.getImage());
        character.setDescription(info.getDescription());
        character.setPeriod(info.getPeriod());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "The Character updated successfully", characterService.saveCharacter(character))
        );
    }


    @DeleteMapping(value = "/character/delete/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponseObject> deleteACharacter(@PathVariable("id") int id) {
        User currentUser = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        List<String> roles = getRoleName(currentUser.getRoles());
        if (roles.contains("MODERATOR")) {
            Character toDelete = characterService.getCharacterById(id).get();
            toDelete.setEnabled(false);
            characterService.saveCharacter(toDelete);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "The Character deleted successfully", toDelete));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ResponseObject("FAILED", "Your role can be accessible this feature!", null)
            );
        }
    }

}