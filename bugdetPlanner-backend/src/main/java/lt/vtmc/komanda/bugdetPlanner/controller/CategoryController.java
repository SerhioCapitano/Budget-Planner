package lt.vtmc.komanda.bugdetPlanner.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.transaction.annotation.Transactional;
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

import io.swagger.annotations.ApiOperation;
import lt.vtmc.komanda.bugdetPlanner.exception.ResourceExistsException;
import lt.vtmc.komanda.bugdetPlanner.exception.ResourceNotFoundException;
import lt.vtmc.komanda.bugdetPlanner.model.Category;
import lt.vtmc.komanda.bugdetPlanner.model.CategoryDTO;
import lt.vtmc.komanda.bugdetPlanner.model.User;
import lt.vtmc.komanda.bugdetPlanner.repository.CategoryRepository;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {
	
	@Autowired
	CategoryRepository categoryRepo;

	public CategoryController(CategoryRepository categoryRepo) {
		super();
		this.categoryRepo = categoryRepo;
	}
	
	@Secured({ "ROLE_ADMIN" })
	@GetMapping
	public List<Category> getAllCategories() {
		return categoryRepo.findAll();
	}
	
	@Secured({ "ROLE_ADMIN"})
	@GetMapping("/{name}")
	public Category getCategoryByName(@PathVariable("name") String name) {
		if(!categoryRepo.existsByName(name)) {
			throw new ResourceNotFoundException();
		}else {
		return categoryRepo.findByName(name);
		}
	}
	
	@Secured({ "ROLE_ADMIN" })
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Category createCategory(@RequestBody CategoryDTO categoryDTO) {
		Category category = new Category();
		category.setName(categoryDTO.getName());
		if(categoryRepo.existsByName(category.getName())) {
			throw new ResourceExistsException();
		}
		return categoryRepo.save(category);
	}
	
	
	@Secured({ "ROLE_ADMIN" })
	@PutMapping("/{name}")
	public Category updateCategory(@PathVariable("name") String name, @RequestBody Category categoryDTO) {
		
		Category category = categoryRepo.findByName(name);
		if(!categoryRepo.existsByName(name)) {
			throw new ResourceNotFoundException();
		}
			category.setName(categoryDTO.getName());
			return categoryRepo.save(category);
	}
	
	@Secured({ "ROLE_ADMIN" })
	@DeleteMapping("/{name}")
	@Transactional
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteCategory(@PathVariable("name") String name) {
		if(!categoryRepo.existsByName(name)) {
			throw new ResourceNotFoundException();
		}else {
		
		categoryRepo.deleteByName(name);
		}
	}

}
