/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
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
@Table(name = "car_availability")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CarAvailability.findAll", query = "SELECT c FROM CarAvailability c"),
    @NamedQuery(name = "CarAvailability.findById", query = "SELECT c FROM CarAvailability c WHERE c.id = :id"),
    @NamedQuery(name = "CarAvailability.findByCarId", query = "SELECT c FROM CarAvailability c WHERE c.carId = :carId"),
    @NamedQuery(name = "CarAvailability.findByDate", query = "SELECT c FROM CarAvailability c WHERE c.date = :date"),
    @NamedQuery(name = "CarAvailability.findByStatus", query = "SELECT c FROM CarAvailability c WHERE c.status = :status"),
    @NamedQuery(name = "CarAvailability.findByIsDeleted", query = "SELECT c FROM CarAvailability c WHERE c.isDeleted = :isDeleted"),
    @NamedQuery(name = "CarAvailability.findByCreatedAt", query = "SELECT c FROM CarAvailability c WHERE c.createdAt = :createdAt"),
    @NamedQuery(name = "CarAvailability.findByDeletedAt", query = "SELECT c FROM CarAvailability c WHERE c.deletedAt = :deletedAt")})
public class CarAvailability implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "car_id")
    private int carId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
    @Basic(optional = false)
    @NotNull
    @Column(name = "status")
    private boolean status;
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

    public CarAvailability() {
    }

    public CarAvailability(Integer id) {
        this.id = id;
    }

    public CarAvailability(Integer id, int carId, Date date, boolean status, boolean isDeleted, Date createdAt) {
        this.id = id;
        this.carId = carId;
        this.date = date;
        this.status = status;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getCarId() {
        return carId;
    }

    public void setCarId(int carId) {
        this.carId = carId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
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
        if (!(object instanceof CarAvailability)) {
            return false;
        }
        CarAvailability other = (CarAvailability) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.backendvizsga.innovit_vizsga.model.CarAvailability[ id=" + id + " ]";
    }
    
}
