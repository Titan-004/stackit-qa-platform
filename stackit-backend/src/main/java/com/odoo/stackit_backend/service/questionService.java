package com.odoo.stackit_backend.service;

import com.odoo.stackit_backend.Entities.Question;
import com.odoo.stackit_backend.Entities.dto.QuestionDTO;
import com.odoo.stackit_backend.Repo.questionRepo;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Builder
public class questionService {
    @Autowired
    private questionRepo questionRepository;


    public Question create(QuestionDTO ques) {
        Question question = Question.builder()
                .title(ques.getTitle())
                .description(ques.getDescription())
                .tags(ques.getTags())
                .createdAt(LocalDateTime.now())
                .build();

        return questionRepository.save(question);
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id).orElseThrow(() -> new RuntimeException("Question not found"));
    }

}
