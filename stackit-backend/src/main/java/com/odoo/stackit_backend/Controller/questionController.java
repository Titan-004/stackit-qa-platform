package com.odoo.stackit_backend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class questionController {

    @GetMapping("/")
    public String hello(){
        return "hey there ! ready for stackit";
    }

}
