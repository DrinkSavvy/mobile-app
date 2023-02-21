import { StyleSheet, View } from "react-native"

const Divider = () => {
  return <View style={styles.divider} />
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "lightgray",
    marginVertical: 10,
  },
})

export default Divider
