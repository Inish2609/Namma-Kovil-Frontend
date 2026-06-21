// FestivalDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const festival = { name: 'Aadi Festival', amountPerUser: 1000 };
const users = [
    { id: 1, name: 'Inish Raj', paid: 1000 },
    { id: 2, name: 'Kumar', paid: 500 },
    { id: 3, name: 'Ganesh', paid: 0 },
    { id: 4, name: 'Suresh', paid: 1000 },
    { id: 5, name: 'Arun', paid: 1000 },
    { id: 6, name: 'Ramesh', paid: 250 },
];

export default function FestivalDetailScreen() {
    const target = festival.amountPerUser * users.length;
    const collected = users.reduce((s, i) => s + i.paid, 0);
    const pending = target - collected;
    const progress = (collected / target) * 100;

    return (
        <LinearGradient colors={['#FFF8F3', '#FDEFE5', '#FFF5EE']} style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient colors={['#F59E47', '#F7B267', '#FFD59A']} style={styles.hero}>
                    <Text style={styles.title}>🪔 {festival.name}</Text>
                    <Text style={styles.amount}>₹{collected.toLocaleString()}</Text>
                    <Text style={styles.sub}>Collected</Text>

                    <View style={styles.bar}>
                        <View style={[styles.fill, { width: `${progress}%` }]} />
                    </View>

                    <View style={styles.row}>
                        <View>
                            <Text style={styles.whiteSmall}>Target</Text>
                            <Text style={styles.white}>₹{target}</Text>
                        </View>

                        <View>
                            <Text style={styles.whiteSmall}>Pending</Text>
                            <Text style={styles.white}>₹{pending}</Text>
                        </View>
                    </View>
                </LinearGradient>

                <View style={styles.statsRow}>
                    <View style={styles.stat}>
                        <Text style={styles.statNum}>{users.filter(i => i.paid === 1000).length}</Text>
                        <Text>Paid</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statNum}>{users.filter(i => i.paid > 0 && i.paid < 1000).length}</Text>
                        <Text>Partial</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statNum}>{users.filter(i => i.paid === 0).length}</Text>
                        <Text>Pending</Text>
                    </View>
                </View>

                <TextInput placeholder="Search Member" style={styles.search} />

                <FlatList
                    scrollEnabled={false}
                    data={users}
                    keyExtractor={i => String(i.id)}
                    renderItem={({ item }) => {
                        const pct = item.paid / festival.amountPerUser * 100;
                        const status = item.paid === 1000 ? 'PAID' : item.paid === 0 ? 'PENDING' : 'PARTIAL';
                        return (
                            <TouchableOpacity style={styles.card}>
                                <View style={styles.avatar}><Text style={styles.avatarTxt}>{item.name[0]}</Text></View>
                                <View style={{ flex: 1, marginLeft: 15 }}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.paid}>₹{item.paid} / ₹1000</Text>
                                    <View style={styles.smallBar}>
                                        <View style={[styles.smallFill, { width: `${pct}%` }]} />
                                    </View>
                                </View>
                                <View style={[
                                    styles.chip,
                                    { backgroundColor: status === 'PAID' ? '#DFF6DD' : status === 'PARTIAL' ? '#FFF2CC' : '#FFE3E3' }
                                ]}>
                                    <Text>{status}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />

                <TouchableOpacity style={styles.fab}>
                    <Text style={styles.fabText}>+ Collect Payment</Text>
                </TouchableOpacity>

            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    hero: { margin: 20, borderRadius: 30, padding: 25, elevation: 8 },
    title: { fontSize: 28, fontWeight: '700', color: '#fff' },
    amount: { fontSize: 42, fontWeight: '800', color: '#fff', marginTop: 10 },
    sub: { color: '#fff', opacity: .9 },
    bar: { height: 14, backgroundColor: 'rgba(255,255,255,.3)', borderRadius: 20, marginTop: 25, overflow: 'hidden' },
    fill: { height: '100%', backgroundColor: '#fff' },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
    white: { color: '#fff', fontSize: 20, fontWeight: '700' },
    whiteSmall: { color: '#fff', opacity: .8 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 20 },
    stat: { backgroundColor: '#ffffffdd', padding: 20, borderRadius: 22, alignItems: 'center', flex: 1, margin: 6, elevation: 4 },
    statNum: { fontSize: 26, fontWeight: '700', color: '#F59E47' },
    search: { backgroundColor: '#fff', margin: 20, borderRadius: 30, paddingHorizontal: 20, height: 55, elevation: 3 },
    card: { backgroundColor: '#fff', marginHorizontal: 20, marginBottom: 15, borderRadius: 24, padding: 18, flexDirection: 'row', alignItems: 'center', elevation: 3 },
    avatar: { height: 60, width: 60, borderRadius: 30, backgroundColor: '#FDE6C7', justifyContent: 'center', alignItems: 'center' },
    avatarTxt: { fontSize: 22, fontWeight: '700', color: '#F59E47' },
    name: { fontSize: 18, fontWeight: '700', color: '#3D2C29' },
    paid: { color: '#777', marginTop: 4 },
    smallBar: { height: 8, backgroundColor: '#eee', borderRadius: 10, marginTop: 10, overflow: 'hidden' },
    smallFill: { height: '100%', backgroundColor: '#F59E47' },
    chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
    fab: { margin: 20, backgroundColor: '#F59E47', padding: 18, borderRadius: 30, alignItems: 'center' },
    fabText: { color: '#fff', fontWeight: '700', fontSize: 18 }
});
