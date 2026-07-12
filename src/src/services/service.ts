// const api = axios.create({
//     baseURL: 'http://10.0.2.2:5000',
//     //   headers: {
//     //     'Authorization': `Bearer ${localStorage.getItem('token')}`
//     //   }
//     headers: {
//         'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzgzMTY5ODgzLCJleHAiOjE3ODMxNzM0ODN9.FUShhj-ymznJ0C3r0ovizDf_6P3ur4WDC_SW2uZbY1Y`
//     }
// });

import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { showApiError } from '../utils/AlertUtils';

const api = axios.create({
  baseURL: 'http://10.0.2.2:5000',
});

api.interceptors.request.use(
  async config => {
    const credentials = await Keychain.getGenericPassword({
      service: 'accessToken',
    });

    const token = credentials ? credentials.password : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

//Login Api
export async function handleLogin(phoneNumber: string, password: string) {
  try {
    console.log('http://10.0.2.2:5000/api/users/login', password, phoneNumber);
    const response = await axios.post('http://10.0.2.2:5000/api/users/login', {
      phone: phoneNumber,
      password: password,
    });
    console.log(response);
    return response;
  } catch (err: any) {
    showApiError(err, 'Login Failed !!!');
    throw err;
  }
}

//Refresh Token Api
export async function handleRefreshToken(refreshToken: string) {
  try {
    const response = await api.post(
      'http://10.0.2.2:5000/api/users/refresh-token',
      {
        refreshToken: refreshToken,
      },
    );
    return response;
  } catch (err: any) {
    // showApiError(err, 'Token Refresh Failed !!!')
    console.error('Token Refresh Failed', err);
    throw err;
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
    const response = await api.post(
      `http://10.0.2.2:5000/api/events/create-event`,
      data,
    );
    return response;
  } catch (err) {
    showApiError(err, 'Event Creation Failed!!');
    throw err;
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
  designation: string;
}) {
  try {
    const response = await api.post(
      'http://10.0.2.2:5000/api/users/new-user',
      data,
    );
    return response;
  } catch (err) {
    showApiError(err, 'User Creation Failed!!');
    throw err;
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
    const response = await api.post(
      'http://10.0.2.2:5000/api/festivals/create-festival',
      data,
    );
    return response;
  } catch (err) {
    showApiError(err, 'Festival Creation Failed!!');
    throw err;
  }
}

//Create Scheme Api
export async function createScheme(data: {
  scheme_name: string;
  description: string;
  target_amount: number;
}) {
  try {
    const response = await api.post(
      'http://10.0.2.2:5000/api/donation-schemes/create-donation-scheme',
      data,
    );
    return response;
  } catch (err) {
    showApiError(err, 'Scheme Creation Failed!!');
    throw err;
  }
}

//Create Festival Contribution Api
export async function createFestivalContribution(data: {
  user_id: number;
  festival_id: number;
  amount_paid: number;
  payment_status: string;
}) {
  try {
    const response = await api.post(
      'http://10.0.2.2:5000/api/festival-payments/festival-payment',
      data,
    );
    return response;
  } catch (err) {
    showApiError(err, 'Festival Contribution Failed!!');
    throw err;
  }
}

//Create Assign Scheme Contribution Api
export async function createAssignSchemeContribution(data: {
  user_id: number | null;
  donation_scheme_id: number | null;
  amount_assigned: number;
}) {
  try {
    const response = await api.post(
      'http://10.0.2.2:5000/api/donation-scheme-payments/create-donation-scheme-payment',
      data,
    );
    return response;
  } catch (err) {
    showApiError(err, 'Assign Scheme Contribution Failed!!');
    throw err;
  }
}

//Get Events By Date Api
export const getEventsByDate = async (date: string) => {
  try {
    const response = await api.get(
      `http://10.0.2.2:5000/api/events/get-events-by-date?date=${date}`,
    );
    return response;
  } catch (err) {
    showApiError(err, 'Get Events By Date Failed!!');
    throw err;
  }
};

//Get Upcoming Festivals
export const getUpcomingFestivals = async () => {
  try {
    const response = await api.get(
      `http://10.0.2.2:5000/api/festivals/upcoming-festivals`,
    );
    return response;
  } catch (err) {
    showApiError(err, 'Get Upcoming Festivals Failed!!');
    throw err;
  }
};

//Get Users By Role API
export const getUsersByRole = async (role: string) => {
  try {
    const response = await api.get(
      `http://10.0.2.2:5000/api/users/get-user-by-role?role=${role}`,
    );
    return response;
  } catch (err) {
    showApiError(err, 'Get Users By Role Failed');
    throw err;
  }
};

//Get Event Booked Slots By Date API
export const getEventBookedSlotByDate = async (date: string) => {
  try {
    const response = await api.get(
      `http://10.0.2.2:5000/api/events/booked-slots?date=${date}`,
    );
    return response;
  } catch (err) {
    showApiError(err, 'Get Event Booked Slots Failed!!');
    throw err;
  }
};

//Get Festival Dashboard Details Api
export const getFestivalDashboardDetails = async () => {
  try {
    const response = await api.get(
      `http://10.0.2.2:5000/api/festivals/get-festival-dashboard-details`,
    );
    return response;
  } catch (err) {
    showApiError(err, 'Get Festival Dashboard Details Failed');
    throw err;
  }
};

//Get All Users Total Pending Amount Details Api
export const getAllUsersTotalPendingAmountDetails = async () => {
  try {
    const response = await api.get(
      `http://10.0.2.2:5000/api/users/get-all-users-total-pending-amount-details`,
    );
    return response;
  } catch (err) {
    showApiError(err, 'Get All Users Total Pending Amount Details Failed');
    throw err;
  }
};

//Get Festival Payment Details By Festival Id
export const getFestivalPaymentDetailsByFestivalId = async (
  festivalId: number,
) => {
  try {
    const response = await api.get(
      `http://10.0.2.2:5000/api/festival-payments/festival/${festivalId}`,
    );
    return response;
  } catch (err) {
    showApiError(err, 'Get Festival Payment Details By Festival Id Failed!!');
    throw err;
  }
};

//Get Users Festival Payment Details By Festival Id
export const getUserFestivalPaymentDetailsByFestivalId = async (
  festivalId: number,
) => {
  try {
    const response = await api.get(
      `http://10.0.2.2:5000/api/festival-payments/festival/${festivalId}/users`,
    );
    return response;
  } catch (err) {
    showApiError(err, 'Get Users Festival Payment Details Failed');
    throw err;
  }
};

//Get User Festivals Summary by User Id
export const getUserFestivalSummaryByUserId = async (userId: number) => {
  try {
    const response = await api.get(
      `http://10.0.2.2:5000/api/festivals/users/${userId}/festival-summary`,
    );
    return response;
  } catch (err) {
    showApiError(err, 'Get User Festivals Summary By User Id Failed!!');
    throw err;
  }
};

//Get User Festivals Contribution By User Id
export const getUserFestivalsContributionByuserId = async (userId: number) => {
  try {
    const response = await api.get(
      `http://10.0.2.2:5000/api/festivals/users/${userId}/festival-contributions`,
    );
    return response;
  } catch (err) {
    showApiError(err, 'Get User Festivals Contribution By User Id');
    throw err;
  }
};

//Get All Users
export const getAllUsers = async () => {
  try {
    const response = await api.get(`http://10.0.2.2:5000/api/users`);
    return response;
  } catch (err) {
    showApiError(err, 'Get All Users Failed!!');
    throw err;
  }
};

//Get All Festivals Api
export const getAllFestivals = async () => {
  try {
    const response = await api.get(`http://10.0.2.2:5000/api/festivals`);
    return response;
  } catch (err) {
    showApiError(err, 'Get All Festivals Failed');
    throw err;
  }
};

//Get User Festival Contribution By User Id and Festival Id
export const getUserFestivalContributionSummaryByUserIdAndFestivalId = async (
  userId: number | null,
  festivalId: number | null,
) => {
  try {
    const response = await api.get(
      `http://10.0.2.2:5000/api/festival-payments/festivals/contribution-summary?userId=${userId}&festivalId=${festivalId}`,
    );
    return response;
  } catch (err) {
    showApiError(err, 'Get User Festival Contribution Api Failed!!');
    throw err;
  }
};

//Update the Festival Payment By User Id and Festival Id
export const updateFestivalPayment = async (data: {
  amount_paid: number;
  payment_status: string;
  user_id: number;
  festival_id: number;
}) => {
  try {
    const response = await api.put(
      `http://10.0.2.2:5000/api/festival-payments/update-festival-payment`,
      data,
    );
    return response
  } catch (err) {
    showApiError(err, 'Update Festival Payment Failed!!');
    throw err;
  }
};
