import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/interview-dashboard', icon: 'LayoutDashboard' },
    { label: 'Live Monitor', path: '/live-interview-monitor', icon: 'Monitor' },
    { label: 'Setup', path: '/interview-setup', icon: 'Settings' },
    { label: 'Reports', path: '/proctoring-reports', icon: 'FileText' }
  ];

  const notifications = [
    { id: 1, type: 'alert', message: 'Interview session #1234 completed', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'Suspicious activity detected in session #1235', time: '5 min ago' },
    { id: 3, type: 'info', message: 'System maintenance scheduled for tonight', time: '1 hour ago' }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'alert': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-card">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link to="/interview-dashboard" className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Eye" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground">AI-Proctor</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActiveRoute(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Session Status Indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-monitoring"></div>
            <span>System Active</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {notifications?.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                  {notifications?.length}
                </span>
              )}
            </Button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div key={notification?.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50">
                      <div className="flex items-start space-x-3">
                        <Icon 
                          name={getNotificationIcon(notification?.type)} 
                          size={16} 
                          className={getNotificationColor(notification?.type)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">{notification?.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 px-3 py-2"
            >
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                JD
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground">Marry</p>
                <p className="text-xs text-muted-foreground">HR Manager</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </Button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-modal z-50">
                <div className="p-4 border-b border-border">
                  <p className="font-medium text-foreground">Marry</p>
                  <p className="text-sm text-muted-foreground">marry@company.com</p>
                </div>
                <div className="p-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Icon name="User" size={16} className="mr-2" />
                    Profile Settings
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Icon name="HelpCircle" size={16} className="mr-2" />
                    Help & Support
                  </Button>
                  <div className="border-t border-border my-2"></div>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-error hover:text-error">
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="p-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActiveRoute(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 text-success rounded-lg text-sm font-medium">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-monitoring"></div>
              <span>System Active</span>
            </div>
          </div>
        </div>
      )}
      {/* Click outside handlers */}
      {(isNotificationOpen || isProfileOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsNotificationOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;