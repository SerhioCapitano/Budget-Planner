package lt.vtmc.komanda.bugdetPlanner;

import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import lt.vtmc.komanda.bugdetPlanner.model.ERole;
import lt.vtmc.komanda.bugdetPlanner.model.Role;
import lt.vtmc.komanda.bugdetPlanner.model.User;
import lt.vtmc.komanda.bugdetPlanner.repository.RoleRepository;
import lt.vtmc.komanda.bugdetPlanner.repository.UserRepository;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class BugdetPlannerApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BugdetPlannerApplication.class, args);
	}


	public void run(String[] args) {
	
	}
	
	@Bean
    public CommandLineRunner initialData(RoleRepository roleRepo, UserRepository userRepo, PasswordEncoder encoder) {
        return args -> {
            if(roleRepo.findByName(ERole.ROLE_USER).isEmpty()){
                roleRepo.save(new Role(ERole.ROLE_USER));
            }
            if(roleRepo.findByName(ERole.ROLE_ADMIN).isEmpty()){
                roleRepo.save(new Role(ERole.ROLE_ADMIN));
            }
            if(!userRepo.existsByEmail("admin@aa.aa")&&!userRepo.existsByUsername("admin")) {
                User user = new User();
                user.setEmail("admin@mai.lt");
                user.setPassword(encoder.encode("password"));
                user.setUsername("admin");
                user.setRoles(Set.of(roleRepo.findByName(ERole.ROLE_ADMIN).get()));
                userRepo.save(user);
            }
        };
    }
	
//	@Bean
//    public Docket api() {
//        return new Docket(DocumentationType.SWAGGER_2).select()
//                .apis(RequestHandlerSelectors
//                        .basePackage("lt.vtmc.komanda.bugdetPlanner"))
//                .paths(PathSelectors.any())
//                .build();
//    }

}
