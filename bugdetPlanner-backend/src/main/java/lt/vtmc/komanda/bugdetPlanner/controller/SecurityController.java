package lt.vtmc.komanda.bugdetPlanner.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import lt.vtmc.komanda.bugdetPlanner.model.User;
import lt.vtmc.komanda.bugdetPlanner.repository.UserRepository;

@RestController("/api/v1/")
public class SecurityController {
	
	@Autowired
	UserRepository repo;
	
	@GetMapping("loggedUsername")
	@ApiOperation(value = "Get username of logged in user")
	public String getLoggedInUserName() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (!(authentication instanceof AnonymousAuthenticationToken)) {
			String currentUserName = authentication.getName();
			return currentUserName;
		}

		return "not logged";
	}
	
//	@GetMapping("loggedUserRole")
//	@ApiOperation(value = "Get role of logged in user")
//	public String getLoggedInUserRole() {
//		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//		if (!(authentication instanceof AnonymousAuthenticationToken)) {
//			String loggedInUsername = authentication.getName();
//			String loggedInUserRole = repo.findByUsername(loggedInUsername).getRole().getName().name();
//
//			return loggedInUserRole;
//		}
//
//		return "not logged";
//	}
//	
	
}

