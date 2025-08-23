import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { MapPin, Battery, Wifi, WifiOff, Clock, User, Phone, MessageCircle, Shield, Map } from 'lucide-react';
import TrackingMap from './TrackingMap';

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

interface ChildDetailsDialogProps {
  child: Child;
  trigger: React.ReactNode;
}

const ChildDetailsDialog: React.FC<ChildDetailsDialogProps> = ({ child, trigger }) => {
  const [showFullMap, setShowFullMap] = useState(false);

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
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 glow-primary flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{child.name}</h2>
              <p className="text-sm text-muted-foreground">Age {child.age} • Detailed View</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="sana-card">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${getStatusBg(child.status)}`}></div>
                <div>
                  <p className={`font-semibold ${getStatusColor(child.status)}`}>
                    {child.status.toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground">Current Status</p>
                </div>
              </div>
            </div>

            <div className="sana-card">
              <div className="flex items-center space-x-3">
                <Battery className={`w-4 h-4 ${getBatteryColor(child.battery)}`} />
                <div>
                  <p className={`font-semibold ${getBatteryColor(child.battery)}`}>
                    {child.battery}%
                  </p>
                  <p className="text-xs text-muted-foreground">Battery Level</p>
                </div>
              </div>
            </div>

            <div className="sana-card">
              <div className="flex items-center space-x-3">
                {child.isOnline ? (
                  <Wifi className="w-4 h-4 text-status-safe" />
                ) : (
                  <WifiOff className="w-4 h-4 text-muted-foreground" />
                )}
                <div>
                  <p className={`font-semibold ${child.isOnline ? 'text-status-safe' : 'text-muted-foreground'}`}>
                    {child.isOnline ? 'Online' : 'Offline'}
                  </p>
                  <p className="text-xs text-muted-foreground">Connection Status</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="sana-card">
            <div className="sana-card-header">
              <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Current Location</span>
              </h3>
            </div>
            <div className="sana-card-content">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Address</p>
                    <p className="text-sm text-muted-foreground">{child.location.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Latitude</p>
                      <p className="text-sm text-muted-foreground font-mono">{child.location.lat.toFixed(6)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Longitude</p>
                      <p className="text-sm text-muted-foreground font-mono">{child.location.lng.toFixed(6)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Last updated {child.lastSeen}</span>
                  </div>
                </div>
                <div className="h-48">
                  <TrackingMap children={[child]} focusChild={child} height="h-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="sana-card">
            <div className="sana-card-header">
              <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
            </div>
            <div className="sana-card-content">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="btn-primary flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Call Device</span>
                </button>
                <button className="btn-secondary flex items-center justify-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
                <button 
                  onClick={() => setShowFullMap(!showFullMap)}
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <Map className="w-4 h-4" />
                  <span>{showFullMap ? 'Hide' : 'Show'} Full Map</span>
                </button>
              </div>
            </div>
          </div>

          {/* Full Map View */}
          {showFullMap && (
            <div className="sana-card">
              <div className="sana-card-header">
                <h3 className="text-lg font-semibold text-foreground">Detailed Map View</h3>
              </div>
              <div className="sana-card-content p-0">
                <TrackingMap children={[child]} focusChild={child} height="h-96" />
              </div>
            </div>
          )}

          {/* Safety Alerts */}
          {child.status !== 'safe' && (
            <div className="sana-card border-status-warning/20">
              <div className="sana-card-header">
                <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-status-warning" />
                  <span>Safety Alert</span>
                </h3>
              </div>
              <div className="sana-card-content">
                <div className={`p-4 rounded-lg ${
                  child.status === 'warning' ? 'bg-status-warning/10 border border-status-warning/20' :
                  'bg-status-danger/10 border border-status-danger/20'
                }`}>
                  <p className={`font-medium ${getStatusColor(child.status)} mb-2`}>
                    {child.status === 'warning' ? 'Warning Detected' : 'Danger Alert'}
                  </p>
                  <p className="text-sm text-foreground">
                    {child.status === 'warning' 
                      ? 'Low battery or unusual location pattern detected. Please check on the child.'
                      : 'Immediate attention required. Contact emergency services if unable to reach the child.'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChildDetailsDialog;