package com.task.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.task.modal.Task;
import com.task.modal.TaskStatus;
import com.task.modal.UserDto;

@RestController
public class HomeController {
	
	
	@GetMapping("/tasks")
	public ResponseEntity<String> getAssignedUsersTask()
			throws Exception {
		
		

		return new ResponseEntity<>("Welcome to task service", HttpStatus.OK);
	}
}
