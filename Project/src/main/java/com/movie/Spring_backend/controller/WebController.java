package com.movie.Spring_backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping(value =  {"", "/notice","/list", "/introduce", "/smallbus", "/limousine", "/bigbus", "/request", "/search", "/search/my"})
    public String handleError() {
        return "forward:/index.html";
    }
}