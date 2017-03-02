package com.kirak.view_model;

/**
 * Created by Kir on 28.02.2017.
 */


//RequestParams processing model
public interface RequestParams {

    public String getSortType();

    public void setSortType(String sortType);

    public String getSortField();

    public void setSortField(String sortField);

    public String getNameFilter();

    public void setNameFilter(String nameFilter);

    public Integer getAgeMoreThanFilter();

    public void setAgeMoreThanFilter(Integer ageMoreThanFilter);

    public Integer getAgeLessThanFilter();

    public void setAgeLessThanFilter(Integer ageLessThanFilter);

    public Boolean getIsAdminFilter();

    public void setIsAdminFilter(Boolean isAdminFilter);
}
