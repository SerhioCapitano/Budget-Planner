package lt.vtmc.komanda.bugdetPlanner.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lt.vtmc.komanda.bugdetPlanner.exception.ResourceNotFoundException;
import lt.vtmc.komanda.bugdetPlanner.model.User;
import lt.vtmc.komanda.bugdetPlanner.repository.UserManagementRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("management/api/v1/users")
public class UserManagementController {

//	@Autowired
//	UserManagementRepository userRepo;
//
//	public UserController(UserManagementRepository userRepo) {
//		super();
//		this.userRepo = userRepo;
//	}
	
	private static final List<User> users = Arrays.asList(
			new User(1, "James", "james@bond.aaa", "bbb"),
			new User(2, "Maria", "maria@jones.aaa", "ccc")
			);
	
	@GetMapping("/{id}")
	public User getUser(@PathVariable("id") Long id) {
		return users.stream()
				.filter(u->id.equals(u.getId())).findFirst().orElseThrow(()->new IllegalStateException("Does not exist"));
	}
	
	@GetMapping
	public List<User> getAllUsers() {
		return users;
	}

//	@GetMapping
//	public List<User> getAllUsers() {
//		return userRepo.findAll();
//	}
//
//	@GetMapping("/{userName}")
//	public User getUserByUserName(@PathVariable("userName") String userName) {
//		if (!userRepo.existsByUserName(userName)) {
//			throw new ResourceNotFoundException();
//		} else {
//			return userRepo.findByUserName(userName);
//		}
//	}
//
//	@PostMapping
//	@ResponseStatus(HttpStatus.CREATED)
//	public User createUser(@RequestBody User userRequest) {
//		return userRepo.save(userRequest);
//	}
//	
//	@PutMapping("/{userName}")
//	public User updateUser(@PathVariable("userName") String userName, @RequestBody User userRequest) {
//		User user = userRepo.findByUserName(userName);
//		if(!userRepo.existsByUserName(userName)) {
//			throw new ResourceNotFoundException();
//		}
//		user.setEmail(userRequest.getEmail());
//		user.setPassword(userRequest.getPassword());
//		return userRepo.save(user);
//	}
//	
//	@DeleteMapping("/{userName}")
//	@ResponseStatus(HttpStatus.NO_CONTENT)
//	public void deleteUserByUserName(@PathVariable("userName") String userName) {
//		User user = userRepo.findByUserName(userName);
//		if(!userRepo.existsByUserName(userName)) {
//			throw new ResourceNotFoundException();
//		}else {
//			userRepo.delete(user);
//		}
//	}
}
