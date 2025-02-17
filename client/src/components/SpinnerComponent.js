import React from 'react';
import {View, ActivityIndicator, Modal, StyleSheet} from 'react-native';

export default function SpinnerComponent({visible}) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#eb8d36" animating={true} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
