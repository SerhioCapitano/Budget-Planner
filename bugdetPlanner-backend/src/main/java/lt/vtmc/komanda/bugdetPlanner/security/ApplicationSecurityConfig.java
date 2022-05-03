package lt.vtmc.komanda.bugdetPlanner.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter{
	
	private final PasswordEncoder passwordEncoder;
	
	public ApplicationSecurityConfig(PasswordEncoder passwordEncoder) {
		super();
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.csrf().disable()
		.authorizeRequests()
		.antMatchers("/", "index", "/css/*", "/js/*").permitAll()
		.antMatchers("/api/**").hasRole(ApplicationUserRole.USER.name())
		.antMatchers(HttpMethod.DELETE, "/management/api/**").hasAuthority(ApplicationUserPermission.USER_WRITE.name())
		.antMatchers(HttpMethod.POST, "/management/api/**").hasAuthority(ApplicationUserPermission.USER_WRITE.name())
		.antMatchers(HttpMethod.PUT, "/management/api/**").hasAuthority(ApplicationUserPermission.USER_WRITE.name())
		.antMatchers(HttpMethod.GET, "/management/api/**").hasAnyRole(ApplicationUserRole.ADMIN.name())
		.anyRequest()
		.authenticated()
		.and()
		.httpBasic();
	}
	
	@Override
	@Bean
	protected UserDetailsService userDetailsService() {
UserDetails mariaUser = User.builder()
.username("maria").password(passwordEncoder.encode("password"))
//.roles(ApplicationUserRole.USER.name())
.authorities(ApplicationUserRole.USER.getGrantedAuthorities())
.build(); //ROLE_USER

UserDetails admin = User.builder()
.username("admin").password(passwordEncoder.encode("password123"))
//.roles(ApplicationUserRole.ADMIN.name())
.authorities(ApplicationUserRole.ADMIN.getGrantedAuthorities())
.build(); //ROLE_USER

return new InMemoryUserDetailsManager(mariaUser, admin);
	}

}
