import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function AddSchemeScreen() {
  const [schemeName, setSchemeName] = useState('');
  const [description, setDescription] = useState('');
  const [defaultAmount, setDefaultAmount] = useState('');

  const handleSave = () => {
    if (!schemeName) return;

    const newScheme = {
      id: Date.now(),
      name: schemeName,
      description,
      defaultAmount: Number(defaultAmount) || 0,
    };

    console.log('New Scheme Created:', newScheme);

    // reset
    setSchemeName('');
    setDescription('');
    setDefaultAmount('');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <LinearGradient
          colors={['#F59E47', '#F7B267']}
          style={styles.header}>

          <Text style={styles.headerTitle}>
            Add New Scheme
          </Text>

          <Text style={styles.headerSubtitle}>
            Create festival / contribution scheme
          </Text>

        </LinearGradient>

        {/* FORM CARD */}
        <View style={styles.card}>

          {/* Scheme Name */}
          <Text style={styles.label}>Scheme Name</Text>
          <TextInput
            placeholder="Enter scheme name"
            value={schemeName}
            onChangeText={setSchemeName}
            style={styles.input}
          />

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />

          {/* Default Amount */}
          <Text style={styles.label}>
            Default Amount (Optional)
          </Text>
          <TextInput
            placeholder="Enter amount"
            keyboardType="numeric"
            value={defaultAmount}
            onChangeText={setDefaultAmount}
            style={styles.input}
          />

          {/* SAVE BUTTON */}
          <TouchableOpacity onPress={handleSave}>
            <LinearGradient
              colors={['#F59E47', '#F7B267']}
              style={styles.button}>

              <Text style={styles.buttonText}>
                Create Scheme
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

  card: {
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
    marginTop: 30,
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
});