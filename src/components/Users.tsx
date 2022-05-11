import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {fetchUsers, selectAllUsers} from '../redux/users';
import {AppDispatch, RootState} from '../redux/store';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading} = useSelector((state: RootState) => state.users);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View>
      <Button title={'Reload'} onPress={() => dispatch(fetchUsers())} />
      {users.map(user => {
        return (
          <View style={styles.container} key={user.id}>
            <View>
              <View style={styles.dataContainer}>
                <Text>
                  {user.first_name} {user.last_name}
                </Text>
              </View>
              <View style={styles.dataContainer}>
                <Text>{user.email}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  dataContainer: {
    flexDirection: 'row',
  },
});
