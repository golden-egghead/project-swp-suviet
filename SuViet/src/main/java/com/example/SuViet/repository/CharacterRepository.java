package com.example.SuViet.repository;

import com.example.SuViet.model.Character;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CharacterRepository extends JpaRepository<Character, Integer> {

   Page<Character> findAllByEnabled(boolean enabled, PageRequest pageRequest);
   List<Character> findAllByEnabled(boolean enabled);

   List<Character> findAllByCharacterNameContainingAndEnabled(@Param("title") String title, boolean enabled);
   Page<Character> findAllByCharacterNameContainingAndEnabled(@Param("title") String title, boolean enabled, PageRequest pageRequest);

   @Query("From Character where period.periodName = :periodName")
   List<Character> getByPeriodName(String periodName);


}
