<<<<<<< HEAD
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.model;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.ParameterMode;
import javax.persistence.Persistence;
import javax.persistence.StoredProcedureQuery;
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
@Table(name = "users")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Users.findAll", query = "SELECT u FROM Users u"),
    @NamedQuery(name = "Users.findById", query = "SELECT u FROM Users u WHERE u.id = :id"),
    @NamedQuery(name = "Users.findByName", query = "SELECT u FROM Users u WHERE u.name = :name"),
    @NamedQuery(name = "Users.findByEmail", query = "SELECT u FROM Users u WHERE u.email = :email"),
    @NamedQuery(name = "Users.findByPassword", query = "SELECT u FROM Users u WHERE u.password = :password"),
    @NamedQuery(name = "Users.findByPersonalId", query = "SELECT u FROM Users u WHERE u.personalId = :personalId"),
    @NamedQuery(name = "Users.findByIsAdmin", query = "SELECT u FROM Users u WHERE u.isAdmin = :isAdmin"),
    @NamedQuery(name = "Users.findByIsDeleted", query = "SELECT u FROM Users u WHERE u.isDeleted = :isDeleted"),
    @NamedQuery(name = "Users.findByCreatedAt", query = "SELECT u FROM Users u WHERE u.createdAt = :createdAt"),
    @NamedQuery(name = "Users.findByDeletedAt", query = "SELECT u FROM Users u WHERE u.deletedAt = :deletedAt")})
