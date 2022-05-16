package rest;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Path;

import messagemanager.AgentMessage;
import messagemanager.MessageManagerRemote;
import models.User;

@Stateless
@Path("/chat")
public class ChatRestBean implements ChatRest {

	@EJB
	private MessageManagerRemote messageManager;
	
	
	@Override
	public void register(User user) {
		AgentMessage message = new AgentMessage();
		message.userArgs.put("receiver", "chat");
		message.userArgs.put("command", "REGISTER");
		message.userArgs.put("username", user.getUsername());
		message.userArgs.put("password", user.getPassword());
		
		messageManager.post(message);
		
		getRegisteredUsers();
	}

	@Override
	public void login(User user) {
		AgentMessage message = new AgentMessage();
		message.userArgs.put("receiver", "chat");
		message.userArgs.put("command", "LOG_IN");
		message.userArgs.put("username", user.getUsername());
		message.userArgs.put("password", user.getPassword());
		
		messageManager.post(message);
		
		getloggedInUsers();
	}
	
	@Override
	public void getRegisteredUsers() {
		AgentMessage message = new AgentMessage();
		message.userArgs.put("receiver", "chat");
		message.userArgs.put("command", "GET_REGISTERED");
		
		messageManager.post(message);
	}

	@Override
	public void getloggedInUsers() {
		AgentMessage message = new AgentMessage();
		message.userArgs.put("receiver", "chat");
		message.userArgs.put("command", "GET_LOGGEDIN");
		
		messageManager.post(message);
	}
	
	@Override
	public void logoutUser(String user) {
		AgentMessage message = new AgentMessage();
		message.userArgs.put("receiver", "chat");
		message.userArgs.put("command", "LOGOUT");
		message.userArgs.put("username", user);
		
		messageManager.post(message);
		
		getloggedInUsers();
	}

	@Override
	public void getMessages(String user) {
		AgentMessage message = new AgentMessage();
		message.userArgs.put("receiver", "chat");
		message.userArgs.put("command", "GET_MESSAGES");
		message.userArgs.put("username", user);
		
		messageManager.post(message);
	}
}
