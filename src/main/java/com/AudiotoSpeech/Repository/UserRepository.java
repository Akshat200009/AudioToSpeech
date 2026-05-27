package com.AudiotoSpeech.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AudiotoSpeech.Entities.User;


public interface UserRepository extends JpaRepository<User, Long>{
	User findByEmail(String user);

}
