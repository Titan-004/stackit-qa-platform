package com.odoo.stackit_backend.Entities.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuestionDTO {
    private Long id;
    private String title;
    private String description;
    private List<String> tags;
}
