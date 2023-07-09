package com.example.SuViet.dto;

import com.example.SuViet.model.HistoricalItem;
import com.example.SuViet.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class HistoricalItemDTO {
    private int historicalItemID;
    private String type;
    private String name;
    private String nation;
    private String description;
    private boolean enabled;
    private String periodName;
    private String photo;
    private User user;
    public static HistoricalItemDTO convertToDTO(HistoricalItem historicalItem){
        HistoricalItemDTO historicalItemDTO = new HistoricalItemDTO();
        historicalItemDTO.setHistoricalItemID(historicalItem.getHistoricalItemID());
        historicalItemDTO.setName(historicalItem.getName());
        historicalItemDTO.setEnabled(historicalItem.isEnabled());
        historicalItemDTO.setNation(historicalItem.getNation());
        historicalItemDTO.setType(historicalItem.getType());
        historicalItemDTO.setDescription(historicalItem.getDescription());
        historicalItemDTO.setPeriodName(historicalItem.getPeriod().getPeriodName());
        historicalItemDTO.setUser(historicalItem.getUser());
        historicalItemDTO.setPhoto(historicalItem.getPhoto());
        return historicalItemDTO;
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
