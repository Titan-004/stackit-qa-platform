package com.odoo.stackit_backend.Controller;

import com.odoo.stackit_backend.Entities.Question;
import com.odoo.stackit_backend.Entities.dto.QuestionDTO;
import com.odoo.stackit_backend.service.questionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")

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
    public ResponseEntity<String> create(@RequestBody QuestionDTO ques){
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
    @GetMapping("/questions")
    public Page<Question> getQuestions(
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return qs.getFilteredQuestions(tag, search, sort, page, size);
    }


}
