package lt.vtmc.komanda.bugdetPlanner.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
@ControllerAdvice
public class ResourceExistsExceptionHandler {

	@ExceptionHandler(value=ResourceExistsException.class)
	public ResponseEntity<Object> exception(ResourceExistsException exception){
		return new ResponseEntity<>("Resource already exists", HttpStatus.BAD_REQUEST);
	}
}
