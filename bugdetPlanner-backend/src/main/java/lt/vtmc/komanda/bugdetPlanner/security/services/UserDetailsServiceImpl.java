package lt.vtmc.komanda.bugdetPlanner.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lt.vtmc.komanda.bugdetPlanner.model.User;
import lt.vtmc.komanda.bugdetPlanner.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	UserRepository userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		if(username.isEmpty()) {
			throw new UsernameNotFoundException("User Not Found with username: " + username);
		}
		User user = userRepository.findByUsername(username);
		return UserDetailsImpl.build(user);
	}
}
