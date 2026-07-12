import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { showAlert } from '../utils/AlertUtils';
import {
  getAllUsersTotalPendingAmountDetails,
  getFestivalDashboardDetails,
} from '../services/service';

// const festivals = [
//   {
//     id: 1,
//     name: 'Aadi Festival',
//     amountPerUser: 1000,
//   },
//   {
//     id: 2,
//     name: 'Panguni Uthiram',
//     amountPerUser: 1500,
//   },
//   {
//     id: 3,
//     name: 'Vinayagar Chaturthi',
//     amountPerUser: 2000,
//   },
// ];

// const users = [
//   {
//     id: 1,
//     name: 'Inish Raj',
//   },
//   {
//     id: 2,
//     name: 'Kumar',
//   },
//   {
//     id: 3,
//     name: 'Ganesh',
//   },
//   {
//     id: 4,
//     name: 'Suresh',
//   },
// ];

// const payments = [
//   {
//     userId: 1,
//     festivalId: 1,
//     paidAmount: 1000,
//   },
//   {
//     userId: 1,
//     festivalId: 2,
//     paidAmount: 1000,
//   },
//   {
//     userId: 2,
//     festivalId: 1,
//     paidAmount: 500,
//   },
//   {
//     userId: 3,
//     festivalId: 3,
//     paidAmount: 2000,
//   },
// ];

const FestivalDashboardScreen = ({ navigation }: any) => {
  // const getUserPending = (userId: number) => {
  //   const assignedAmount = festivals.reduce(
  //     (sum, item) => sum + item.amountPerUser,
  //     0,
  //   );

  //   const paidAmount = payments
  //     .filter(item => item.userId === userId)
  //     .reduce((sum, item) => sum + item.paidAmount, 0);

  //   return assignedAmount - paidAmount;
  // };

  const [festivalDetails, setFestivalDetails] = useState<
    {
      id: number;
      festival_name: string;
      target_amount: number;
      collected_amount: string | number;
      pending_amount: string | number;
      percentage: number;
    }[]
  >([]);

  const [userAmountDetails, setUserAmountDetails] = useState<
    {
      id: number;
      name: string;
      assigned_amount: string | number;
      paid_amount: string | number;
      pending_amount: string | number;
    }[]
  >([]);

  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    return userAmountDetails.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, userAmountDetails]);

  useEffect(() => {
    handleGetFestivalDashboardDetails();
    handleGetAllUsersTotalPendingAmountDetails();
  }, []);

  async function handleGetFestivalDashboardDetails() {
    try {
      const response = await getFestivalDashboardDetails();
      setFestivalDetails(response.data.value ?? []);
    } catch (err) {
      console.log('Get Festival Dashboard details Failed!!');
      showAlert('Error', 'Get Festival Dashboard details Failed!!');
    }
  }

  async function handleGetAllUsersTotalPendingAmountDetails() {
    try {
      const response = await getAllUsersTotalPendingAmountDetails();
      setUserAmountDetails(response.data.value ?? []);
    } catch (err) {
      console.log('Get All Users Total Pending Amount Details Failed!!');
      showAlert('Error', 'Get All Users Total Pending Amount Details Failed!!');
    }
  }

  const renderFestivalCard = ({
    item,
  }: {
    item: (typeof festivalDetails)[0];
  }) => {
    // const targetAmount = item.amountPerUser * users.length;

    // const collectedAmount = payments
    //   .filter(payment => payment.festivalId === item.id)
    //   .reduce((sum, payment) => sum + payment.paidAmount, 0);

    // const progress = (collectedAmount / targetAmount) * 100;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.festivalCard}
        onPress={() =>
          navigation.navigate('FestivalDetail', {
            festival_id: item.id,
          })
        }
      >
        <Text style={styles.festivalName}>{item.festival_name}</Text>

        <Text style={styles.amountText}>
          ₹{item.collected_amount.toLocaleString()}
          {' / '}₹{item.target_amount.toLocaleString()}
        </Text>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${item.percentage ?? 0}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          {(Number(item.percentage) ?? 0).toFixed(0)}%{' Collected'}
        </Text>

        <Text style={styles.pendingText}>
          Pending ₹{(item?.pending_amount).toLocaleString()}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderUser = ({ item }: { item: (typeof userAmountDetails)[0] }) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() =>
        navigation.navigate('MemberContribution', {
          user: item.id,
        })
      }
    >
      <View>
        <Text style={styles.userName}>{item.name}</Text>

        <Text style={styles.userPending}>Pending ₹{item?.pending_amount}</Text>
      </View>

      <Text style={styles.viewText}>View →</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#FFF8F3', '#FDEFE5', '#FFF5EE']}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Festival Dashboard</Text>

        {/* Festivals */}

        <Text style={styles.sectionTitle}>Festival Collections</Text>

        <FlatList
          horizontal
          data={festivalDetails}
          renderItem={renderFestivalCard}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
        />

        {/* Search */}

        <Text style={styles.sectionTitle}>Search Member</Text>

        <TextInput
          placeholder="Search member..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

        {/* Members */}

        <Text style={styles.sectionTitle}>Members</Text>

        <FlatList
          data={filteredUsers}
          renderItem={renderUser}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default FestivalDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3D2C29',
    marginTop: 20,
    marginHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3D2C29',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },

  festivalCard: {
    width: 280,
    backgroundColor: '#FFF',
    padding: 18,
    marginVertical: 8,
    marginRight: 15,
    borderRadius: 24,
    elevation: 5,
  },

  festivalName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3D2C29',
  },

  amountText: {
    marginTop: 8,
    color: '#666',
    fontWeight: '600',
  },

  progressBar: {
    height: 12,
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    marginTop: 15,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#F59E47',
  },

  progressText: {
    marginTop: 10,
    fontWeight: '700',
    color: '#F59E47',
  },

  pendingText: {
    marginTop: 5,
    color: '#D9534F',
    fontWeight: '600',
  },

  searchInput: {
    height: 55,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 15,
    elevation: 3,
  },

  userCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 18,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },

  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3D2C29',
  },

  userPending: {
    marginTop: 5,
    color: '#D9534F',
    fontWeight: '600',
  },

  viewText: {
    color: '#F59E47',
    fontWeight: '700',
    fontSize: 15,
  },
});
