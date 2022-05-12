package lt.vtmc.komanda.bugdetPlanner.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
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

import lt.vtmc.komanda.bugdetPlanner.exception.ResourceExistsException;
import lt.vtmc.komanda.bugdetPlanner.exception.ResourceNotFoundException;
import lt.vtmc.komanda.bugdetPlanner.model.ERole;
import lt.vtmc.komanda.bugdetPlanner.model.Role;
import lt.vtmc.komanda.bugdetPlanner.model.User;
import lt.vtmc.komanda.bugdetPlanner.repository.RoleRepository;
import lt.vtmc.komanda.bugdetPlanner.repository.UserRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
	
	@Autowired
	UserRepository userRepo;
	RoleRepository roleRepository;
	PasswordEncoder encoder;

	public UserController(UserRepository userRepo, RoleRepository roleRepository, PasswordEncoder encoder) {
		super();
		this.userRepo = userRepo;
		this.roleRepository = roleRepository;
		this.encoder = encoder;
	}
	
	@Secured({ "ROLE_ADMIN" })
	@GetMapping
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	@Secured({ "ROLE_ADMIN"})
	@GetMapping("/{username}")
	public User getUserByName(@PathVariable("username") String username) {
		if(!userRepo.existsByUsername(username)) {
			throw new ResourceNotFoundException();
		}else {
		return userRepo.findByUsername(username);
		}
	}
	
	@Secured({ "ROLE_ADMIN" })
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public User createUser(@RequestBody User user) {
		  User newUser = new User();
			Set<Role> roles = new HashSet<>();
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
			newUser.setRoles(roles);
				newUser.setPassword(encoder.encode(user.getPassword()));
				newUser.setUsername(user.getUsername());
				newUser.setEmail(user.getEmail());
		if(userRepo.existsByUsername(user.getUsername())) {
			throw new ResourceExistsException();
		}	
		
			return userRepo.save(newUser);
	}
	

	@Secured({ "ROLE_ADMIN" })
	@PutMapping("/{username}")
	public User updateUser(@PathVariable("username") String username, @RequestBody User userDTO) {

		User user = userRepo.findByUsername(username);
		if(!userRepo.existsByUsername(username)) {
			throw new ResourceNotFoundException();
		}
			user.setUsername(userDTO.getUsername());
			user.setEmail(userDTO.getEmail());
			user.setPassword(userDTO.getPassword());
			return userRepo.save(user);
	}

	@Secured({ "ROLE_ADMIN" })
	@DeleteMapping("{username}")
	@Transactional
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteUser(@PathVariable("username") String username) {
		if(!userRepo.existsByUsername(username)) {
			throw new ResourceNotFoundException();
		}else {
		
		userRepo.deleteByUsername(username);
		}
	}
}
