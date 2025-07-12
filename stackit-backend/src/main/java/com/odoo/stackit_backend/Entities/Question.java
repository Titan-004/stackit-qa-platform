package com.odoo.stackit_backend.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@Builder
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quesId;
    private String title;
    private String description ;
    private LocalDateTime createdAt;
    @ElementCollection
    private List<String> tags;
    private String answer;



    public Question() {
    }

    public Question(String decription, Long quesId, String title, String answer) {
        this.description = description;
        this.quesId = quesId;
        this.title = title;
        this.answer = answer;
    }


}
