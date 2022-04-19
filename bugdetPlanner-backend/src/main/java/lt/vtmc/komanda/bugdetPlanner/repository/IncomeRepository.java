package lt.vtmc.komanda.bugdetPlanner.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.vtmc.komanda.bugdetPlanner.model.Incomes;

public interface IncomeRepository extends JpaRepository<Incomes, Long> {

}
