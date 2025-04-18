package JUNIT;

import com.backendvizsga.innovit_vizsga.model.Cars;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class CarsTest {

    @InjectMocks
    private Cars cars;

    @Mock
    private Cars carsMock;

    private Cars testCar;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        testCar = new Cars(
                1,
                "Toyota",
                "Corolla",
                "ABC-123",
                2020,
                "PETROL",
                new BigDecimal("50.00"),
                "AUTOMATIC",
                4,
                true,
                5,
                "image.jpg",
                false,
                new Date()
        );
    }

    @Test
    void testGetAllCarSuccess() {
        // Arrange
        ArrayList<Cars> carList = new ArrayList<>();
        carList.add(testCar);
        when(carsMock.getAllCar()).thenReturn(carList);

        // Act
        ArrayList<Cars> result = cars.getAllCar();

        // Assert
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("Toyota", result.get(0).getBrand());
        verify(carsMock, times(1)).getAllCar();
    }

    @Test
    void testGetAllCarException() {
        // Arrange
        when(Cars.getAllCar()).thenThrow(new RuntimeException("Database error"));

        // Act
        ArrayList<Cars> result = Cars.getAllCar();

        // Assert
        assertTrue(result.isEmpty());
        Cars.getAllCar();
    }

    @Test
    void testGetCarByIdSuccess() {
        // Arrange
        when(carsMock.getCarById(anyInt())).thenReturn(testCar);

        // Act
        Cars result = cars.getCarById(1);

        // Assert
        assertNotNull(result);
        assertEquals("Toyota", result.getBrand());
        verify(carsMock, times(1)).getCarById(1);
    }

    @Test
    void testGetCarByIdNotFound() {
        // Arrange
        when(carsMock.getCarById(anyInt())).thenReturn(null);

        // Act
        Cars result = cars.getCarById(1);

        // Assert
        assertNull(result);
        verify(carsMock, times(1)).getCarById(1);
    }

    @Test
    void testAddCarSuccess() {
        // Arrange
        when(carsMock.addCar(anyString(), anyString(), anyString(), anyInt(), anyString(), any(BigDecimal.class), anyString(), anyInt(), anyBoolean(), anyInt(), anyString())).thenReturn(true);

        // Act
        Boolean result = cars.addCar(
                "Toyota",
                "Corolla",
                "ABC-123",
                2020,
                "PETROL",
                new BigDecimal("50.00"),
                "AUTOMATIC",
                4,
                true,
                5,
                "image.jpg"
        );

        // Assert
        assertTrue(result);
        verify(carsMock, times(1)).addCar(
                "Toyota",
                "Corolla",
                "ABC-123",
                2020,
                "PETROL",
                new BigDecimal("50.00"),
                "AUTOMATIC",
                4,
                true,
                5,
                "image.jpg"
        );
    }

    @Test
    void testAddCarFailure() {
        // Arrange
        when(carsMock.addCar(anyString(), anyString(), anyString(), anyInt(), anyString(), any(BigDecimal.class), anyString(), anyInt(), anyBoolean(), anyInt(), anyString())).thenThrow(new RuntimeException("Database error"));

        // Act
        Boolean result = cars.addCar(
                "Toyota",
                "Corolla",
                "ABC-123",
                2020,
                "PETROL",
                new BigDecimal("50.00"),
                "AUTOMATIC",
                4,
                true,
                5,
                "image.jpg"
        );

        // Assert
        assertFalse(result);
        verify(carsMock, times(1)).addCar(
                "Toyota",
                "Corolla",
                "ABC-123",
                2020,
                "PETROL",
                new BigDecimal("50.00"),
                "AUTOMATIC",
                4,
                true,
                5,
                "image.jpg"
        );
    }

    @Test
    void testDeleteCarByIdSuccess() {
        // Arrange
        when(carsMock.getCarById(anyInt())).thenReturn(testCar);
        when(carsMock.deleteCarById(anyInt())).thenReturn(true);

        // Act
        Boolean result = cars.deleteCarById(1);

        // Assert
        assertTrue(result);
        verify(carsMock, times(1)).getCarById(1);
        verify(carsMock, times(1)).deleteCarById(1);
    }

    @Test
    void testDeleteCarByIdNotFound() {
        // Arrange
        when(carsMock.getCarById(anyInt())).thenReturn(null);

        // Act
        Boolean result = cars.deleteCarById(1);

        // Assert
        assertFalse(result);
        verify(carsMock, times(1)).getCarById(1);
        verify(carsMock, never()).deleteCarById(anyInt());
    }

    @Test
    void testUpdateCarByIdSuccess() {
        // Arrange
        when(carsMock.updateCarById(anyInt(), anyString(), anyString(), anyString(), anyShort(), anyString(), any(BigDecimal.class), anyString(), anyInt(), anyBoolean(), anyInt(), anyString())).thenReturn(true);

        // Act
        Boolean result = cars.updateCarById(
                1,
                "Toyota",
                "Corolla",
                "ABC-123",
                (short) 2020,
                "PETROL",
                new BigDecimal("50.00"),
                "AUTOMATIC",
                4,
                true,
                5,
                "image.jpg"
        );

        // Assert
        assertTrue(result);
        verify(carsMock, times(1)).updateCarById(
                1,
                "Toyota",
                "Corolla",
                "ABC-123",
                (short) 2020,
                "PETROL",
                new BigDecimal("50.00"),
                "AUTOMATIC",
                4,
                true,
                5,
                "image.jpg"
        );
    }

    @Test
    void testUpdateCarByIdFailure() {
        // Arrange
        when(carsMock.updateCarById(anyInt(), anyString(), anyString(), anyString(), anyShort(), anyString(), any(BigDecimal.class), anyString(), anyInt(), anyBoolean(), anyInt(), anyString())).thenThrow(new RuntimeException("Database error"));

        // Act
        Boolean result = cars.updateCarById(
                1,
                "Toyota",
                "Corolla",
                "ABC-123",
                (short) 2020,
                "PETROL",
                new BigDecimal("50.00"),
                "AUTOMATIC",
                4,
                true,
                5,
                "image.jpg"
        );

        // Assert
        assertFalse(result);
        verify(carsMock, times(1)).updateCarById(
                1,
                "Toyota",
                "Corolla",
                "ABC-123",
                (short) 2020,
                "PETROL",
                new BigDecimal("50.00"),
                "AUTOMATIC",
                4,
                true,
                5,
                "image.jpg"
        );
    }

    @Test
    void testGetPage1Success() {
        // Arrange
        ArrayList<Cars> carList = new ArrayList<>();
        carList.add(testCar);
        when(Cars.getPage1()).thenReturn(carList);

        // Act
        ArrayList<Cars> result = Cars.getPage1();

        // Assert
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("Toyota", result.get(0).getBrand());
        Cars.getPage1();
    }

    @Test
    void testGetPage2Success() {
        // Arrange
        ArrayList<Cars> carList = new ArrayList<>();
        carList.add(testCar);
        when(Cars.getPage2()).thenReturn(carList);

        // Act
        ArrayList<Cars> result = Cars.getPage2();

        // Assert
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("Toyota", result.get(0).getBrand());
        Cars.getPage2();
    }

    @Test
    void testGetPageInputSuccess() {
        // Arrange
        ArrayList<Cars> carList = new ArrayList<>();
        carList.add(testCar);
        when(carsMock.getPageInput(anyInt())).thenReturn(carList);

        // Act
        ArrayList<Cars> result = Cars.getPageInput(1);

        // Assert
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("Toyota", result.get(0).getBrand());
        Cars.getPageInput(1);
    }
}