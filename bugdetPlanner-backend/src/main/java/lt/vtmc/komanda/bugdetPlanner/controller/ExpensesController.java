package lt.vtmc.komanda.bugdetPlanner.controller;

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
import lt.vtmc.komanda.bugdetPlanner.model.Expenses;
import lt.vtmc.komanda.bugdetPlanner.model.ExpensesDTO;
import lt.vtmc.komanda.bugdetPlanner.repository.ExpensesRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/expenses")
public class ExpensesController {

	@Autowired
	ExpensesRepository repo;

	public ExpensesController(ExpensesRepository repo) {
		super();
		this.repo = repo;
	}

	@GetMapping
	public List<Expenses> getAllExpenses() {
		return repo.findAll();
	}

	@GetMapping("/{id}")
	public Expenses getExpensesById(@PathVariable("id") long id) {
		return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Expense was not found"));
	}

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

	@PutMapping("/{id}")
	public Expenses updateExpenses(@PathVariable("id") long id, @RequestBody ExpensesDTO expenseDTO) {
		return repo.findById(id).map(expense -> {
			expense.setAmmount(expenseDTO.getAmmount());
			expense.setDate(expenseDTO.getDate());
			expense.setCategory(expenseDTO.getCategory());
			expense.setName(expenseDTO.getName());
			expense.setComment(expenseDTO.getComment());
			expense.setLimit(expenseDTO.getLimit());
			return repo.save(expense);
		}).orElseThrow(() -> new ResourceNotFoundException("Expense was not found"));
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteExpense(@PathVariable("id") long id) {
		repo.deleteById(id);
	}

}
