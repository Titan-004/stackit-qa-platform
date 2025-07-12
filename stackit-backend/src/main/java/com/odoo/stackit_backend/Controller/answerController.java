package com.odoo.stackit_backend.Controller;

import com.odoo.stackit_backend.Entities.Answers;
import com.odoo.stackit_backend.Entities.dto.AnswersDTO;
import com.odoo.stackit_backend.service.answerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions/{questionId}/answers")
public class answerController {

    @Autowired
    private answerService answerService;

    @GetMapping
    public ResponseEntity<List<Answers>> getAnswersByQuestion(@PathVariable Long questionId) {
        List<Answers> answers = answerService.getAnswersByQuestionId(questionId);
        return ResponseEntity.ok(answers);
    }

    @PostMapping
    public ResponseEntity<Answers> createAnswer(@PathVariable Long questionId, @RequestBody AnswersDTO dto) {
        dto.setQuestionId(questionId); // ensure questionId is set from path
        Answers saved = answerService.createAnswer(dto);
        return ResponseEntity.ok(saved);
    }
}
