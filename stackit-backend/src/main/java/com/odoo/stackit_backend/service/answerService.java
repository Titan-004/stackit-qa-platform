package com.odoo.stackit_backend.service;

import com.odoo.stackit_backend.Entities.Answers;
import com.odoo.stackit_backend.Entities.Question;
import com.odoo.stackit_backend.Entities.User;
import com.odoo.stackit_backend.Entities.dto.AnswersDTO;
import com.odoo.stackit_backend.Repo.answerRepo;
import com.odoo.stackit_backend.Repo.questionRepo;
//import com.odoo.stackit_backend.Repo.userRepo;  // if you have userRepo
import com.odoo.stackit_backend.Repo.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class answerService {

    @Autowired
    private answerRepo answerRepository;

    @Autowired
    private questionRepo questionRepository;

    @Autowired
    private userRepo userRepository;  // optional

    public List<Answers> getAnswersByQuestionId(Long questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        return answerRepository.findByQuestionOrderByCreatedAtDesc(question);
    }

    public Answers createAnswer(AnswersDTO dto) {
        Question question = questionRepository.findById(dto.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));

        User author = null;
        if (dto.getAuthorId() != null) {
            author = userRepository.findById(dto.getAuthorId())
                    .orElse(null);
        }

        Answers answer = Answers.builder()
                .question(question)
                .author(author)
                .content(dto.getContent())
                .createdAt(LocalDateTime.now())
                .build();

        return answerRepository.save(answer);
    }
}
