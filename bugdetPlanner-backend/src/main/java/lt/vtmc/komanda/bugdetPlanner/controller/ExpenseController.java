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
import lt.vtmc.komanda.bugdetPlanner.model.Expense;
import lt.vtmc.komanda.bugdetPlanner.model.ExpenseDTO;
import lt.vtmc.komanda.bugdetPlanner.repository.ExpenseRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/expenses")
public class ExpenseController {

	@Autowired
	ExpenseRepository repo;

	public ExpenseController(ExpenseRepository repo) {
		super();
		this.repo = repo;
	}

	@GetMapping
	public List<Expense> getAllExpenses() {
		return repo.findAll();
	}

	
	@GetMapping("/{category}")
	public List<Expense> getExpenseByCategory(@PathVariable("category") String category) {
		if(!repo.existsByCategory(category)) {
			throw new ResourceNotFoundException();
		}else {
		return repo.findByCategory(category);
		}
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Expense createExpenses(@RequestBody ExpenseDTO expensesDTO) {
		Expense expenses = new Expense();

		expenses.setAmount(expensesDTO.getAmount());
		expenses.setDate(expensesDTO.getDate());
		expenses.setCategory(expensesDTO.getCategory());
		expenses.setName(expensesDTO.getName());
		expenses.setComment(expensesDTO.getComment());
		return repo.save(expenses);
	}

	@PutMapping("/{id}")
	public Expense updateExpenses(@PathVariable("id") long id, @RequestBody ExpenseDTO expenseDTO) {
		return repo.findById(id).map(expense -> {
			expense.setAmount(expenseDTO.getAmount());
			expense.setDate(expenseDTO.getDate());
			expense.setCategory(expenseDTO.getCategory());
			expense.setName(expenseDTO.getName());
			expense.setComment(expenseDTO.getComment());
			return repo.save(expense);
		}).orElseThrow(() -> new ResourceNotFoundException());
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteExpense(@PathVariable("id") long id) {
		if(!repo.existsById(id)) {
			throw new ResourceNotFoundException();
		}else {
		
		repo.deleteById(id);
	}
	}
}
