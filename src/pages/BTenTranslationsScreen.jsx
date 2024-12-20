import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import BTenHeader from '../components/BTenHeader';

export default function () {
  const renderBroadcast = (league, time, teams) => (
    <View style={styles.broadcast}>
      <View style={styles.leagueContainer}>
        <Text style={styles.league}>{league}</Text>
        <Text style={styles.matchTime}>{time}</Text>
      </View>
      <View style={styles.teamsContainer}>
        <Text style={styles.teams}>{teams}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <BTenHeader />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 100, marginTop: 15}}>
        {renderBroadcast(
          'La Liga',
          '15.02 20:00',
          'FC Barcelona ' + ' Real Madrid',
        )}
        {renderBroadcast(
          'EPL',
          '25.03 18:30',
          'Liverpool ' + ' Manchester United',
        )}
        {renderBroadcast(
          'Serie A',
          '10.04 21:00',
          'Juventus ' + ' Inter Milan',
        )}
        {renderBroadcast(
          'NHL',
          '30.05 19:45',
          'Boston Bruins ' + ' New York Rangers',
        )}
        {renderBroadcast(
          'MLB',
          '20.06 14:30',
          'Los Angeles Dodgers ' + ' San Francisco Giants',
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    backgroundColor: COLORS.white,
  },
  broadcast: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#CCFFD4',
    borderRadius: 8,
  },
  league: {
    fontSize: 30,
    fontFamily: FONTS.black,
    color: COLORS.black,
    paddingVertical: 8,
  },
  leagueContainer: {
    width: '100%',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  teamsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  matchTime: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: 'left',
    width: '60%',
    marginLeft: 15,
  },
  teams: {
    textAlign: 'left',
    fontFamily: FONTS.regular,
    fontSize: 17,
    color: COLORS.black,
    marginTop: 5,
  },
});
