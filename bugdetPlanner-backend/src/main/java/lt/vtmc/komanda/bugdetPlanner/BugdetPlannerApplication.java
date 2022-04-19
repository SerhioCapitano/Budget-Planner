package lt.vtmc.komanda.bugdetPlanner;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lt.vtmc.komanda.bugdetPlanner.model.Incomes;
import lt.vtmc.komanda.bugdetPlanner.repository.IncomeRepository;

@SpringBootApplication
public class BugdetPlannerApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BugdetPlannerApplication.class, args);
	}

	@Autowired
	private IncomeRepository incomeRepository;

	public void run(String[] args) throws Exception {
		Incomes i1 = new Incomes();
		i1.setAmount(new BigDecimal(1000));
		i1.setDescription("description");
		incomeRepository.save(i1);

		Incomes i2 = new Incomes();
		i2.setAmount(new BigDecimal(5000));
		i2.setDescription("wtf");
		incomeRepository.save(i2);
	}

}
