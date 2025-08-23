import React, { useState, useEffect } from 'react';
import { MapPin, Shield, Wifi, WifiOff } from 'lucide-react';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import ChildCard from '../components/ChildCard';
import EmergencyAccess from '../components/EmergencyAccess';
import { useWallet } from '../hooks/useWallet';

// SanaTrack Logo Component
const SanaTrackLogo = () => (
  <div className="flex flex-col items-center justify-center text-center">
    <div className="w-20 h-20 mb-4">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Outer circle */}
        <circle
          cx="60"
          cy="60"
          r="55"
          fill="none"
          stroke="url(#primaryGradient)"
          strokeWidth="6"
        />
        
        {/* Connection nodes */}
        <circle cx="60" cy="10" r="8" fill="url(#primaryGradient)" />
        <circle cx="110" cy="60" r="8" fill="url(#primaryGradient)" />
        <circle cx="60" cy="110" r="8" fill="url(#primaryGradient)" />
        <circle cx="10" cy="60" r="8" fill="url(#primaryGradient)" />
        
        {/* Inner connection rings */}
        <circle cx="60" cy="10" r="4" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="110" cy="60" r="4" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="60" cy="110" r="4" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="10" cy="60" r="4" fill="none" stroke="white" strokeWidth="2" />
        
        {/* Center person icon */}
        <circle cx="60" cy="45" r="12" fill="url(#primaryGradient)" />
        <path
          d="M40 85 C40 70, 50 65, 60 65 C70 65, 80 70, 80 85 L40 85"
          fill="url(#primaryGradient)"
        />
        
        {/* Connection lines */}
        <line x1="60" y1="18" x2="60" y2="32" stroke="url(#primaryGradient)" strokeWidth="3" />
        <line x1="102" y1="60" x2="88" y2="60" stroke="url(#primaryGradient)" strokeWidth="3" />
        <line x1="60" y1="102" x2="60" y2="88" stroke="url(#primaryGradient)" strokeWidth="3" />
        <line x1="18" y1="60" x2="32" y2="60" stroke="url(#primaryGradient)" strokeWidth="3" />
        
        <defs>
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(220, 90%, 50%)" />
            <stop offset="100%" stopColor="hsl(270, 100%, 65%)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <h1 className="text-2xl font-bold text-gradient-primary mb-2">SanaTrack</h1>
    <p className="text-sm text-muted-foreground max-w-xs leading-tight">
      BLOCKCHAIN SOLUTION USED<br />
      TO KEEP TRACK OF CHILDREN
    </p>
  </div>
);

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="network-bg"></div>
    <div className="sana-logo">
      <SanaTrackLogo />
    </div>
    <div className="welcome-text">WELCOME</div>
    <div className="flex space-x-2 mt-4">
      <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  </div>
);

const ConnectWalletScreen = ({ onConnect }: { onConnect: () => void }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="network-bg"></div>
    <div className="sana-card wallet-connect">
      <div className="wallet-icon">
        <Shield className="w-10 h-10 text-primary-foreground" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-4">Connect Wallet</h2>
      <p className="text-muted-foreground mb-6">
        Connect your MetaMask wallet to access SanaTrack and start monitoring your children's locations securely.
      </p>
      <button 
        className="btn-primary w-full mb-4"
        onClick={onConnect}
      >
        Connect MetaMask
      </button>
      <p className="text-sm text-muted-foreground">
        Don't have MetaMask? <span className="text-accent cursor-pointer hover:underline">Install it here</span>
      </p>
    </div>
  </div>
);

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { account, connectWallet } = useWallet();

  // Mock data for children - Fixed land coordinates
  const [children, setChildren] = useState([
    {
      id: 1,
      name: "Emma Johnson",
      age: 8,
      location: { lat: -33.9289, lng: 18.4194, address: "Long Street, Cape Town CBD" },
      status: "safe" as const,
      lastSeen: "2 minutes ago",
      battery: 85, // GPS tracking device battery
      isOnline: true
    },
    {
      id: 2,
      name: "Liam Smith",
      age: 10,
      location: { lat: -33.9249, lng: 18.4241, address: "V&A Waterfront, Cape Town" },
      status: "safe" as const,
      lastSeen: "5 minutes ago",
      battery: 42, // GPS tracking device battery
      isOnline: true
    },
    {
      id: 3,
      name: "Sophia Brown",
      age: 7,
      location: { lat: -33.9150, lng: 18.4230, address: "Green Point, Cape Town" },
      status: "warning" as const,
      lastSeen: "15 minutes ago",
      battery: 20, // GPS tracking device battery (low warning)
      isOnline: false
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleWalletConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleAddChild = (newChild: any) => {
    setChildren(prev => [...prev, newChild]);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!account) {
    return <ConnectWalletScreen onConnect={handleWalletConnect} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard children={children} onAddChild={handleAddChild} />;
      
      case 'children':
        return (
          <div className="container">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Children Management</h1>
              <p className="text-muted-foreground">Manage and monitor your children's tracking devices</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child) => (
                <ChildCard key={child.id} child={child} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <button className="btn-primary">
                Add New Child
              </button>
            </div>
          </div>
        );
      
      case 'emergency':
        return <EmergencyAccess />;
      
      case 'settings':
        return (
          <div className="container">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
              <p className="text-muted-foreground">Configure your SanaTrack preferences</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="sana-card">
                <div className="sana-card-header">
                  <h3 className="text-xl font-semibold text-foreground">Account Settings</h3>
                </div>
                <div className="sana-card-content space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Connected Wallet
                    </label>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-status-safe rounded-full"></div>
                      <span className="text-foreground font-mono text-sm">
                        {account?.slice(0, 6)}...{account?.slice(-4)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Notification Preferences
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-foreground text-sm">Location alerts</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-foreground text-sm">Battery warnings</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-foreground text-sm">Daily reports</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="sana-card">
                <div className="sana-card-header">
                  <h3 className="text-xl font-semibold text-foreground">Privacy & Security</h3>
                </div>
                <div className="sana-card-content space-y-4">
                  <button className="btn-secondary w-full">
                    Manage Emergency Contacts
                  </button>
                  <button className="btn-secondary w-full">
                    Export Location Data
                  </button>
                  <button className="btn-secondary w-full text-destructive border-destructive/20 hover:bg-destructive/10">
                    Delete All Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <Dashboard children={children} />;
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage} account={account}>
      {renderPage()}
    </Layout>
  );
}