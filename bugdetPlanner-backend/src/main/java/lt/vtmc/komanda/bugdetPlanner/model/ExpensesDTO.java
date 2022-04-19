package lt.vtmc.komanda.bugdetPlanner.model;

import java.math.BigDecimal;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExpensesDTO {

	private BigDecimal ammount;
	private LocalTime date;
	private String category;
	private String name;
	private String comment;
	private BigDecimal limit;
	
	public ExpensesDTO() {
		
	}
}
