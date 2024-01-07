package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;

@CrossOrigin
@RestController
@RequestMapping("/Users")
public class UserController {

	@Autowired
	UserRepository userRepository;

	@GetMapping("/all")
	public List<User> getAllBooks() {
		return userRepository.findAll();
	}

	@PostMapping("/save")
	public User addUser(@RequestBody User user) {
		return userRepository.save(user);
	}

	@GetMapping("findbyid/{id}")
	public User findbyidUser(@PathVariable int id) {
		return userRepository.findById(id);

	}

	@DeleteMapping("delete/{id}")
	public void deleteUser(@PathVariable int id) {
		User user = userRepository.findById(id);
		userRepository.delete(user);
	}

	@PutMapping("update/{id}")
	public String updateUser(@PathVariable int id, @RequestBody User updatedUser) {
		User user = userRepository.findById(id);
		user.setFirstName(updatedUser.getFirstName());
		user.setLastName(updatedUser.getLastName());
		user.setMembershipNumber(updatedUser.getMembershipNumber());
		user.setEmail(updatedUser.getEmail());
		user.setContactNumber(updatedUser.getContactNumber());
		userRepository.save(user);
		return "";
	}

}