public class Users implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "name")
    private String name;
    // @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Invalid email")//if the field contains email address consider using this annotation to enforce field validation
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "email")
    private String email;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 30)
    @Column(name = "password")
    private String password;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "personal_id")
    private String personalId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "is_admin")
    private boolean isAdmin;
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

    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.backendVizsga_InnovIT_vizsga_war_1.0-SNAPSHOTPU");

    public Users() {
    }
    
    public Users(String name) {
    this.name = name;
}


    public Users(String name, String email, String password, String personalId, boolean isAdmin) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.personalId = personalId;
        this.isAdmin = isAdmin;
    }

    public Users(String name, String email, String password, String personalId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.personalId = personalId;
    }

    public Users(Integer id) {
        EntityManager em = emf.createEntityManager();

        try {
            Users u = em.find(Users.class, id);

            this.id = u.getId();
            this.name = u.getName();
            this.email = u.getEmail();
            this.password = u.getPassword();
            this.personalId = u.getPersonalId();
            this.isAdmin = u.getIsAdmin();
            this.isDeleted = u.getIsDeleted();
            this.createdAt = u.getCreatedAt();
            this.deletedAt = u.getDeletedAt();

        } catch (Exception ex) {
            System.err.println("Hiba: " + ex.getLocalizedMessage());
        } finally {
            em.clear();
            em.close();
        }
    }

    public Users(Integer id, String name, String email, String password, String personalId, boolean isAdmin, boolean isDeleted, Date createdAt, Date deletedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.personalId = personalId;
        this.isAdmin = isAdmin;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPersonalId() {
        return personalId;
    }

    public void setPersonalId(String personalId) {
        this.personalId = personalId;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
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
        if (!(object instanceof Users)) {
            return false;
        }
        Users other = (Users) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.backendvizsga.innovit_vizsga.model.Users[ id=" + id + " ]";
    }

   public Users login(String email, String password) {
    EntityManager em = emf.createEntityManager();
    try {
        StoredProcedureQuery spq = em.createStoredProcedureQuery("login");
        spq.registerStoredProcedureParameter("emailIN", String.class, ParameterMode.IN);
        spq.registerStoredProcedureParameter("passwordIN", String.class, ParameterMode.IN);
        spq.registerStoredProcedureParameter("resultOUT", Boolean.class, ParameterMode.OUT);
        spq.registerStoredProcedureParameter("nameOUT", String.class, ParameterMode.OUT);  // A név paraméter

        spq.setParameter("emailIN", email);
        spq.setParameter("passwordIN", password);

        // Eljárás futtatása
        spq.execute();

        // Kimeneti paraméterek lekérése
        Boolean resultOUT = (Boolean) spq.getOutputParameterValue("resultOUT");
        String nameOUT = (String) spq.getOutputParameterValue("nameOUT");  // A név lekérése

        if (resultOUT) {
            // Ha a resultOUT true, akkor sikeres bejelentkezés
            return new Users(nameOUT);  // Felhasználó neve a nameOUT változóban
        }

        // Ha resultOUT false, akkor nincs megfelelő felhasználó
        return null;

    } catch (Exception e) {
        System.err.println("Hiba: " + e.getLocalizedMessage());
        return null;
    } finally {
        em.clear();
        em.close();
    }
}





    public static ArrayList<Users> getAllUser() {
        EntityManager em = emf.createEntityManager();
        ArrayList<Users> userList = new ArrayList<>();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getAllUser", Users.class);
            spq.execute();
            userList = new ArrayList<>(spq.getResultList());

        } catch (Exception e) {
            System.err.println("Error: " + e.getLocalizedMessage());
        } finally {
            em.clear();
            em.close();
        }

        return userList;
    }

    public static Boolean isUserExists(String email) {
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("isUserExists");
            spq.registerStoredProcedureParameter("emailIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("resultOUT", Boolean.class, ParameterMode.OUT);

            spq.setParameter("emailIN", email);

            spq.execute();

            Boolean result = Boolean.valueOf(spq.getOutputParameterValue("resultOUT").toString());

            return result;

        } catch (Exception ex) {
            System.err.println("Hiba: " + ex.getLocalizedMessage());
            return null;
        } finally {
            em.clear();
            em.close();
        }
    }

    public static ArrayList<Users> getAllAdmin() {
        EntityManager em = emf.createEntityManager();
        ArrayList<Users> userList = new ArrayList<>();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getAllAdmin", Users.class);
            spq.execute();
            userList = new ArrayList<>(spq.getResultList());

        } catch (Exception e) {
            System.err.println("Error: " + e.getLocalizedMessage());
        } finally {
            em.clear();
            em.close();
        }

        return userList;
    }

    public Users getUserById(Integer id) {
        try {
            return new Users(id);
        } catch (Exception e) {
            System.err.println("Hiba: " + e.getLocalizedMessage());
            return null;
        }
    }

    public Users getUserDetailsByCarId(Integer car_id) {
        try {
            return new Users(car_id);
        } catch (Exception e) {
            System.err.println("Hiba: " + e.getLocalizedMessage());
            return null;
        }
    }

    public Boolean registerUser(Users u) {
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("registerUser");
            spq.registerStoredProcedureParameter("nameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("emailIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("passwordIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("personalIdIN", String.class, ParameterMode.IN);

            spq.setParameter("nameIN", u.getName());
            spq.setParameter("emailIN", u.getEmail());
            spq.setParameter("passwordIN", u.getPassword());
            spq.setParameter("personalIdIN", u.getPersonalId());

            spq.execute();
            return true;

        } catch (Exception ex) {
            System.err.println("Hiba: " + ex.getLocalizedMessage());
            return false;
        } finally {
            em.clear();
            em.close();
        }
    }

    public Boolean deleteUserById(Integer id) {
        EntityManager em = emf.createEntityManager();
        Boolean toReturn = false;

        try {

            StoredProcedureQuery spq = em.createStoredProcedureQuery("deleteUserById");
            spq.registerStoredProcedureParameter("user_idIN", Integer.class, ParameterMode.IN);
            spq.setParameter("user_idIN", id);

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
    
    public Boolean changePassword(Integer userId, String newPassword, Integer creator) {
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("changePassword");

            spq.registerStoredProcedureParameter("idIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("newPasswordIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("creatorIN", Integer.class, ParameterMode.IN);

            spq.setParameter("idIN", userId);
            spq.setParameter("newPasswordIN", newPassword);
            spq.setParameter("creatorIN", creator);

            spq.execute();

            return true;
        } catch (Exception e) {
            System.err.println("Hiba: " + e.getLocalizedMessage());
            return false;
        } finally {
            em.clear();
            em.close();
        }
    }
    
    public static Boolean sendEmail(String to, boolean ccMe){
        try{
            //Email küldő email címe és alkalmazás jelszava
            final String from = "gergolodri6@gmail.com";
            final String password = "yixw mqqq jvht corn";
            
            //Tulajdonságok beállítása
            String host = "smtp.gmail.com";

            Properties properties = System.getProperties();

            properties.put("mail.smtp.host", host);
            properties.put("mail.smtp.port", "465");
            properties.put("mail.smtp.ssl.enable", "true");
            properties.put("mail.smtp.auth", "true");
            
            //Application password beállítása az email címhez és session config
            Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(from, password);
                }
            });
            session.setDebug(true);
            
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject("Teszt email");
            
            String msg = "Az lesz az a szöveg ami az emailbe kerül. Ez lehet nagyon hosszú is akár meg lehet html meg lehet bármi más is :)";
            message.setContent(msg, "text/html;charset=utf-8");
            
            Transport.send(message);
            
            return true;
        } catch(Exception ex){
            System.err.println("Hiba: " + ex.getLocalizedMessage());
            return false;
        }
    }

}
=======
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.backendvizsga.innovit_vizsga.model;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.ParameterMode;
import javax.persistence.Persistence;
import javax.persistence.StoredProcedureQuery;
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
@Table(name = "users")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Users.findAll", query = "SELECT u FROM Users u"),
    @NamedQuery(name = "Users.findById", query = "SELECT u FROM Users u WHERE u.id = :id"),
    @NamedQuery(name = "Users.findByName", query = "SELECT u FROM Users u WHERE u.name = :name"),
    @NamedQuery(name = "Users.findByEmail", query = "SELECT u FROM Users u WHERE u.email = :email"),
    @NamedQuery(name = "Users.findByPassword", query = "SELECT u FROM Users u WHERE u.password = :password"),
    @NamedQuery(name = "Users.findByPersonalId", query = "SELECT u FROM Users u WHERE u.personalId = :personalId"),
    @NamedQuery(name = "Users.findByIsAdmin", query = "SELECT u FROM Users u WHERE u.isAdmin = :isAdmin"),
    @NamedQuery(name = "Users.findByIsDeleted", query = "SELECT u FROM Users u WHERE u.isDeleted = :isDeleted"),
    @NamedQuery(name = "Users.findByCreatedAt", query = "SELECT u FROM Users u WHERE u.createdAt = :createdAt"),
    @NamedQuery(name = "Users.findByDeletedAt", query = "SELECT u FROM Users u WHERE u.deletedAt = :deletedAt")})
