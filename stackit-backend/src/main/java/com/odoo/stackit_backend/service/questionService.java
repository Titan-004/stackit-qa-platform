package com.odoo.stackit_backend.service;

import com.odoo.stackit_backend.Entities.Question;
import com.odoo.stackit_backend.Entities.dto.QuestionDTO;
import com.odoo.stackit_backend.Repo.questionRepo;
import com.odoo.stackit_backend.Repo.questionSpecification;
import lombok.Builder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Builder
public class questionService {
    private final questionRepo questionRepository;

    /* ---------- CREATE ---------- */
    public void create(QuestionDTO dto) {
        Question q = Question.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .tags(dto.getTags())
                .createdAt(LocalDateTime.now())
                .build();
        questionRepository.save(q);
    }

    /* ---------- READ ---------- */
    public List<Question> getAllQuestions() {
        return questionRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id).orElseThrow(() -> new RuntimeException("Question not found"));
    }

    /**
     * Filter, search, sort & paginate questions.
     */
    public Page<Question> getFilteredQuestions(String tag,
                                               String search,
                                               String sortField,
                                               int page,
                                               int size) {

        if (sortField == null || sortField.isBlank()) {
            sortField = "createdAt";
        }

        Pageable pageable = PageRequest.of(page, size,
                Sort.by(Sort.Direction.DESC, sortField));

        Specification<Question> spec = questionSpecification.filter(tag, search);

        return questionRepository.findAll(spec, pageable);
    }
}
