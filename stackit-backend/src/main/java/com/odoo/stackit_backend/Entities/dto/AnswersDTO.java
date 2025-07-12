package com.odoo.stackit_backend.Entities.dto;

import jakarta.persistence.Entity;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnswersDTO {
    private Long questionId;  // ID of the question this answer belongs to
    private String content;
    private Long authorId; // optional for now, if you have User management
}
