package lt.vtmc.komanda.bugdetPlanner.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lt.vtmc.komanda.bugdetPlanner.model.Expenses;
import lt.vtmc.komanda.bugdetPlanner.model.ExpensesDTO;
import lt.vtmc.komanda.bugdetPlanner.repository.ExpensesRepository;
//import net.vaida.exception.FoodCategoryExistsException;
//import net.vaida.model.FoodCategory;
//import net.vaida.model.FoodCategoryDTO;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/expenses")
public class Expenses_Controller {

	@Autowired
	ExpensesRepository repo;

	public Expenses_Controller(ExpensesRepository repo) {
		super();
		this.repo = repo;
	}

	@GetMapping
	public List<Expenses> getAllExpenses() {
		return repo.findAll();
	}

//@GetMapping("/{id}")
//public Expenses getFoodCategoryById(@PathVariable("id") long id) {
//	return repo.findById(id).orElseThrow(() -> new FoodCategoryNotFoundException());
//}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Expenses createExpenses(@RequestBody ExpensesDTO expensesDTO) {
		Expenses expenses = new Expenses();

		expenses.setAmmount(expensesDTO.getAmmount());
		expenses.setDate(expensesDTO.getDate());
		expenses.setCategory(expensesDTO.getCategory());
		expenses.setName(expensesDTO.getName());
		expenses.setComment(expensesDTO.getComment());
		expenses.setLimit(expensesDTO.getLimit());
		return repo.save(expenses);
	}

}
