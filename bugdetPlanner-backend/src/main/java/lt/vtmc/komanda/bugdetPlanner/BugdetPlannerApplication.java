package lt.vtmc.komanda.bugdetPlanner;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

//@ConfigurationPropertiesScan
@SpringBootApplication
public class BugdetPlannerApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BugdetPlannerApplication.class, args);
	}


	public void run(String[] args) {
	
	}

}
