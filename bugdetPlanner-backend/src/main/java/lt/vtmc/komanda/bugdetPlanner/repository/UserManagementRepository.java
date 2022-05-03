package lt.vtmc.komanda.bugdetPlanner.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lt.vtmc.komanda.bugdetPlanner.model.User;

@Repository
public interface UserManagementRepository extends JpaRepository<User, Long>{
	
	boolean existsByUserName(String userName);
	User findByUserName(String userName);
}
