import React from 'react';
import BottomButton from '../components/BottomButton';
import CircleGradient from '../components/CircleGradient';
import EventCard from '../components/EventCard';
import GroupCard from '../components/GroupCard';
import ProfilePhoto from '../components/ProfilePhoto';
import renderer from 'react-test-renderer';


it('renders BottomButton correctly', () => {
  const tree = renderer
    .create(<BottomButton buttonAction={alert('hello')} buttonText="Hi" buttonFilled={false} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders CircleGradient correctly', () => {
  const tree = renderer
    .create(<CircleGradient />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders EventCard correctly', () => {
  const tree = renderer
    .create(<EventCard eventName="Event"/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders GroupCard correctly', () => {
  const users = [];
  const tree = renderer
    .create(<GroupCard groupName="Group" groupUserId={users} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders ProfilePhoto correctly', () => {
  const tree = renderer
    .create(<ProfilePhoto />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
