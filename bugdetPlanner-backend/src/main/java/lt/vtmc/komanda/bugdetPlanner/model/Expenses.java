package lt.vtmc.komanda.bugdetPlanner.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import javax.validation.constraints.NotEmpty;

@Entity
@Data
@AllArgsConstructor
public class Expenses {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
//	@NotEmpty(message = "Suma yra privaloma!")
	private BigDecimal ammount;
//	@NotEmpty(message = "Data yra privaloma!")
	private LocalDateTime date = LocalDateTime.now();
//	@NotEmpty(message = "Kategorija yra privaloma!")
	private String category;
	private String name;
	private String comment;
	@Column(name = "expenses_limit")
	private BigDecimal limit;
	
	public Expenses() {
		
	}
}
