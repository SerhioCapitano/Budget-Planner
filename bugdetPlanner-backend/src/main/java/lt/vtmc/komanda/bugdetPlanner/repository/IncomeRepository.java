package lt.vtmc.komanda.bugdetPlanner.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.vtmc.komanda.bugdetPlanner.model.Income;
import lt.vtmc.komanda.bugdetPlanner.model.User;

public interface IncomeRepository extends JpaRepository<Income, Long> {
	
	List<Income> findByUser(String username);

}
