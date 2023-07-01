package com.example.SuViet.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.reflect.FieldUtils;
import java.lang.reflect.Field;
@Getter
@Setter
@NoArgsConstructor
public class CharacterDTO {
    int periodID;
    String characterName;
    String story;
    String estate;
    boolean enabled;
    String description;
    public boolean hasNullVariable() throws IllegalAccessException {
        Field[] fields = this.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            if (field.get(this) == null) {
                return true;
            }
        }
        return false;
    }
}
