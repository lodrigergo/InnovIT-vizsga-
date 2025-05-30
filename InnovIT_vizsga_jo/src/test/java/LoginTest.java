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

public class LoginTest {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    @Test
    public void testSuccessfulLogin() throws InterruptedException {
        driver.get("http://localhost:4200/home");
        Thread.sleep(2000);

        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(By.className("login-btn")));
        Thread.sleep(2000);
        loginButton.click();

        WebElement emailField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("email")));
        Thread.sleep(2000);
        emailField.sendKeys("john.doe@gmail.com");

        WebElement passwordField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("password")));
        Thread.sleep(2000);
        passwordField.sendKeys("Alma123!");

        WebElement submitButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("app-login .login-btn")));
        Thread.sleep(2000);
        submitButton.click();

        WebElement profileIcon = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("profile-icon")));
        Thread.sleep(2000);
        Assert.assertTrue(profileIcon.isDisplayed(), "A profil ikon nem jelent meg sikeres bejelentkezés után!");

    }

    @Test
    public void testFailedLogin() throws InterruptedException {
        driver.get("http://localhost:4200/home");
        Thread.sleep(2000);

        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(By.className("login-btn")));
        Thread.sleep(2000);
        loginButton.click();

        WebElement emailField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("email")));
        Thread.sleep(2000);
        emailField.sendKeys("johne.do@gmail.com");

        WebElement passwordField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("password")));
        Thread.sleep(2000);
        passwordField.sendKeys("Alma123!");

        WebElement submitButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("app-login .login-btn")));
        Thread.sleep(2000);
        submitButton.click();

    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}