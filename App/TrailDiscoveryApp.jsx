import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

// --- Reusable Components ---

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


// --- Screen Components ---

// Discover Screen: The main screen with the trail list
const DiscoverScreen = ({ activeCategory, setActiveCategory }) => {
    const categories = ['All', 'Hiking', 'Mountains', 'Rivers', 'Caves'];
    const trails = [
        { id: '1', title: 'Mystic Forest Trail', location: 'Elvenwood', image: 'https://images.unsplash.com/photo-1533227481913-4a11f935b035?q=80&w=2070&auto=format&fit=crop', rating: 4.8, difficulty: 'Moderate', category: 'Hiking' },
        { id: '2', title: 'Coastal Cliff Walk', location: 'Seaside', image: 'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=2070&auto=format&fit=crop', rating: 4.5, difficulty: 'Easy', category: 'Hiking' },
        { id: '3', title: 'Mountain Peak Ascent', location: 'Dragon\'s Tooth', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop', rating: 4.9, difficulty: 'Hard', category: 'Mountains' },
        { id: '4', title: 'Riverside Path', location: 'Glimmerwood', image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=1974&auto=format&fit=crop', rating: 4.2, difficulty: 'Easy', category: 'Rivers' },
        { id: '5', title: 'Crystal Caverns', location: 'Underdark', image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2070&auto=format&fit=crop', rating: 4.6, difficulty: 'Moderate', category: 'Caves' },
        { id: '6', title: 'Redwood Giants Trail', location: 'Giant\'s Forest', image: 'https://images.unsplash.com/photo-1542848123-b1479824d642?q=80&w=1974&auto=format&fit=crop', rating: 4.9, difficulty: 'Easy', category: 'Hiking' },
    ];
    
    const filteredTrails = activeCategory === 'All'
        ? trails
        : trails.filter(trail => trail.category === activeCategory);

    // Component: Navigation Tabs for categories
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

    return (
        <>
            {/* Header */}
            <View style={styles.header}>
                <SearchBar />
            </View>
            {/* Content */}
            <ScrollView style={styles.contentScrollView}>
                <NavigationTabs />
                <Text style={styles.sectionTitle}>Popular Trails</Text>
                {filteredTrails.map(trail => <TrailCard key={trail.id} trail={trail} />)}
                {/* This empty view adds space at the bottom so the last card isn't hidden by the nav bar */}
                <View style={{height: 100}}/>
            </ScrollView>
        </>
    );
};

// Placeholder for the Map screen
const MapScreen = () => (
    <View style={styles.placeholderContainer}>
        <Feather name="map" size={48} color={designSystem.colorPalette.text.muted} />
        <Text style={styles.placeholderText}>Map Screen</Text>
    </View>
);

// Placeholder for the Saved Trails screen
const SavedScreen = () => (
    <View style={styles.placeholderContainer}>
        <Feather name="bookmark" size={48} color={designSystem.colorPalette.text.muted} />
        <Text style={styles.placeholderText}>Saved Trails</Text>
    </View>
);

// Placeholder for the Profile screen
const ProfileScreen = () => (
    <View style={styles.placeholderContainer}>
        <Feather name="user" size={48} color={designSystem.colorPalette.text.muted} />
        <Text style={styles.placeholderText}>Profile Screen</Text>
    </View>
);


// --- Main App Component ---

const TrailDiscoveryApp = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('discover'); // Changed default to discover
  const insets = useSafeAreaInsets();

  // Renders the currently active screen based on the activeTab state
  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return <MapScreen />;
      case 'bookmark':
        return <SavedScreen />;
      case 'discover':
        return <DiscoverScreen activeCategory={activeCategory} setActiveCategory={setActiveCategory} />;
      case 'user':
        return <ProfileScreen />;
      default:
        return <DiscoverScreen activeCategory={activeCategory} setActiveCategory={setActiveCategory} />;
    }
  };

  // Component: Bottom Navigation Bar
  const BottomNav = () => (
    <View style={[styles.bottomNav, { height: 80 + insets.bottom, paddingBottom: insets.bottom }]}>
      <TouchableOpacity onPress={() => setActiveTab('discover')} style={styles.bottomNavItem}>
        <MaterialCommunityIcons name="compass-outline" size={24} color={activeTab === 'discover' ? designSystem.colorPalette.interactive.selected : designSystem.colorPalette.interactive.unselected} />
        <Text style={[styles.bottomNavText, {color: activeTab === 'discover' ? designSystem.colorPalette.interactive.selected : designSystem.colorPalette.interactive.unselected}]}>Discover</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('map')} style={styles.bottomNavItem}>
        <Feather name="map" size={24} color={activeTab === 'map' ? designSystem.colorPalette.interactive.selected : designSystem.colorPalette.interactive.unselected} />
        <Text style={[styles.bottomNavText, {color: activeTab === 'map' ? designSystem.colorPalette.interactive.selected : designSystem.colorPalette.interactive.unselected}]}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('bookmark')} style={styles.bottomNavItem}>
        <Feather name="bookmark" size={24} color={activeTab === 'bookmark' ? designSystem.colorPalette.interactive.selected : designSystem.colorPalette.interactive.unselected} />
         <Text style={[styles.bottomNavText, {color: activeTab === 'bookmark' ? designSystem.colorPalette.interactive.selected : designSystem.colorPalette.interactive.unselected}]}>Saved</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab('user')} style={styles.bottomNavItem}>
        <Feather name="user" size={24} color={activeTab === 'user' ? designSystem.colorPalette.interactive.selected : designSystem.colorPalette.interactive.unselected} />
         <Text style={[styles.bottomNavText, {color: activeTab === 'user' ? designSystem.colorPalette.interactive.selected : designSystem.colorPalette.interactive.unselected}]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      {/* The main content area which switches between screens */}
      {renderContent()}

      {/* The bottom navigation is always visible */}
      <BottomNav />
    </View>
  );
};

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: designSystem.colorPalette.primary.background,
  },
  // Header styles (used in Discover screen)
  header: {
    paddingHorizontal: designSystem.spacing.md,
    paddingTop: designSystem.spacing.md,
    paddingBottom: designSystem.spacing.sm, // Reduced bottom padding
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
  // Scrollable content view
  contentScrollView: {
    paddingHorizontal: designSystem.spacing.md,
  },
  // Category tabs
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
  // Trail Card styles
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
  // Bottom Navigation
  bottomNav: {
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
  },
  bottomNavItem: {
    alignItems: 'center',
  },
  bottomNavText: {
    ...designSystem.typography.caption,
    marginTop: designSystem.spacing.md,
  },
  // Placeholder styles for new screens
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: designSystem.colorPalette.primary.background,
  },
  placeholderText: {
    ...designSystem.typography.title,
    color: designSystem.colorPalette.text.muted,
    marginTop: designSystem.spacing.md,
  }
});

export default TrailDiscoveryApp;
