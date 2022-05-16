package chatmanager;

import java.util.List;

import javax.ejb.Remote;

import models.User;
import models.UserMessage;

@Remote
public interface ChatManagerRemote {

	public boolean login(String username, String password);

	public boolean register(User user);
	
	public List<User> registeredUsers();

	public List<User> loggedInUsers();
	
	public boolean logout(String username);
	
	public List<UserMessage> getMessages(String username);
}
