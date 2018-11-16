import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import firebase from 'firebase';
export default function randInt(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
