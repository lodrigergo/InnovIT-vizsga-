package com.backendvizsga.innovit_vizsga.service;

import com.backendvizsga.innovit_vizsga.model.CarAvailability;
import java.util.ArrayList;
import java.util.Date;
import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.Query;
import javax.persistence.StoredProcedureQuery;

public class CarAvailabilityService {
    private CarAvailability layer = new CarAvailability();

//    public Boolean updateCarAvailability(Integer id, Date date, Boolean status) {
//        try {
//            EntityManager em = emf.createEntityManager();  // Assuming emf is available from Cars/Users
//            StoredProcedureQuery spq = em.createStoredProcedureQuery("updateCarAvailability");
//            
//            spq.registerStoredProcedureParameter("idIN", Integer.class, ParameterMode.IN);
//            spq.registerStoredProcedureParameter("dateIN", Date.class, ParameterMode.IN);
//            spq.registerStoredProcedureParameter("statusIN", Boolean.class, ParameterMode.IN);
//            
//            spq.setParameter("idIN", id);
//            spq.setParameter("dateIN", date);
//            spq.setParameter("statusIN", status);
//            
//            spq.execute();
//            
//            em.close();
//            return true;
//            
//        } catch (Exception e) {
//            System.err.println("Error updating availability: " + e.getMessage());
//            return false;
//        }
//    }

    public ArrayList<CarAvailability> getAvailabilityByCarId(Integer carId) {
        ArrayList<CarAvailability> availabilityList = new ArrayList<>();
        try {
//            EntityManager em = emf.createEntityManager();
//            Query query = em.createNamedQuery("CarAvailability.findByCarId");
//            query.setParameter("carId", carId);
//            availabilityList = new ArrayList<>(query.getResultList());
//            em.close();
            
        } catch (Exception e) {
            System.err.println("Error fetching availability: " + e.getMessage());
        }
        return availabilityList;
    }
}