package lt.vtmc.komanda.bugdetPlanner.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class UserDTO {
	private Long id;
	@NotBlank
	@Size(max = 20)
	private String username;
	@NotBlank
	@Size(max = 50)
	@Email
	private String email;
	@NotBlank
	@Size(min=6, max = 120)
	private String password;
	
	
	public UserDTO() {
		
	}
}
