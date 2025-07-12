package com.odoo.stackit_backend.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@AllArgsConstructor
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String quesId;
    private String title;
    @Setter
    private String question;
    private String[] tags;
    private String answer;



    public Question() {
    }

    public Question(String question, String quesId, String title, String answer) {
        this.question = question;
        this.quesId = quesId;
        this.title = title;
        this.answer = answer;
    }


}
