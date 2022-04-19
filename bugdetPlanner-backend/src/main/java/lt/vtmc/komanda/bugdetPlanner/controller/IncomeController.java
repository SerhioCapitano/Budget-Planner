package lt.vtmc.komanda.bugdetPlanner.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lt.vtmc.komanda.bugdetPlanner.model.Incomes;
import lt.vtmc.komanda.bugdetPlanner.repository.IncomeRepository;

@RestController
@RequestMapping("/api/v1/incomes")
public class IncomeController {

	@Autowired
	private IncomeRepository incomeRepository;

	public IncomeController(IncomeRepository incomeRepository) {
		this.incomeRepository = incomeRepository;
	}

	@GetMapping
	public List<Incomes> getAllIncomes() {
		return incomeRepository.findAll();
	}

	@PostMapping
	public Incomes createIncome(@RequestBody Incomes income) {
		return incomeRepository.save(income);

	}

}
