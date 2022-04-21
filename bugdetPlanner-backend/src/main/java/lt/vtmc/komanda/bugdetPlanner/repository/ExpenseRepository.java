package lt.vtmc.komanda.bugdetPlanner.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lt.vtmc.komanda.bugdetPlanner.model.Expense;


@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long>{
	
	Expense findByCategory(String category);
	boolean existsByCategory(String category);
	Expense deleteByCategory(String category);

}
