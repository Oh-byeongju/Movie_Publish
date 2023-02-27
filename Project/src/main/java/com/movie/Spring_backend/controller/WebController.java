package com.movie.Spring_backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping(value =  {"", "/UserLogin","/UserJoin", "/Reserve", "/movie", "/moviedetail/:id", "/StoryChange"})
    public String handleError() {
        return "forward:/index.html";
    }
}