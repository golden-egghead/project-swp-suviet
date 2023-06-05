package com.example.SuViet.service.impl;

import com.example.SuViet.model.Character;
import com.example.SuViet.model.ICharacter;
import com.example.SuViet.model.Video;
import com.example.SuViet.repository.CharacterRepository;
import com.example.SuViet.service.CharacterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CharacterServiceImpl implements CharacterService {
    @Autowired
    private CharacterRepository characterRepository;

    public CharacterServiceImpl(CharacterRepository characterRepository) {
        this.characterRepository = characterRepository;
    }
    @Override
    public List<Character> getAllCharacters() {
        return characterRepository.findAllByEnabled(true);
    }

    @Override
    public List<Character> searchCharactersByName(String searchValue) {
        return characterRepository.findAllByCharacterNameContainingAndEnabled(searchValue,true );
    }

    @Override
    public Page<Character> searchCharactersByNameWithPagination(String title, int offset, int pageSize) {
        return characterRepository.findAllByCharacterNameContainingAndEnabled(title, true, PageRequest.of(offset - 1, pageSize));
    }

    @Override
    public Page<Character> getCharactersWithPagination(int offset, int pageSize) {
        return characterRepository.findAllByEnabled(true, PageRequest.of(offset - 1, pageSize));
    }

    @Override
    public List<ICharacter> filterByPeriod(String keyword) {
        return characterRepository.filterByPeriod(keyword);
    }

    @Override
    public List<Character> findCharactersWithSorting(String field) {
        return characterRepository.findAll(Sort.by(Sort.Direction.ASC, field));
    }

    @Override
    public Page<Character> getCharacterWithSortAndPaging(int offset, int pageSize, String field) {
        Page<Character> characters = characterRepository.findAllByEnabled(true,PageRequest.of(offset - 1, pageSize).withSort(Sort.by(field)));
       return characters;
    }

}
