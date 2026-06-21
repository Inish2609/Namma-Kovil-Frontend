import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';

const users = [
  {id: 1, name: 'Inish Raj'},
  {id: 2, name: 'Kumar'},
  {id: 3, name: 'Ganesh'},
  {id: 4, name: 'Arun'},
];

const festivals = [
  {id: 1, name: 'Aadi Festival'},
  {id: 2, name: 'Panguni Festival'},
  {id: 3, name: 'Vinayagar Festival'},
];

// demo storage
let assignments = [
  {id: 1, userId: 1, festivalId: 1, amount: 1000},
  {id: 2, userId: 2, festivalId: 2, amount: 1500},
];

export default function SchemeAssignmentScreen() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [amount, setAmount] = useState('');

  const userList = users.map(u => ({
    label: u.name,
    value: u.id,
  }));

  const festivalList = festivals.map(f => ({
    label: f.name,
    value: f.id,
  }));

  const handleAssign = () => {
    if (!selectedUser || !selectedFestival || !amount) return;

    const newItem = {
      id: Date.now(),
      userId: selectedUser,
      festivalId: selectedFestival,
      amount: Number(amount),
    };

    assignments = [...assignments, newItem];

    setSelectedUser(null);
    setSelectedFestival(null);
    setAmount('');
  };

  const data = useMemo(() => {
    return assignments.map(item => {
      const user = users.find(u => u.id === item.userId);
      const festival = festivals.find(f => f.id === item.festivalId);

      return {
        ...item,
        userName: user?.name,
        festivalName: festival?.name,
      };
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER (same style as your screen) */}
        <LinearGradient
          colors={['#F59E47', '#F7B267']}
          style={styles.header}>

          <Text style={styles.headerTitle}>
            Scheme Assignment
          </Text>

          <Text style={styles.headerSubtitle}>
            Assign user to festival contribution
          </Text>

        </LinearGradient>

        {/* FORM CARD */}
        <View style={styles.formCard}>

          <Text style={styles.label}>Member</Text>

          <Dropdown
            style={styles.dropdown}
            data={userList}
            labelField="label"
            valueField="value"
            placeholder="Select Member"
            value={selectedUser}
            onChange={item => setSelectedUser(item.value)}
          />

          <Text style={styles.label}>Festival</Text>

          <Dropdown
            style={styles.dropdown}
            data={festivalList}
            labelField="label"
            valueField="value"
            placeholder="Select Festival"
            value={selectedFestival}
            onChange={item => setSelectedFestival(item.value)}
          />

          <Text style={styles.label}>Amount</Text>

          <TextInput
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
          />

          <TouchableOpacity onPress={handleAssign}>
            <LinearGradient
              colors={['#F59E47', '#F7B267']}
              style={styles.button}>
              <Text style={styles.buttonText}>
                Assign Scheme
              </Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>

        {/* LIST */}
        <Text style={styles.listTitle}>Assigned Members</Text>

        <FlatList
          scrollEnabled={false}
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.card}>

              <View style={styles.row}>
                <Text style={styles.name}>
                  {item.userName}
                </Text>

                <Text style={styles.amount}>
                  ₹{item.amount}
                </Text>
              </View>

              <Text style={styles.sub}>
                {item.festivalName}
              </Text>

            </View>
          )}
        />

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
    shadowOffset: {width: 0, height: 8},
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

  formCard: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 12,
  },

  label: {
    marginTop: 18,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#3D2C29',
  },

  dropdown: {
    height: 58,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 18,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
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

  button: {
    marginTop: 25,
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#F59E47',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  listTitle: {
    marginHorizontal: 20,
    marginTop: 25,
    fontSize: 20,
    fontWeight: '800',
    color: '#3D2C29',
  },

  card: {
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 6,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    elevation: 4,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3D2C29',
  },

  amount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F59E47',
  },

  sub: {
    marginTop: 6,
    color: '#777',
  },
});