import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { showAlert } from '../utils/AlertUtils';
import { createEvent } from '../services/service';
import { formatDateTime } from '../utils/helper';

const poojas = [
    {
        id: 1,
        name: 'Ganapathy Homam',
        price: '₹500',
        image: require('../assets/images/image-1.jpg'),
    },
    {
        id: 2,
        name: 'Abishegam',
        price: '₹300',
        image: require('../assets/images/image-1.jpg'),
    },
    {
        id: 3,
        name: 'Lakshmi Pooja',
        price: '₹750',
        image: require('../assets/images/image-1.jpg'),
    },
];

const slots = [
    '06:00 AM',
    '07:00 AM',
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '05:00 PM',
    '06:00 PM',
];

export default function PoojaRegistrationScreen() {
    const [selectedPooja, setSelectedPooja] = useState<number | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [devoteeName, setDevoteeName] = useState<string>('')
    const [devoteePhoneNumber, setDevoteePhoneNumber] = useState('')
    const [devoteeAddress, setDevoteeAddress] = useState('')


    const generateDates = (days: number = 30) => {
        const dates = [];

        for (let i = 0; i < days; i++) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + i);

            dates.push({
                day: currentDate
                    .toLocaleDateString('en-US', { weekday: 'short' })
                    .toUpperCase(),
                date: currentDate.getDate().toString(),
                month: currentDate
                    .toLocaleDateString('en-US', { month: 'short' })
                    .toUpperCase(),
                fullDate: currentDate,
            });
        }

        return dates;
    };

    const dates = generateDates(30);

    async function handleCreateEvent() {
        try {

            const poojaName = poojas.find(item => item.id === selectedPooja)

            const data = {
                "event_type": "Pooja",
                "event_name": poojaName?.name,
                "event_date_time": formatDateTime(selectedDate, selectedSlot ?? ''),
                "devotee_name": devoteeName,
                "devotee_phone_number": devoteePhoneNumber,
                "devotee_address": devoteeAddress,
                "amount": Number(poojaName?.price.replace(/\D/g, '')),
                "payment_status": "Pending"
            }

            console.log(data)

            const response = await createEvent(data)

            console.log(response)

            showAlert("Success", "Event Added Successfully!!!")

        } catch (err) {
            showAlert("Error", "Failed in Create Event!!")
        }
    }

    return (
        <LinearGradient
            colors={['#FFF8F3', '#FDEFE5', '#FFF5EE']}
            style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Hero Image */}

                <View style={styles.heroContainer}>
                    <Image
                        source={require('../assets/images/image-2.jpeg')}
                        style={styles.heroImage}
                    />

                    <LinearGradient
                        colors={['transparent', '#FFF8F3']}
                        style={styles.imageFade}
                    />

                    <View style={styles.heroContent}>
                        <Text style={styles.heroTitle}>
                            🛕 Sacred Pooja Booking
                        </Text>

                        <Text style={styles.heroSubTitle}>
                            Receive Divine Blessings
                        </Text>
                    </View>
                </View>

                {/* Select Pooja */}

                <Text style={styles.sectionTitle}>
                    Select Pooja
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}>

                    {poojas.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => setSelectedPooja(item.id)}
                            style={[
                                styles.poojaCard,
                                selectedPooja === item.id &&
                                styles.selectedPoojaCard,
                            ]}>

                            {selectedPooja === item.id && (
                                <View style={styles.checkCircle}>
                                    <Text style={styles.checkText}>✓</Text>
                                </View>
                            )}

                            <Image
                                source={item.image}
                                style={styles.poojaImage}
                            />

                            <Text
                                style={[
                                    styles.poojaName,
                                    selectedPooja === item.id &&
                                    styles.selectedText,
                                ]}>
                                {item.name}
                            </Text>

                            <Text
                                style={[
                                    styles.poojaPrice,
                                    selectedPooja === item.id &&
                                    styles.selectedText,
                                ]}>
                                {item.price}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Date */}

                <Text style={styles.sectionTitle}>
                    Select Date
                </Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}>

                    {dates.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedDate(item.fullDate)}
                            style={[
                                styles.dateItem,
                                selectedDate?.toDateString() === item.fullDate.toDateString() &&
                                styles.selectedDateItem,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.dayText,
                                    selectedDate?.toDateString() === item.fullDate.toDateString() &&
                                    styles.selectedDateText,
                                ]}
                            >
                                {item.day}
                            </Text>

                            <Text
                                style={[
                                    styles.dateNumber,
                                    selectedDate?.toDateString() === item.fullDate.toDateString() &&
                                    styles.selectedDateText,
                                ]}
                            >
                                {item.date}
                            </Text>

                            <Text
                                style={[
                                    styles.monthText,
                                    selectedDate?.toDateString() === item.fullDate.toDateString() &&
                                    styles.selectedDateText,
                                ]}
                            >
                                {item.month}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Time Slots */}

                <Text style={styles.sectionTitle}>
                    Select Time Slot
                </Text>

                <View style={styles.slotContainer}>
                    {slots.map(slot => (
                        <TouchableOpacity
                            key={slot}
                            onPress={() => setSelectedSlot(slot)}
                            style={[
                                styles.slotCard,
                                selectedSlot === slot &&
                                styles.selectedSlotCard,
                            ]}>
                            <Text
                                style={[
                                    styles.slotText,
                                    selectedSlot === slot &&
                                    styles.selectedSlotText,
                                ]}>
                                {slot}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Devotee Details */}

                <Text style={styles.sectionTitle}>
                    Devotee Details
                </Text>

                <View style={styles.formCard}>
                    <TextInput
                        placeholder="Full Name"
                        style={styles.input}
                        value={devoteeName}
                        onChangeText={(value) => setDevoteeName(value)}
                    />

                    <TextInput
                        placeholder="Mobile Number"
                        keyboardType="numeric"
                        style={styles.input}
                        value={devoteePhoneNumber}
                        onChangeText={(value) => setDevoteePhoneNumber(value)}
                    />

                    <TextInput
                        placeholder="Address"
                        multiline
                        style={[styles.input, { height: 100 }]}
                        value={devoteeAddress}
                        onChangeText={(value) => setDevoteeAddress(value)}
                    />
                </View>

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>
                        Booking Details
                    </Text>

                    <View style={styles.summaryRow}>
                        <Text style={styles.label}>Pooja</Text>
                        <Text style={styles.value}>
                            {poojas.find(x => x.id === selectedPooja)?.name || '-'}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.label}>Date</Text>
                        <Text style={styles.value}>
                            {
                                dates.find(i => Number(i.date) === selectedDate.getDate())
                                    ? `${dates.find(i => Number(i.date) === selectedDate.getDate())?.day}, ${dates.find(i => Number(i.date) === selectedDate.getDate())?.date}`
                                    : '-'
                            }
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.label}>Time</Text>
                        <Text style={styles.value}>
                            {selectedSlot || '-'}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.summaryRow}>
                        <Text style={styles.amountLabel}>
                            Amount
                        </Text>

                        <Text style={styles.amountValue}>
                            {poojas.find(x => x.id === selectedPooja)?.price || '₹0'}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.registerButton} onPress={() => handleCreateEvent()}>
                        <Text style={styles.registerText}>
                            Register Pooja
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Button */}

                {/* <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>
            Confirm Booking
          </Text>
        </TouchableOpacity> */}

            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    heroContainer: {
        height: 280,
        marginBottom: 20,
    },

    heroContent: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center',
    },


    heroSubTitle: {
        color: '#FFF',
        marginTop: 10,
        fontSize: 16,
    },

    heroImage: {
        width: '100%',
        height: '100%',
    },

    imageFade: {
        position: 'absolute',
        bottom: 0,
        height: 100,
        width: '100%',
    },

    heroTitle: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#7A4E2D',
        marginHorizontal: 20,
        marginBottom: 15,
        marginTop: 15,
    },

    dateItem: {
        width: 75,
        height: 95,
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginRight: 12,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },

    monthText: {
        fontSize: 11,
        color: '#888',
        marginTop: 2,
        fontWeight: '500',
    },

    selectedDateItem: {
        backgroundColor: '#F59E47',
        borderWidth: 2,
        borderColor: '#D97706',
    },

    dayText: {
        fontSize: 13,
        color: '#666',
        fontWeight: '600',
    },

    dateNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },

    selectedDateText: {
        color: '#FFF',
    },

    poojaCard: {
        width: 180,
        backgroundColor: '#FFF',
        borderRadius: 25,
        padding: 12,
        marginRight: 15,
        marginVertical: 5,
        elevation: 4,
    },

    selectedPoojaCard: {
        borderWidth: 3,
        borderColor: '#F59E47',
        backgroundColor: '#FFF8EF',
    },

    poojaImage: {
        width: '100%',
        height: 120,
        borderRadius: 20,
    },

    poojaName: {
        fontSize: 16,
        fontWeight: '700',
        marginTop: 10,
    },

    poojaPrice: {
        color: '#F59E47',
        fontWeight: 'bold',
        marginTop: 5,
    },

    selectedText: {
        color: '#D97706',
    },

    checkCircle: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 999,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#22C55E',
        justifyContent: 'center',
        alignItems: 'center',
    },

    checkText: {
        color: '#FFF',
        fontWeight: 'bold',
    },

    dateCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        padding: 18,
        borderRadius: 20,
    },

    dateText: {
        fontSize: 16,
    },

    slotContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
    },

    slotCard: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        margin: 5,
    },

    selectedSlotCard: {
        backgroundColor: '#F59E47',
    },

    slotText: {
        fontWeight: '600',
    },

    selectedSlotText: {
        color: '#FFF',
    },

    formCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        borderRadius: 25,
        padding: 20,
    },

    input: {
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 15,
        paddingHorizontal: 15,
        marginBottom: 15,
    },

    //   summaryCard: {
    //     backgroundColor: '#FFF',
    //     margin: 20,
    //     borderRadius: 25,
    //     padding: 20,
    //   },

    //   summaryTitle: {
    //     fontWeight: 'bold',
    //     fontSize: 18,
    //     marginBottom: 10,
    //   },

    summaryText: {
        fontSize: 15,
        marginBottom: 5,
    },

    bookButton: {
        backgroundColor: '#F59E47',
        marginHorizontal: 20,
        marginBottom: 40,
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
    },

    bookButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

    summaryCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        marginTop: 25,
        borderRadius: 25,
        padding: 20,
        elevation: 5,
    },

    summaryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#7A4E2D',
        marginBottom: 20,
    },

    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },

    label: {
        fontSize: 15,
        color: '#666',
    },

    value: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },

    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginVertical: 15,
    },

    amountLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#7A4E2D',
    },

    amountValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#F59E47',
    },

    registerButton: {
        backgroundColor: '#F59E47',
        marginTop: 20,
        paddingVertical: 16,
        borderRadius: 18,
        alignItems: 'center',
    },

    registerText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 17,
    },
});