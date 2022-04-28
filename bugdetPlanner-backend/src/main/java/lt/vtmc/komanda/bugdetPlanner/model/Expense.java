package lt.vtmc.komanda.bugdetPlanner.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;



@Data
@Entity
@AllArgsConstructor
public class Expense {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private BigDecimal amount;
	private LocalDate date = LocalDate.now();
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
