package lt.vtmc.komanda.bugdetPlanner.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExpenseDTO {

	private BigDecimal amount;
	private LocalDate date1 = LocalDate.now();
	private String category;
	private String name;
	private String comment;
	private BigDecimal limit;
	
	public ExpenseDTO() {
		
	}
}
