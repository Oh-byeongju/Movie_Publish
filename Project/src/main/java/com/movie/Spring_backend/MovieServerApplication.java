package com.movie.Spring_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
public class MovieServerApplication {
	public static void main(String[] args) throws InterruptedException {
		SpringApplication.run(MovieServerApplication.class, args);
		System.out.println("껄껄");

		while(true) {
			System.out.println("작동중");
			Thread.sleep(3000);
		}
	}

}
