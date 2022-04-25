package lt.vtmc.komanda.bugdetPlanner.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import lt.vtmc.komanda.bugdetPlanner.repository.IncomeRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/incomes")
public class IncomeController {

	@Autowired
	private IncomeRepository incomeRepository;

	public IncomeController(IncomeRepository incomeRepository) {
		this.incomeRepository = incomeRepository;
	}

	// GET ALL INCOMES IN LIST

	@GetMapping
	public List<Income> getAllIncomes() {
		return incomeRepository.findAll();
	}

	// CREATE INCOME

	@PostMapping
	public Income createIncome(@RequestBody Income income) {
		return incomeRepository.save(income);

	}

	// GET INCOME BY ID

	@GetMapping("{id}")
	public ResponseEntity<Income> getIncomeById(@PathVariable long id) {
		Income income = incomeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());
		return ResponseEntity.ok(income);
	}

	// UPDATE INCOME BY ID

	@PutMapping("{id}")
	public ResponseEntity<Income> updateEmployee(@PathVariable long id, @RequestBody Income incomeDetails) {
		Income updateIncome = incomeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());

		updateIncome.setAmount(incomeDetails.getAmount());
		updateIncome.setDescription(incomeDetails.getDescription());
		updateIncome.setTimeStamp(incomeDetails.getTimeStamp());

		incomeRepository.save(updateIncome);

		return ResponseEntity.ok(updateIncome);

	}

	// DELETE INCOME BY ID

	@DeleteMapping("{id}")
	public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable long id) {
		Income employee = incomeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException());

		incomeRepository.delete(employee);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);

	}

}
