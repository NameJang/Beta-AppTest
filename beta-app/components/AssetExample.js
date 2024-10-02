import { Text, View, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-paper';

export default function AssetExample() {
  return (
    <View style={styles.cardWrapper}>
      {/* เพิ่มจำนวน Card ได้ตามต้องการ */}
      {Array.from({ length: 12 }).map((_, index) => (
        <Card style={styles.card} key={index}>
          <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/Jeto.jpg')} />
            <Text style={styles.paragraph}>
              Slo titem {index + 1}
            </Text>
          </View>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  paragraph: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    borderRadius: 8,
    height: 64,
    width: 64,
  },
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap', // ทำให้สามารถห่อแถวได้เมื่อพื้นที่ไม่พอ
    justifyContent: 'space-between', // ช่องว่างระหว่าง Card
    paddingHorizontal: 10,
  },
  card: {
    width: '25%', // ขนาด card เป็น 25% ของความกว้าง
    aspectRatio: 1, // ทำให้ card เป็นสี่เหลี่ยมจัตุรัส
    margin: 5, // เพิ่มช่องว่างรอบ card
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderWidth: 2, // ขอบ card เพื่อให้ดูเหมือนช่องกระเป๋า
    borderColor: '#d3d3d3', // สีของขอบ
    elevation: 4, // ทำให้ card ดูนูนขึ้นมาเล็กน้อย
  },
});
