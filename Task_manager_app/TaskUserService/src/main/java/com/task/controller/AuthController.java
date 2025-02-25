package com.task.controller;

import org.apache.catalina.authenticator.SpnegoAuthenticator.AuthenticateAction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

import com.task.config.JwtProvider;
import com.task.modal.User;
import com.task.repository.UserRepository;
import com.task.request.LoginRequest;
import com.task.response.AuthResponse;
import com.task.service.CustomUserServiceImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private CustomUserServiceImpl customUserDetails;
	
	
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user)
	throws Exception{
		String email = user.getEmail();
		String password = user.getPassword();
		String fullName  = user.getFullName();
		String role = user.getRole();
		
		User isEmailExist = userRepository.findByEmail(email);
		
		if(isEmailExist!=null) {
			throw new Exception("Email is already used with another account");
		}
		
		User createdUser = new User();
		createdUser.setEmail(email);
		createdUser.setFullName(fullName);
		createdUser.setRole(role);
		createdUser.setPassword(passwordEncoder.encode(password));
		
		User savedUser = userRepository.save(createdUser);
		
		Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token = JwtProvider.generateToken(authentication);
		
		AuthResponse authResponse = new AuthResponse();
		
		authResponse.setJwt(token);
		authResponse.setMessage("register success");
		authResponse.setStatus(true);
		
		
		return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.OK) ;
		
		
	}
	
	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest) throws Exception{
		String username= loginRequest.getEmail();
		String password = loginRequest.getPassword();
		
		System.out.println(username+"--------" + password);
		
		Authentication authentication = authenticate(username,password);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token = JwtProvider.generateToken(authentication);
		AuthResponse  authResponse = new AuthResponse();
		
		authResponse.setMessage("Login success");
		authResponse.setJwt(token);
		authResponse.setStatus(true);
		
		return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.OK);
		
		
		
		
	}

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = customUserDetails.loadUserByUsername(username);
		
		System.out.println("SignIn Userdetails "+ userDetails);
		
		if(userDetails==null) {
			System.out.println("signIn user details - null  "+ userDetails);
			throw new BadCredentialsException("Invalid username or password");
		}
		
		if(!passwordEncoder.matches(password, userDetails.getPassword())) {
			System.out.println("sign in user details - password not match " + userDetails);
			throw new BadCredentialsException("Invalid username or password");

		}
		return new UsernamePasswordAuthenticationToken( userDetails,null,userDetails.getAuthorities());
	}
	
	
	
	

}
