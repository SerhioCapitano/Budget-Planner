package lt.vtmc.komanda.bugdetPlanner.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lt.vtmc.komanda.bugdetPlanner.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	boolean existsByUsername(String username);
	boolean existsByEmail(String email);
	Optional<User> findByUsername(String username);
}
