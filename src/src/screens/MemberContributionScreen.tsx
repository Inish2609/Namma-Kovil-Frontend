import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { showAlert } from '../utils/AlertUtils';
import {
  getUserFestivalsContributionByuserId,
  getUserFestivalSummaryByUserId,
} from '../services/service';
import { isValidValue } from '../utils/helper';

// const user = { id: 1, name: 'Inish Raj' };
// const festivals = [
//   { id: 1, name: 'Aadi Festival', amountPerUser: 1000 },
//   { id: 2, name: 'Panguni Uthiram', amountPerUser: 1500 },
//   { id: 3, name: 'Vinayagar Chaturthi', amountPerUser: 2000 },
//   { id: 4, name: 'Navarathiri', amountPerUser: 1200 },
// ];

// const payments = [
//   { userId: 1, festivalId: 1, paidAmount: 1000 },
//   { userId: 1, festivalId: 2, paidAmount: 500 },
// ];

export default function MemberContributionScreen() {
  //   const data = festivals.map(f => {
  //     const p = payments.find(x => x.festivalId === f.id && x.userId === user.id);
  //     const paid = p?.paidAmount || 0;
  //     const pending = f.amountPerUser - paid;
  //     const progress = (paid / f.amountPerUser) * 100;
  //     const status =
  //       paid >= f.amountPerUser ? 'PAID' : paid > 0 ? 'PARTIAL' : 'PENDING';
  //     return { ...f, paid, pending, progress, status };
  //   });
  //   const assigned = data.reduce((s, i) => s + i.amountPerUser, 0);
  //   const totalPaid = data.reduce((s, i) => s + i.paid, 0);
  //   const totalPending = assigned - totalPaid;
  //   const overall = (totalPaid / assigned) * 100;

  const [userFestivalSummary, setUserFestivalSummary] = useState<{
    id: number;
    name: string;
    total_festivals: number | string;
    assigned_amount: number | string;
    paid_amount: number | string;
    pending_amount: number | string;
    contribution_percentage: number | string;
  }>();

  const [userFestivalsContributions, setUserFestivalsContributions] = useState<
    {
      id: number;
      festival_name: string;
      total_amount: number;
      paid_amount: number;
      pending_amount: number;
      percentage: number | string;
      status: string;
    }[]
  >([]);

  const userId = 1;

  useEffect(() => {
    if (isValidValue(userId)) {
      handleGetUserFestivalsSummaryByUserId();
      handleGetUserFestivalsContributionsByUserid();
    }
  }, [userId]);

  async function handleGetUserFestivalsSummaryByUserId() {
    try {
      const response = await getUserFestivalSummaryByUserId(userId);
      setUserFestivalSummary(response.data.value ?? {});
    } catch (err) {
      console.log('Get User Festival Summary Failed!!');
      showAlert('Error', 'Get User Festival Summary Failed!!');
    }
  }

  async function handleGetUserFestivalsContributionsByUserid() {
    try {
      const response = await getUserFestivalsContributionByuserId(userId);
      setUserFestivalsContributions(response.data.value ?? []);
    } catch (err) {
      console.log('Get User Festivals Contribution Failed!!');
      showAlert('Error', 'Get User Festivals Contribution Failed!!');
    }
  }

  return (
    <LinearGradient colors={['#FFF8F3', '#FDEFE5', '#FFF5EE']} style={s.c}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#F59E47', '#F7B267', '#FFD59A']}
          style={s.hero}
        >
          <Text style={s.h1}>{userFestivalSummary?.name}</Text>
          <Text style={s.sub}>Temple Committee Member</Text>
          <Text style={s.money}>₹{userFestivalSummary?.paid_amount ?? 0}</Text>
          <View style={s.bar}>
            <View
              style={[
                s.fill,
                {
                  width: `${Number(
                    userFestivalSummary?.contribution_percentage ?? 0,
                  )}%`,
                },
              ]}
            />
          </View>
          <Text style={s.white}>
            {Number(userFestivalSummary?.contribution_percentage ?? 0).toFixed(
              0,
            )}
            % Contribution
          </Text>
        </LinearGradient>

        <View style={s.row}>
          <Card
            title="Assigned"
            value={`₹${userFestivalSummary?.assigned_amount ?? 0}`}
          />
          <Card title="Paid" value={`₹${userFestivalSummary?.paid_amount ?? 0}`} />
          <Card
            title="Pending"
            value={`₹${userFestivalSummary?.pending_amount ?? 0}`}
          />
        </View>

        <Text style={s.title}>Festival Contributions</Text>

        {userFestivalsContributions.map(item => (
          <View key={item.id} style={s.card}>
            <Text style={s.name}>🪔 {item?.festival_name}</Text>
            <Text style={s.txt}>Required ₹{item?.total_amount}</Text>
            <Text style={s.txt}>Paid ₹{item?.paid_amount}</Text>
            <Text style={s.txt}>Pending ₹{item?.pending_amount}</Text>
            <View style={s.small}>
              <View
                style={[
                  s.smallFill,
                  { width: `${Number(item?.percentage ?? 0)}%` },
                ]}
              />
            </View>
            <View
              style={[
                s.chip,
                {
                  backgroundColor:
                    item.status === 'PAID'
                      ? '#DFF6DD'
                      : item.status === 'PARTIAL'
                      ? '#FFF2CC'
                      : '#FFE3E3',
                },
              ]}
            >
              <Text>{item?.status}</Text>
            </View>
          </View>
        ))}

        <View style={s.bottom}>
          <Text style={s.pending}>
            Total Pending ₹{userFestivalSummary?.pending_amount ?? 0}
          </Text>
          <TouchableOpacity style={s.btn}>
            <Text style={s.btnTxt}>Pay Pending</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const Card = ({ title, value }: { title: string; value: string }) => (
  <View style={s.stat}>
    <Text style={s.val}>{value}</Text>
    <Text>{title}</Text>
  </View>
);

const s = StyleSheet.create({
  c: { flex: 1 },
  hero: { margin: 20, padding: 24, borderRadius: 28 },
  h1: { fontSize: 30, fontWeight: '700', color: '#fff' },
  sub: { color: '#fff', marginTop: 4 },
  money: { fontSize: 42, fontWeight: '800', color: '#fff', marginTop: 16 },
  bar: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,.3)',
    borderRadius: 20,
    marginTop: 16,
    overflow: 'hidden',
  },
  fill: { height: '100%', backgroundColor: '#fff' },
  white: { color: '#fff', marginTop: 8, fontWeight: '700' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 14,
  },
  stat: {
    flex: 1,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    elevation: 3,
  },
  val: { fontWeight: '700', fontSize: 20, color: '#F59E47' },
  title: { fontSize: 22, fontWeight: '700', margin: 20, color: '#3D2C29' },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 22,
    padding: 18,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: '700', color: '#3D2C29' },
  txt: { marginTop: 6, color: '#666' },
  small: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginTop: 12,
    overflow: 'hidden',
  },
  smallFill: { height: '100%', backgroundColor: '#F59E47' },
  chip: {
    alignSelf: 'flex-end',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    marginTop: 12,
  },
  bottom: {
    margin: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 24,
    elevation: 4,
  },
  pending: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3D2C29',
    textAlign: 'center',
  },
  btn: {
    marginTop: 16,
    backgroundColor: '#F59E47',
    padding: 16,
    borderRadius: 20,
  },
  btnTxt: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
