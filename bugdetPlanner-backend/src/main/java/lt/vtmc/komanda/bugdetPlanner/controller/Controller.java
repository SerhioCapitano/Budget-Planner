package lt.vtmc.komanda.bugdetPlanner.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class Controller {

	@GetMapping
	public String hello() {
		return "hello";
	}
}
