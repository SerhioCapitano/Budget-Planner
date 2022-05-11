package lt.vtmc.komanda.bugdetPlanner.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lt.vtmc.komanda.bugdetPlanner.model.Expense;
import lt.vtmc.komanda.bugdetPlanner.model.User;


@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long>{
	
	List<Expense> findByCategory(String category);
	boolean existsByCategory(String category);
	Expense deleteByCategory(String category);
	List<Expense> findByUserId(User id);

}
