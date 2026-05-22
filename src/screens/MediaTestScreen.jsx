import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const MediaTestScreen = () => {
  const posts = [
    {
      user: 'John Doe',
      time: '2 hours ago',
      content: 'This is my first post! So excited to share this with you all.',
      image: 'logo.png',
    },
    {
      user: 'Jane Smith',
      time: '5 hours ago',
      content: 'Just had the best coffee of my life! #coffee #caffeine',
      image: 'logo.png',
    },
    {
      user: 'Alice Brown',
      time: '1 day ago',
      content: 'Enjoying a sunny day at the beach!',
      image: 'logo.png',
    },
    {
      user: 'Bob Johnson',
      time: '2 days ago',
      content: 'Had an amazing workout session today!',
      image: 'logo.png',
    },
    {
      user: 'Charlie Lee',
      time: '3 days ago',
      content: 'Just finished reading a fantastic book. Highly recommend it!',
      image: 'logo.png',
    },
    {
      user: 'David Green',
      time: '4 days ago',
      content: 'A beautiful sunset from my backyard!',
      image: 'logo.png',
    },
    {
      user: 'Eva White',
      time: '1 week ago',
      content: 'Exploring new places this weekend. Can\'t wait to share the adventure!',
      image: 'logo.png',
    },
    {
      user: 'Frank Black',
      time: '2 weeks ago',
      content: 'Weekend hike was so refreshing. Nature is the best therapy.',
      image: 'logo.png',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Social Media Feed</Text>
      </View>

      {/* Main Content (Social Media Posts) */}
      <ScrollView contentContainerStyle={styles.mainContent} showsVerticalScrollIndicator={false}>
        {posts.map((post, index) => (
          <View style={styles.post} key={index}>
            <Text style={styles.postUser}>{post.user}</Text>
            <Text style={styles.postTime}>{post.time}</Text>
            <Text style={styles.postContent}>{post.content}</Text>
            <Image style={styles.postImage} source={ require('./src/assets/logo.png')} />
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Like</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Comment</Text></TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer Section</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  mainContent: {
    padding: 20,
    paddingBottom: 100, // To avoid overlap with the footer
  },
  post: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  postUser: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postTime: {
    color: '#888',
    fontSize: 12,
    marginBottom: 10,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MediaTestScreen;
