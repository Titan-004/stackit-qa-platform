package com.odoo.stackit_backend.Repo;

import com.odoo.stackit_backend.Entities.Answers;
import com.odoo.stackit_backend.Entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface answerRepo extends JpaRepository<Answers, Long> {
    List<Answers> findByQuestionOrderByCreatedAtDesc(Question question);
}
