import axios from 'axios';

const SERVER_URL = 'http://localhost:8081'

let authInstance = axios.create({
    baseURL: SERVER_URL,
    timeout: 10000,
});

let instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 10000,
});

instance.interceptors.request.use(function(config) {
    const token = window.localStorage.getItem("reliceToken");
    config.headers.Authorization = "Bearer " + token;
    return config;
});

export default{
    signIn:(jsonObject)=>authInstance.post('/sign-in', jsonObject , {headers: {
        'Content-Type': 'application/json'
    }}).then(response=>{
        return response.data;
    }),
    signUp:(jsonObject)=>authInstance.post('/sign-up', jsonObject, {headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.status;
    }),
    //get (get)
    getCurrentUserDetails:()=>instance.get('/user/getCurrentUserDetails').then(response=>{
        return response.data;
    }),
    getUsersByGroupId:(id)=>instance.get('/admin/getUsersByGroup?id=' + id, { headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    }),
    getAllSelectableOptions:()=>instance.get('/options/getSelectableOptionsArrays')
    .then(response=>{
        return response.data;
    }), 
    generateBarcodesJpg:((jsonObject)=>instance.get('/barcode/generateBarcodesBase64Jpg', jsonObject, {headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    generateBarcodesPdf:(jsonObject)=>instance.post('/barcode/generateBarcodesPdf', jsonObject, {headers: {
        'Content-Type':'application/json',
    },responseType: "blob"}).then(response=>{
        return response.data;
    }),
    getAllAssets:(()=>instance.get('/asset/getAllAssets')
    .then(response=>{
        return response.data;
    })),
    getAssetById:((id)=>instance.get('/asset/getAsset?id=' + id, {headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    getAssetsForGivenFloor:((id)=>instance.get('/asset/getAssetsByFloorId?id=' + id, {headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    getAllBuildings:(()=>instance.get('/office/getAllBuildings')
    .then(response=>{
        return response.data;
    })),
    getFloorById:((id)=>instance.get('office/getFloor?id=' + id, { headers:{
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    getAllFloors:(()=>instance.get('/office/getAllFloors', { headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    getAllFloorsByBuilding:((id)=>instance.get('/office/getFloorsByBuilding?id=' + id, { headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    //update (put)
    updateBuilding:((jsonObject)=>instance.put('/office/updateBuilding', jsonObject, {headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    updateAsset:((jsonObject)=>instance.put('/asset/updateAsset', jsonObject, {headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    updateAssets:((list)=>instance.put('/asset/updateAssets', list, {headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    addConnection:((jsonObject)=>instance.put('/asset/addConnection', jsonObject, {headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    relocateAssets:((jsonObject)=>instance.patch('/asset/relocateAssets', jsonObject, {headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    //create
    createUser:((jsonObject)=>instance.post('/admin/createUser', jsonObject, {headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    createAsset:((jsonObject)=>instance.post('/asset/createAsset', jsonObject, {headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    createBuilding:((jsonObject)=>instance.post('/office/createBuilding', jsonObject, {headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    createFloor:((jsonObject)=>instance.post('/office/createFloor', jsonObject, {headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    createMultiplyAssets:((jsonObject, amount)=>instance.post('/asset/createMultiplyAssets?amount=' + amount, jsonObject, { headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    createConnection:((jsonObject)=>instance.post('/asset/createConnectionForAsset', jsonObject, {headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.data;
    })),
    //delete
    deleteAsset:((id)=>instance.delete('/asset/deleteAsset?id=' + id)
    .then(response=>{
        return response.status;
    })),
    deleteUser:((email)=>instance.delete('/admin/deleteUser?email=' + email)
    .then(response=>{
        return response.status;
    })),
    deleteCurrentUser:(()=>instance.delete('/user/deleteCurrentUser')
    .then(response=>{
        return response.status;
    })),
    deleteAssets:((jsonObject)=>instance.post('/asset/deleteAssets', jsonObject, {headers: {
        'Content-Type':'application/json',
    }}).then(response=>{
        return response.status;
    })),
    deleteBuilding:((id)=>instance.delete('/office/deleteBuilding?id=' + id)
    .then(response=>{
        return response.status;
    })),
    deleteFloor:((id)=>instance.delete('/office/deleteFloor?id=' + id)
    .then(response=>{
        return response.status;
    })),
    deleteConnection:((id)=>instance.delete('/asset/deleteConnectionFromAsset?id=' + id)
    .then(response=>{
        return response.status;
    })),
    downloadReport:(url)=>instance.get(url, {headers: {
        'Content-Type':'application/json',
    },responseType: "blob"}).then(response=>{
        return response.data;
    }),
}