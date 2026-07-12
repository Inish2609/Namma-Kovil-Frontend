import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getEventsByDate, getUpcomingFestivals } from '../services/service';
import { formatDate, formatTime } from '../utils/helper';
import { showAlert } from '../utils/AlertUtils';

// const upcomingEvents = [
//     {
//         id: '1',
//         title: 'Aadi Festival',
//         date: '12 Aug',
//         image: require('../assets/images/image-2.jpeg'),
//     },
//     {
//         id: '2',
//         title: 'Special Abishegam',
//         date: '18 Aug',
//         image: require('../assets/images/image-2.jpeg'),
//     },
//     {
//         id: '3',
//         title: 'Maha Shivaratri',
//         date: '25 Aug',
//         image: require('../assets/images/image-2.jpeg'),
//     },
// ];

// const todayEvents = [
//     {
//         id: '1',
//         title: 'Special Abishegam',
//         time: '06:00 AM',
//         description: 'Special pooja for devotees',
//     },
//     {
//         id: '2',
//         title: 'Ganapathy Homam',
//         time: '08:00 AM',
//         description: 'Homam for prosperity',
//     },
//     {
//         id: '3',
//         title: 'Annadhanam',
//         time: '12:00 PM',
//         description: 'Free food distribution',
//     },
// ];



