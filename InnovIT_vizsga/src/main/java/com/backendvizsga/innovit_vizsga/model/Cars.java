/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.model;

import static com.backendvizsga.innovit_vizsga.model.Users.emf;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author User
 */
@Entity
@Table(name = "cars")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Cars.findAll", query = "SELECT c FROM Cars c"),
    @NamedQuery(name = "Cars.findById", query = "SELECT c FROM Cars c WHERE c.id = :id"),
    @NamedQuery(name = "Cars.findByBrand", query = "SELECT c FROM Cars c WHERE c.brand = :brand"),
    @NamedQuery(name = "Cars.findByModel", query = "SELECT c FROM Cars c WHERE c.model = :model"),
    @NamedQuery(name = "Cars.findByLicensePlate", query = "SELECT c FROM Cars c WHERE c.licensePlate = :licensePlate"),
    @NamedQuery(name = "Cars.findByYear", query = "SELECT c FROM Cars c WHERE c.year = :year"),
    @NamedQuery(name = "Cars.findByFuelType", query = "SELECT c FROM Cars c WHERE c.fuelType = :fuelType"),
    @NamedQuery(name = "Cars.findByPricePerDay", query = "SELECT c FROM Cars c WHERE c.pricePerDay = :pricePerDay"),
    @NamedQuery(name = "Cars.findByIsDeleted", query = "SELECT c FROM Cars c WHERE c.isDeleted = :isDeleted"),
    @NamedQuery(name = "Cars.findByCreatedAt", query = "SELECT c FROM Cars c WHERE c.createdAt = :createdAt"),
    @NamedQuery(name = "Cars.findByDeletedAt", query = "SELECT c FROM Cars c WHERE c.deletedAt = :deletedAt")})
public class Cars implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "brand")
    private String brand;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "model")
    private String model;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "license_plate")
    private String licensePlate;
    @Basic(optional = false)
    @NotNull
    @Column(name = "year")
    @Temporal(TemporalType.DATE)
    private Date year;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "fuel_type")
    private String fuelType;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Basic(optional = false)
    @NotNull
    @Column(name = "price_per_day")
    private BigDecimal pricePerDay;
    @Basic(optional = false)
    @NotNull
    @Lob
    @Size(min = 1, max = 65535)
    @Column(name = "image")
    private String image;
    @Basic(optional = false)
    @NotNull
    @Lob
    @Size(min = 1, max = 65535)
    @Column(name = "other")
    private String other;
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

   public Cars(){
       
   }
   
   public Cars(Integer id){
       EntityManager em = emf.createEntityManager();
       
       try{
       Cars c = em.find(Cars.class, id);
       
       this.id = c.getId();
       this.brand = c.getBrand();
       this.model = c.getModel();
       this.licensePlate = c.getLicensePlate();
       this.year = c.getYear();
       this.fuelType = c.getFuelType();
       this.pricePerDay = c.getPricePerDay();
       this.image = c.getImage();
       this.other = c.getOther();
       this.isDeleted = c.getIsDeleted();
       this.createdAt = c.getCreatedAt();
       this.deletedAt = c.getDeletedAt();
       
       }catch(Exception ex){
           System.err.println("Hiba: " + ex.getLocalizedMessage());
       }finally{
           em.clear();
           em.close();
       }
   }

    public Cars(Integer id, String brand, String model, String licensePlate, Date year, String fuelType, BigDecimal pricePerDay, String image, String other, boolean isDeleted, Date createdAt) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.licensePlate = licensePlate;
        this.year = year;
        this.fuelType = fuelType;
        this.pricePerDay = pricePerDay;
        this.image = image;
        this.other = other;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public Date getYear() {
        return year;
    }

    public void setYear(Date year) {
        this.year = year;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public BigDecimal getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(BigDecimal pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getOther() {
        return other;
    }

    public void setOther(String other) {
        this.other = other;
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
        if (!(object instanceof Cars)) {
            return false;
        }
        Cars other = (Cars) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.backendvizsga.innovit_vizsga.model.Cars[ id=" + id + " ]";
    }
    
    public Cars getCarById(Integer id) {
        try {
            return new Cars(id);
        } catch (Exception e) {
            System.err.println("Hiba: " + e.getLocalizedMessage());
            return null;
        }
    }
    
    
    
}
