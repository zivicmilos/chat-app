package chatmanager;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateful;

import models.User;
import models.UserMessage;

// TODO Implement the rest of Client-Server functionalities 
/**
 * Session Bean implementation class ChatBean
 */
@Stateful
@LocalBean
public class ChatManagerBean implements ChatManagerRemote, ChatManagerLocal {

	private List<User> registered = new ArrayList<User>();
	private List<User> loggedIn = new ArrayList<User>();
	private HashMap<String, List<UserMessage>> messages = new HashMap<String, List<UserMessage>>();
	
	/**
	 * Default constructor.
	 */
	public ChatManagerBean() {
		List<UserMessage> lista = new ArrayList<>();
		lista.add(new UserMessage(new User("asd", "asd"), new User("pera", "pera"), LocalDateTime.now(), "poruka", "admebloksam"));
		messages.put("asd", lista);
	}

	@Override
	public boolean register(User user) {
		registered.add(user);
		//messages.put(user.getUsername(), new ArrayList<UserMessage>());
		return true;
	}

	@Override
	public boolean login(String username, String password) {
		boolean exists = registered.stream().anyMatch(u->u.getUsername().equals(username) && u.getPassword().equals(password));
		if(exists)
			loggedIn.add(new User(username, password));
		return exists;
	}
	
	@Override
	public List<User> registeredUsers() {
		return registered;
	}

	@Override
	public List<User> loggedInUsers() {
		return loggedIn;
	}
	
	@Override
	public boolean logout(String username) {
		return loggedIn.removeIf(u -> u.getUsername().equals(username));
	}
	
	@Override
	public List<UserMessage> getMessages(String username) {
		return messages.get(username);
	}

}