export default function HomeScreen() {

    const [todayEvents, setTodayEvents] = useState<{
        id: string;
        title: string;
        time: string;
        description: string;
    }[]>([])

    const [upcomingFestivals, setUpcomingFestivals] = useState<
        {
            id: string;
            title: string;
            date: string;
            image: any;
        }[]>([])

    useEffect(() => {
        handleGetTodayEvents();
        handleGetUpcomingFestivals()
    }, [])

    async function handleGetTodayEvents() {
        try {
            const date = new Date();

            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

            const response = await getEventsByDate(formattedDate);

            const data = response.data.value; // or response.data.data depending on your API

            if (!data || data.length === 0) {
                setTodayEvents([
                    {
                        id: 'no-events',
                        title: 'No Events Today',
                        time: '',
                        description: 'There are no scheduled events for today.',
                    },
                ]);
                return;
            }

            const events = data.map((item: any) => ({
                id: item?.id.toString(),
                title: item?.event_name,
                time: formatTime(item?.event_date_time),
                description: item?.event_description ?? 'Please Come and Get the Amman Blessings',
            }));

            setTodayEvents(events);

        } catch (err) {
            console.log('Error fetching today events', err);
            showAlert("Error", "Failed to fetch today's events. Please try again later.");
        }
    }

    async function handleGetUpcomingFestivals() {
        try {
            const response = await getUpcomingFestivals()

            const data = response.data.value;

            if (!data || data.length === 0) {
                setUpcomingFestivals([
                    {
                        id: 'no-festival',
                        title: 'No Festival Scheduled',
                        date: '',
                        image: require('../assets/images/image-2.jpeg'),
                    },
                ]);
                return;
            }

            const festivals = response.data.value?.map((item: any) => ({
                id: item?.id.toString(),
                title: item?.festival_name,
                date: formatDate(item?.start_date),
                image: require('../assets/images/image-2.jpeg'),
            }))

            setUpcomingFestivals(festivals)

        } catch (err) {
            console.log("Error Fetching Upcoming Festivals", err)
            showAlert("Error", "Failed to Fetch Upcoming Festivals. Please try again later")
        }
    }

    return (
        <LinearGradient
            colors={['#FFF8F3', '#FDEFE5', '#FFF5EE']}
            style={styles.container}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hero Image */}

                <View style={styles.heroContainer}>
                    <Image
                        source={require('../assets/images/image-2.jpeg')}
                        style={styles.heroImage}
                    />

                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)']}
                        style={styles.heroOverlay}
                    />

                    <View style={styles.heroContent}>
                        <Text style={styles.templeName}>
                            Sri Mutharamman Temple
                        </Text>

                        <Text style={styles.templeSubtitle}>
                            Welcome to Divine Blessings
                        </Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>
                    Today's Events
                </Text>

                <FlatList
                    horizontal
                    data={todayEvents}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingLeft: 15 }}
                    renderItem={({ item }) => (
                        <View style={styles.todayEventCard}>
                            <View style={styles.timeBadge}>
                                <Text style={styles.timeBadgeText}>
                                    {item.time}
                                </Text>
                            </View>

                            <Text style={styles.todayEventTitle}>
                                {item.title}
                            </Text>

                            <Text style={styles.todayEventDescription}>
                                {item.description}
                            </Text>
                        </View>
                    )}
                />

                {/* Upcoming Festivals */}

                <Text style={styles.sectionTitle}>
                    Upcoming Festivals
                </Text>

                <FlatList
                    horizontal
                    data={upcomingFestivals}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingLeft: 15 }}
                    renderItem={({ item }) => (
                        <View style={styles.eventCard}>
                            <Image
                                source={item.image}
                                style={styles.eventImage}
                            />

                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.8)']}
                                style={styles.eventOverlay}
                            />

                            <View style={styles.eventContent}>
                                <Text style={styles.eventCardTitle}>
                                    {item.title}
                                </Text>

                                <Text style={styles.eventDate}>
                                    📅 {item.date}
                                </Text>
                            </View>
                        </View>
                    )}
                />

                {/* Pooja Timings */}

                <Text style={styles.sectionTitle}>
                    Daily Pooja Timings
                </Text>

                <View style={styles.card}>
                    <Text style={styles.timing}>
                        🌅 Suprabatham - 05:30 AM
                    </Text>

                    <Text style={styles.timing}>
                        🕉 Kala Santhi - 07:00 AM
                    </Text>

                    <Text style={styles.timing}>
                        🔔 Uchikalam - 12:00 PM
                    </Text>

                    <Text style={styles.timing}>
                        🌙 Sayaraksha - 06:00 PM
                    </Text>
                </View>

                {/* Announcements */}

                <Text style={styles.sectionTitle}>
                    Recent Announcements
                </Text>

                <View style={styles.card}>
                    <Text style={styles.announcement}>
                        📢 Hall Booking Open for August
                    </Text>

                    <Text style={styles.announcement}>
                        📢 Aadi Festival Registration Started
                    </Text>

                    <Text style={styles.announcement}>
                        📢 Special Abishegam this Sunday
                    </Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    heroContainer: {
        height: 280,
        marginBottom: 15,
    },

    heroImage: {
        width: '100%',
        height: '100%',
    },

    heroOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '60%',
    },

    heroContent: {
        position: 'absolute',
        bottom: 25,
        left: 20,
    },

    templeName: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },

    templeSubtitle: {
        color: '#fff',
        marginTop: 5,
        fontSize: 14,
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#7A3E00',
        marginHorizontal: 15,
        marginBottom: 10,
        marginTop: 10,
    },

    card: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        borderRadius: 20,
        padding: 18,
        marginBottom: 15,

        elevation: 5,
    },

    eventTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#7A3E00',
    },

    eventTime: {
        marginTop: 5,
        color: '#666',
    },

    eventDescription: {
        marginTop: 8,
        color: '#666',
    },

    eventCard: {
        width: 260,
        height: 180,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: 15,
    },

    eventImage: {
        width: '100%',
        height: '100%',
    },

    eventOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '50%',
    },

    eventContent: {
        position: 'absolute',
        bottom: 15,
        left: 15,
    },

    eventCardTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },

    eventDate: {
        color: '#fff',
        marginTop: 5,
    },

    timing: {
        fontSize: 15,
        marginBottom: 12,
        color: '#555',
    },

    announcement: {
        fontSize: 15,
        marginBottom: 12,
        color: '#555',
    },

    todayEventCard: {
        width: 240,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 18,
        marginRight: 15,
        marginBottom: 10,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        elevation: 4,
    },

    timeBadge: {
        backgroundColor: '#F59E47',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        marginBottom: 12,
    },

    timeBadgeText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },

    todayEventTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#7A3E00',
        marginBottom: 8,
    },

    todayEventDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});