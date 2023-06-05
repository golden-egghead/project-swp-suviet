package com.example.SuViet.service;

import com.example.SuViet.model.Character;
import com.example.SuViet.model.ICharacter;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CharacterService {
     List<Character> getAllCharacters();
     List<Character> searchCharactersByName(String search);
     Page<Character> getCharactersWithPagination(int offset, int pageSize);
     Page<Character> searchCharactersByNameWithPagination(String title,int offset, int pageSize);

     List<ICharacter> filterByPeriod(String search);

     List<Character> findCharactersWithSorting(String field);
     Page<Character> getCharacterWithSortAndPaging(int offset, int pageSize, String field);
}
