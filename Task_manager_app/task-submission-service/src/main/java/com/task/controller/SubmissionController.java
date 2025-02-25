package com.task.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.task.modal.Submission;
import com.task.modal.UserDto;
import com.task.service.SubmissionService;
import com.task.service.TaskService;
import com.task.service.UserService;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {
	
	
	@Autowired
	private SubmissionService submissionService;
	
	@Autowired
	private TaskService taskService;
	
	@Autowired 
	private UserService userService;
	
	
	@PostMapping("")
	public ResponseEntity<Submission> submitTask(@RequestParam Long task_id,
			@RequestParam String github_link,
			@RequestHeader ("Authorization") String jwt)
			throws Exception{
		UserDto user = userService.getUserProfile(jwt);
		Submission submission = submissionService.submitTask(task_id, github_link,user.getId() , jwt);
		return new ResponseEntity<Submission>(submission, HttpStatus.CREATED);
	}
	
	@GetMapping("/task/{id}")
	public ResponseEntity<Submission> getSubmissionById(
			@PathVariable Long id,
			@RequestHeader ("Authorization") String jwt)
			throws Exception{
		UserDto user = userService.getUserProfile(jwt);
		Submission submission = submissionService.getTaskSubmissionById(id);
		return new ResponseEntity<Submission>(submission, HttpStatus.CREATED);
	}
	
	
	@GetMapping("")
	public ResponseEntity<List<Submission>> getAllSubmissions(
			
			@RequestHeader ("Authorization") String jwt)
			throws Exception{
		UserDto user = userService.getUserProfile(jwt);
		List<Submission> submissions = submissionService.getAllTaskSubmission();
		return new ResponseEntity<List<Submission>>(submissions, HttpStatus.CREATED);
	}
	
	@GetMapping("/{taskId}")
	public ResponseEntity<List<Submission>> getAllSubmissionByTaskId(
			@PathVariable Long taskId,
			@RequestHeader ("Authorization") String jwt)
			throws Exception{
		UserDto user = userService.getUserProfile(jwt);
		List<Submission> submissions = submissionService.getAllTaskSubmissionsById(taskId);
		return new ResponseEntity<List<Submission>>(submissions, HttpStatus.CREATED);
	}
	
	
	@PutMapping("/{taskId}")
	public ResponseEntity<Submission> acceptOrDeclineSubmission(
			@PathVariable Long taskId,
			@RequestParam String status,
			@RequestHeader ("Authorization") String jwt)
			throws Exception{
		UserDto user = userService.getUserProfile(jwt);
		Submission submission = submissionService.acceptDeclineSubmission(taskId, status);
		return new ResponseEntity<Submission>(submission , HttpStatus.CREATED);
	}

}
