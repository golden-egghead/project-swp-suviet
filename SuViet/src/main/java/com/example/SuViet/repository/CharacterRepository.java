package com.example.SuViet.repository;

import com.example.SuViet.model.Character;
import com.example.SuViet.model.ICharacter;
import com.example.SuViet.model.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CharacterRepository extends JpaRepository<Character, Integer> {

   public Page<Character> findAllByEnabled(boolean enabled, PageRequest pageRequest);
   List<Character> findAllByEnabled(boolean enabled);
    @Query(value = "select u.CharacterID, u.CharacterName, u.Story, u.Estate, u.Enabled, u.PeriodID from tblCharacters u inner join tblPeriods v\n" +
            "on u.PeriodID = v.PeriodID \n" +
            "WHERE v.PeriodName LIKE %:keyword%", nativeQuery = true)
     List<ICharacter> filterByPeriod(@Param("keyword") String keyword);


     List<Character> findAllByCharacterNameContainingAndEnabled(@Param("title") String title, boolean enabled);
     Page<Character> findAllByCharacterNameContainingAndEnabled(@Param("title") String title, boolean enabled, PageRequest pageRequest);

}
