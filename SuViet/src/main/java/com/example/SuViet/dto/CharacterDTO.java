package com.example.SuViet.dto;

import com.example.SuViet.model.Character;
import com.example.SuViet.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
public class CharacterDTO {
    private String periodName;
    private int id;
    private String characterName;
    private String story;
    private String estate;
    private boolean enabled;
    private String description;
    private String image;
    private User user;



    public CharacterDTO convertToDTO(Character character){
        CharacterDTO characterDTO = new CharacterDTO();
        characterDTO.setId(character.getCharacterID());
        characterDTO.setCharacterName(character.getCharacterName());
        characterDTO.setStory(character.getStory());
        characterDTO.setEstate(character.getEstate());
        characterDTO.setEnabled(character.isEnabled());
        characterDTO.setDescription(character.getDescription());
        characterDTO.setImage(character.getImage());
        characterDTO.setUser(character.getUser());
        return characterDTO;
    }
    public boolean hasSpecialCharacters(String inputString) {
        String specialCharacters = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

        for (int i = 0; i < inputString.length(); i++) {
            char ch = inputString.charAt(i);
            if (specialCharacters.contains(String.valueOf(ch))) {
                return true;
            }
        }
        return false;
    }
}
