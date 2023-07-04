package com.example.SuViet.service;

import com.example.SuViet.model.Character;
import org.springframework.data.domain.Page;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface CharacterService {
     List<Character> getAllCharacters();
     List<Character> searchCharactersByName(String search);
     Page<Character> getCharactersWithPagination(int offset, int pageSize);
     Page<Character> searchCharactersByNameWithPagination(String title,int offset, int pageSize);

     Optional<Character> getCharacterById(int id);
     Character saveCharacter(Character character);
     Page<Character> getCharacterWithSortAndPaging(int offset, int pageSize, String field);
     List<Character> getCharacterByPeriod(String periodName);
}
