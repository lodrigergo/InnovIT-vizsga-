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

public class NavbarNavigationTest {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    @Test
    public void testNavbarNavigation() throws InterruptedException {
        System.out.println("Teszt: Navbar navigáció...");
        driver.get("http://localhost:4200/cars");
        Thread.sleep(2000);

        // Home link tesztelése
        System.out.println("Keresem a Home linket...");
        WebElement homeLink = wait.until(ExpectedConditions.elementToBeClickable(By.id("home-link")));
        Thread.sleep(1000);
        System.out.println("Home link kattintása...");
        homeLink.click();
        Thread.sleep(2000);
        System.out.println("Ellenőrzöm az URL-t és a Home szekciót...");
        String currentUrl = driver.getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("http://localhost:4200"), 
            "A Home link nem navigált a főoldalra! Aktuális URL: " + currentUrl);
        WebElement heroSection = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("hero")));
        Assert.assertTrue(heroSection.isDisplayed(), "A Home szekció nem látható!");
        System.out.println("Home link sikeresen tesztelve.");

        // Visszatérés a /cars oldalra
        driver.get("http://localhost:4200/cars");
        Thread.sleep(2000);

        // About link tesztelése
        System.out.println("Keresem az About linket...");
        WebElement aboutLink = wait.until(ExpectedConditions.elementToBeClickable(
            By.cssSelector("a[fragment='about']")));
        Thread.sleep(1000);
        System.out.println("About link kattintása...");
        aboutLink.click();
        Thread.sleep(2000);
        System.out.println("Ellenőrzöm az URL-t és az About szekciót...");
        currentUrl = driver.getCurrentUrl();
         
   
    

        // Visszatérés a /cars oldalra
        driver.get("http://localhost:4200/cars");
        Thread.sleep(2000);

    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}