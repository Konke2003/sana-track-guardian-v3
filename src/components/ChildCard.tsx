import React, { useState } from 'react';
import { MapPin, Battery, Wifi, WifiOff, Clock, User, Map, Settings } from 'lucide-react';
import TrackingMap from './TrackingMap';
import ChildDetailsDialog from './ChildDetailsDialog';

interface Child {
  id: number;
  name: string;
  age: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'safe' | 'warning' | 'danger';
  lastSeen: string;
  battery: number;
  isOnline: boolean;
}

interface ChildCardProps {
  child: Child;
}

const ChildCard: React.FC<ChildCardProps> = ({ child }) => {
  const [showMap, setShowMap] = useState(false);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-status-safe';
      case 'warning': return 'text-status-warning';
      case 'danger': return 'text-status-danger';
      default: return 'text-muted-foreground';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return 'text-status-safe';
    if (battery > 20) return 'text-status-warning';
    return 'text-status-danger';
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-status-safe glow-success';
      case 'warning': return 'bg-status-warning';
      case 'danger': return 'bg-status-danger';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="sana-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 glow-primary flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{child.name}</h3>
            <p className="text-sm text-muted-foreground">Age {child.age}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getStatusBg(child.status)}`}></div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full bg-secondary/50 ${getStatusColor(child.status)}`}>
            {child.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">Current Location</p>
            <p className="text-xs text-muted-foreground">{child.location.address}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Battery className={`w-4 h-4 ${getBatteryColor(child.battery)}`} />
          <div>
            <p className={`text-sm font-medium ${getBatteryColor(child.battery)}`}>
              {child.battery}%
            </p>
            <p className="text-xs text-muted-foreground">Battery</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {child.isOnline ? (
            <Wifi className="w-4 h-4 text-status-safe" />
          ) : (
            <WifiOff className="w-4 h-4 text-muted-foreground" />
          )}
          <div>
            <p className={`text-sm font-medium ${child.isOnline ? 'text-status-safe' : 'text-muted-foreground'}`}>
              {child.isOnline ? 'Online' : 'Offline'}
            </p>
            <p className="text-xs text-muted-foreground">Status</p>
          </div>
        </div>
      </div>

      {/* Last Seen */}
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Last seen {child.lastSeen}</span>
      </div>

      {/* Actions */}
      <div className="flex space-x-2 mb-4">
        <button 
          onClick={() => setShowMap(!showMap)}
          className="btn-primary flex-1 flex items-center justify-center space-x-2"
        >
          <Map className="w-4 h-4" />
          <span>{showMap ? 'Hide Map' : 'Show Map'}</span>
        </button>
        <ChildDetailsDialog 
          child={child}
          trigger={
            <button className="btn-secondary flex-1 flex items-center justify-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>View Details</span>
            </button>
          }
        />
      </div>

      {/* Inline Map */}
      {showMap && (
        <div className="mb-4">
          <TrackingMap children={[child]} focusChild={child} height="h-64" />
        </div>
      )}

      {/* Emergency Alert for Warning Status */}
      {child.status === 'warning' && (
        <div className="mt-4 p-3 rounded-lg bg-status-warning/10 border border-status-warning/20">
          <p className="text-xs text-status-warning font-medium">
            Low battery or unusual location detected
          </p>
        </div>
      )}
    </div>
  );
};

export default ChildCard;