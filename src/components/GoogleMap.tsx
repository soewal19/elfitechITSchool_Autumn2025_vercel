import React, { useState, useCallback, useEffect } from 'react';
import { MapPin, Navigation, Clock, Store, Loader, Target, Route } from 'lucide-react';
import { SkeletonLoader } from './SkeletonLoader';

interface MapLocation {
  lat: number;
  lng: number;
  address: string;
}

interface GoogleMapProps {
  onLocationSelect?: (location: MapLocation) => void;
  selectedLocation?: MapLocation | null;
  shopLocation?: {
    lat: number;
    lng: number;
    name: string;
  };
  showRoute?: boolean;
  className?: string;
}

export function GoogleMap({ 
  onLocationSelect, 
  selectedLocation, 
  shopLocation, 
  showRoute,
  className = "" 
}: GoogleMapProps) {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Mock shop locations with realistic NYC coordinates
  const mockShops = [
    { 
      id: '1', 
      name: 'Flowery Fragrant', 
      lat: 40.7589, 
      lng: -73.9851, 
      address: '123 Garden St, Manhattan, NY',
      category: 'Premium'
    },
    { 
      id: '2', 
      name: 'Bloomwell', 
      lat: 40.7505, 
      lng: -73.9934, 
      address: '456 Flower Ave, Midtown, NY',
      category: 'Budget'
    },
    { 
      id: '3', 
      name: 'Garden Paradise', 
      lat: 40.7614, 
      lng: -73.9776, 
      address: '789 Bloom Blvd, Upper East Side, NY',
      category: 'Luxury'
    },
    { 
      id: '4', 
      name: 'Spring Blossoms', 
      lat: 40.7282, 
      lng: -73.9942, 
      address: '321 Spring St, SoHo, NY',
      category: 'Seasonal'
    },
  ];

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleMapClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelectingLocation || !onLocationSelect || isLoading) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert click position to coordinates (mock calculation)
    const lat = mapCenter.lat + (y - rect.height / 2) * -0.002;
    const lng = mapCenter.lng + (x - rect.width / 2) * 0.002;
    
    // Generate realistic NYC address
    const streetNumber = Math.floor(Math.random() * 999) + 1;
    const streets = ['Broadway', 'Park Ave', 'Madison Ave', '5th Ave', 'Lexington Ave', 'Amsterdam Ave'];
    const neighborhoods = ['Manhattan', 'Upper West Side', 'East Village', 'Chelsea', 'Tribeca'];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
    const mockAddress = `${streetNumber} ${street}, ${neighborhood}, NY 10001`;
    
    onLocationSelect({ lat, lng, address: mockAddress });
    setIsSelectingLocation(false);
  }, [isSelectingLocation, onLocationSelect, mapCenter, isLoading]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setMapError('Geolocation is not supported by this browser.');
      return;
    }

    setGettingLocation(true);
    setMapError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: 'Current Location (GPS)'
        };
        setMapCenter({ lat: location.lat, lng: location.lng });
        onLocationSelect?.(location);
        setGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        let errorMessage = 'Unable to get your current location.';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        
        setMapError(errorMessage);
        setGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const selectShopLocation = (shop: typeof mockShops[0]) => {
    const location = {
      lat: shop.lat,
      lng: shop.lng,
      address: shop.address
    };
    setMapCenter({ lat: shop.lat, lng: shop.lng });
    onLocationSelect?.(location);
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getDeliveryTime = () => {
    if (!selectedLocation || !shopLocation) return '25-35 min';
    
    const distance = calculateDistance(
      shopLocation.lat, shopLocation.lng,
      selectedLocation.lat, selectedLocation.lng
    );
    
    const baseTime = 15; // Base preparation time
    const travelTime = Math.ceil(distance * 8); // ~8 min per km in city traffic
    const totalTime = baseTime + travelTime;
    
    return `${totalTime}-${totalTime + 10} min`;
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex items-center justify-between mb-3">
            <SkeletonLoader variant="text" width="10rem" height="1.25rem" />
            <SkeletonLoader variant="rectangular" width="8rem" height="2rem" />
          </div>
          <SkeletonLoader variant="rectangular" width="100%" height="2.5rem" />
        </div>
        <div className="relative h-80 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <Loader className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-2" />
            <p className="text-gray-600">Loading interactive map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            Delivery Location
          </h3>
          <button
            onClick={getCurrentLocation}
            disabled={gettingLocation}
            className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {gettingLocation ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Target className="h-4 w-4" />
            )}
            <span>{gettingLocation ? 'Getting Location...' : 'Use Current Location'}</span>
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            onClick={() => setIsSelectingLocation(!isSelectingLocation)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isSelectingLocation
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isSelectingLocation ? 'Cancel Selection' : 'Select on Map'}
          </button>
          
          {selectedLocation && (
            <div className="flex-1 min-w-0 bg-white rounded-lg px-3 py-2 border">
              <p className="text-sm text-gray-600 truncate" title={selectedLocation.address}>
                📍 {selectedLocation.address}
              </p>
            </div>
          )}
        </div>

        {mapError && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{mapError}</p>
          </div>
        )}

        {/* Quick Shop Selection */}
        <div className="flex flex-wrap gap-1">
          {mockShops.slice(0, 2).map((shop) => (
            <button
              key={shop.id}
              onClick={() => selectShopLocation(shop)}
              className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
            >
              📍 {shop.name}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Display */}
      <div 
        className={`relative h-80 bg-gradient-to-br from-green-100 via-blue-100 to-indigo-100 overflow-hidden ${
          isSelectingLocation ? 'cursor-crosshair' : 'cursor-default'
        }`}
        onClick={handleMapClick}
      >
        {/* Map Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4B5563" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Roads/Streets */}
        <svg className="absolute inset-0 pointer-events-none">
          <line x1="0%" y1="30%" x2="100%" y2="35%" stroke="#9CA3AF" strokeWidth="3" opacity="0.6"/>
          <line x1="0%" y1="60%" x2="100%" y2="65%" stroke="#9CA3AF" strokeWidth="3" opacity="0.6"/>
          <line x1="25%" y1="0%" x2="30%" y2="100%" stroke="#9CA3AF" strokeWidth="3" opacity="0.6"/>
          <line x1="70%" y1="0%" x2="75%" y2="100%" stroke="#9CA3AF" strokeWidth="3" opacity="0.6"/>
        </svg>

        {/* Shop Markers */}
        {mockShops.map((shop, index) => {
          const positions = [
            { left: '20%', top: '25%' },
            { left: '45%', top: '40%' },
            { left: '75%', top: '30%' },
            { left: '30%', top: '70%' }
          ];
          
          return (
            <div
              key={shop.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={positions[index]}
            >
              <div 
                className="bg-purple-500 text-white p-2 rounded-full shadow-lg hover:bg-purple-600 transition-all duration-200 cursor-pointer group hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  selectShopLocation(shop);
                }}
              >
                <Store className="h-4 w-4" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                  <div className="font-medium">{shop.name}</div>
                  <div className="text-gray-300">{shop.category}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Selected Location Marker */}
        {selectedLocation && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ left: '60%', top: '50%' }}
          >
            <div className="relative">
              <div className="bg-red-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded-lg whitespace-nowrap">
                Delivery Location
              </div>
              {/* Pulsing circle animation */}
              <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-30"></div>
            </div>
          </div>
        )}

        {/* Route Line */}
        {showRoute && selectedLocation && shopLocation && (
          <svg className="absolute inset-0 pointer-events-none z-15">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                      refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
              </marker>
            </defs>
            <line
              x1="30%"
              y1="40%"
              x2="60%"
              y2="50%"
              stroke="#3B82F6"
              strokeWidth="4"
              strokeDasharray="15,10"
              markerEnd="url(#arrowhead)"
              className="animate-pulse"
            />
            <circle cx="30%" cy="40%" r="4" fill="#8B5CF6" className="animate-pulse" />
            <circle cx="60%" cy="50%" r="4" fill="#EF4444" className="animate-pulse" />
          </svg>
        )}

        {/* Selection Instructions Overlay */}
        {isSelectingLocation && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-4">
              <div className="mb-4">
                <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-2 animate-bounce" />
                <h4 className="text-lg font-semibold text-gray-800">Select Delivery Location</h4>
              </div>
              <p className="text-gray-600 mb-4">Click anywhere on the map to set your delivery address</p>
              <div className="flex space-x-2 justify-center">
                <button
                  onClick={getCurrentLocation}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                >
                  Use GPS Location
                </button>
                <button
                  onClick={() => setIsSelectingLocation(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Route Information */}
      {showRoute && selectedLocation && (
        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Route className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Estimated Delivery</p>
                <p className="text-sm text-gray-600">
                  Distance: ~{selectedLocation && shopLocation ? 
                    calculateDistance(shopLocation.lat, shopLocation.lng, selectedLocation.lat, selectedLocation.lng).toFixed(1) 
                    : '2.5'} km
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-green-600">
                <Clock className="h-5 w-5" />
                <span className="font-bold text-lg">{getDeliveryTime()}</span>
              </div>
              <p className="text-xs text-gray-500">Delivery time</p>
            </div>
          </div>
          
          {shopLocation && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Store className="h-4 w-4 text-purple-600" />
                <span>From: <strong>{shopLocation.name}</strong></span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}