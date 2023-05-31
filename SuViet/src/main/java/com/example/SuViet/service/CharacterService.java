package com.example.SuViet.service;

import com.example.SuViet.model.Character;
import com.example.SuViet.model.ICharacter;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CharacterService {
     List<Character> getAllCharacters();
     List<Character> findCharactersByName(String search);
     Page<Character> searchCharactersByNameWithPagination(String title, int offset, int pageSize);
     Page<Character> getCharactersWithPagination(int offset, int pageSize);
     List<ICharacter> filterByPeriod(String search);

}
