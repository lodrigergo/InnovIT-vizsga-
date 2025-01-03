/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.model;

import static com.backendvizsga.innovit_vizsga.model.Users.emf;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author User
 */
@Entity
@Table(name = "bookings")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Bookings.findAll", query = "SELECT b FROM Bookings b"),
    @NamedQuery(name = "Bookings.findById", query = "SELECT b FROM Bookings b WHERE b.id = :id"),
    @NamedQuery(name = "Bookings.findByUserId", query = "SELECT b FROM Bookings b WHERE b.userId = :userId"),
    @NamedQuery(name = "Bookings.findByCarId", query = "SELECT b FROM Bookings b WHERE b.carId = :carId"),
    @NamedQuery(name = "Bookings.findByPickupDate", query = "SELECT b FROM Bookings b WHERE b.pickupDate = :pickupDate"),
    @NamedQuery(name = "Bookings.findByReturnDate", query = "SELECT b FROM Bookings b WHERE b.returnDate = :returnDate"),
    @NamedQuery(name = "Bookings.findByTotalPrice", query = "SELECT b FROM Bookings b WHERE b.totalPrice = :totalPrice"),
    @NamedQuery(name = "Bookings.findByFullToFulll", query = "SELECT b FROM Bookings b WHERE b.fullToFulll = :fullToFulll"),
    @NamedQuery(name = "Bookings.findByIsDeleted", query = "SELECT b FROM Bookings b WHERE b.isDeleted = :isDeleted"),
    @NamedQuery(name = "Bookings.findByCreatedAt", query = "SELECT b FROM Bookings b WHERE b.createdAt = :createdAt"),
    @NamedQuery(name = "Bookings.findByDeletedAt", query = "SELECT b FROM Bookings b WHERE b.deletedAt = :deletedAt")})
public class Bookings implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "user_id")
    private int userId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "car_id")
    private int carId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "pickup_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date pickupDate;
    @Basic(optional = false)
    @NotNull
    @Column(name = "return_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date returnDate;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Basic(optional = false)
    @NotNull
    @Column(name = "total_price")
    private BigDecimal totalPrice;
    @Basic(optional = false)
    @NotNull
    @Column(name = "full_to_fulll")
    private boolean fullToFulll;
    @Basic(optional = false)
    @NotNull
    @Column(name = "is_deleted")
    private boolean isDeleted;
    @Basic(optional = false)
    @NotNull
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @Column(name = "deleted_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date deletedAt;

    public Bookings() {
    }

    public Bookings(Integer id) {
        this.id = id;
    }

    public Bookings(Integer id, int userId, int carId, Date pickupDate, Date returnDate, BigDecimal totalPrice, boolean fullToFulll, boolean isDeleted, Date createdAt) {
        this.id = id;
        this.userId = userId;
        this.carId = carId;
        this.pickupDate = pickupDate;
        this.returnDate = returnDate;
        this.totalPrice = totalPrice;
        this.fullToFulll = fullToFulll;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
    }
    
    public Bookings(int userId, int carId, Date pickupDate, Date returnDate, BigDecimal totalPrice, boolean fullToFulll) {
        this.userId = userId;
        this.carId = carId;
        this.pickupDate = pickupDate;
        this.returnDate = returnDate;
        this.totalPrice = totalPrice;
        this.fullToFulll = fullToFulll;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getCarId() {
        return carId;
    }

    public void setCarId(int carId) {
        this.carId = carId;
    }

    public Date getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(Date pickupDate) {
        this.pickupDate = pickupDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public boolean getFullToFulll() {
        return fullToFulll;
    }

    public void setFullToFulll(boolean fullToFulll) {
        this.fullToFulll = fullToFulll;
    }

    public boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(Date deletedAt) {
        this.deletedAt = deletedAt;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Bookings)) {
            return false;
        }
        Bookings other = (Bookings) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.backendvizsga.innovit_vizsga.model.Bookings[ id=" + id + " ]";
    }
    
    public Boolean addBookings(Integer user_id, Integer car_id, Date pickupDate, Date returnDate, BigDecimal totalPrice, boolean fullToFull){
        EntityManager em = emf.createEntityManager();
        Boolean toReturn = false;
        
        try{
            StoredProcedureQuery spq = em.createStoredProcedureQuery("addBookings");
            
            spq.registerStoredProcedureParameter("userIdIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("carIdIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("pickupDateIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("returnDateIN", Date.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("totalPriceIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("fullToFullIN", BigDecimal.class, ParameterMode.IN);
            
            
            spq.setParameter("userIdIN", user_id);
            spq.setParameter("carIdIN", car_id);
            spq.setParameter("pickupDateIN", pickupDate);
            spq.setParameter("returnDateIN", returnDate);
            spq.setParameter("totalPriceIN", totalPrice);
            spq.setParameter("fullToFullIN", fullToFull);
            
            spq.execute();
            
            toReturn = true;
            
        } catch(Exception ex){
            System.err.println("Hiba: " + ex.getLocalizedMessage());
            toReturn = false;
        } finally{
            em.clear();
            em.close();
            return toReturn;
        }
    }
    
    public static ArrayList<Bookings> getAllBookings() {
        EntityManager em = emf.createEntityManager();
        ArrayList<Bookings> bookingList = new ArrayList<>();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getAllBookings", Bookings.class);
            spq.execute();
            bookingList = new ArrayList<>(spq.getResultList());

        } catch (Exception e) {
            System.err.println("Error: " + e.getLocalizedMessage());
        } finally {
            em.clear();
            em.close();
        }

        return bookingList;
    }
    public Bookings getBookingByUserId(Integer user_id) {
        try {
            return new Bookings(user_id);
        } catch (Exception e) {
            System.err.println("Hiba: " + e.getLocalizedMessage());
            return null;
        }
    }
      public Bookings getBookingById(Integer id) {
        try {
            return new Bookings(id);
        } catch (Exception e) {
            System.err.println("Hiba: " + e.getLocalizedMessage());
            return null;
        }
    }
      public Boolean deleteBookingById(Integer id) {
        EntityManager em = emf.createEntityManager();
        Boolean toReturn = false;

        try {

            StoredProcedureQuery spq = em.createStoredProcedureQuery("deleteBookingById");
            spq.registerStoredProcedureParameter("idIN", Integer.class, ParameterMode.IN);
            spq.setParameter("idIN", id);

            spq.execute();

            toReturn = true;

        } catch (Exception e) {
            System.err.println("Hiba: " + e.getLocalizedMessage());
            toReturn = false;
        } finally {
            em.clear();
            em.close();
            return toReturn;
        }
    }
    
}
