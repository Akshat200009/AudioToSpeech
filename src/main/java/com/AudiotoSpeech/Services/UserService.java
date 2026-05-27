package com.AudiotoSpeech.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AudiotoSpeech.Entities.User;
import com.AudiotoSpeech.Repository.UserRepository;
import com.AudiotoSpeech.Security.JwtUtil;

@Service
public class UserService {

	@Autowired
	private UserRepository repo;
	
	@Autowired
	private JwtUtil jwtUtil;

	public User saveUser(User user) {
		return repo.save(user);
	}

	public String loginUser(String Email, String Password) {
		
		User user = repo.findByEmail(Email);
		
		if (user == null) {
			
			return "User Not Found";
			
		} else if (user.getEmail().equals(Email) && user.getPassword().equals(Password)){
			
			return jwtUtil.generateToken(Email);
			
		} else
			
			return "Invalid Credentials";
		
	}
}
