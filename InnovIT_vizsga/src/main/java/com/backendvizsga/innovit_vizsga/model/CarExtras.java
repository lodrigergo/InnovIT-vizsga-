/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.model;

import java.io.Serializable;
import java.math.BigDecimal;
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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author User
 */
@Entity
@Table(name = "car_extras")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CarExtras.findAll", query = "SELECT c FROM CarExtras c"),
    @NamedQuery(name = "CarExtras.findById", query = "SELECT c FROM CarExtras c WHERE c.id = :id"),
    @NamedQuery(name = "CarExtras.findByCarId", query = "SELECT c FROM CarExtras c WHERE c.carId = :carId"),
    @NamedQuery(name = "CarExtras.findByExtraName", query = "SELECT c FROM CarExtras c WHERE c.extraName = :extraName"),
    @NamedQuery(name = "CarExtras.findByExtraCost", query = "SELECT c FROM CarExtras c WHERE c.extraCost = :extraCost"),
    @NamedQuery(name = "CarExtras.findByIsDeleted", query = "SELECT c FROM CarExtras c WHERE c.isDeleted = :isDeleted"),
    @NamedQuery(name = "CarExtras.findByCreatedAt", query = "SELECT c FROM CarExtras c WHERE c.createdAt = :createdAt"),
    @NamedQuery(name = "CarExtras.findByDeletedAt", query = "SELECT c FROM CarExtras c WHERE c.deletedAt = :deletedAt")})
public class CarExtras implements Serializable {

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
    @Size(min = 1, max = 50)
    @Column(name = "extra_name")
    private String extraName;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Basic(optional = false)
    @NotNull
    @Column(name = "extra_cost")
    private BigDecimal extraCost;
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

    public CarExtras() {
    }

    public CarExtras(Integer id) {
        this.id = id;
    }

    public CarExtras(Integer id, int carId, String extraName, BigDecimal extraCost, boolean isDeleted, Date createdAt) {
        this.id = id;
        this.carId = carId;
        this.extraName = extraName;
        this.extraCost = extraCost;
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

    public String getExtraName() {
        return extraName;
    }

    public void setExtraName(String extraName) {
        this.extraName = extraName;
    }

    public BigDecimal getExtraCost() {
        return extraCost;
    }

    public void setExtraCost(BigDecimal extraCost) {
        this.extraCost = extraCost;
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
        if (!(object instanceof CarExtras)) {
            return false;
        }
        CarExtras other = (CarExtras) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.backendvizsga.innovit_vizsga.model.CarExtras[ id=" + id + " ]";
    }
    
}
