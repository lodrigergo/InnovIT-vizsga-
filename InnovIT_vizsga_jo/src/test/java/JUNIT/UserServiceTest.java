package JUNIT;

import com.backendvizsga.innovit_vizsga.model.Users;
import com.backendvizsga.innovit_vizsga.service.UserService;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

class UserServiceTests {

    @InjectMocks
    private UserService userService;

    @Mock
    private Users usersMock;

    private Users testUser;
    private SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.openMocks(this);
        testUser = new Users(
                1,
                "Test User",
                "test@example.com",
                "Password123!",
                "123456",
                false,
                false,
                formatter.parse("2023-01-01 12:00:00"),
                null
        );
    }

    @Test
    void testLoginSuccess() {
        when(usersMock.login(anyString(), anyString())).thenReturn(testUser);

        JSONObject result = userService.login("test@example.com", "Password123!");

        assertEquals("success", result.getString("status"));
        assertEquals(200, result.getInt("statusCode"));
        assertTrue(result.has("result"));
        assertEquals(1, result.getJSONObject("result").getInt("id"));
    }

    @Test
    void testLoginInvalidEmail() {
        JSONObject result = userService.login("invalid-email", "Password123!");

        assertEquals("invalidEmail", result.getString("status"));
        assertEquals(417, result.getInt("statusCode"));
    }

    @Test
    void testLoginUserNotFound() {
        when(usersMock.login(anyString(), anyString())).thenReturn(new Users());

        JSONObject result = userService.login("test@example.com", "Password123!");

        assertEquals("userNotFound", result.getString("status"));
        assertEquals(417, result.getInt("statusCode"));
    }

    @Test
    void testGetAllUserSuccess() {
        ArrayList<Users> userList = new ArrayList<>();
        userList.add(testUser);
        when(usersMock.getAllUser()).thenReturn(userList);

        ArrayList<Users> result = userService.getAllUser();

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("Test User", result.get(0).getName());
    }

    @Test
    void testGetAllUserException() {
        when(usersMock.getAllUser()).thenThrow(new RuntimeException("Database error"));

        ArrayList<Users> result = userService.getAllUser();

        assertTrue(result.isEmpty());
    }

    @Test
    void testGetAllAdminSuccess() {
        ArrayList<Users> adminList = new ArrayList<>();
        adminList.add(testUser);
        when(usersMock.getAllAdmin()).thenReturn(adminList);

        ArrayList<Users> result = userService.getAllAdmin();

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
    }

    @Test
    void testGetUserByIdSuccess() {
        when(usersMock.getUserById(anyInt())).thenReturn(testUser);

        Users result = userService.getUserById(1);

        assertNotNull(result);
        assertEquals("Test User", result.getName());
    }

    @Test
    void testRegisterUserSuccess() {
        when(usersMock.isUserExists(anyString())).thenReturn(false);
        when(usersMock.registerUser(any(Users.class))).thenReturn(true);

        JSONObject result = userService.registerUser(testUser);

        assertEquals("success", result.getString("status"));
        assertEquals(200, result.getInt("statusCode"));
    }

    @Test
    void testRegisterUserInvalidEmail() {
        testUser.setEmail("invalid-email");

        JSONObject result = userService.registerUser(testUser);

        assertEquals("InvalidEmail", result.getString("status"));
        assertEquals(417, result.getInt("statusCode"));
    }

    @Test
    void testRegisterUserInvalidPassword() {
        testUser.setPassword("weak");

        JSONObject result = userService.registerUser(testUser);

        assertEquals("InvalidPassword", result.getString("status"));
        assertEquals(417, result.getInt("statusCode"));
    }

    @Test
    void testRegisterUserAlreadyExists() {
        when(usersMock.isUserExists(anyString())).thenReturn(true);

        JSONObject result = userService.registerUser(testUser);

        assertEquals("UserAlreadyExists", result.getString("status"));
        assertEquals(417, result.getInt("statusCode"));
    }

    @Test
    void testDeleteUserByIdSuccess() {
        when(usersMock.getUserById(anyInt())).thenReturn(testUser);
        when(usersMock.deleteUserById(anyInt())).thenReturn(true);

        Boolean result = userService.deleteUserById(1);

        assertTrue(result);
    }

    @Test
    void testDeleteUserByIdNotFound() {
        when(usersMock.getUserById(anyInt())).thenReturn(null);

        Boolean result = userService.deleteUserById(1);

        assertFalse(result);
    }

    @Test
    void testUpdateUserByIdSuccess() {
        when(usersMock.updateUserById(anyInt(), anyString(), anyString(), anyString(), anyString())).thenReturn(true);

        JSONObject result = userService.updateUserById(testUser);

        assertEquals("success", result.getString("status"));
        assertEquals(200, result.getInt("statusCode"));
    }

    @Test
    void testUpdateUserByIdInvalidEmail() {
        testUser.setEmail("invalid-email");

        JSONObject result = userService.updateUserById(testUser);

        assertEquals("error", result.getString("status"));
        assertEquals(400, result.getInt("statusCode"));
        assertEquals("Invalid email format.", result.getString("errorMessage"));
    }

    @Test
    void testUpdateUserByIdEmptyName() {
        testUser.setName("");

        JSONObject result = userService.updateUserById(testUser);

        assertEquals("error", result.getString("status"));
        assertEquals(400, result.getInt("statusCode"));
        assertEquals("Name cannot be null or empty.", result.getString("errorMessage"));
    }
}