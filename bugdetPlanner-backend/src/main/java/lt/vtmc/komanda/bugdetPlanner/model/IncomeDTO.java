package lt.vtmc.komanda.bugdetPlanner.model;


import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IncomeDTO {
	private BigDecimal amount;
	private LocalDate timeStamp = LocalDate.now();
	private String description;
	
	public IncomeDTO() {
		
	}

}
