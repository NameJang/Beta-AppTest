import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AssetExample from './AssetExample';

export default function HeaderFunction() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const progress = useRef(new Animated.Value(0)).current; // สำหรับ progress bar
  const fadeAnim = useRef(new Animated.Value(0)).current; // สำหรับ fade in ของเนื้อหา

  useEffect(() => {
    if (modalVisible) {
      setLoading(true);
      progress.setValue(0);
      fadeAnim.setValue(0); // ตั้งค่า opacity ของเนื้อหาเป็น 0 ก่อน

      Animated.timing(progress, {
        toValue: 1, // ไปถึง 100%
        duration: 1500, // เวลาในการโหลด 1.5 วินาที
        useNativeDriver: false,
      }).start(() => {
        setLoading(false); // เมื่อ progress เต็ม จะหยุดการโหลด
        Animated.timing(fadeAnim, {
          toValue: 1, // ให้ opacity ไปถึง 1
          duration: 1000, // เวลาในการแสดงเนื้อหา 1 วินาที
          useNativeDriver: true,
        }).start(); // เริ่มการแสดงเนื้อหา
      });
    } else {
      progress.setValue(0); // รีเซ็ต progress เมื่อ modal ปิด
    }
  }, [modalVisible, fadeAnim, progress]); // รวมตัวแปรที่ใช้ใน dependency array

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.paragraph}>LabStorage</Text>
        <TouchableOpacity
          style={[styles.buttonnav, modalVisible && styles.buttonnavActive]}
          onPress={() => setModalVisible(true)}>
          <Icon
            name="tasks"
            size={25}
            color={modalVisible ? 'white' : 'black'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <AssetExample />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <View style={styles.navbarModal}>
            <TouchableOpacity
              style={styles.buttoncs}
              onPress={() => setModalVisible(false)}>
              <Icon name="times-circle" size={25} color="white" />
            </TouchableOpacity>
          </View>

          {/* แสดง Progress Bar */}
          {loading ? (
            <View style={styles.progressBarContainer}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'], // กำหนดการแปลงค่า progress เป็นความกว้างของ progress bar
                    }),
                  },
                ]}
              />
            </View>
          ) : (
            // ใช้ Animated.View เพื่อให้เนื้อหาค่อยๆ แสดง (fade in)
            <Animated.View style={{ opacity: fadeAnim }}>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <AssetExample />
              </ScrollView>
            </Animated.View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.836)',
    borderBottomWidth: 7,
    borderBottomColor: 'rgb(58, 97, 225)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 100,
    zIndex: 10,
  },
  navbarModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: 35,
    borderRadius: 10,
    backgroundColor: 'rgb(58, 97, 225)',
    borderBottomWidth: 10,
    borderBottomColor: '#EAEAEA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 100,
    zIndex: 10,
  },
  paragraph: {
    color: '#1249FF',
    padding: 10,
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 8,
    paddingTop: 100, // เพื่อไม่ให้ Card ซ้อนกับ Navbar
  },
  buttonnav: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    margin: 5,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    backgroundColor: 'white',
  },
  buttonnavActive: {
    backgroundColor: 'rgb(58, 97, 225)', // เปลี่ยนสีเมื่อ Modal เปิด
    borderWidth: 1,
    borderColor: 'white',
  },
  buttoncs: {
    position: 'absolute',
    top: 10, // กำหนดระยะจากขอบบน
    right: 10, // กำหนดระยะจากขอบขวา
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'red',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
    borderWidth: 3,
    borderColor: '#ffff',
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
  },
  progressBarContainer: {
    width: 100, // ความกว้างเท่ากับความสูงเพื่อให้เป็นสี่เหลี่ยมจตุรัส
    height: 100,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 20,
  },
  progressBar: {
    height: '100%', // เต็มความสูงของ container
    backgroundColor: 'rgb(58, 97, 225)',
    borderRadius: 10,
  },
});
