package lt.vtmc.komanda.bugdetPlanner;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lt.vtmc.komanda.bugdetPlanner.model.Income;
import lt.vtmc.komanda.bugdetPlanner.repository.IncomeRepository;

@SpringBootApplication
public class BugdetPlannerApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BugdetPlannerApplication.class, args);
	}

	@Autowired
	private IncomeRepository incomeRepository;

	public void run(String[] args) throws Exception {
	
	}

}
