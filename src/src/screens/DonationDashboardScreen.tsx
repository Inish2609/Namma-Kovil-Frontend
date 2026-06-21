import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const donationSchemes = [
    {
        id: 1,
        name: 'Annadhanam',
        targetAmount: 200000,
        collectedAmount: 125000,
        totalDonors: 150,
    },
    {
        id: 2,
        name: 'Temple Renovation',
        targetAmount: 500000,
        collectedAmount: 450000,
        totalDonors: 220,
    },
    {
        id: 3,
        name: 'Goshala Donation',
        targetAmount: 100000,
        collectedAmount: 75000,
        totalDonors: 90,
    },
    {
        id: 4,
        name: 'Kumbabishekam',
        targetAmount: 300000,
        collectedAmount: 180000,
        totalDonors: 135,
    },
];

export default function DonationDashboardScreen() {
    const [search, setSearch] = useState('');

    const totalTarget = donationSchemes.reduce(
        (sum, item) => sum + item.targetAmount,
        0,
    );

    const totalCollected = donationSchemes.reduce(
        (sum, item) => sum + item.collectedAmount,
        0,
    );

    const totalPending =
        totalTarget - totalCollected;

    const progress =
        (totalCollected / totalTarget) * 100;

    const totalDonors = donationSchemes.reduce(
        (sum, item) => sum + item.totalDonors,
        0,
    );

    const filteredSchemes = useMemo(() => {
        return donationSchemes.filter(item =>
            item.name
                .toLowerCase()
                .includes(search.toLowerCase()),
        );
    }, [search]);

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}>

                <LinearGradient
                    colors={['#F59E47', '#F7B267']}
                    style={styles.header}>

                    <Text style={styles.headerTitle}>
                        ❤️ Donation Dashboard
                    </Text>

                    <Text style={styles.headerAmount}>
                        ₹{totalCollected.toLocaleString()}
                    </Text>

                    <Text style={styles.headerSub}>
                        Collected of ₹
                        {totalTarget.toLocaleString()}
                    </Text>

                    <View style={styles.progressBackground}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width: `${progress}%`,
                                },
                            ]}
                        />
                    </View>

                    <View style={styles.headerBottom}>

                        <View>

                            <Text style={styles.whiteSmall}>
                                Pending
                            </Text>

                            <Text style={styles.whiteBig}>
                                ₹
                                {totalPending.toLocaleString()}
                            </Text>

                        </View>

                        <View>

                            <Text style={styles.whiteSmall}>
                                Schemes
                            </Text>

                            <Text style={styles.whiteBig}>
                                {donationSchemes.length}
                            </Text>

                        </View>

                    </View>

                </LinearGradient>

                <View style={styles.statsContainer}>

                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>
                            {donationSchemes.length}
                        </Text>

                        <Text style={styles.statLabel}>
                            Schemes
                        </Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>
                            {totalDonors}
                        </Text>

                        <Text style={styles.statLabel}>
                            Donors
                        </Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>
                            ₹
                            {Math.round(
                                totalCollected / 1000,
                            )}
                            K
                        </Text>

                        <Text style={styles.statLabel}>
                            Collected
                        </Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>
                            ₹
                            {Math.round(
                                totalPending / 1000,
                            )}
                            K
                        </Text>

                        <Text style={styles.statLabel}>
                            Pending
                        </Text>
                    </View>

                </View>

                <TextInput
                    placeholder="Search Donation Scheme"
                    placeholderTextColor="#999"
                    value={search}
                    onChangeText={setSearch}
                    style={styles.search}
                />

                <Text style={styles.sectionTitle}>
                    Donation Schemes
                </Text>

                <FlatList
                    scrollEnabled={false}
                    data={filteredSchemes}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingBottom: 30,
                    }}
                    renderItem={({ item }) => {
                        const pending =
                            item.targetAmount -
                            item.collectedAmount;

                        const progress =
                            (item.collectedAmount /
                                item.targetAmount) *
                            100;

                        return (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={styles.schemeCard}
                                onPress={() => {
                                    // navigation.navigate(
                                    //   'DonationSchemeDetailScreen',
                                    //   {scheme: item},
                                    // );
                                }}>

                                <LinearGradient
                                    colors={[
                                        '#FFFFFF',
                                        '#FFF9F2',
                                    ]}
                                    style={styles.cardGradient}>

                                    <View
                                        style={
                                            styles.cardHeader
                                        }>

                                        <View>

                                            <Text
                                                style={
                                                    styles.schemeTitle
                                                }>
                                                ❤️ {item.name}
                                            </Text>

                                            <Text
                                                style={
                                                    styles.schemeSubTitle
                                                }>
                                                {item.totalDonors}{' '}
                                                Donors
                                            </Text>

                                        </View>

                                        <View
                                            style={
                                                styles.amountBadge
                                            }>

                                            <Text
                                                style={
                                                    styles.amountBadgeText
                                                }>
                                                ₹
                                                {Math.round(
                                                    item.collectedAmount /
                                                    1000,
                                                )}
                                                K
                                            </Text>

                                        </View>

                                    </View>

                                    <View
                                        style={
                                            styles.progressContainer
                                        }>

                                        <View
                                            style={
                                                styles.progressBar
                                            }>

                                            <View
                                                style={[
                                                    styles.progressActive,
                                                    {
                                                        width: `${progress}%`,
                                                    },
                                                ]}
                                            />

                                        </View>

                                        <Text
                                            style={
                                                styles.progressText
                                            }>
                                            {progress.toFixed(
                                                0,
                                            )}
                                            %
                                        </Text>

                                    </View>

                                    <View
                                        style={
                                            styles.infoRow
                                        }>

                                        <View
                                            style={
                                                styles.infoItem
                                            }>

                                            <Text
                                                style={
                                                    styles.infoLabel
                                                }>
                                                Target
                                            </Text>

                                            <Text
                                                style={
                                                    styles.infoValue
                                                }>
                                                ₹
                                                {item.targetAmount.toLocaleString()}
                                            </Text>

                                        </View>

                                        <View
                                            style={
                                                styles.infoItem
                                            }>

                                            <Text
                                                style={
                                                    styles.infoLabel
                                                }>
                                                Collected
                                            </Text>

                                            <Text
                                                style={[
                                                    styles.infoValue,
                                                    {
                                                        color:
                                                            '#16A34A',
                                                    },
                                                ]}>
                                                ₹
                                                {item.collectedAmount.toLocaleString()}
                                            </Text>

                                        </View>

                                    </View>

                                    <View
                                        style={
                                            styles.infoRow
                                        }>

                                        <View
                                            style={
                                                styles.infoItem
                                            }>

                                            <Text
                                                style={
                                                    styles.infoLabel
                                                }>
                                                Pending
                                            </Text>

                                            <Text
                                                style={[
                                                    styles.infoValue,
                                                    {
                                                        color:
                                                            '#DC2626',
                                                    },
                                                ]}>
                                                ₹
                                                {pending.toLocaleString()}
                                            </Text>

                                        </View>

                                        <View
                                            style={
                                                styles.infoItem
                                            }>

                                            <Text
                                                style={
                                                    styles.infoLabel
                                                }>
                                                Donors
                                            </Text>

                                            <Text
                                                style={
                                                    styles.infoValue
                                                }>
                                                {
                                                    item.totalDonors
                                                }
                                            </Text>

                                        </View>

                                    </View>

                                    <TouchableOpacity
                                        activeOpacity={
                                            0.9
                                        }
                                        style={
                                            styles.viewButton
                                        }>

                                        <LinearGradient
                                            colors={[
                                                '#F59E47',
                                                '#F7B267',
                                            ]}
                                            style={
                                                styles.viewGradient
                                            }>

                                            <Text
                                                style={
                                                    styles.viewText
                                                }>
                                                View Details →
                                            </Text>

                                        </LinearGradient>

                                    </TouchableOpacity>

                                </LinearGradient>

                            </TouchableOpacity>
                        );
                    }}
                />

                <View
                    style={{
                        height: 30,
                    }}
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
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 30,
        padding: 25,
        elevation: 8,
        shadowColor: '#F59E47',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.25,
        shadowRadius: 12,
    },

    headerTitle: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '800',
    },

    headerAmount: {
        color: '#FFFFFF',
        fontSize: 42,
        fontWeight: '800',
        marginTop: 12,
    },

    headerSub: {
        color: '#FFFFFF',
        opacity: 0.9,
        marginTop: 5,
        fontSize: 15,
    },

    progressBackground: {
        height: 14,
        backgroundColor: 'rgba(255,255,255,0.30)',
        borderRadius: 20,
        marginTop: 25,
        overflow: 'hidden',
    },

    progressFill: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
    },

    headerBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },

    whiteSmall: {
        color: '#FFFFFF',
        opacity: 0.9,
        fontSize: 14,
    },

    whiteBig: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700',
        marginTop: 4,
    },

    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 20,
    },

    statCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        paddingVertical: 20,
        alignItems: 'center',
        marginBottom: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 10,
    },

    statNumber: {
        fontSize: 26,
        fontWeight: '800',
        color: '#F59E47',
    },

    statLabel: {
        marginTop: 8,
        fontSize: 14,
        color: '#777',
        fontWeight: '600',
    },

    search: {
        marginHorizontal: 20,
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        height: 55,
        paddingHorizontal: 18,
        fontSize: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 8,
    },

    sectionTitle: {
        marginHorizontal: 20,
        marginTop: 25,
        marginBottom: 15,
        fontSize: 22,
        fontWeight: '800',
        color: '#3D2C29',
    },

    schemeCard: {
        marginBottom: 20,
    },

    cardGradient: {
        borderRadius: 26,
        padding: 22,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowRadius: 10,
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    schemeTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#3D2C29',
    },

    schemeSubTitle: {
        marginTop: 5,
        color: '#888',
        fontSize: 15,
    },

    amountBadge: {
        backgroundColor: '#FFF3E7',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 30,
    },

    amountBadgeText: {
        color: '#F59E47',
        fontWeight: '700',
        fontSize: 16,
    },

    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 22,
    },

    progressBar: {
        flex: 1,
        height: 12,
        backgroundColor: '#EFEFEF',
        borderRadius: 20,
        overflow: 'hidden',
    },

    progressActive: {
        height: '100%',
        backgroundColor: '#F59E47',
        borderRadius: 20,
    },

    progressText: {
        marginLeft: 12,
        color: '#F59E47',
        fontWeight: '700',
        fontSize: 15,
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    infoItem: {
        flex: 1,
    },

    infoLabel: {
        color: '#999',
        fontSize: 14,
    },

    infoValue: {
        marginTop: 5,
        color: '#3D2C29',
        fontSize: 18,
        fontWeight: '700',
    },

    viewButton: {
        marginTop: 25,
    },

    viewGradient: {
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    viewText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});