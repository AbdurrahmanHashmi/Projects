package com.task.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.task.modal.User;
import java.util.List;


public interface UserRepository extends JpaRepository<User, Long> {
	//public  List<User> findfindByEmail(String email);
	public  User findByEmail(String email);

}
