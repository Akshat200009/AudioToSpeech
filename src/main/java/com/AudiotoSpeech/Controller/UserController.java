package com.AudiotoSpeech.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.AudiotoSpeech.Entities.User;
import com.AudiotoSpeech.Services.UserService;

@RestController
public class UserController {

	@Autowired
	private UserService service;
	
	@PostMapping("/register")
	public User registerUser(@RequestBody User user)
	{
		return service.saveUser(user);
	}
	@PostMapping("/login")
	public String loginUser(@RequestBody User user)
	{
	 return service.loginUser(user.getEmail(), user.getPassword());
	}
}
