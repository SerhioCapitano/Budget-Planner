package lt.vtmc.komanda.bugdetPlanner.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lt.vtmc.komanda.bugdetPlanner.model.Category;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{

	Boolean existsByName(String name);
	Category findByName(String name);
	void deleteByName(String name);
}
