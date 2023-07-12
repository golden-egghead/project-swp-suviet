package com.example.SuViet.service.impl;

import com.example.SuViet.dto.CharacterDTO;
import com.example.SuViet.model.Character;
import com.example.SuViet.repository.CharacterRepository;
import com.example.SuViet.service.CharacterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


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
    public Page<CharacterDTO> searchCharactersByNameWithPagination(String title, int offset, int pageSize) {
        Page<Character> characters = characterRepository.findAllByCharacterNameContainingAndEnabled(title, true, PageRequest.of(offset - 1, pageSize));
        return characters.map(character -> CharacterDTO.convertToDTO(character));
    }

    @Override
    public Optional<Character> getCharacterById(int id) {
        return characterRepository.findById(id);
    }

    @Override
    public Character saveCharacter(Character character) {
        return characterRepository.save(character);
    }


    @Override
    public Page<CharacterDTO> getCharactersWithPagination(int offset, int pageSize) {
        Page<Character> characters = characterRepository.findAllByEnabled(true, PageRequest.of(offset - 1, pageSize));
        return characters.map(character -> CharacterDTO.convertToDTO(character));
    }

    @Override
    public Page<CharacterDTO> getCharacterWithSortAndPaging(int offset, int pageSize, String field) {
        Page<Character> characters = characterRepository.findAllByEnabled(true,PageRequest.of(offset - 1, pageSize).withSort(Sort.by(field)));
        return characters.map(character -> CharacterDTO.convertToDTO(character));
    }

    @Override
    public List<Character> getCharacterByPeriod(String periodName) {
        return characterRepository.getByPeriodName(periodName);
    }

    @Override
    public boolean deleteACharacter(int characterID) {
        Character characterToDelete = characterRepository.findById(characterID).get();
        try {
            if (characterToDelete.isEnabled()) {
                characterToDelete.setEnabled(false);
            } else  {
                characterToDelete.setEnabled(true);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
