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
        driver.get("http://127.0.0.1:5501/index.html");
        Thread.sleep(2000);

        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(By.className("login-btn")));
        Thread.sleep(1000);
        loginButton.click();

        WebElement createAccountButton = wait.until(ExpectedConditions.elementToBeClickable(By.className("create-account-btn")));
        Thread.sleep(1000);
        createAccountButton.click();

        WebElement usernameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("username")));
        Thread.sleep(1000);
        usernameField.sendKeys("newuser");

        WebElement emailField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("register-email")));
        Thread.sleep(1000);
        emailField.sendKeys("neoxevil@gmail.com");

        WebElement passwordField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("register-password")));
        Thread.sleep(1000);
        passwordField.sendKeys("Alma123!");

        WebElement personalIdField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("personal-id")));
        Thread.sleep(1000);
        personalIdField.sendKeys("435678A");

        WebElement registerButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector(".register-create-account-btn")));
        Thread.sleep(1000);
        registerButton.click();

        wait.until(ExpectedConditions.alertIsPresent());
        String alertText = driver.switchTo().alert().getText();
        driver.switchTo().alert().accept();
        Thread.sleep(2000);

        WebElement loginPanel = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("login-panel")));
        Assert.assertTrue(loginPanel.isDisplayed(), "A login panel nem jelent meg újra sikeres regisztráció után!");

        Assert.assertEquals(alertText, "Sikeres regisztráció! Most már bejelentkezhetsz.", 
            "Az alert szövege nem a várt üzenetet tartalmazza!");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}