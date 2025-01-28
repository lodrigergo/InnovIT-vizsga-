/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author User
 */
@Entity
@Table(name = "booking_x_car_extras")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "BookingXCarExtras.findAll", query = "SELECT b FROM BookingXCarExtras b"),
    @NamedQuery(name = "BookingXCarExtras.findById", query = "SELECT b FROM BookingXCarExtras b WHERE b.id = :id"),
    @NamedQuery(name = "BookingXCarExtras.findByBookingId", query = "SELECT b FROM BookingXCarExtras b WHERE b.bookingId = :bookingId"),
    @NamedQuery(name = "BookingXCarExtras.findByCarExtrasId", query = "SELECT b FROM BookingXCarExtras b WHERE b.carExtrasId = :carExtrasId")})
public class BookingXCarExtras implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "booking_id")
    private int bookingId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "car_extras_id")
    private int carExtrasId;

    public BookingXCarExtras() {
    }

    public BookingXCarExtras(Integer id) {
        this.id = id;
    }

    public BookingXCarExtras(Integer id, int bookingId, int carExtrasId) {
        this.id = id;
        this.bookingId = bookingId;
        this.carExtrasId = carExtrasId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public int getCarExtrasId() {
        return carExtrasId;
    }

    public void setCarExtrasId(int carExtrasId) {
        this.carExtrasId = carExtrasId;
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
        if (!(object instanceof BookingXCarExtras)) {
            return false;
        }
        BookingXCarExtras other = (BookingXCarExtras) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.backendvizsga.innovit_vizsga.model.BookingXCarExtras[ id=" + id + " ]";
    }
    
}
