import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

// Design System Configuration from the JSON file
const designSystem = {
  colorPalette: {
    primary: {
      background: '#1a1a1a',
      surface: '#2a2a2a',
      surfaceElevated: '#3a3a3a',
    },
    accent: {
      primary: '#8B5CF6',
      secondary: '#A3E635',
      tertiary: '#10B981',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      muted: '#808080',
    },
    interactive: {
      selected: '#FFFFFF',
      unselected: '#666666',
    },
  },
  typography: {
    hero: { fontSize: 28, fontWeight: '600' },
    title: { fontSize: 24, fontWeight: '600' },
    subtitle: { fontSize: 16, fontWeight: '400' },
    body: { fontSize: 14, fontWeight: '400' },
    caption: { fontSize: 12, fontWeight: '400' },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

// Sample Data for Trails
const trails = [
  {
    id: '1',
    title: 'Mystic Forest Trail',
    location: 'Elvenwood',
    image: 'https://images.unsplash.com/photo-1533227481913-4a11f935b035?q=80&w=2070&auto=format&fit=crop',
    rating: 4.8,
    difficulty: 'Moderate',
    category: 'Hiking',
  },
  {
    id: '2',
    title: 'Coastal Cliff Walk',
    location: 'Seaside',
    image: 'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=2070&auto=format&fit=crop',
    rating: 4.5,
    difficulty: 'Easy',
    category: 'Hiking',
  },
  {
    id: '3',
    title: 'Mountain Peak Ascent',
    location: 'Dragon\'s Tooth',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    difficulty: 'Hard',
    category: 'Mountains',
  },
  {
    id: '4',
    title: 'Riverside Path',
    location: 'Glimmerwood',
    image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1974&auto=format&fit=crop',
    rating: 4.2,
    difficulty: 'Easy',
    category: 'Rivers',
  },
];

const categories = ['All', 'Hiking', 'Mountains', 'Rivers', 'Caves'];

const App = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('map');

  // Component: Search Bar
  const SearchBar = () => (
    <View style={styles.searchBarContainer}>
      <Feather name="search" size={20} color={designSystem.colorPalette.text.muted} />
      <TextInput
        placeholder="Search trails..."
        placeholderTextColor={designSystem.colorPalette.text.muted}
        style={styles.searchBarInput}
      />
    </View>
  );

  // Component: Navigation Tabs
  const NavigationTabs = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navTabsContainer}>
      {categories.map((category) => (
        <TouchableOpacity key={category} onPress={() => setActiveCategory(category)}>
          <View
            style={[
              styles.navTab,
              activeCategory === category ? styles.navTabActive : styles.navTabInactive,
            ]}
          >
            <Text
              style={[
                styles.navTabText,
                activeCategory === category ? styles.navTabTextActive : styles.navTabTextInactive,
              ]}
            >
              {category}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // Component: Trail Card
  const TrailCard = ({ trail }) => (
    <ImageBackground
      source={{ uri: trail.image }}
      style={styles.card}
      imageStyle={{ borderRadius: 16 }}
    >
      <View style={styles.cardOverlay}>
        <View>
            <Text style={styles.cardTitle}>{trail.title}</Text>
            <View style={styles.cardLocationContainer}>
                <Feather name="map-pin" size={14} color={designSystem.colorPalette.text.primary} />
                <Text style={styles.cardLocation}>{trail.location}</Text>
            </View>
        </View>
        <View style={styles.cardDetails}>
          <View style={styles.cardDetailItem}>
            <Feather name="star" size={14} color={designSystem.colorPalette.accent.secondary} />
            <Text style={styles.cardDetailText}>{trail.rating}</Text>
          </View>
          <View style={styles.cardDetailItem}>
            <Text style={styles.cardDetailText}>{trail.difficulty}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );

  // Component: Bottom Navigation Bar
  const BottomNav = () => (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => setActiveTab('map')} style={styles.bottomNavItem}>
        <Feather name="map" size={24} color={activeTab === 'map' ? designSystem.colorPalette.interactive.selected : designSystem.colorPalette.interactive.unselected} />
        <Text style={[styles.bottomNavText, {color: activeTab === 'map' ? designSystem.colorPalette.interactive.selected : designSystem.colorPalette.interactive.unselected}]}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('bookmark')} style={styles.bottomNavItem}>
        <Feather name="bookmark" size={24} color={activeTab === 'bookmark' ? designSystem.colorPalette.interactive.selected : designSystem.colorPalette.interactive.unselected} />
         <Text style={[styles.bottomNavText, {color: activeTab === 'bookmark' ? designSystem.colorPalette.interactive.selected : designSystem.colorPalette.interactive.unselected}]}>Saved</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('discover')} style={styles.bottomNavItem}>
        <MaterialCommunityIcons name="compass-outline" size={24} color={activeTab === 'discover' ? designSystem.colorPalette.interactive.selected : designSystem.colorPalette.interactive.unselected} />
         <Text style={[styles.bottomNavText, {color: activeTab === 'discover' ? designSystem.colorPalette.interactive.selected : designSystem.colorPalette.interactive.unselected}]}>Discover</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('user')} style={styles.bottomNavItem}>
        <Feather name="user" size={24} color={activeTab === 'user' ? designSystem.colorPalette.interactive.selected : designSystem.colorPalette.interactive.unselected} />
         <Text style={[styles.bottomNavText, {color: activeTab === 'user' ? designSystem.colorPalette.interactive.selected : designSystem.colorPalette.interactive.unselected}]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );


  const filteredTrails = activeCategory === 'All'
    ? trails
    : trails.filter(trail => trail.category === activeCategory);


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Discover</Text>
            <SearchBar />
        </View>

        {/* Content */}
        <ScrollView style={styles.content}>
            <NavigationTabs />
            <Text style={styles.sectionTitle}>Popular Trails</Text>
            {filteredTrails.map(trail => <TrailCard key={trail.id} trail={trail} />)}
            <View style={{height: 100}}/>
        </ScrollView>

        {/* Footer */}
        <BottomNav />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: designSystem.colorPalette.primary.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: designSystem.colorPalette.primary.background,
  },
  header: {
    paddingHorizontal: designSystem.spacing.md,
    paddingVertical: designSystem.spacing.md,
  },
  headerTitle: {
    ...designSystem.typography.hero,
    color: designSystem.colorPalette.text.primary,
    marginBottom: designSystem.spacing.md,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: designSystem.colorPalette.primary.surface,
    borderRadius: 24,
    paddingHorizontal: designSystem.spacing.md,
    paddingVertical: 12,
  },
  searchBarInput: {
    flex: 1,
    ...designSystem.typography.body,
    color: designSystem.colorPalette.text.primary,
    marginLeft: designSystem.spacing.sm,
  },
  content: {
    paddingHorizontal: designSystem.spacing.md,
  },
  navTabsContainer: {
    marginVertical: designSystem.spacing.md,
  },
  navTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginRight: designSystem.spacing.sm,
    borderWidth: 1,
  },
  navTabActive: {
    backgroundColor: designSystem.colorPalette.interactive.selected,
    borderColor: designSystem.colorPalette.interactive.selected,
  },
  navTabInactive: {
    backgroundColor: 'transparent',
    borderColor: designSystem.colorPalette.text.muted,
  },
  navTabText: {
    ...designSystem.typography.body,
  },
  navTabTextActive: {
    color: designSystem.colorPalette.primary.background,
    fontWeight: '600',
  },
  navTabTextInactive: {
    color: designSystem.colorPalette.text.muted,
  },
  sectionTitle: {
    ...designSystem.typography.title,
    color: designSystem.colorPalette.text.primary,
    marginVertical: designSystem.spacing.md,
  },
  card: {
    height: 200,
    justifyContent: 'flex-end',
    marginBottom: designSystem.spacing.md,
    overflow: 'hidden',
  },
  cardOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: designSystem.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
  },
  cardTitle: {
    ...designSystem.typography.subtitle,
    color: designSystem.colorPalette.text.primary,
    fontWeight: '600',
  },
  cardLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: designSystem.spacing.xs,
  },
  cardLocation: {
    ...designSystem.typography.caption,
    color: designSystem.colorPalette.text.primary,
    marginLeft: designSystem.spacing.xs,
  },
  cardDetails: {
    alignItems: 'flex-end',
  },
  cardDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginTop: designSystem.spacing.xs,
  },
  cardDetailText: {
    ...designSystem.typography.caption,
    color: designSystem.colorPalette.text.primary,
    marginLeft: designSystem.spacing.xs,
  },
  bottomNav: {
    height: 80,
    backgroundColor: designSystem.colorPalette.primary.background,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: designSystem.colorPalette.primary.surface,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  bottomNavItem: {
    alignItems: 'center',
  },
  bottomNavText: {
    ...designSystem.typography.caption,
    marginTop: designSystem.spacing.xs,
  },
});

export default App; 