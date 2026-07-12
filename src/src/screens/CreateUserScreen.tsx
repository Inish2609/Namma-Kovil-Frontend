import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { showAlert } from '../utils/AlertUtils';
import { createUser } from '../services/service';

const designations = [
  'President',
  'Secretary',
  'Treasurer',
  'Vice President',
  'Committee Member',
];

export default function CreateUserScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Member');
  const [fatherName, setFatherName] = useState('');

  const [designation, setDesignation] = useState('');

  const handleCreateUser = async () => {
    try {
      const data = {
        name: name,
        phone: phone,
        father_name: fatherName,
        address: address,
        email: email,
        role: role,
        isAdmin: false,
        designation: designation,
      };
      const response = await createUser(data);

      showAlert('Success', response.data.message);
    } catch (err) {
      showAlert('Error', 'User Creation Failed!!');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <LinearGradient colors={['#F59E47', '#F7B267']} style={styles.header}>
          <Text style={styles.headerTitle}>Create User</Text>

          <Text style={styles.headerSubtitle}>Add new member to system</Text>
        </LinearGradient>

        {/* FORM CARD */}
        <View style={styles.card}>
          {/* Name */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Enter full name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          {/* Phone */}
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            placeholder="Enter phone number"
            keyboardType="numeric"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />

          <Text style={styles.label}>Father Name</Text>
          <TextInput
            placeholder="Enter Father Name"
            value={fatherName}
            onChangeText={setFatherName}
            style={styles.input}
          />

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          {/* Address */}
          <Text style={styles.label}>Address</Text>
          <TextInput
            placeholder="Enter address"
            value={address}
            onChangeText={setAddress}
            style={[styles.input, { height: 100 }]}
            multiline
            numberOfLines={10}
          />

          {/* Role Selector */}
          <Text style={styles.label}>Role</Text>

          <View style={styles.roleContainer}>
            {['Member', 'Committee'].map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => setRole(item)}
                style={[styles.roleButton, role === item && styles.roleActive]}
              >
                <Text
                  style={[
                    styles.roleText,
                    role === item && styles.roleTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {role === 'Committee' && (
            <>
              <Text style={styles.label}>Designation</Text>

              <View style={styles.roleContainer}>
                {designations.map(item => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setDesignation(item)}
                    style={[
                      styles.roleButton,
                      designation === item && styles.roleActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.roleText,
                        designation === item && styles.roleTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* CREATE BUTTON */}
          <TouchableOpacity onPress={handleCreateUser}>
            <LinearGradient
              colors={['#F59E47', '#F7B267']}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Create User</Text>
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
    margin: 20,
    borderRadius: 30,
    padding: 25,
    elevation: 8,
    shadowColor: '#F59E47',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 15,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
  },

  headerSubtitle: {
    marginTop: 5,
    color: '#fff',
    opacity: 0.9,
  },

  card: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 12,
  },

  label: {
    marginTop: 18,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#3D2C29',
  },

  input: {
    height: 58,
    borderWidth: 1,
    borderColor: '#F5D7BA',
    borderRadius: 18,
    paddingHorizontal: 15,
    backgroundColor: '#FFFDFB',
    fontSize: 16,
  },

  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  roleButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F59E47',
    alignItems: 'center',
    backgroundColor: '#FFF4EA',
  },

  roleActive: {
    backgroundColor: '#F59E47',
  },

  roleText: {
    color: '#3D2C29',
    fontWeight: '700',
  },

  roleTextActive: {
    color: '#fff',
  },

  button: {
    marginTop: 30,
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#F59E47',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
