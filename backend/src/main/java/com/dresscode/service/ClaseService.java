package com.dresscode.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.dresscode.model.Clase;
import com.dresscode.model.User;

/**
 * Service interface for managing Clase entities.
 */
public interface ClaseService {

    /**
     * Retrieves a list of all Clase entities.
     * 
     * @return a list of Clase entities
     */
    public List<Clase> getAllClases();

    /**
     * Retrieves a Clase entity by its ID.
     * 
     * @param id the ID of the Clase entity to retrieve
     * @return an Optional containing the Clase entity, or an empty Optional if not
     *         found
     */
    public Optional<Clase> getClaseById(Long id);

    /**
     * Creates a new Clase entity.
     * 
     * @param clase the Clase entity to create
     * @return the created Clase entity
     */

    public Clase createClase(Clase clase);

    /**
     * Updates an existing Clase entity.
     * 
     * @param id    the ID of the Clase entity to update
     * @param clase the updated Clase entity
     * @return the updated Clase entity
     */
    public Clase updateClase(Long id, Clase clase);

    /**
     * Deletes a Clase entity by its ID.
     * 
     * @param id the ID of the Clase entity to delete
     * @return the deleted Clase entity
     */
    public Clase deleteClaseById(Long id);

    /**
     * Retrieves a set of User entities associated with a Clase entity.
     * 
     * @param claseId the ID of the Clase entity
     * @return a set of User entities
     */
    public Set<User> getUsersByClaseId(Long claseId);

}
