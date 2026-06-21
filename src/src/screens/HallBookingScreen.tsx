import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/** MOCK EXISTING BOOKINGS */
const existingBookings = [
  {date: '2026-06-21', slot: 'Morning'},
  {date: '2026-06-22', slot: 'Evening'},
  {date: '2026-06-23', slot: 'Afternoon'},
];

export default function HallBookingScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('');
  const [advance, setAdvance] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  /** CHECK AVAILABILITY */
  const isAvailable = (date: string, slot: string) => {
    return !existingBookings.some(
      b => b.date === date && b.slot === slot,
    );
  };

  const availabilityStatus =
    selectedDate && selectedSlot
      ? isAvailable(selectedDate, selectedSlot)
      : null;

  const handleBooking = () => {
    const booking = {
      hallName: 'Royal Marriage Hall',
      name,
      phone,
      guests,
      advance,
      address,
      notes,
      selectedDate,
      selectedSlot,
      status: availabilityStatus ? 'CONFIRMED' : 'BLOCKED',
    };

    console.log('BOOKING:', booking);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HERO */}
        <LinearGradient
          colors={['#F59E47', '#F7B267']}
          style={styles.hero}>

          <Text style={styles.title}>
            Royal Marriage Hall
          </Text>

          <Text style={styles.subtitle}>
            Luxury venue for weddings & celebrations
          </Text>

        </LinearGradient>

        {/* INFO */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Hall Overview</Text>
          <Text style={styles.infoText}>✨ Capacity: 500 - 1000 Guests</Text>
          <Text style={styles.infoText}>📍 AC Hall + Parking</Text>
          <Text style={styles.infoText}>🍽 Dining & Decoration Available</Text>
        </View>

        {/* FORM */}
        <View style={styles.card}>

          {/* DATE */}
          <Text style={styles.sectionTitle}>📅 Select Date</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array.from({length: 10}).map((_, i) => {
              const d = new Date();
              d.setDate(d.getDate() + i);

              const dateStr = d.toISOString().split('T')[0];
              const selected = selectedDate === dateStr;

              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSelectedDate(dateStr)}
                  style={[
                    styles.dateCard,
                    selected && styles.dateCardActive,
                  ]}>

                  <Text
                    style={[
                      styles.dateText,
                      selected && styles.dateTextActive,
                    ]}>
                    {d.getDate()}
                  </Text>

                  <Text
                    style={[
                      styles.monthText,
                      selected && styles.dateTextActive,
                    ]}>
                    {d.toLocaleString('en-US', {month: 'short'})}
                  </Text>

                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* SLOT */}
          <Text style={styles.sectionTitle}>⏰ Time Slot</Text>

          <View style={styles.slotRow}>

            {[
              {label: 'Morning', time: '9AM - 12PM'},
              {label: 'Afternoon', time: '1PM - 5PM'},
              {label: 'Evening', time: '6PM - 10PM'},
            ].map(slot => {
              const selected = selectedSlot === slot.label;

              return (
                <TouchableOpacity
                  key={slot.label}
                  onPress={() => setSelectedSlot(slot.label)}
                  style={[
                    styles.slotCard,
                    selected && styles.slotCardActive,
                  ]}>

                  <Text
                    style={[
                      styles.slotTitle,
                      selected && styles.slotTextActive,
                    ]}>
                    {slot.label}
                  </Text>

                  <Text
                    style={[
                      styles.slotTime,
                      selected && styles.slotTextActive,
                    ]}>
                    {slot.time}
                  </Text>

                </TouchableOpacity>
              );
            })}

          </View>

          {/* AVAILABILITY STATUS */}
          {selectedDate && selectedSlot && (
            <View style={styles.statusCard}>

              <View
                style={[
                  styles.statusChip,
                  availabilityStatus
                    ? styles.availableChip
                    : styles.bookedChip,
                ]}>

                <Text
                  style={[
                    styles.statusText,
                    {
                      color: availabilityStatus
                        ? '#16A34A'
                        : '#DC2626',
                    },
                  ]}>

                  {availabilityStatus ? 'Available' : 'Booked'}

                </Text>

              </View>

              <Text style={styles.statusInfo}>
                {selectedDate} • {selectedSlot}
              </Text>

            </View>
          )}

          {/* CUSTOMER DETAILS */}
          <Text style={styles.sectionTitle}>👤 Customer Details</Text>

          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />

          <View style={{flexDirection: 'row'}}>

            <TextInput
              placeholder="Guests"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={guests}
              onChangeText={setGuests}
              style={[styles.input, {flex: 1, marginRight: 10}]}
            />

            <TextInput
              placeholder="Advance"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={advance}
              onChangeText={setAdvance}
              style={[styles.input, {width: 120}]}
            />

          </View>

          <TextInput
            placeholder="Address"
            placeholderTextColor="#999"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />

          <TextInput
            placeholder="Special Notes"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
            style={styles.remarks}
          />

          {/* BUTTON */}
          <TouchableOpacity
            onPress={handleBooking}
            disabled={!availabilityStatus}>

            <LinearGradient
              colors={
                availabilityStatus
                  ? ['#F59E47', '#F7B267']
                  : ['#ccc', '#aaa']
              }
              style={styles.button}>

              <Text style={styles.buttonText}>
                {availabilityStatus
                  ? 'Confirm Booking'
                  : 'Slot Not Available'}
              </Text>

            </LinearGradient>

          </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
  },

  hero: {
    margin: 18,
    borderRadius: 28,
    padding: 26,
    elevation: 10,
    shadowColor: '#F59E47',
    shadowOpacity: 0.3,
    shadowRadius: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
  },

  subtitle: {
    marginTop: 6,
    color: '#fff',
    opacity: 0.9,
  },

  infoCard: {
    marginHorizontal: 18,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    elevation: 4,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
    color: '#3D2C29',
  },

  infoText: {
    fontSize: 13,
    marginTop: 4,
    color: '#666',
  },

  card: {
    margin: 18,
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 18,
    elevation: 6,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 18,
    marginBottom: 10,
    color: '#3D2C29',
  },

  input: {
    height: 58,
    backgroundColor: '#FFFDFB',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F5D7BA',
    paddingHorizontal: 18,
    fontSize: 17,
    color: '#3D2C29',
    marginVertical: 10,
  },

  remarks: {
    minHeight: 90,
    backgroundColor: '#FFFDFB',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F5D7BA',
    paddingHorizontal: 18,
    fontSize: 17,
    color: '#3D2C29',
    textAlignVertical: 'top',
  },

  dateCard: {
    width: 70,
    height: 80,
    borderRadius: 18,
    backgroundColor: '#F3F3F3',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateCardActive: {
    backgroundColor: '#F59E47',
  },

  dateText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#3D2C29',
  },

  monthText: {
    fontSize: 12,
    marginTop: 4,
    color: '#777',
  },

  dateTextActive: {
    color: '#fff',
  },

  slotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  slotCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
  },

  slotCardActive: {
    backgroundColor: '#F59E47',
  },

  slotTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3D2C29',
  },

  slotTime: {
    fontSize: 11,
    marginTop: 4,
    color: '#777',
  },

  slotTextActive: {
    color: '#fff',
  },

  // STATUS (your FIRST premium style)
  statusCard: {
    marginTop: 15,
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#FFF9F5',
    borderWidth: 1,
    borderColor: '#F7D7B3',
    alignItems: 'center',
  },

  statusChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
  },

  availableChip: {
    backgroundColor: '#DCFCE7',
  },

  bookedChip: {
    backgroundColor: '#FEE2E2',
  },

  statusText: {
    fontSize: 13,
    fontWeight: '800',
  },

  statusInfo: {
    fontSize: 12,
    color: '#777',
  },

  button: {
    marginTop: 25,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#F59E47',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
});