package com.kirak.dao;

import com.kirak.view_model.OperationPageModel;
import com.kirak.entity_model.User;
import java.util.List;


/**
 * Created by Kir on 27.02.2017.
 */

//DataAccessObject
public interface UserDao {
    List<?> getAll();

    User getById(int id);

    void saveOrUpdate(User user);

    void delete(int id);

    OperationPageModel getPage(int pageNumber, int pageSize, String sortType, String sortField, String nameFilter,
                               Integer ageMoreFilter, Integer ageLessFilter, Boolean isAdminFilter);
}