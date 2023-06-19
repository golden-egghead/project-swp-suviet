package com.example.SuViet;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class SuVietApplicationTests {

	@Test
	void test () {
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

		String password = "nguyentuanvu123";

		String encodedPassword = passwordEncoder.encode(password);

		System.out.println("Encoded Password: " + encodedPassword);
	}
}
