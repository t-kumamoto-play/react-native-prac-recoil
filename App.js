import React from 'react';
import Recoil from 'recoil';
import { TextInput, View, Text } from 'react-native';

// atom
const textState = Recoil.atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: 'aaaaa', // default value (aka initial value)
});

// selector
const charCountState = Recoil.selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

// Components
function CharacterCount() {
  const count = Recoil.useRecoilValue(charCountState);

  return (
    <View>
      <Text>
        Character Count: {count}
      </Text>
    </View>
  );
}

function _TextInput() {
  const [text, setText] = Recoil.useRecoilState(textState);

  const onChangeText = (text) => {
    setText(text);
  };

  return (
    <View>
      <TextInput style={{ width: 100, height: 30, borderColor: 'black', borderWidth: 1 }} value={text} onChangeText={onChangeText} />
      <Text>Echo: {text}</Text>
    </View>
  );
}

function CharacterCounter() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <_TextInput />
      <CharacterCount />
    </View>
  );
}

export default function App() {
  return (
    <Recoil.RecoilRoot>
      <CharacterCounter />
    </Recoil.RecoilRoot>
  );
}
