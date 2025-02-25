package com.task.service;

import java.util.List;

import com.task.modal.Submission;

public interface SubmissionService {
	
	Submission submitTask(Long taskId, String gitHubLink, Long userId, String jwt) throws Exception;
	
	Submission getTaskSubmissionById(Long submissionId ) throws Exception;
	
	List<Submission> getAllTaskSubmission();
	
	List<Submission> getAllTaskSubmissionsById(Long taskid);
	
	Submission acceptDeclineSubmission(Long id, String status) throws Exception;

}
