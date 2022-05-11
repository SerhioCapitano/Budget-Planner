package lt.vtmc.komanda.bugdetPlanner.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lt.vtmc.komanda.bugdetPlanner.model.Income;
import lt.vtmc.komanda.bugdetPlanner.model.Role;
import lt.vtmc.komanda.bugdetPlanner.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	User findByUsername(String username);
	Boolean existsByUsername(String username);
	Boolean existsByEmail(String email);
	User deleteByUsername(String username);
	
}
