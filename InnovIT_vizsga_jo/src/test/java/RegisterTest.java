import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;

public class RegisterTest {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    @Test
    public void testSuccessfulRegistration() throws InterruptedException {
        driver.get("http://localhost:4200/home");
        Thread.sleep(2000);

        System.out.println("Keresem a bejelentkező gombot...");
        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(By.className("login-btn")));
        Thread.sleep(1000);
        System.out.println("Bejelentkező gomb megtalálva, kattintás...");
        loginButton.click();

        System.out.println("Keresem a create-account gombot...");
        WebElement createAccountButton = wait.until(ExpectedConditions.elementToBeClickable(By.className("create-account-btn")));
        Thread.sleep(2000);
        System.out.println("Create-account gomb megtalálva, kattintás...");
        createAccountButton.click();

       
        System.out.println("Keresem a regisztrációs panelt...");
        WebElement registerPanel = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("register-panel")));
        Thread.sleep(2000);
        Assert.assertTrue(registerPanel.isDisplayed(), "A regisztrációs panel nem jelent meg a create-account gombra kattintás után!");

        System.out.println("Keresem az űrlapmezőket...");
        WebElement usernameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("name")));
        Thread.sleep(2000);
        System.out.println("Username mező megtalálva, kitöltés...");
        usernameField.sendKeys("newuser");

        WebElement emailField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("register-email")));
        Thread.sleep(2000);
        System.out.println("Email mező megtalálva, kitöltés...");
        emailField.sendKeys("neoxevil@gmail.com");

        WebElement passwordField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("register-password")));
        Thread.sleep(2000);
        System.out.println("Password mező megtalálva, kitöltés...");
        passwordField.sendKeys("Alma123!");

        WebElement personalIdField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("personal-id")));
        Thread.sleep(2000);
        System.out.println("Personal ID mező megtalálva, kitöltés...");
        personalIdField.sendKeys("435678A");

        System.out.println("Keresem a regisztrációs gombot...");
        WebElement registerButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector(".register-create-account-btn")));
        Thread.sleep(2000);
        System.out.println("Regisztrációs gomb megtalálva, kattintás...");
        registerButton.click();

       
        System.out.println("Keresem a sikeres regisztrációs üzenetet...");
        WebElement successMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".success-overlay .popup-message p")));
        Thread.sleep(2000);
        Assert.assertTrue(successMessage.isDisplayed(), "A sikeres regisztrációs üzenet nem jelent meg!");
        Assert.assertEquals(successMessage.getText(), "Thank you for your registration! You can now log in.",
                "Az üzenet szövege nem a várt!");

        System.out.println("Keresem a Go to Login gombot...");
        WebElement goToLoginButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector(".success-overlay .login-btn")));
        Thread.sleep(2000);
        System.out.println("Go to Login gomb megtalálva, kattintás...");
        goToLoginButton.click();

        System.out.println("Keresem a bejelentkező panelt...");
        WebElement loginPanel = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("app-login")));
        Thread.sleep(2000);
        Assert.assertTrue(loginPanel.isDisplayed(), "A bejelentkező panel nem jelent meg újra sikeres regisztráció után!");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}