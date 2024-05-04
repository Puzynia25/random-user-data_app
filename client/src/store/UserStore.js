import { makeAutoObservable } from "mobx";
import { INITIAL_COUNT_USERS, INITIAL_PAGE } from "../utils.js/consts";

export default class UserStore {
    constructor() {
        this._userTable = [];
        this._isFetching = false;
        this._currentPage = INITIAL_PAGE;
        this._countUsers = INITIAL_COUNT_USERS;

        this._selectedRegion = "EN";
        this._errorValue = 0;
        this._seedValue = 0;
        makeAutoObservable(this);
    }

    setUserTable(userData) {
        this._userTable = userData;
    }

    addUsers(newUsers) {
        this._userTable = [...this._userTable, ...newUsers];
    }

    setIsFetching(bool) {
        this._isFetching = bool;
    }

    setCurrentPage(page) {
        this._currentPage = page;
    }

    incrementCurrentPage() {
        this._currentPage += 1;
    }

    setCountUsers(value) {
        this._countUsers = value;
    }

    setSelectedRegion(region) {
        this._selectedRegion = region;
    }

    setErrorValue(int) {
        this._errorValue = int;
    }

    setSeedValue(int) {
        this._seedValue = int;
    }

    get userTable() {
        return this._userTable;
    }

    get isFetching() {
        return this._isFetching;
    }

    get currentPage() {
        return this._currentPage;
    }

    get countUsers() {
        return this._countUsers;
    }

    get selectedRegion() {
        return this._selectedRegion;
    }

    get errorValue() {
        return this._errorValue;
    }

    get seedValue() {
        return this._seedValue;
    }
}
