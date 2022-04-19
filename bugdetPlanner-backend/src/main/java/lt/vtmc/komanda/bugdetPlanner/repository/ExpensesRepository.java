package lt.vtmc.komanda.bugdetPlanner.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lt.vtmc.komanda.bugdetPlanner.model.Expenses;


@Repository
public interface ExpensesRepository extends JpaRepository<Expenses, Long>{

}
