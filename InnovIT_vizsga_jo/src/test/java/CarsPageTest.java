import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;
import java.util.List;

public class CarsPageTest {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeMethod
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    @Test
    public void testFilterFunctionality() throws InterruptedException {
        System.out.println("Teszt: Szűrő funkcionalitás...");
        driver.get("http://localhost:4200/cars");
        Thread.sleep(2000);

        System.out.println("Keresem a Toyota szűrőt...");
        WebElement toyotaFilter = wait.until(ExpectedConditions.elementToBeClickable(By.id("Toyota")));
        Thread.sleep(1000);
        System.out.println("Toyota szűrő kiválasztása...");
        toyotaFilter.click();

        System.out.println("Keresem a Hybrid szűrőt...");
        WebElement hybridFilter = wait.until(ExpectedConditions.elementToBeClickable(By.id("Hybrid")));
        Thread.sleep(1000);
        System.out.println("Hybrid szűrő kiválasztása...");
        hybridFilter.click();

        System.out.println("Keresem az autók listáját...");
        List<WebElement> carCards = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.cssSelector(".cars-grid .car-card")));
        Thread.sleep(2000);
        Assert.assertTrue(carCards.size() > 0, "Nincsenek autók a szűrők alkalmazása után!");
        System.out.println("Autók száma a szűrők után: " + carCards.size());

        boolean validCars = true;
        for (WebElement card : carCards) {
            String carTitle = card.findElement(By.cssSelector("h3")).getText();
            if (!carTitle.contains("Toyota") || !card.getText().contains("Hybrid")) {
                validCars = false;
                System.out.println("Érvénytelen autó talált: " + carTitle);
                break;
            }
        }
       
       
    }

    @Test
    public void testResetFilters() throws InterruptedException {
        System.out.println("Teszt: Szűrők visszaállítása...");
        driver.get("http://localhost:4200/cars");
        Thread.sleep(2000);

        System.out.println("Keresem a Volkswagen szűrőt...");
        WebElement vwFilter = wait.until(ExpectedConditions.elementToBeClickable(By.id("Volkswagen")));
        Thread.sleep(1000);
        System.out.println("Volkswagen szűrő kiválasztása...");
        vwFilter.click();

        System.out.println("Keresem a reset gombot...");
        WebElement resetButton = wait.until(ExpectedConditions.elementToBeClickable(By.className("reset-filters-btn")));
        Thread.sleep(1000);
        System.out.println("Reset gomb kattintása...");
        resetButton.click();

        System.out.println("Keresem az autók listáját...");
        List<WebElement> carCards = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.cssSelector(".cars-grid .car-card")));
        Thread.sleep(2000);
        Assert.assertEquals(carCards.size(), 9, "Nem minden autó jelent meg a reset után (várható: 9)!");
        System.out.println("Autók száma a reset után: " + carCards.size());

        System.out.println("Ellenőrzöm, hogy a Volkswagen szűrő nincs kiválasztva...");
        vwFilter = driver.findElement(By.id("Volkswagen"));
        Assert.assertFalse(vwFilter.isSelected(), "A Volkswagen szűrő nem lett visszaállítva!");
    }

    @Test
    public void testArrangement() throws InterruptedException {
        System.out.println("Teszt: Rendezés...");
        driver.get("http://localhost:4200/cars");
        Thread.sleep(2000);

        System.out.println("Keresem a rendezési legördülő menüt...");
        WebElement arrangeSelect = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("arrange")));
        Thread.sleep(1000);
        Select select = new Select(arrangeSelect);

        System.out.println("Növekvő ár szerinti rendezés kiválasztása...");
        select.selectByValue("price");
        Thread.sleep(2000);

        


        
        }
      

    @Test
    public void testDetailsPanel() throws InterruptedException {
        System.out.println("Teszt: Részletek panel...");
        driver.get("http://localhost:4200/cars");
        Thread.sleep(2000);

        System.out.println("Keresem az első autó details gombját...");
        WebElement detailsButton = wait.until(ExpectedConditions.elementToBeClickable(
            By.cssSelector(".cars-grid .car-card:first-child .details-btn")));
        Thread.sleep(1000);
        System.out.println("Details gomb kattintása...");
        detailsButton.click();

        System.out.println("Keresem a részletek panelt...");
        WebElement detailsPanel = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.cssSelector(".cars-grid .car-card:first-child .details-panel.active")));
        Thread.sleep(2000);
        Assert.assertTrue(detailsPanel.isDisplayed(), "A részletek panel nem jelent meg!");
        System.out.println("Részletek panel tartalma: " + detailsPanel.getText());

        Assert.assertTrue(detailsPanel.getText().contains("doors"), "A részletek panel nem tartalmazza az ajtók számát!");
        Assert.assertTrue(detailsPanel.getText().contains("seats"), "A részletek panel nem tartalmazza az ülések számát!");
    }

   

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}