import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { showAlert, showApiError } from '../utils/AlertUtils';
import { createFestivalContribution } from '../services/service';

const users = [
  { id: 1, name: 'Inish Raj' },
  { id: 2, name: 'Kumar' },
  { id: 3, name: 'Ganesh' },
  { id: 4, name: 'Arun' },
];

const festivals = [
  {
    id: 1,
    name: 'Aadi Festival',
    amountPerUser: 1000,
  },
  {
    id: 2,
    name: 'Panguni Festival',
    amountPerUser: 1500,
  },
  {
    id: 3,
    name: 'Vinayagar Festival',
    amountPerUser: 2000,
  },
];

const payments = [
  {
    userId: 1,
    festivalId: 1,
    paidAmount: 500,
  },
  {
    userId: 1,
    festivalId: 2,
    paidAmount: 1000,
  },
  {
    userId: 2,
    festivalId: 1,
    paidAmount: 1000,
  },
];

export default function CollectContributionScreen() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [isUserFocus, setIsUserFocus] = useState(false);

  const userList = users.map(item => ({
    label: item.name,
    value: item.id,
  }));

  const [selectedFestival, setSelectedFestival] = useState<number | null>(null);
  const [isFestivalFocus, setIsFestivalFocus] = useState(false);

  const festivalList = festivals.map(item => ({
    label: item.name,
    value: item.id,
  }));

  const [amount, setAmount] = useState('');

  const [reference, setReference] = useState('');

  const [remarks, setRemarks] = useState('');

  const [paymentMethod, setPaymentMethod] =
    useState('Cash');

  const summary = useMemo(() => {
    if (!selectedUser || !selectedFestival) {
      return {
        required: 0,
        paid: 0,
        pending: 0,
        progress: 0,
      };
    }

    const festival = festivals.find(
      x => x.id === selectedFestival,
    );

    const payment = payments.find(
      x =>
        x.userId === selectedUser &&
        x.festivalId === selectedFestival,
    );

    const required =
      festival?.amountPerUser || 0;

    const paid = payment?.paidAmount || 0;

    const pending = required - paid;

    return {
      required,
      paid,
      pending,
      progress:
        required === 0
          ? 0
          : (paid / required) * 100,
    };
  }, [selectedUser, selectedFestival]);

  console.log(selectedUser)

  async function handleCollectContribution() {
    try {
      const data = {
        "user_id": 1,
        "festival_id": 1,
        "amount_paid": 500,
        "payment_status": "pending"
      }
      const response = await createFestivalContribution(data);8

      showAlert("Success",'Contribution collected successfully!');
    } catch (error) {
      console.error('Error collecting contribution:', error);
      showApiError(error, 'Contribution Collection Failed!!');
    }
  }

  return (
    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}>

        <LinearGradient
          colors={['#F59E47', '#F7B267']}
          style={styles.header}>

          <Text style={styles.headerTitle}>
            Collect Contribution
          </Text>

          <Text style={styles.headerSubtitle}>
            Temple Committee
          </Text>

        </LinearGradient>

        <View style={styles.formCard}>

          <Text style={styles.label}>Member</Text>

          <Dropdown
            style={[
              styles.dropdown,
              isUserFocus && styles.dropdownFocus,
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={userList}
            search
            maxHeight={350}
            labelField="label"
            valueField="value"
            placeholder="Select Member"
            searchPlaceholder="Search Member..."
            value={selectedUser}
            onFocus={() => setIsUserFocus(true)}
            onBlur={() => setIsUserFocus(false)}
            onChange={item => {
              setSelectedUser(item.value);
              setIsUserFocus(false);
            }}
          />

          <Text style={styles.label}>
            Festival
          </Text>


          <Dropdown
            style={[
              styles.dropdown,
              isFestivalFocus && styles.dropdownFocus,
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={festivalList}
            search
            maxHeight={350}
            labelField="label"
            valueField="value"
            placeholder="Select Festival"
            searchPlaceholder="Search Festival..."
            value={selectedFestival}
            onFocus={() => setIsFestivalFocus(true)}
            onBlur={() => setIsFestivalFocus(false)}
            onChange={item => {
              setSelectedFestival(item.value);
              setIsFestivalFocus(false);
            }}
          />


          <View style={styles.summaryCard}>

            <Text style={styles.summaryTitle}>
              Contribution Summary
            </Text>

            <View style={styles.row}>

              <Text>Required</Text>

              <Text>
                ₹{summary.required}
              </Text>

            </View>

            <View style={styles.row}>

              <Text>Already Paid</Text>

              <Text>
                ₹{summary.paid}
              </Text>

            </View>

            <View style={styles.row}>

              <Text>Pending</Text>

              <Text
                style={{
                  color: '#E53935',
                  fontWeight: '700',
                }}>

                ₹{summary.pending}

              </Text>

            </View>

            <View style={styles.progress}>

              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${summary.progress}%`,
                  },
                ]}
              />

            </View>

          </View>

          <Text style={styles.label}>
            Collect Amount
          </Text>

          <TextInput
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
          />

          <Text style={styles.label}>
            Payment Method
          </Text>

          <View style={styles.methodContainer}>

            {['Cash', 'UPI', 'Bank'].map(
              item => (
                <TouchableOpacity
                  key={item}
                  onPress={() =>
                    setPaymentMethod(item)
                  }
                  style={[
                    styles.methodButton,
                    paymentMethod === item && {
                      backgroundColor:
                        '#F59E47',
                    },
                  ]}>

                  <Text
                    style={{
                      color:
                        paymentMethod === item
                          ? '#fff'
                          : '#3D2C29',
                      fontWeight: '700',
                    }}>

                    {item}

                  </Text>

                </TouchableOpacity>
              ),
            )}

          </View>

          <Text style={styles.label}>
            Reference Number
          </Text>

          <TextInput
            placeholder="Enter Reference Number"
            value={reference}
            onChangeText={setReference}
            style={styles.input}
          />

          <Text style={styles.label}>
            Remarks
          </Text>

          <TextInput
            multiline
            numberOfLines={4}
            placeholder="Remarks"
            value={remarks}
            onChangeText={setRemarks}
            style={styles.remarks}
          />

          <TouchableOpacity onPress={handleCollectContribution}>

            <LinearGradient
              colors={['#F59E47', '#F7B267']}
              style={styles.button}>

              <Text style={styles.buttonText}>
                Collect Contribution
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

  header: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 25,
    elevation: 8,
    shadowColor: '#F59E47',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 15,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  headerSubtitle: {
    fontSize: 16,
    marginTop: 5,
    color: '#FFF5EE',
  },

  formCard: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3D2C29',
    marginBottom: 8,
    marginTop: 18,
  },



  dropdown: {
    height: 58,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    paddingHorizontal: 15,
    elevation: 3,
  },

  dropdownFocus: {
    borderColor: '#F59E47',
  },

  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },

  selectedTextStyle: {
    fontSize: 16,
    color: '#3D2C29',
    fontWeight: '600',
  },

  inputSearchStyle: {
    height: 45,
    borderRadius: 12,
    fontSize: 16,
  },

  iconStyle: {
    width: 22,
    height: 22,
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
  },

  summaryCard: {
    marginTop: 25,
    backgroundColor: '#FFF9F5',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F7D7B3',
  },

  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F59E47',
    marginBottom: 15,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },

  progress: {
    height: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 18,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#F59E47',
    borderRadius: 10,
  },

  methodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  methodButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#FFF4EA',
    borderWidth: 1,
    borderColor: '#F59E47',
  },

  remarks: {
    minHeight: 110,
    backgroundColor: '#FFFDFB',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F5D7BA',
    padding: 15,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#3D2C29',
  },

  button: {
    marginTop: 35,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#F59E47',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});