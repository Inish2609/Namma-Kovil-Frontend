import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';

const members = [
    {
        id: 1,
        name: 'Inish Raj',
        mobile: '9876543210',
    },
    {
        id: 2,
        name: 'Kumar',
        mobile: '9876543211',
    },
    {
        id: 3,
        name: 'Ganesh',
        mobile: '9876543212',
    },
    {
        id: 4,
        name: 'Arun',
        mobile: '9876543213',
    },
];

const schemes = [
    {
        id: 1,
        name: 'Annadhanam',
        suggestedAmount: 500,
        description: 'Food Donation',
    },
    {
        id: 2,
        name: 'Temple Renovation',
        suggestedAmount: 1000,
        description: 'Temple Development',
    },
    {
        id: 3,
        name: 'Goshala Donation',
        suggestedAmount: 250,
        description: 'Cow Protection',
    },
];

export default function DonationCollectionScreen() {
    const [selectedMember, setSelectedMember] = useState(null);
    const [selectedScheme, setSelectedScheme] = useState(null);

    const [amount, setAmount] = useState('');

    const [referenceNo, setReferenceNo] = useState('');

    const [remarks, setRemarks] = useState('');

    const [paymentMethod, setPaymentMethod] =
        useState('Cash');

    const memberList = members.map(item => ({
        label: item.name,
        value: item.id,
    }));

    const schemeList = schemes.map(item => ({
        label: item.name,
        value: item.id,
    }));

    const selectedSchemeData = useMemo(() => {
        return schemes.find(
            x => x.id === selectedScheme,
        );
    }, [selectedScheme]);

    return (
        <LinearGradient
            colors={['#FFF9F4', '#FFF4EB', '#FFFDFB']}
            style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}>

                <LinearGradient
                    colors={['#F59E47', '#F7B267']}
                    style={styles.header}>

                    <Text style={styles.headerTitle}>
                        ❤️ Temple Donation
                    </Text>

                    <Text style={styles.headerSubtitle}>
                        Support our temple with devotion
                    </Text>

                </LinearGradient>

                <View style={styles.card}>

                    <Text style={styles.label}>
                        Member
                    </Text>

                    <Dropdown
                        style={styles.dropdown}
                        data={memberList}
                        search
                        labelField="label"
                        valueField="value"
                        placeholder="Select Member"
                        searchPlaceholder="Search Member..."
                        value={selectedMember}
                        onChange={item =>
                            setSelectedMember(item.value)
                        }
                    />

                    <Text style={styles.label}>
                        Donation Scheme
                    </Text>

                    <Dropdown
                        style={styles.dropdown}
                        data={schemeList}
                        search
                        labelField="label"
                        valueField="value"
                        placeholder="Select Scheme"
                        searchPlaceholder="Search Scheme..."
                        value={selectedScheme}
                        onChange={item => {
                            setSelectedScheme(item.value);

                            setAmount(
                                String(item.suggestedAmount || ''),
                            );
                        }}
                    />

                    {selectedSchemeData && (
                        <View style={styles.summaryCard}>

                            <Text style={styles.summaryTitle}>
                                Scheme Information
                            </Text>

                            <View style={styles.row}>
                                <Text style={styles.left}>
                                    Scheme
                                </Text>

                                <Text style={styles.right}>
                                    {selectedSchemeData.name}
                                </Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.left}>
                                    Suggested
                                </Text>

                                <Text style={styles.right}>
                                    ₹
                                    {
                                        selectedSchemeData.suggestedAmount
                                    }
                                </Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.left}>
                                    Purpose
                                </Text>

                                <Text style={styles.right}>
                                    {
                                        selectedSchemeData.description
                                    }
                                </Text>
                            </View>

                        </View>
                    )}

                    <Text style={styles.label}>
                        Donation Amount
                    </Text>

                    <TextInput
                        value={amount}
                        keyboardType="numeric"
                        placeholder="Enter Amount"
                        style={styles.input}
                        onChangeText={setAmount}
                    />

                    <Text style={styles.label}>
                        Quick Amount
                    </Text>

                    <View style={styles.quickContainer}>

                        {[100, 250, 500, 1000, 5000].map(
                            item => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.quickButton}
                                    onPress={() =>
                                        setAmount(String(item))
                                    }>

                                    <Text style={styles.quickText}>
                                        ₹{item}
                                    </Text>

                                </TouchableOpacity>
                            ),
                        )}

                    </View>
                    <Text style={styles.label}>
                        Payment Method
                    </Text>

                    <View style={styles.paymentContainer}>

                        {['Cash', 'UPI', 'Bank', 'Card'].map(
                            item => (
                                <TouchableOpacity
                                    key={item}
                                    activeOpacity={0.8}
                                    onPress={() =>
                                        setPaymentMethod(item)
                                    }
                                    style={[
                                        styles.paymentButton,
                                        paymentMethod === item &&
                                        styles.paymentButtonActive,
                                    ]}>

                                    <Text
                                        style={[
                                            styles.paymentText,
                                            paymentMethod === item &&
                                            styles.paymentTextActive,
                                        ]}>
                                        {item === 'Cash' && '💵 '}
                                        {item === 'UPI' && '📱 '}
                                        {item === 'Bank' && '🏦 '}
                                        {item === 'Card' && '💳 '}
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
                        placeholder="Transaction / Receipt Number"
                        value={referenceNo}
                        onChangeText={setReferenceNo}
                        style={styles.input}
                    />

                    <Text style={styles.label}>
                        Remarks
                    </Text>

                    <TextInput
                        multiline
                        value={remarks}
                        onChangeText={setRemarks}
                        placeholder="Enter Remarks"
                        style={styles.remarksInput}
                    />

                    <View style={styles.previewCard}>

                        <Text style={styles.previewTitle}>
                            Donation Summary
                        </Text>

                        <View style={styles.row}>
                            <Text style={styles.left}>
                                Member
                            </Text>

                            <Text style={styles.right}>
                                {
                                    members.find(
                                        x => x.id === selectedMember,
                                    )?.name || '-'
                                }
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.left}>
                                Scheme
                            </Text>

                            <Text style={styles.right}>
                                {
                                    schemes.find(
                                        x => x.id === selectedScheme,
                                    )?.name || '-'
                                }
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.left}>
                                Amount
                            </Text>

                            <Text style={styles.right}>
                                ₹{amount || 0}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.left}>
                                Payment
                            </Text>

                            <Text style={styles.right}>
                                {paymentMethod}
                            </Text>
                        </View>

                    </View>

                    <TouchableOpacity
                        activeOpacity={0.9}>

                        <LinearGradient
                            colors={[
                                '#F59E47',
                                '#F7B267',
                            ]}
                            style={styles.submitButton}>

                            <Text
                                style={styles.submitText}>
                                ❤️ COLLECT DONATION
                            </Text>

                        </LinearGradient>

                    </TouchableOpacity>

                </View>

                <View
                    style={{
                        height: 40,
                    }}
                />

            </ScrollView>

        </LinearGradient>

    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F4',
  },

  header: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 28,
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
    fontWeight: '800',
    color: '#FFFFFF',
  },

  headerSubtitle: {
    fontSize: 16,
    marginTop: 8,
    color: '#FFF8F5',
  },

  card: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 22,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 10,
  },

  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3D2C29',
    marginBottom: 10,
    marginTop: 18,
  },

  dropdown: {
    height: 58,
    borderRadius: 18,
    backgroundColor: '#FFFDFB',
    borderWidth: 1,
    borderColor: '#F4E3D2',
    paddingHorizontal: 15,
  },

  input: {
    height: 58,
    borderRadius: 18,
    backgroundColor: '#FFFDFB',
    borderWidth: 1,
    borderColor: '#F4E3D2',
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#3D2C29',
  },

  remarksInput: {
    minHeight: 120,
    borderRadius: 18,
    backgroundColor: '#FFFDFB',
    borderWidth: 1,
    borderColor: '#F4E3D2',
    padding: 18,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#3D2C29',
  },

  summaryCard: {
    marginTop: 20,
    backgroundColor: '#FFF8F2',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F9DFC6',
  },

  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F59E47',
    marginBottom: 15,
  },

  previewCard: {
    marginTop: 30,
    backgroundColor: '#FFF6EF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F8DEC2',
  },

  previewTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#F59E47',
    marginBottom: 18,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },

  left: {
    fontSize: 15,
    color: '#777',
    fontWeight: '500',
  },

  right: {
    fontSize: 16,
    color: '#3D2C29',
    fontWeight: '700',
  },

  quickContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },

  quickButton: {
    backgroundColor: '#FFF3E6',
    borderWidth: 1,
    borderColor: '#F59E47',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 30,
    marginRight: 10,
    marginBottom: 10,
  },

  quickText: {
    color: '#F59E47',
    fontWeight: '700',
    fontSize: 15,
  },

  paymentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  paymentButton: {
    width: '48%',
    backgroundColor: '#FFF7F0',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F4DFC9',
  },

  paymentButtonActive: {
    backgroundColor: '#F59E47',
    borderColor: '#F59E47',
    elevation: 5,
  },

  paymentText: {
    fontSize: 16,
    color: '#444',
    fontWeight: '600',
  },

  paymentTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  submitButton: {
    marginTop: 30,
    height: 62,
    borderRadius: 31,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#F59E47',
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 15,
  },

  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
});