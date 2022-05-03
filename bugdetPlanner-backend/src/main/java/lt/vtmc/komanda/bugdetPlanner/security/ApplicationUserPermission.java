package lt.vtmc.komanda.bugdetPlanner.security;

public enum ApplicationUserPermission {
	USER_READ("user:read"),
	USER_WRITE("user:write");
	
	private final String permission;
	
	private ApplicationUserPermission(String permission) {
		this.permission=permission;
	}

	public String getPermission() {
		return permission;
	}
}
