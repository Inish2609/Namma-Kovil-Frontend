export const formatDateTime = (date: Date, time: string) => {
    const [timePart, meridiem] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (meridiem === 'PM' && hours !== 12) {
        hours += 12;
    }

    if (meridiem === 'AM' && hours === 12) {
        hours = 0;
    }

    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    const hh = String(newDate.getHours()).padStart(2, '0');
    const mm = String(newDate.getMinutes()).padStart(2, '0');
    const ss = String(newDate.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
};


export function isValidValue(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
}

export type ValidationType =
    | "required"
    | "email"
    | "phone"
    | "number"
    | "text"
    | "password";

interface ValidationOptions {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    regex?: RegExp;
}

export const validateField = (
    value: any,
    type: ValidationType,
    options?: ValidationOptions
): string => {
    const val = String(value ?? "").trim();

    switch (type) {
        case "required":
            if (!val) return "This field is required";
            break;

        case "email":
            if (!val) return "Email is required";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
                return "Invalid email address";
            break;

        case "phone":
            if (!val) return "Phone number is required";
            if (!/^[6-9]\d{9}$/.test(val))
                return "Invalid phone number";
            break;

        case "number":
            if (!val) return "Number is required";
            if (isNaN(Number(val)))
                return "Only numbers are allowed";
            break;

        case "password":
            if (!val) return "Password is required";
            if (val.length < 8)
                return "Password must contain at least 8 characters";
            break;

        case "text":
            if (!val) return "This field is required";
            break;
    }

    if (options?.minLength && val.length < options.minLength)
        return `Minimum ${options.minLength} characters required`;

    if (options?.maxLength && val.length > options.maxLength)
        return `Maximum ${options.maxLength} characters allowed`;

    if (
        options?.min !== undefined &&
        !isNaN(Number(val)) &&
        Number(val) < options.min
    )
        return `Minimum value is ${options.min}`;

    if (
        options?.max !== undefined &&
        !isNaN(Number(val)) &&
        Number(val) > options.max
    )
        return `Maximum value is ${options.max}`;

    if (options?.regex && !options.regex.test(val))
        return "Invalid format";

    return "";
};

export const formatTime = (dateString: string): string => {
    const date = new Date(dateString);

    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
    });
};

export const convertTo24Hour = (time: string): string => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
        hours += 12;
    }

    if (modifier === "AM" && hours === 12) {
        hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:00`;
};