package com.example.SuViet.service;

import com.example.SuViet.model.Character;
import org.springframework.data.domain.Page;

import java.util.Collection;
import java.util.List;

public interface CharacterService {
     List<Character> getAllCharacters();
     List<Character> searchCharactersByName(String search);
     Page<Character> getCharactersWithPagination(int offset, int pageSize);
     Page<Character> searchCharactersByNameWithPagination(String title,int offset, int pageSize);

     List<Character> findCharactersWithSorting(String field);
     Page<Character> getCharacterWithSortAndPaging(int offset, int pageSize, String field);
    List<Character> getCharacterByPeriod(String periodName);
}
