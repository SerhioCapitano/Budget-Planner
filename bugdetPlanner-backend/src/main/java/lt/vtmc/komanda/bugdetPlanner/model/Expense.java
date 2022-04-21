package lt.vtmc.komanda.bugdetPlanner.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import javax.validation.constraints.NotNull;

@Entity
@Data
@AllArgsConstructor
public class Expense {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	//@NotNull
	private BigDecimal amount;
	//@NotNull
	private LocalDate date = LocalDate.now();
	//@NotNull
	private String category;
	private String name;
	private String comment;
	
	public Expense() {
		
	}
	
//	public BigDecimal countBalance(LocalDate dateFrom, LocalDate dateTo, BigDecimal amount) {
//		BigDecimal balance = new BigDecimal(0);
//		if(date.isAfter(dateFrom) && date.isBefore(dateTo)) {
//			balance=balance.subtract(amount);
//		}
//		return balance;
//		
//	}
}
