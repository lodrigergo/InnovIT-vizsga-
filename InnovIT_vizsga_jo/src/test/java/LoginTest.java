
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

        driver.get("http://127.0.0.1:5501/index.html");
        Thread.sleep(2000);

        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(By.className("login-btn")));
        Thread.sleep(1000);
        loginButton.click();

        WebElement emailField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("email")));
        Thread.sleep(1000);
        emailField.sendKeys("john.doe@gmail.com");

        WebElement passwordField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("password")));
        Thread.sleep(1000);
        passwordField.sendKeys("Alma123!");

        WebElement submitButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("#login-panel .btn.login-btn")));
        Thread.sleep(1000);
        submitButton.click();

        wait.until(ExpectedConditions.alertIsPresent());
        String alertText = driver.switchTo().alert().getText();
        driver.switchTo().alert().accept();
        Thread.sleep(2000);

        WebElement profileIcon = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("profile-icon")));
        Assert.assertTrue(profileIcon.isDisplayed(), "A profile ikon nem jelent meg sikeres bejelentkezés után!");

        WebElement loginBtn = driver.findElement(By.className("login-btn"));
        Assert.assertFalse(loginBtn.isDisplayed(), "A login gomb nem tűnt el sikeres bejelentkezés után!");

        Assert.assertTrue(alertText.contains("Üdvözöllek"), "Az alert szövege nem a várt üzenetet tartalmazza!");
    }

    @Test
    public void testFailedLogin() throws InterruptedException {

        driver.get("http://127.0.0.1:5501/index.html");
        Thread.sleep(2000);

        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(By.className("login-btn")));
        Thread.sleep(1000);
        loginButton.click();

        WebElement emailField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("email")));
        Thread.sleep(1000);
        emailField.sendKeys("johne.do@gmail.com");

        WebElement passwordField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("password")));
        Thread.sleep(1000);
        passwordField.sendKeys("Alma123!");

        WebElement submitButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("#login-panel .btn.login-btn")));
        Thread.sleep(1000);
        submitButton.click();

        WebElement errorMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//input[@id='password']/following-sibling::p[contains(@style, 'color: red')]")
        ));
        Thread.sleep(2000);
        Assert.assertTrue(errorMessage.isDisplayed(), "A hibaüzenet nem jelent meg sikertelen bejelentkezés után!");
        Assert.assertEquals(errorMessage.getText(), "Hibás email vagy jelszó!",
                "A hibaüzenet szövege nem megfelelő!");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
