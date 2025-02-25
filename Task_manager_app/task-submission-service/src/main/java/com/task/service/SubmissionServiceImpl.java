package com.task.service;

import java.time.LocalDateTime;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task.modal.Submission;
import com.task.modal.TaskDto;
import com.task.repository.SubmissionRepository;
@Service
public class SubmissionServiceImpl implements SubmissionService {
	
	@Autowired
	private SubmissionRepository submissionRepository;
	
	@Autowired
	private TaskService taskService;

	@Override
	public Submission submitTask(Long taskId, String gitHubLink, Long userId,String jwt) throws Exception {
		TaskDto task = taskService.getTaskById(userId, jwt);
		if(task!=null) {
			Submission submission = new Submission();
			submission.setTaskId(taskId);
			submission.setUserId(userId);
			submission.setGitHubLink(gitHubLink);
			submission.setSubmissionTime(LocalDateTime.now());
			
			return submissionRepository.save(submission);
		}
		throw new Exception("Task not found with is : " + taskId);
		
	}

	@Override
	public Submission getTaskSubmissionById(Long submissionId) throws Exception {
		
		return submissionRepository.findById(submissionId).orElseThrow(()-> new Exception("Task Submission not found with id : " + submissionId));
	}

	@Override
	public List<Submission> getAllTaskSubmission() {
		return submissionRepository.findAll();
	}

	@Override
	public List<Submission> getAllTaskSubmissionsById(Long taskid) {
		
		return submissionRepository.findByTaskId(taskid);
	}

	@Override
	public Submission acceptDeclineSubmission(Long id, String status) throws Exception {
		Submission submission = getTaskSubmissionById(id);
		submission.setStatus(status);
		
		if(status.equals("ACCEPT")) {
			taskService.completeTask(submission.getTaskId());
		}
		
		return submissionRepository.save(submission);
	}

}
