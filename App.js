import { useRef, useState } from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ['#A5BBFF', '#DDBEFE', '#B98EFF', '#FF63ED'];
const DATA = [
   {
      key: '3571572',
      title: 'Multi-lateral intermediate moratorium',
      description: "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
      image: 'https://cdn-icons-png.flaticon.com/512/3571/3571801.png',
   },
   {
      key: '3571747',
      title: 'Automated radical data-warehouse',
      description: 'Use the optical SAS system, then you can navigate the auxiliary alarm!',
      image: 'https://cdn-icons-png.flaticon.com/512/3571/3571747.png',
   },
   {
      key: '3571680',
      title: 'Inverse attitude-oriented system engine',
      description: 'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
      image: 'https://cdn-icons-png.flaticon.com/512/3571/3571665.png',
   },
   {
      key: '3571603',
      title: 'Monitored global data-warehouse',
      description: 'We need to program the open-source IB interface!',
      image: 'https://cdn-icons-png.flaticon.com/512/3571/3571603.png',
   },
];

const Square = ({ scrollX }) => {
   const YOLO = Animated.modulo(Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)), 1);
   const rotate = YOLO.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['35deg', '0deg', '35deg'],
   });
   const translateX = YOLO.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -height, 0],
   });

   return (
      <Animated.View
         style={{
            position: 'absolute',
            top: -height * 0.7,
            left: -height * 0.35,
            width: height,
            height: height,
            backgroundColor: '#fff',
            borderRadius: 86,
            transform: [{ rotate }, { translateX }],
         }}
      />
   );
};

const Indicator = ({ scrollX }) => {
   return (
      <View style={{ position: 'absolute', bottom: 100, flexDirection: 'row' }}>
         {DATA.map((_, index) => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
            const scale = scrollX.interpolate({
               inputRange,
               outputRange: [0.8, 1.4, 0.8],
               extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
               inputRange,
               outputRange: [0.6, 0.9, 0.6],
               extrapolate: 'clamp',
            });
            return (
               <Animated.View
                  key={`indicator-${index}`}
                  style={{
                     margin: 10,
                     height: 10,
                     width: 10,
                     borderRadius: 5,
                     backgroundColor: '#fff',
                     transform: [{ scale }],
                     opacity,
                  }}
               />
            );
         })}
      </View>
   );
};

const Backdrop = ({ scrollX }) => {
   const backgroundColor = scrollX.interpolate({
      inputRange: bgs.map((_, index) => index * width),
      outputRange: bgs.map((bg) => bg),
   });
   return <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor }]} />;
};

export default function App() {
   const scrollX = useRef(new Animated.Value(0)).current;

   return (
      <View style={styles.container}>
         <StatusBar hidden />
         <Backdrop scrollX={scrollX} />
         <Square scrollX={scrollX} />
         <Animated.FlatList
            data={DATA}
            horizontal
            contentContainerStyle={{ paddingBottom: 100 }}
            scrollEventThrottle={32}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
               return (
                  <View style={{ width, alignItems: 'center', padding: 20 }}>
                     <View style={{ flex: 0.7, justifyContent: 'center' }}>
                        <Image source={{ uri: item.image }} style={{ width: width / 2, height: width / 2, resizeMode: 'contain' }} />
                     </View>
                     <View ctyle={{ flex: 0.3 }}>
                        <Text style={{ marginBottom: 10, fontSize: 28, fontWeight: '800', color: '#fff' }}>{item.title}</Text>
                        <Text style={{ fontSize: 16, fontWeight: '300', color: '#fff' }}>{item.description}</Text>
                     </View>
                  </View>
               );
            }}
         />
         <Indicator scrollX={scrollX} />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
