import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const routeMap = {
    '/interview-dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/live-interview-monitor': { label: 'Live Monitor', icon: 'Monitor' },
    '/interview-setup': { label: 'Interview Setup', icon: 'Settings' },
    '/proctoring-reports': { label: 'Reports', icon: 'FileText' },
    '/login': { label: 'Login', icon: 'LogIn' },
    '/register': { label: 'Register', icon: 'UserPlus' }
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/interview-dashboard', icon: 'Home' }];
    
    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap?.[currentPath];
      
      if (routeInfo && currentPath !== '/interview-dashboard') {
        breadcrumbs?.push({
          label: routeInfo?.label,
          path: currentPath,
          icon: routeInfo?.icon,
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on auth pages
  if (location?.pathname === '/login' || location?.pathname === '/register') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground/60" />
          )}
          {crumb?.isLast ? (
            <div className="flex items-center space-x-2 text-foreground font-medium">
              <Icon name={crumb?.icon} size={14} />
              <span>{crumb?.label}</span>
            </div>
          ) : (
            <Link
              to={crumb?.path}
              className="flex items-center space-x-2 hover:text-foreground transition-colors duration-200"
            >
              <Icon name={crumb?.icon} size={14} />
              <span>{crumb?.label}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;