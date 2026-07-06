import axios from "axios";
import { showApiError } from "../utils/AlertUtils";

const api = axios.create({
    baseURL: 'http://10.0.2.2:5000',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   }
    headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzgzMTY5ODgzLCJleHAiOjE3ODMxNzM0ODN9.FUShhj-ymznJ0C3r0ovizDf_6P3ur4WDC_SW2uZbY1Y`
    }
});

//Login Api
export async function handleLogin(phoneNumber: string, password: string) {
    try {
        console.log('http://10.0.2.2:5000/api/users/login', password, phoneNumber)
        const response = await axios.post('http://10.0.2.2:5000/api/users/login', {
            phone: phoneNumber,
            password: password
        })
        console.log(response)
        return response
    } catch (err: any) {
        showApiError(err, 'Login Failed !!!')
        throw err
    }
}

//Create Event Api
export async function createEvent(data: {
    event_type: string;
    event_name: string | undefined;
    event_date_time: string;
    devotee_name: string;
    devotee_phone_number: string;
    devotee_address: string;
    amount: number;
    payment_status: string;
}) {
    try {
        const response = await api.post(`http://10.0.2.2:5000/api/events/create-event`, data)
        return response
    } catch (err) {
        showApiError(err, 'Event Creation Failed!!')
        throw err
    }
}


//Create User Api
export async function createUser(data: {
    name: string;
    phone: string;
    father_name: string;
    address: string;
    email: string;
    role: string;
    isAdmin: boolean;
}) {
    try {
        const response = await api.post('http://10.0.2.2:5000/api/users/new-user', data)
        return response
    } catch (err) {
        showApiError(err, "User Creation Failed!!")
        throw err
    }
}


//Create Festival Api
export async function createFestival(data: {
    festival_name: string;
    amount: number;
    description: string;
    start_date: string;
    end_date: string;
}) {
    try {
        const response = await api.post('http://10.0.2.2:5000/api/festivals/create-festival', data)
        return response
    } catch (err) {
        showApiError(err, "Festival Creation Failed!!")
        throw err
    }
}


//Create Scheme Api
export async function createScheme(data: {
    scheme_name: string;
    description: string;
    target_amount: number;
}) {
    try {
        const response = await api.post('http://10.0.2.2:5000/api/donation-schemes/create-donation-scheme', data)
        return response
    } catch (err) {
        showApiError(err, "Scheme Creation Failed!!")
        throw err
    }
}

//Create Festival Contribution Api
export async function createFestivalContribution(data: {
    user_id: number,
    festival_id: number,
    amount_paid: number,
    payment_status: string
}) {
    try {
        const response = await api.post('http://10.0.2.2:5000/api/festival-payments/festival-payment', data)
        return response
    } catch (err) {
        showApiError(err, "Festival Contribution Failed!!")
        throw err
    }
}

//Create Assign Scheme Contribution Api
export async function createAssignSchemeContribution(data: {
    user_id: number | null,
    donation_scheme_id: number | null,
    amount_assigned: number,
}) {
    try {
        const response = await api.post('http://10.0.2.2:5000/api/donation-scheme-payments/create-donation-scheme-payment', data)
        return response
    } catch (err) {
        showApiError(err, "Assign Scheme Contribution Failed!!")
        throw err
    }
}