public class Users implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "name")
    private String name;
    // @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Invalid email")//if the field contains email address consider using this annotation to enforce field validation
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "email")
    private String email;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 30)
    @Column(name = "password")
    private String password;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "personal_id")
    private String personalId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "is_admin")
    private boolean isAdmin;
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

    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("com.backendVizsga_InnovIT_vizsga_war_1.0-SNAPSHOTPU");

    public Users() {
    }

    public Users(String name, String email, String password, String personalId, boolean isAdmin) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.personalId = personalId;
        this.isAdmin = isAdmin;
    }

    public Users(String name, String email, String password, String personalId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.personalId = personalId;
    }

    public Users(Integer id) {
        EntityManager em = emf.createEntityManager();

        try {
            Users u = em.find(Users.class, id);

            this.id = u.getId();
            this.name = u.getName();
            this.email = u.getEmail();
            this.password = u.getPassword();
            this.personalId = u.getPersonalId();
            this.isAdmin = u.getIsAdmin();
            this.isDeleted = u.getIsDeleted();
            this.createdAt = u.getCreatedAt();
            this.deletedAt = u.getDeletedAt();

        } catch (Exception ex) {
            System.err.println("Hiba: " + ex.getLocalizedMessage());
        } finally {
            em.clear();
            em.close();
        }
    }

    public Users(Integer id, String name, String email, String password, String personalId, boolean isAdmin, boolean isDeleted, Date createdAt, Date deletedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.personalId = personalId;
        this.isAdmin = isAdmin;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.deletedAt = deletedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPersonalId() {
        return personalId;
    }

    public void setPersonalId(String personalId) {
        this.personalId = personalId;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
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
        if (!(object instanceof Users)) {
            return false;
        }
        Users other = (Users) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.backendvizsga.innovit_vizsga.model.Users[ id=" + id + " ]";
    }

    public Users login(String email, String password) {
        EntityManager em = emf.createEntityManager();
        try {

            StoredProcedureQuery spq = em.createStoredProcedureQuery("login");
            spq.registerStoredProcedureParameter("emailIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("passwordIN", String.class, ParameterMode.IN);

            spq.setParameter("emailIN", email);
            spq.setParameter("passwordIN", password);

            spq.execute();

            List<Object[]> resultList = spq.getResultList();
            Users toReturn = new Users();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            for (Object[] o : resultList) {
                Users u = new Users(
                        Integer.valueOf(o[0].toString()), // id
                        o[1].toString(), // name
                        o[2].toString(), // email
                        o[3].toString(), // password
                        o[4].toString(), // personal_id
                        Boolean.valueOf(o[6].toString()), // is_deleted
                        Boolean.valueOf(o[5].toString()), // is_admin
                        o[7] == null ? null : formatter.parse(o[7].toString()), // created_at
                        o[8] == null ? null : formatter.parse(o[8].toString()) // deleted_at
                );
                toReturn = u;
            }
            return toReturn;

        } catch (Exception e) {
            System.err.println("Hiba: " + e.getLocalizedMessage());
            return null;
        } finally {
            em.clear();
            em.close();
        }
    }

    public static ArrayList<Users> getAllUser() {
        EntityManager em = emf.createEntityManager();
        ArrayList<Users> userList = new ArrayList<>();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getAllUser", Users.class);
            spq.execute();
            userList = new ArrayList<>(spq.getResultList());

        } catch (Exception e) {
            System.err.println("Error: " + e.getLocalizedMessage());
        } finally {
            em.clear();
            em.close();
        }

        return userList;
    }

    public static Boolean isUserExists(String email) {
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("isUserExists");
            spq.registerStoredProcedureParameter("emailIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("resultOUT", Boolean.class, ParameterMode.OUT);

            spq.setParameter("emailIN", email);

            spq.execute();

            Boolean result = Boolean.valueOf(spq.getOutputParameterValue("resultOUT").toString());

            return result;

        } catch (Exception ex) {
            System.err.println("Hiba: " + ex.getLocalizedMessage());
            return null;
        } finally {
            em.clear();
            em.close();
        }
    }

    public static ArrayList<Users> getAllAdmin() {
        EntityManager em = emf.createEntityManager();
        ArrayList<Users> userList = new ArrayList<>();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("getAllAdmin", Users.class);
            spq.execute();
            userList = new ArrayList<>(spq.getResultList());

        } catch (Exception e) {
            System.err.println("Error: " + e.getLocalizedMessage());
        } finally {
            em.clear();
            em.close();
        }

        return userList;
    }

    public Users getUserById(Integer id) {
        try {
            return new Users(id);
        } catch (Exception e) {
            System.err.println("Hiba: " + e.getLocalizedMessage());
            return null;
        }
    }

    public Users getUserDetailsByCarId(Integer car_id) {
        try {
            return new Users(car_id);
        } catch (Exception e) {
            System.err.println("Hiba: " + e.getLocalizedMessage());
            return null;
        }
    }

    public Boolean registerUser(Users u) {
        EntityManager em = emf.createEntityManager();

        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("registerUser");
            spq.registerStoredProcedureParameter("nameIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("emailIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("passwordIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("personalIdIN", String.class, ParameterMode.IN);

            spq.setParameter("nameIN", u.getName());
            spq.setParameter("emailIN", u.getEmail());
            spq.setParameter("passwordIN", u.getPassword());
            spq.setParameter("personalIdIN", u.getPersonalId());

            spq.execute();
            return true;

        } catch (Exception ex) {
            System.err.println("Hiba: " + ex.getLocalizedMessage());
            return false;
        } finally {
            em.clear();
            em.close();
        }
    }

    public Boolean deleteUserById(Integer id) {
        EntityManager em = emf.createEntityManager();
        Boolean toReturn = false;

        try {

            StoredProcedureQuery spq = em.createStoredProcedureQuery("deleteUserById");
            spq.registerStoredProcedureParameter("user_idIN", Integer.class, ParameterMode.IN);
            spq.setParameter("user_idIN", id);

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
>>>>>>> parent of 058b7b6 (login javítás)
