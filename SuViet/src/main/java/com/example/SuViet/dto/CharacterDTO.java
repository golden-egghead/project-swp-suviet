package com.example.SuViet.dto;

import com.example.SuViet.model.Character;
import com.example.SuViet.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;


@Getter
@Setter
@NoArgsConstructor
public class CharacterDTO {

    private int characterID;
    private String characterName;
    private String story;
    private String estate;
    private boolean enabled;
    private String image;
    private String description;

    private String periodName;

    public static CharacterDTO convertToDTO(Character character){
        CharacterDTO characterDTO = new CharacterDTO();
        characterDTO.setCharacterID(character.getCharacterID());
        characterDTO.setCharacterName(character.getCharacterName());
        characterDTO.setStory(character.getStory());
        characterDTO.setEstate(character.getEstate());
        characterDTO.setEnabled(character.isEnabled());
        characterDTO.setDescription(character.getDescription());
        characterDTO.setImage(character.getImage());
//"http://localhost:8080/characters/" +
        characterDTO.setPeriodName(character.getPeriod().getPeriodName());
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
