package lt.vtmc.komanda.bugdetPlanner.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
	private LocalDate date1 = LocalDate.now();
	private String category;
	private String name;
	private String comment;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	User user;
	
	
	public Expense() {
		
	}

}
