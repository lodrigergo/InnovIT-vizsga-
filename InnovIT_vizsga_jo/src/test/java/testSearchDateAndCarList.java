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
import java.util.List;

   public class testSearchDateAndCarList{
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(30)); 
    }

    @Test
    public void testSearchDateAndCarList() throws InterruptedException {
        driver.get("http://localhost:4200/home");
        Thread.sleep(3000); 

   
       
        WebElement pickupDateField = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.id("pickup-date"))); // Alternatív: By.cssSelector("input[type='date']")
        Thread.sleep(2000);
        System.out.println("Pickup-date mező megtalálva, kitöltés...");
        pickupDateField.clear();
        pickupDateField.sendKeys("2025-05-01"); // Próbálj más formátumot, ha nem működik: "05/01/2025"

    
        WebElement dropoffDateField = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.id("dropoff-date")));
        Thread.sleep(2000);

        dropoffDateField.clear();
        dropoffDateField.sendKeys("2025-05-03");

       
        WebElement searchButton = wait.until(ExpectedConditions.elementToBeClickable(
            By.className("search-btn"))); // Alternatív: By.cssSelector("button[type='submit']")
        Thread.sleep(2000);

        searchButton.click();

     
     
        WebElement carList = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.className("carousel"))); 
        Thread.sleep(3000); 
        Assert.assertTrue(carList.isDisplayed(), "Az autók listája nem jelent meg a keresés után!");

        
    
        List<WebElement> carItems = driver.findElements(By.cssSelector(".carousel .flip-card"));
        Thread.sleep(2000);
        Assert.assertTrue(carItems.size() > 0, "Az autók listája üres, egyetlen autó sem jelent meg!");
        System.out.println("Autók száma a listában: " + carItems.size());

      
        boolean carFound = false;
        for (WebElement item : carItems) {
            String itemText = item.getText().toLowerCase();
            if (itemText.contains("volkswagen") || itemText.contains("toyota") || itemText.contains("volvo")) {
                carFound = true;
                System.out.println("Megtalált autó: " + item.getText());
                break;
            }
        }
        Assert.assertTrue(carFound, "Nem található ismert autó a listában!");
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}