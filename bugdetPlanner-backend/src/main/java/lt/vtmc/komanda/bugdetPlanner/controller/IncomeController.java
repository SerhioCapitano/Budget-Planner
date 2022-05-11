package lt.vtmc.komanda.bugdetPlanner.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lt.vtmc.komanda.bugdetPlanner.exception.ResourceNotFoundException;
import lt.vtmc.komanda.bugdetPlanner.model.Income;
import lt.vtmc.komanda.bugdetPlanner.model.IncomeDTO;
import lt.vtmc.komanda.bugdetPlanner.model.User;
import lt.vtmc.komanda.bugdetPlanner.repository.IncomeRepository;
import lt.vtmc.komanda.bugdetPlanner.repository.UserRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/incomes")
public class IncomeController {

	@Autowired
	private IncomeRepository incomeRepository;
	private UserRepository userRepo;

	public IncomeController(IncomeRepository incomeRepository) {
		this.incomeRepository = incomeRepository;
	}

	// GET USER'S INCOMES IN LIST 

//	@Secured({"ROLE_USER" })
//	@GetMapping
//	public List<Income> getUserIncomes() {
//		
//		String username = SecurityContextHolder.getContext().getAuthentication().getName();
//		
//		return incomeRepository.findByUsername(username);
//	}

	// CREATE INCOME
	@Secured({"ROLE_USER" })
	@PostMapping
	public Income createIncome(@RequestBody IncomeDTO incomeDTO) {
		Income income = new Income();

		income.setAmount(incomeDTO.getAmount());
		income.setTimeStamp(incomeDTO.getTimeStamp());
		income.setDescription(incomeDTO.getDescription());
		
		String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userRepo.findByUsername(currentUsername);
		
		income.setUser(user);
		return incomeRepository.save(income);
	}

	

	// GET INCOME BY ID
	@Secured({"ROLE_USER" })
	@GetMapping("{id}")
	public ResponseEntity<Income> getIncomeById(@PathVariable long id) {
		Income income = incomeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());
		return ResponseEntity.ok(income);
	}

	// UPDATE INCOME BY ID
	@Secured({"ROLE_USER" })
	@PutMapping("{id}")
	public ResponseEntity<Income> updateIncome(@PathVariable long id, @RequestBody Income incomeDetails) {
		Income updateIncome = incomeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());

		updateIncome.setAmount(incomeDetails.getAmount());
		updateIncome.setDescription(incomeDetails.getDescription());
		updateIncome.setTimeStamp(incomeDetails.getTimeStamp());

		incomeRepository.save(updateIncome);

		return ResponseEntity.ok(updateIncome);

	}

	// DELETE INCOME BY ID
	@Secured({ "ROLE_USER" })
	@DeleteMapping("{id}")
	public ResponseEntity<HttpStatus> deleteIncome(@PathVariable long id) {
		Income employee = incomeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());

		incomeRepository.delete(employee);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);

	}

}
