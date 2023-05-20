package com.cardApi.flashCardBackendAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class FlashCardBackendApiApplication {

	public static void main(String[] args) {

		SpringApplication.run(FlashCardBackendApiApplication.class, args);
	}

	// http://localhost:3000 to 8080
	// cross origin requests (cors)
	// allow all requests only from http://localhost:3000

	@Configuration
	@EnableWebMvc
	@EnableScheduling
	public class CorsConfig implements WebMvcConfigurer {

		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/**")
					.allowedOrigins("http://localhost:3000", "http://quickstudy.s3-website-us-east-1.amazonaws.com")
//					.allowedOrigins("http://quickstudy.s3-website-us-east-1.amazonaws.com")
					.allowedMethods("*")
					.allowedHeaders("*")
					.allowCredentials(true)
					.maxAge(3600);
		}
	}
}

