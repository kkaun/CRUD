package com.kirak.view_model;

import java.util.List;


/**
 * Created by Kir on 28.02.2017.
 */

//Single operations-page model. Part of implemented MVC logic.
public class OperationPageModel {

    private int allUsers;
    private List<?> opData;

    public OperationPageModel() {
    }

    public OperationPageModel(int totalUsersNumber, List<?> data) {
        this.allUsers = totalUsersNumber;
        this.opData = data;
    }

    public List<?> getData() {
        return opData;
    }

    public void setData(List<?> data) {
        this.opData = data;
    }

    public int getTotalUsersNumber() {
        return allUsers;
    }

    public void setTotalUsersNumber(int totalUsersNumber) {
        this.allUsers = totalUsersNumber;
    }


}
