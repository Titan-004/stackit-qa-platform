package com.odoo.stackit_backend.Controller;

import com.odoo.stackit_backend.Entities.Question;
import com.odoo.stackit_backend.Entities.dto.QuestionDTO;
import com.odoo.stackit_backend.service.questionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class questionController {

    @Autowired
    private questionService qs;

    public questionController(questionService qs) {
        this.qs = qs;
    }

    @GetMapping("/")
    public String hello() {
        return "hey there ! ready for stackit";
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(QuestionDTO ques){
        qs.create(ques);
        return ResponseEntity.ok("question created");
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Question>> getAll(){
        return ResponseEntity.ok(qs.getAllQuestions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(qs.getQuestionById(id));
    }

}
