import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const scheme = {
  id: 1,
  name: 'Annadhanam',
};

// ✅ Each user has their own target amount
const schemeMembers = [
  {userId: 1, amount: 500},
  {userId: 2, amount: 300},
  {userId: 3, amount: 700},
  {userId: 4, amount: 500},
  {userId: 5, amount: 250},
  {userId: 6, amount: 400},
];

const users = [
  {id: 1, name: 'Inish Raj'},
  {id: 2, name: 'Kumar'},
  {id: 3, name: 'Ganesh'},
  {id: 4, name: 'Suresh'},
  {id: 5, name: 'Arun'},
  {id: 6, name: 'Ramesh'},
];

const payments = [
  {userId: 1, schemeId: 1, paidAmount: 500},
  {userId: 2, schemeId: 1, paidAmount: 300},
  {userId: 4, schemeId: 1, paidAmount: 500},
  {userId: 5, schemeId: 1, paidAmount: 250},
];

export default function DonationSchemeDetailScreen() {
  const [search, setSearch] = useState('');

  // ✅ Total target based on each user amount
  const targetAmount = useMemo(() => {
    return schemeMembers.reduce((sum, m) => sum + m.amount, 0);
  }, []);

  // total collected
  const collectedAmount = useMemo(() => {
    return payments.reduce((sum, item) => sum + item.paidAmount, 0);
  }, []);

  const pendingAmount = targetAmount - collectedAmount;

  const progress = (collectedAmount / targetAmount) * 100;

  // ✅ Merge user + scheme + payments
  const members = useMemo(() => {
    return users
      .map(user => {
        const schemeData = schemeMembers.find(
          x => x.userId === user.id,
        );

        const target = schemeData?.amount || 0;

        const payment = payments.find(
          x => x.userId === user.id,
        );

        const paid = payment?.paidAmount || 0;

        let status = 'Pending';

        if (paid === target) {
          status = 'Paid';
        } else if (paid > 0) {
          status = 'Partial';
        }

        return {
          ...user,
          targetAmount: target,
          paid,
          pending: target - paid,
          status,
        };
      })
      .filter(item =>
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
  }, [search]);

  const paidCount = members.filter(x => x.status === 'Paid').length;
  const partialCount = members.filter(x => x.status === 'Partial').length;
  const pendingCount = members.filter(x => x.status === 'Pending').length;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <LinearGradient colors={['#F59E47', '#F7B267']} style={styles.header}>
          <Text style={styles.title}>❤️ {scheme.name}</Text>

          <Text style={styles.amount}>
            ₹{collectedAmount.toLocaleString()}
          </Text>

          <Text style={styles.subTitle}>Collected</Text>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {width: `${progress}%`},
              ]}
            />
          </View>

          <View style={styles.headerRow}>
            <View>
              <Text style={styles.smallWhite}>Target</Text>
              <Text style={styles.bigWhite}>₹{targetAmount}</Text>
            </View>

            <View>
              <Text style={styles.smallWhite}>Pending</Text>
              <Text style={styles.bigWhite}>₹{pendingAmount}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* SUMMARY */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{paidCount}</Text>
            <Text style={styles.summaryLabel}>Paid</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{partialCount}</Text>
            <Text style={styles.summaryLabel}>Partial</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{pendingCount}</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>
        </View>

        {/* SEARCH */}
        <TextInput
          placeholder="Search Member"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />

        <Text style={styles.memberTitle}>Members</Text>

        {/* LIST */}
        <FlatList
          scrollEnabled={false}
          data={members}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 120,
          }}
          renderItem={({item}) => {
            const percentage =
              item.targetAmount > 0
                ? (item.paid / item.targetAmount) * 100
                : 0;

            return (
              <TouchableOpacity style={styles.memberCard}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.name.charAt(0)}
                  </Text>
                </View>

                <View style={styles.memberContent}>
                  <View style={styles.nameRow}>
                    <View>
                      <Text style={styles.memberName}>
                        {item.name}
                      </Text>

                      <Text style={styles.memberAmount}>
                        ₹{item.paid} / ₹{item.targetAmount}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.statusChip,
                        item.status === 'Paid'
                          ? styles.paidChip
                          : item.status === 'Partial'
                          ? styles.partialChip
                          : styles.pendingChip,
                      ]}>
                      <Text style={styles.statusText}>
                        {item.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.memberProgress}>
                    <View style={styles.memberProgressBackground}>
                      <View
                        style={[
                          styles.memberProgressFill,
                          {width: `${percentage}%`},
                        ]}
                      />
                    </View>

                    <Text style={styles.progressPercentage}>
                      {percentage.toFixed(0)}%
                    </Text>
                  </View>

                  <View style={styles.bottomRow}>
                    <View>
                      <Text style={styles.smallLabel}>Paid</Text>
                      <Text style={styles.valueGreen}>
                        ₹{item.paid}
                      </Text>
                    </View>

                    <View>
                      <Text style={styles.smallLabel}>Pending</Text>
                      <Text style={styles.valueRed}>
                        ₹{item.pending}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        {/* BUTTON */}
        <TouchableOpacity style={styles.collectButton}>
          <LinearGradient
            colors={['#F59E47', '#F7B267']}
            style={styles.collectGradient}>
            <Text style={styles.collectText}>
              ❤️ Collect Donation
            </Text>
          </LinearGradient>
        </TouchableOpacity>
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
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },

  amount: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '800',
    marginTop: 15,
  },

  subTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.9,
    marginTop: 5,
  },

  progressBar: {
    marginTop: 25,
    height: 14,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },

  headerRow: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  smallWhite: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
  },

  bigWhite: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 4,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 5,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 5,
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 5,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
  },

  summaryValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F59E47',
  },

  summaryLabel: {
    marginTop: 6,
    color: '#777',
    fontSize: 14,
    fontWeight: '600',
  },

  search: {
    marginHorizontal: 20,
    marginTop: 25,
    backgroundColor: '#FFFFFF',
    height: 56,
    borderRadius: 18,
    paddingHorizontal: 18,
    fontSize: 16,
    elevation: 3,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
  },

  memberTitle: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
    fontSize: 22,
    fontWeight: '800',
    color: '#3D2C29',
  },

  memberCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    flexDirection: 'row',

    elevation: 5,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 8,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F59E47',
  },

  memberContent: {
    flex: 1,
    marginLeft: 15,
  },

  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  memberName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#3D2C29',
  },

  memberAmount: {
    color: '#777',
    marginTop: 5,
  },

  statusChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },

  paidChip: {
    backgroundColor: '#DCFCE7',
  },

  partialChip: {
    backgroundColor: '#FEF3C7',
  },

  pendingChip: {
    backgroundColor: '#FEE2E2',
  },

  statusText: {
    fontWeight: '700',
    fontSize: 12,
  },

  memberProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },

  memberProgressBackground: {
    flex: 1,
    height: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 20,
    overflow: 'hidden',
  },

  memberProgressFill: {
    height: '100%',
    backgroundColor: '#F59E47',
    borderRadius: 20,
  },

  progressPercentage: {
    marginLeft: 10,
    color: '#F59E47',
    fontWeight: '700',
    fontSize: 14,
  },

  bottomRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  smallLabel: {
    color: '#999',
    fontSize: 13,
  },

  valueGreen: {
    marginTop: 4,
    fontSize: 17,
    fontWeight: '700',
    color: '#16A34A',
  },

  valueRed: {
    marginTop: 4,
    fontSize: 17,
    fontWeight: '700',
    color: '#DC2626',
  },

  collectButton: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
  },

  collectGradient: {
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 8,

    shadowColor: '#F59E47',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 8,
  },

  collectText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});