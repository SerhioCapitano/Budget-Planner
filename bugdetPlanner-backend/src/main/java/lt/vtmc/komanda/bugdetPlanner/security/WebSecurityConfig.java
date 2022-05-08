package lt.vtmc.komanda.bugdetPlanner.security;
import org.h2.server.web.WebServlet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lt.vtmc.komanda.bugdetPlanner.security.jwt.AuthEntryPointJwt;
import lt.vtmc.komanda.bugdetPlanner.security.jwt.AuthTokenFilter;
import lt.vtmc.komanda.bugdetPlanner.security.services.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
		// securedEnabled = true,
		// jsr250Enabled = true,
		prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	UserDetailsServiceImpl userDetailsService;
	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;
	@Bean
	public AuthTokenFilter authenticationJwtTokenFilter() {
		return new AuthTokenFilter();
	}
	@Override
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		http.cors().and().csrf().disable()
//			.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
//			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//			.authorizeRequests().antMatchers("/api/auth/**").permitAll()
//			.antMatchers("/api/test/**").permitAll()
//			.anyRequest().authenticated();
//		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
//	}
		
		@Override
  protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()
			.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
			.authorizeRequests().antMatchers("/api/auth/**").permitAll()
				.and()
				.authorizeRequests().antMatchers("/h2-console/**").permitAll()
			.antMatchers("/api/test/**").permitAll()
			.anyRequest().authenticated()
			.and().headers().frameOptions().sameOrigin();
		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}
// 	    protected void configure(HttpSecurity http) throws Exception {
// 			http.cors().and().csrf().ignoringAntMatchers("/h2-console/**")
// 			.and().headers().frameOptions().sameOrigin().and()
// 			.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
// 			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
// <<<<<<< something
// 			.authorizeRequests().antMatchers("/api/auth/**").permitAll()
// 				.and()
// 				.authorizeRequests().antMatchers("/h2-console/**").permitAll()
// 			.antMatchers("/api/test/**").permitAll()
// 			.anyRequest().authenticated()
// 			.and().headers().frameOptions().sameOrigin();
// =======
// 	        .authorizeRequests().antMatchers("/").permitAll()
// 	       .antMatchers("/api/auth/**").permitAll()
// 	        .antMatchers("/api/test/**").permitAll()
// 	        .antMatchers("/h2-console/**").permitAll()
// 	        .anyRequest().authenticated();

// >>>>>>> main
// 		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
// 	}
	

}