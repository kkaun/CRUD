package com.kirak.controller;

import com.kirak.view_model.OperationPageModel;
import com.kirak.view_model.RequestParamsManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.kirak.dao.UserDao;
import com.kirak.entity_model.User;
import javax.validation.Valid;
import java.util.List;


/**
 * Created by Kir on 28.02.2017.
 */

//Business logic Controller. Spring REST Controller
@RestController
@RequestMapping("/crud")
public class CrudController {


    @Autowired
    private UserDao userDao;


    @RequestMapping(value = "/getPage/{pageSize}/{pageNumber}", method = RequestMethod.GET)
    public
    @ResponseBody
    OperationPageModel getPage(@PathVariable("pageNumber") Integer pageNumber, @PathVariable("pageSize") Integer pageSize,
                               @Valid @ModelAttribute RequestParamsManager requestParamsManager) {

        return userDao.getPage(pageNumber, pageSize, requestParamsManager.getSortType(),
                requestParamsManager.getSortField(), requestParamsManager.getNameFilter(), requestParamsManager.getAgeMoreThanFilter(),
                requestParamsManager.getAgeLessThanFilter(), requestParamsManager.getIsAdminFilter());
    }


    @RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
    public
    @ResponseBody
    User getUserById(@PathVariable("id") Integer id) {
        return userDao.getById(id);
    }


    @RequestMapping(value = "/post", method = RequestMethod.POST)
    public void updateUser(@RequestBody @Valid User updatedUser) {
        userDao.saveOrUpdate(updatedUser);
    }


    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public
    @ResponseBody
    List<?> getAllUsers() {
        System.out.println(userDao.getAll().toString());
        return userDao.getAll();
    }


    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable("id") Integer id) {
        userDao.delete(id);
    }

}