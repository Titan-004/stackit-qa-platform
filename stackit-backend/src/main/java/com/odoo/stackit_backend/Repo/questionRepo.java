package com.odoo.stackit_backend.Repo;

import com.odoo.stackit_backend.Entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface questionRepo extends JpaRepository<Question, Long> {
}
