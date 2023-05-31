package com.example.SuViet.repository;

import com.example.SuViet.model.Character;
import com.example.SuViet.model.ICharacter;
import com.example.SuViet.model.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CharacterRepository extends JpaRepository<Character, Integer> {
   public Page<Character> findAllByEnabled(boolean enabled, PageRequest pageRequest);
    //@Query("SELECT u FROM Character u WHERE u.characterName LIKE %?1%")
    //public List<Character> search(String keyword);
    @Query(value = "select u.CharacterID, u.CharacterName, u.Story, u.Estate, u.Enabled, u.PeriodID from tblCharacters u inner join tblPeriods v\n" +
            "on u.PeriodID = v.PeriodID \n" +
            "WHERE v.PeriodName LIKE %:keyword%", nativeQuery = true)
    public List<ICharacter> filterByPeriod(@Param("keyword") String keyword);

    public List<Character> findAllByCharacterNameContainingAndEnabled(@Param("title") String title, boolean enabled);
    public Page<Character> findAllByCharacterNameContainingAndEnabled(@Param("title") String title, boolean enabled, PageRequest pageRequest);
}
