package com.odoo.stackit_backend.Repo;

import com.odoo.stackit_backend.Entities.Question;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class questionSpecification {

    public static Specification<Question> filter(String tag, String search) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (tag != null && !tag.isEmpty()) {
                predicates.add(cb.isMember(tag, root.get("tags")));
            }

            if (search != null && !search.isEmpty()) {
                Predicate titleMatch = cb.like(cb.lower(root.get("title")), "%" + search.toLowerCase() + "%");
                Predicate descMatch = cb.like(cb.lower(root.get("description")), "%" + search.toLowerCase() + "%");
                predicates.add(cb.or(titleMatch, descMatch));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
