package lt.vtmc.komanda.bugdetPlanner;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;


public class Log4j2 {
	  private static final Logger LOGGER =  LoggerFactory.getLogger(Log4j2.class);

	  public static void main(String[] args) {
		LOGGER.info("Debug message");
		LOGGER.error("this is error message");
	  }
	}