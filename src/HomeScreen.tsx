import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { addTask, countOpen, Task, toggleTask } from './tasks';

type Props = {
  email: string;
};

export function HomeScreen({ email }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  function handleAdd() {
    setTasks((current) => addTask(current, title));
    setTitle('');
  }

  return (
    <View style={styles.container}>
      <Text testID="welcome-text" style={styles.title} role="heading">
        Welcome
      </Text>
      <Text style={styles.subtitle}>Logged in as {email}</Text>

      <View style={styles.row}>
        <TextInput
          testID="task-input"
          aria-label="New task"
          placeholder="New task"
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={handleAdd}
          style={styles.input}
        />
        <Pressable testID="add-task-button" role="button" onPress={handleAdd} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      <Text testID="open-count" style={styles.subtitle}>
        {countOpen(tasks)} open
      </Text>

      <FlatList
        testID="task-list"
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={({ item }) => (
          <Pressable
            testID={`task-${item.id}`}
            role="checkbox"
            aria-checked={item.done}
            onPress={() => setTasks((current) => toggleTask(current, item.id))}
            style={styles.task}
          >
            <Text style={[styles.taskText, item.done && styles.done]}>
              {item.done ? '☑' : '☐'} {item.title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 64, gap: 12 },
  title: { fontSize: 32, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#444' },
  row: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#888', borderRadius: 8, padding: 12, fontSize: 18 },
  button: { backgroundColor: '#1F5BA8', borderRadius: 8, paddingHorizontal: 18, justifyContent: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  task: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  taskText: { fontSize: 18 },
  done: { textDecorationLine: 'line-through', color: '#888' },
});
