package com.kirak.view_model;

import javax.validation.constraints.Pattern;

/**
 * Created by Kir on 28.02.2017.
 */


//Implementation of request processing model. Part of implemented MVC logic.
public class RequestParamsManager implements RequestParams {

    private String nameFilter;
    private Boolean isAdminFilter;
    private Integer ageMoreThanFilter;
    private Integer ageLessThanFilter;

    @Pattern(regexp = "^name$|^age$|^isAdmin$|^createdDate$")
    private String sortField;
    @Pattern(regexp = "^asc$|^desc$")
    private String sortType;

    public RequestParamsManager() {
    }

    @Override
    public String getSortType() {
        return sortType;
    }

    @Override
    public void setSortType(String sortType) {
        this.sortType = sortType;
    }

    @Override
    public String getSortField() {
        return sortField;
    }

    @Override
    public void setSortField(String sortField) {
        this.sortField = sortField;
    }

    @Override
    public String getNameFilter() {
        return nameFilter;
    }

    @Override
    public void setNameFilter(String nameFilter) {
        this.nameFilter = nameFilter;
    }

    @Override
    public Integer getAgeMoreThanFilter() {
        return ageMoreThanFilter;
    }

    @Override
    public void setAgeMoreThanFilter(Integer ageMoreThanFilter) {
        this.ageMoreThanFilter = ageMoreThanFilter;
    }

    @Override
    public Integer getAgeLessThanFilter() {
        return ageLessThanFilter;
    }

    public void setAgeLessThanFilter(Integer ageLessThanFilter) {
        this.ageLessThanFilter = ageLessThanFilter;
    }

    @Override
    public Boolean getIsAdminFilter() {
        return isAdminFilter;
    }

    @Override
    public void setIsAdminFilter(Boolean isAdminFilter) {
        this.isAdminFilter = isAdminFilter;
    }

}
